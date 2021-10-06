import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import ListCard from '../../components/ListCard';
import { Link } from 'react-router-dom';
import { BiPlus, BiFileBlank, BiCog } from 'react-icons/bi';

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
                            <button><BiPlus />Criar Questão</button>
                        </Link>
                    </div>
                } />
            </div>
            <div className="educational-test-list">
                <ListCard content="Aplicação de Algoritmos"
                    buttons={
                        <div className="educational-test-list-buttons">
                            <button><BiFileBlank />Visualizar</button>
                            <button><BiCog />Configurações</button>
                        </div>
                    } />
            </div>
        </Sidebar>
    )
}