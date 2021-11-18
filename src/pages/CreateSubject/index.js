import React, { useContext, useEffect, useState } from 'react';

import { TextField } from "@mui/material";
import { Formik, Form } from 'formik';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api'

export default function CreateSubject() {

    const { setSnack } = useContext(SnackContext);

    useEffect(() => {
        document.title = `SAIA - Criando Disciplina`

        setTimeout(async () => {

        }, 500)
    }, [])

    async function create(values) {

        try {
        await api.post(`/disciplina`, { ...values })
        setSnack({ message: "Disciplina criada com sucesso.", type: 'success', open: true });
            history.push("/manager/subjects")
        } catch (err) {
            setSnack({ message: err.response.data.message, type: 'error', open: true })
        }
    }

    return (
        <Sidebar>
            <PageTitle title="Criando Disciplina" backLink="manager/subjects" />
            <Formik
                initialValues={{
                    nome: '',
                }}
                onSubmit={async (values) => {
                    create(values);
                }}
            >
                {({ values, handleChange}) => (
                    <Form >
                        <div className="enforcement-data-div">
                            <FullCard title="Dados da Disciplina">
                                <div className="input-block">
                                    <TextField
                                        label="Disciplina"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Digite o nome da disciplina"
                                        fullWidth
                                    />
                                </div>
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
        </Sidebar>
    )
}