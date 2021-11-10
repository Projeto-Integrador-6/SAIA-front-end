import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormControl, MenuItem, TextField } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

import api from '../../services/api'

export default function EditEnforcement() {

    const [values, setValues] = useState({
        "dataInicio" : new Date(),
	    "dataFim": new Date(),
        "nome" : "Aplicação de Teste 02"
    })

    function handleChange(name,value){
        setValues((prevState) => ({
            ...prevState,
            [name] : value
        }))
    };
    
    
    // const [subjects, setSubjects] = useState([])

    const [educationalTests, setEducationalTests] = useState([])

    useEffect(() => {
        document.title = `SAIA - Criando Aplicação`

        setTimeout(async () => {
            // const subjectsResponse = await apiExternal.get(`/disciplines`)
            // setSubjects(subjectsResponse.data)

            const educationalTestResponse = await api.get(`/avaliacao`)
            setEducationalTests(educationalTestResponse.data)
        }, 500)
    }, [])

    async function create(values) {

        await api.post(`/aplicacao`, {...values})
    }

    return (
        <Sidebar>
            <Link to='/manager/enforcement'>
                <Icon icon={<KeyboardReturnIcon/>}></Icon>
            </Link>
            <PageTitle title="Criando Aplicação" />
            <form onSubmit={async () => create(values)}>
                <div className="enforcement-data-div">
                    <FullCard title="Dados da Aplicação">
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Avaliação" select>
                                {educationalTests.map((option) => (
                                    <MenuItem key={option.idAvaliacao} name="nome" value={option.nome} onClick={() => handleChange("idAvaliacao", option.idAvaliacao)}>
                                        {option.nome}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        {/* <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField className="enforcement-select" label="Disciplina" select >
                                {subjects.map((option) => (
                                    <MenuItem key={option.idDisciplina} value={option.nome} onClick={() => handleChange("idDisciplina", option.idDisciplina)}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl> */}
                        <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                            <TextField 
                                id="enforcement-value" 
                                className="enforcement-select" 
                                type="number" 
                                label="Valor" 
                                variant="outlined" 
                                onChange={() => handleChange("valor", document.querySelector("#enforcement-value").value)}/>
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