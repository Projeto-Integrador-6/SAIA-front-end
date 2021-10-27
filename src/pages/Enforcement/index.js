import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import ListCard from '../../components/ListCard';
import { ButtonTwo } from '../../components/Button';


export default function Enforcement() {

    useEffect(() => {
        document.title = `SAIA - Aplicações`
    })

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
                <ListCard content="Aplicação de Algoritmos"
                    buttons={
                        <div className="educational-test-list-buttons">
                            <Link to="/manager/educational_test/results">
                                <ButtonTwo icon={<ShowChartIcon />} name="Resultados" />
                            </Link>
                            <ButtonTwo icon={<RemoveRedEyeIcon />} name="Visualizar" />
                            <ButtonTwo icon={<CreateIcon />} name="Editar" />
                        </div>
                    } />
            </div>
        </Sidebar>
    )
}