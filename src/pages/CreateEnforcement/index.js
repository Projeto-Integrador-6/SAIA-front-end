import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormControl, MenuItem, TextField } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

import apiExternal from '../../services/external'
import api from '../../services/api'

export default function CreateEnforcement() {

    const [subjects, setSubjects] = useState([])

    const [educationalTest, setEducationalTest] = useState([])

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`

        setTimeout(async () => {
            const subjectsResponse = await apiExternal.get(`/disciplines`)
            setSubjects(subjectsResponse.data)

            const educationalTestResponse = await api.get(`/avaliacao`)
            setEducationalTest(educationalTestResponse.data)
        }, 0)
    }, [])

    return (
        <Sidebar>
            <Link to='/manager/enforcement'>
                <Icon icon={<KeyboardReturnIcon/>}></Icon>
            </Link>
            <PageTitle title="Criando Aplicação" />
            <form>
                <div className="enforcement-data-div">
                    <FullCard title="Dados da Aplicação">
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Avaliação" select>
                                {educationalTest.map((option) => (
                                    <MenuItem key={option.id} value={option.nome}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Disciplina" select >
                                {subjects.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" type="number" label="Valor" variant="outlined" />
                        </FormControl>
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