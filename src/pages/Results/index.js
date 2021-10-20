import React, { useEffect } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Sidebar from '../../components/Sidebar'
import TripleBox from '../../components/TripleBox'
import PageTitle from '../../components/PageTitle'
import Box from '../../components/Box'

import './index.css';

const data = [
    {
        name: 'Questão 1',
        Acertos: 18,
        Erros: 18
    },
    {
        name: 'Questão 2',
        Acertos: 20,
        Erros: 16
    },
    {
        name: 'Questão 3',
        Acertos: 21,
        Erros: 15
    },
    {
        name: 'Questão 4',
        Acertos: 17,
        Erros: 18,
    },
    {
        name: 'Questão 5',
        Acertos: 30,
        Erros: 6
    },
];

export default function Results() {

    useEffect(() => {
        document.title = `SAIA - Resultados de Avaliação`
    })

    return (
        <Sidebar>
            <div className="results-container">
                <PageTitle title="RESULTADOS DE AVALIAÇÃO: COMANDOS BÁSICOS DE SQL" />
                <div className="results-resume">
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
                <div className="results-chart">
                    <p className="title">GRÁFICO DE DESEMPENHO POR QUESTÃO</p>
                    <div className="chart-container">
                        <ResponsiveContainer width="95%" height={400} style={{margin : "auto"}}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 60,
                                    right: 60,
                                    left: 30,
                                    bottom: 60,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend iconType="circle" />
                                <Bar dataKey="Erros" stackId="a" fill="var(--wrong-answer)" />
                                <Bar dataKey="Acertos" stackId="a" fill="var(--right-answer)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                    <p className="title">OUTROS</p>
                    <div className="boxes-container">
                        <Box title="VISUALIZAR RESPOSTA POR ALUNO" link="/avaliacoes" />
                        <Box title="CRUZAR DADOS COM OUTRA AVALIAÇÃO" link="/alunos" />
                        <Box title="VISUALIZAR AVALIAÇÃO" link="/teste" />
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
