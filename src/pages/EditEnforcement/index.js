import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FormControl, MenuItem, TextField, Select, InputLabel } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import LoadingProgress from "../../components/LoadingProgress";

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

import api from '../../services/api'

export default function EditEnforcement() {

    let { id } = useParams();

    const [values, setValues] = useState({
        "dataInicio": new Date(),
        "dataFim": new Date(),
        "nome": "Aplicação de Teste 02"
    })

    const [educationalTests, setEducationalTests] = useState([])
    const [enforcement, setEnforcement] = useState({})
    const [loading, setLoading] = useState(true);

    function handleChange(name, value) {
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`

        setTimeout(async () => {
            const enforcementResponse = await api.get(`/aplicacao/${id}`)
            setEnforcement(enforcementResponse.data)

            const educationalTestResponse = await api.get(`/avaliacao`)
            setEducationalTests(educationalTestResponse.data)

            setLoading(false);
        }, 500)
    }, [])

    async function edit(values) {

        await api.put(`/aplicacao`, { ...values })
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
                    <form onSubmit={async () => edit(values)}>
                        <div className="enforcement-data-div">
                            <FullCard title="Dados da Aplicação">
                                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="educational-test-label">Avaliação</InputLabel>
                                    <Select className="enforcement-select" label="Avaliação" labelId="educational-test-label">
                                        {educationalTests.map((option) => (
                                            <MenuItem key={option.idAvaliacao} value={option.nome} onClick={() => handleChange("idAvaliacao", option.idAvaliacao)}>
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
                                        defaultValue={enforcement.valor}
                                    />
                                </FormControl>
                            </FullCard>
                        </div>
                        <ButtonOne
                            description="Criar"
                            color="var(--green)"
                            width="200px"
                            type="submit"
                            onClick={() => handleChange("valor", document.querySelector("#enforcement-value").value)}
                        />
                    </form>
                </>
            }
        </Sidebar>
    )
}