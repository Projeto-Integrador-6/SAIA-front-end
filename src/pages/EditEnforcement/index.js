import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { MenuItem, TextField } from '@mui/material';
import { Formik, Form } from 'formik';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import LoadingProgress from "../../components/LoadingProgress";

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api'

export default function EditEnforcement() {

  const { user } = useContext(AuthContext);
  const { setSnack } = useContext(SnackContext);

  let { id } = useParams();

  const [educationalTests, setEducationalTests] = useState([])
  const [enforcement, setEnforcement] = useState({})
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Criando Aplicação`

    setTimeout(async () => {
      const enforcementResponse = await api.get(`/aplicacao/${id}`)
      setEnforcement(enforcementResponse.data.aplicacao)

      const educationalTestResponse = await api.get(`/avaliacao/user/${user.idUsuario}`)
      setEducationalTests(educationalTestResponse.data.result)

      const subjectsResponse = await api.get(`/disciplina`)
      setSubjects(subjectsResponse.data)

      setLoading(false);
    }, 500)
  }, [id, user.idUsuario])

  async function edit(values) {
    try {
      await api.put(`/aplicacao/${enforcement.idAplicacao}`, { ...values })
      setSnack({ message: "Aplicação atualizada com sucesso.", type: 'success', open: true });
      history.push("/manager/enforcement")

    } catch (err) {
      setSnack({ message: err.response.data.error, type: 'error', open: true });
    }
  }

<<<<<<< HEAD
    return (
        <Sidebar>
            {loading ?
                <LoadingProgress />
                :
                <>
                    <PageTitle title="Editando Aplicação" backLink="/manager/enforcement"/>
                    <Formik
                        initialValues={{
                            dataInicio: enforcement.dataInicio,
                            dataFim: enforcement.dataFim,
                            nome: enforcement.nome,
                            valor: enforcement.valor,
                            idAvaliacao: enforcement.idAvaliacao,
                            idDisciplina: enforcement.idDisciplina
                        }}
                        onSubmit={async (values) => {
                            edit(values);
                        }}
||||||| 6ab3789
    return (
        <Sidebar>
            {loading ?
                <LoadingProgress />
                :
                <>
                    <Link to='/manager/enforcement'>
                        <Icon icon={<KeyboardReturnIcon />}></Icon>
                    </Link>
                    <PageTitle title="Editando Aplicação" />
                    <Formik
                        initialValues={{
                            dataInicio: enforcement.dataInicio,
                            dataFim: enforcement.dataFim,
                            nome: enforcement.nome,
                            valor: enforcement.valor,
                            idAvaliacao: enforcement.idAvaliacao,
                            idDisciplina: enforcement.idDisciplina
                        }}
                        onSubmit={async (values) => {
                            edit(values);
                        }}
=======
  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title="Editando Aplicação" backLink="/manager/enforcement"/>
          <Formik
            initialValues={{
              dataInicio: enforcement.dataInicio,
              dataFim: enforcement.dataFim,
              nome: enforcement.nome,
              valor: enforcement.valor,
              idDisciplina: enforcement.idDisciplina
            }}
            onSubmit={async (values) => {
              edit(values);
            }}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form className="create-enforcement-form">
                <FullCard title="Dados da Aplicação">

                  <div className="input-block">
                    <TextField
                      label="Avaliação"
                      name="idAvaliacao"
                      onChange={handleChange}
                      value={values.idAvaliacao}
                      disabled
                      select
                      fullWidth
>>>>>>> 920e844f985025aa40e80a9bfcf899b8657980c5
                    >
                      {educationalTests.map((option) => (
                        <MenuItem key={option.idAvaliacao} value={option.idAvaliacao}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div className="create-enforcement-form-items-1">
                    <TextField
                      label="Disciplina"
                      name="idDisciplina"
                      onChange={handleChange}
                      value={values.idDisciplina}
                      disabled
                      select
                    >
                      {subjects.map((option) => (
                        <MenuItem key={option.idDisciplina} value={option.idDisciplina}>
                          {option.nome}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      type="number"
                      label="Pontuação"
                      variant="outlined"
                      name="valor"
                      onChange={handleChange}
                      value={values.valor}
                    />
                  </div>

                  <div className="create-enforcement-form-items-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                      <DateTimePicker
                        label="Data Inicio"
                        name="dataInicio"
                        value={values.dataInicio}
                        onChange={value => setFieldValue("dataInicio", value)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
                      <DateTimePicker
                        label="Data Fim"
                        name="dataFim"
                        value={values.dataFim}
                        onChange={value => setFieldValue("dataFim", value)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>

                </FullCard>

                <ButtonOne
                  description="Atualizar"
                  color="var(--green)"
                  width="200px"
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