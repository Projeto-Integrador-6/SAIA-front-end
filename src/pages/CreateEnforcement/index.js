import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import { FormControl, MenuItem, TextField } from '@mui/material';

import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

export default function CreateEnforcement() {

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`
    })


    let educationalTest = [
        {
            value: "Avaliação de Algoritmos",
            label: "Avaliação de Algoritmos"
        },
        {
            value: "Avaliação de Banco de Dados II",
            label: "Avaliação de Banco de Dados II"
        },
        {
            value: "Avaliação de Desenvolvimento Web",
            label: "Avaliação de Desenvolvimento Web"
        }
    ]

    let subjects = [
        {
            value: "Algoritmos",
            label: "Algoritmos"
        },
        {
            value: "Banco de Dados II",
            label: "Banco de Dados II"
        },
        {
            value: "Desenvolvimento Web",
            label: "Desenvolvimento Web"
        }
    ]


    return (
        <Sidebar>
            <PageTitle title="Criando Aplicação" />
            <form>
                <div className="enforcement-data-div">
                    <FullCard title="Dados da Aplicação">
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Avaliação" select>
                                {educationalTest.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Disciplina" select >
                                {subjects.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
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