import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

import api from '../../services/api'

export default function CreateSubject() {

    const [values, setValues] = useState({
        "dataInicio": new Date(),
        "dataFim": new Date(),
        "nome": "Aplicação de Teste 02"
    })

    function handleChange(name, value) {
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    // const [subjects, setSubjects] = useState([])

    const [educationalTests, setEducationalTests] = useState([])

    useEffect(() => {
        document.title = `SAIA - Criando Disciplina`

        setTimeout(async () => {

        }, 500)
    }, [])

    async function create(values) {

        await api.post(`/disciplina`, { ...values })
    }

    return (
        <Sidebar>
            <PageTitle title="Criando Disciplina" backLink="manager/subjects" />
            <form onSubmit={async () => create(values)}>
                <div className="enforcement-data-div">
                    <FullCard title="Dados da Disciplina">
                        <div className="input-block">
                            <TextField
                                label="Nome"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange}
                                type="text"
                                placeholder="Digite o nome da disciplina"
                                fullWidth
                                multiline
                                rows={2}
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
            </form>
        </Sidebar>
    )
}