import React, { useContext, useEffect, useState } from 'react';

import { FormControl, MenuItem, TextField, Select, InputLabel } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Formik, Form } from 'formik';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api'

export default function CreateEnforcement() {

    const { user } = useContext(AuthContext);
    const { setSnack } = useContext(SnackContext);

    const [educationalTests, setEducationalTests] = useState([])

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`

        setTimeout(async () => {

            const educationalTestResponse = await api.get(`/avaliacao/user/${user.idUsuario}`)
            setEducationalTests(educationalTestResponse.data.result)

        }, 500)
    }, [])

    async function create(values) {

        try {

            let idUsuario = user.idUsuario;

            await api.post(`/aplicacao`, { idUsuario, ...values })

            setSnack({ message: "Aplicação criada com sucesso.", type: 'success', open: true });
            history.push("/manager/enforcement")

        } catch (err) {

            setSnack({ message: err.response.data.error, type: 'error', open: true });

        }
    }

    return (
        <Sidebar>
            <PageTitle title="Criando Aplicação" backLink="/manager/enforcement" />
            <Formik
                initialValues={{
                    dataInicio: new Date(),
                    dataFim: new Date(),
                    nome: '',
                    idAvaliacao: ''
                }}
                onSubmit={async (values) => {
                    create(values);
                }}
            >
                {({ values, handleChange }) => (
                    <Form >
                        <div className="enforcement-data-div">
                            <FullCard title="Dados da Aplicação">
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="educational-test-label">Avaliação</InputLabel>
                                    <Select className="enforcement-select" label="Avaliação" labelId="educational-test-label" name="idAvaliacao" onChange={handleChange}>
                                        {educationalTests.map((option) => (
                                            <MenuItem key={option.idAvaliacao} value={option.idAvaliacao}>
                                                {option.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <TextField
                                        id="enforcement-value"
                                        className="enforcement-select"
                                        type="number"
                                        label="Valor"
                                        variant="outlined"
                                        name="valor"
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Data"
                                        name="dataInicio"
                                        value={values.dataInicio}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </FullCard>
                        </div>
                        <ButtonOne
                            description="Criar"
                            color="var(--green)"
                            width="200px"
                            type="submit"
                        />
                    </Form>
                )}
            </Formik>
        </Sidebar >
    )
}