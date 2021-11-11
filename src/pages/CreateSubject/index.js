import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Textarea } from "../../components/Input";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import FullCard from '../../components/FullCard';
import { ButtonOne, Icon } from '../../components/Button';

import api from '../../services/api'

export default function CreateSubject() {

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
        document.title = `SAIA - Criando Disciplina`

        setTimeout(async () => {
            
        }, 500)
    }, [])

    async function create(values) {

        await api.post(`/disciplina`, {...values})
    }

    return (
        <Sidebar>
            <Link to='/manager/subjects'>
                <Icon icon={<KeyboardReturnIcon/>}></Icon>
            </Link>
            <PageTitle title="Criando Disciplina" />
            <form onSubmit={async () => create(values)}>
                <div className="enforcement-data-div">
                    <FullCard title="Dados da Disciplina">
                        <Textarea
                        label="Nome"
                        name="nome"
                        values={values.nome}
                        onChange={handleChange}
                        type="text"
                        placeholder="Digite o nome da disciplina">
                        </Textarea>
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