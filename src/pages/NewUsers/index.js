import React from "react";
import { Formik, Form } from 'formik';
import { InputLabel, TextField, Select, MenuItem, FormControl } from "@mui/material";

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';


export default function NewUsers() {
  return (
    <Sidebar>
      <PageTitle title="Criando Usuário" />

      <FullCard title="Dados do Usuário">
        <Formik
          initialValues={{
            nome: '',
            email: '',
            tipoUsuario: '',
            senha: ''
          }}
          onSubmit={async (values) => {

          }}
        >
          {({ values, handleChange }) => (
            <Form className="create-user-form">
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
                  name="senha"
                  label="Senha"
                  value={values.senha}
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
                  <MenuItem value="1">Aluno</MenuItem>
                  <MenuItem value="2">Professor</MenuItem>
                  <MenuItem value="3">Coordenador</MenuItem>
                </Select>
                </FormControl>
              </div>

            </Form>
          )}
        </Formik>
      </FullCard>
    </Sidebar>
  )
}