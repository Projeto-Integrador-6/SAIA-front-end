import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from 'formik';
import { InputLabel, TextField, Select, MenuItem, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import LoadingProgress from "../../components/LoadingProgress";
import { ButtonOne } from "../../components/Button";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

export default function EditUsers() {
  let { id } = useParams();

  const { setSnack } = useContext(SnackContext);

  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Editando Usuário`

    setTimeout(async () => {
      const response = await api.get(`/usuario/${id}`);
      setUsuario(response.data.usuario);

      setLoading(false);
    }, 500)

  }, [])

  async function edit(values) {
    try {
      await api.put(`/usuario/${id}`, { ...values });
      setSnack({ message: "Usuário editado com sucesso.", type: 'success', open: true });
      history.push("/manager/users");
    } catch (err) {
      setSnack({ message: err.response.data.error, type: 'error', open: true });
    }
  }

  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title="Editando Usuário" />

          <Formik
            enableReinitialize
            initialValues={usuario}
            onSubmit={async (values) => {
              edit(values);
            }}
          >
            {({ values, handleChange }) => (
              <Form className="create-user-form">
                <FullCard title="Dados do Usuário">
                  <div className="input-block">
                    <TextField
                      name="nome"
                      label="Nome"
                      value={values.nome}
                      onChange={handleChange}
                      type="text"
                      fullWidth
                    />
                  </div>

                  <div className="input-block">
                    <TextField
                      name="email"
                      label="E-mail"
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                      fullWidth
                    />
                  </div>

                  <div className="input-block">
                    <TextField
                      name="password"
                      label="Senha"
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                      fullWidth
                    />
                  </div>

                  <div className="input-block">
                    <FormControl fullWidth>
                      <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
                      <Select
                        labelId="tipo-usuario-label"
                        label="Tipo de Usuário"
                        id="tipoUsuario"
                        name="tipoUsuario"
                        value={values.tipoUsuario}
                        onChange={handleChange}

                      >
                        <MenuItem value="">
                          <em>Escolha uma opção</em>
                        </MenuItem>
                        <MenuItem value="0">Aluno</MenuItem>
                        <MenuItem value="1">Professor</MenuItem>
                        <MenuItem value="2">Coordenador</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </FullCard>

                <ButtonOne
                  description="Editar"
                  color="var(--green)"
                  type="submit"
                />

              </Form>
            )}
          </Formik>
        </>
      }
    </Sidebar>
  )
}