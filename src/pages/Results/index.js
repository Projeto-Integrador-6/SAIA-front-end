import React from "react";

import Sidebar from '../../components/Sidebar'
import TripleBox from '../../components/TripleBox'
import PageTitle from '../../components/PageTitle'

import './index.css';

export default function Results() {
    return (
        <Sidebar>
            <div className="results-container">
                <PageTitle title="RESULTADOS DE AVALIAÇÃO: COMANDOS BÁSICOS DE SQL"/>
                <div className="side-general-result">
                    <p className="title">RESUMO</p>
                    <TripleBox
                    firstTitle="PERCENTUAL DE ACERTO"
                    firstContent="70%"
                    firstContentColor="var(--green)"
                    secondTitle="PERCENTUAL DE ERROS"
                    secondContent="30%"
                    secondContentColor="var(--red)"
                    thirdTitle="DESEMPENHO GERAL"
                    thirdContent="BOM"
                    thirdContentColor="var(--green)"> 
                    </TripleBox>
                </div>
            </div>
        </Sidebar>
    )
}