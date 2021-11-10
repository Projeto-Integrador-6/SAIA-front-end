import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import ListCard from '../../components/ListCard';
import { ButtonTwo } from '../../components/Button';

import api from "../../services/api"

export default function Enforcement() {

    const [enforcements, setEnforcements] = useState([])

    useEffect(() => {
        document.title = `SAIA - Aplicações`

        setTimeout(async () => {
            const response = await api.get(`/aplicacao`)
            setEnforcements(response.data)
        }, 0)
    }, [])

    return (
        <Sidebar>
            <PageTitle title="Aplicações" />
            <div className="educational-test-nav">
                <ListCard content={
                    <div className="educational-test-nav-buttons">
                        <Link to="enforcement/create">
                            <ButtonTwo icon={<AddIcon />} name="Criar Aplicação" />
                        </Link>
                    </div>
                } />
            </div>
            <div className="educational-test-list">
                {enforcements.map((enforcement) => (
                    <ListCard content={enforcement.nome}
                        buttons={
                            <div className="educational-test-list-buttons">
                                <Link to={`/manager/educational_test/results/${enforcement.idAplicacao}`}>
                                    <ButtonTwo icon={<ShowChartIcon />} name="Resultados" />
                                </Link>
                                <Link to={`/manager/educational_test/${enforcement.idAvaliacao}`}>
                                    <ButtonTwo icon={<RemoveRedEyeIcon />} name="Visualizar" />
                                </Link>
                                <Link to={`/manager/enforcement/edit/${enforcement.idAplicacao}`}>
                                    <ButtonTwo icon={<CreateIcon />} name="Editar" />
                                </Link>
                            </div>
                        } />
                ))
                }
            </div>
        </Sidebar>
    )
}