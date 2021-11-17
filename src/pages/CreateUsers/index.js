import React, { useContext, useEffect } from "react";
import { Formik, Form } from 'formik';
import { InputLabel, TextField, Select, MenuItem, FormControl } from "@mui/material";

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonOne } from "../../components/Button";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

export default function CreateUsers() {
  const { setSnack } = useContext(SnackContext);

  useEffect(() => {
    document.title = `SAIA - Criando Usuário`

  }, [])

  async function create(values) {
    try{  
      await api.post(`/usuario`, { ...values });
      setSnack({ message: "Usuário criado com sucesso.", type: 'success', open: true });
      history.push("/manager/users");
    } catch (err) {
      setSnack({ message: err.response.data.error, type: 'error', open: true });
    }
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Usuário" />

      <Formik
        initialValues={{
          nome: '',
          email: '',
          tipoUsuario: '',
          password: ''
        }}
        onSubmit={async (values) => {
          create(values);
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
              description="Criar"
              color="var(--green)"
              type="submit"
            />

          </Form>
        )}
      </Formik>
    </Sidebar>
  )
}