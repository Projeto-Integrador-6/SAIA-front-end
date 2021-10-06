import React, { useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import ListCard from '../../components/ListCard';
import { Link } from 'react-router-dom';
import { BiPlus, BiFileBlank, BiCog } from 'react-icons/bi';
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
                            <ButtonTwo icon={<BiPlus/>} name="Criar Aplicação"/>
                        </Link>
                    </div>
                } />
            </div>
            <div className="educational-test-list">
                <ListCard content="Aplicação de Algoritmos"
                    buttons={
                        <div className="educational-test-list-buttons">
                            <ButtonTwo icon={<BiFileBlank/>} name="Visualizar"/>
                            <ButtonTwo icon={<BiCog/>} name="Configurações"/>
                        </div>
                    } />
            </div>
        </Sidebar>
    )
}