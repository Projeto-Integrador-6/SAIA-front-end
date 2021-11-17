import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FormControl, MenuItem, TextField, Select, InputLabel } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Formik, Form } from 'formik';

import LoadingProgress from "../../components/LoadingProgress";

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`

        setTimeout(async () => {
            const enforcementResponse = await api.get(`/aplicacao/${id}`)
            setEnforcement(enforcementResponse.data.aplicacao)

            const educationalTestResponse = await api.get(`/avaliacao/user/${user.idUsuario}`)
            setEducationalTests(educationalTestResponse.data.result)

            setLoading(false);
        }, 500)
    }, [])

    async function edit(values) {
        try {
            await api.put(`/aplicacao/${enforcement.idAplicacao}`, { ...values })
            setSnack({ message: "Aplicação atualizada com sucesso.", type: 'success', open: true });
            history.push("/manager/enforcement")

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
                            idAvaliacao: enforcement.idAvaliacao
                        }}
                        onSubmit={async (values) => {
                            edit(values);
                        }}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                <div className="enforcement-data-div">
                                    <FullCard title="Dados da Aplicação">
                                        <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="educational-test-label">Avaliação</InputLabel>
                                            <Select
                                                className="enforcement-select"
                                                label="Avaliação"
                                                labelId="educational-test-label"
                                                name="idAvaliacao"
                                                onChange={handleChange}
                                                value={values.idAvaliacao}
                                                disabled
                                            >
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
                                                value={values.valor}
                                            />
                                        </FormControl>
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
                </>
            }
        </Sidebar>
    )
}