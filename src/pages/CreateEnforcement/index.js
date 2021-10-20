import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import { FormControl, MenuItem, TextField } from '@mui/material';

import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne } from '../../components/Button';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

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
                <div className="enforcement-data">
                    <FullCard title="Dados da Aplicação">
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="" label="Avaliação" select helperText="Selecione a avaliação desejada">
                                {educationalTest.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="" label="Disciplina" select helperText="Selecione a disciplina desejada">
                                {subjects.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField id="" type="number" label="Valor" variant="outlined" helperText="Selecione o valor da aplicação desejado" />
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