import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import {ButtonOne} from '../../components/Button';

export default function CreateEnforcement() {

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`
    })

    const [test, setTest] = React.useState('');
    const [subject, setSubject] = React.useState('');

    const handleTestChange = (event) => {
        setTest(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };


    return (
        <Sidebar>
            <PageTitle title="Criando Aplicação" />
            <form>
            <div className="enforcement-data">
                <FullCard title="Dados da Aplicação">
                    <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="">Avaliação</InputLabel>
                        <Select
                            labelId=""
                            id=""
                            value={test}
                            onChange={handleTestChange}
                        >
                            <MenuItem value="Avaliação de Algoritmos">Avaliação de Algoritmos</MenuItem>
                            <MenuItem value="Avaliação de Banco de Dados II">Avaliação de Banco de Dados II</MenuItem>
                            <MenuItem value="Avaliação de Desenvolvimento Web">Avaliação de Desenvolvimento Web</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="">Disciplina</InputLabel>
                        <Select
                            labelId=""
                            id=""
                            value={subject}
                            onChange={handleSubjectChange}
                        >
                            <MenuItem value="Algoritmos">Algoritmos</MenuItem>
                            <MenuItem value="Banco de Dados II">Banco de Dados II</MenuItem>
                            <MenuItem value="Desenvolvimento Web">Desenvolvimento Web</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField id="" type="number" label="Valor" variant="outlined" />
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