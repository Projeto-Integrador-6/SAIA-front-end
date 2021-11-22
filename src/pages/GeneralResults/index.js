import React, { useContext, useEffect, useState } from 'react';

import { Formik, Form } from 'formik';
import { MenuItem, TextField } from '@mui/material';

import Sidebar from '../../components/Sidebar';
import PageTitle from '../../components/PageTitle';

import { AuthContext } from '../../contexts/AuthContext';

import api from "../../services/api"


export default function GeneralResults() {

    const { user } = useContext(AuthContext);

    const [enforcements, setEnforcements] = useState([]);
    const [enforcement, setEnforcement] = useState("");

    useEffect(() => {
        document.title = `SAIA - Análises Gerais`

        setTimeout(async () => {
            const response = await api.get(`/aplicacao/user/${user.idUsuario}`)
            setEnforcements(response.data.result)
        }, 0)
    }, [])

    return (
        <Sidebar>
            <PageTitle title="Análises Gerais" backLink="/manager/enforcement" />
            <Formik
                initialValues={{
                    enforcement: ""
                }}

                onChange={
                    async (values) => {
                        setEnforcement(values.nome)
                    }
                }
            >
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            className="enforcement-select"
                            label="Aplicações"
                            name="enforcements"
                            onChange={handleChange}
                            select
                        >
                            {enforcements.map((option) => (
                                <MenuItem key={option.idAplicacao} value={option.idAplicacao}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Form>
                )}
            </Formik>
            {
                <p>{enforcement.name}</p>
            }
        </Sidebar>
    )
}
