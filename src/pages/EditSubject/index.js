import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { TextField } from "@mui/material";
import { Formik, Form } from 'formik';

import LoadingProgress from "../../components/LoadingProgress";
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api'

export default function CreateSubject() {

    const { setSnack } = useContext(SnackContext);

    let { id } = useParams();

    const [subject, setSubject] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `SAIA - Criando Disciplina`

        setTimeout(async () => {
            const subjectResponse = await api.get(`/disciplina/${id}`)
            setSubject(subjectResponse.data)

            setLoading(false);
        }, 500)
    }, [id])

    async function edit(values) {

        try {
            await api.put(`/disciplina/${subject.idDisciplina}`, { ...values })
            setSnack({ message: "Disciplina atualizada com sucesso.", type: 'success', open: true });
            history.push("/manager/subjects")
        } catch (err) {
            setSnack({ message: err.response.data.message, type: 'error', open: true })
        }
    }

    return (
        <Sidebar>
            {loading ?
                <LoadingProgress />
                :
                <>
                    <PageTitle title="Editando Disciplina" backLink="/manager/subjects" />
                    <Formik
                        initialValues={{
                            nome: subject.nome
                        }}
                        onSubmit={async (values) => {
                            edit(values);
                        }}
                    >
                        {({ values, handleChange }) => (
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