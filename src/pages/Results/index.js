import React, { useEffect } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FormControl, MenuItem, TextField } from '@mui/material';

import Sidebar from '../../components/Sidebar'
import TripleBox from '../../components/TripleBox'
import PageTitle from '../../components/PageTitle'
import Box from '../../components/Box'

import './index.css';

const barChartData = [
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

const lineChartData = [
    {
        name: 'Questão 1',
        "Alternativa A": 10,
        "Alternativa B": 10,
        "Alternativa C": 10,
        "Alternativa D": 5
    },
    {
        name: 'Questão 2',
        "Alternativa A": 12,
        "Alternativa B": 8,
        "Alternativa C": 9,
        "Alternativa D": 6
    },
    {
        name: 'Questão 3',
        "Alternativa A": 7,
        "Alternativa B": 7,
        "Alternativa C": 11,
        "Alternativa D": 10
    },
    {
        name: 'Questão 4',
        "Alternativa A": 8,
        "Alternativa B": 8,
        "Alternativa C": 9,
        "Alternativa D": 10
    },
    {
        name: 'Questão 5',
        "Alternativa A": 2,
        "Alternativa B": 12,
        "Alternativa C": 11,
        "Alternativa D": 11
    }
]

const radarChartData = [
    {
        "Conteúdo": "Comando Select",
        "Porcentagem": 70
    },
    {
        "Conteúdo": "Joins",
        "Porcentagem": 45
    },
    {
        "Conteúdo": "Claúsalas Where",
        "Porcentagem": 60
    },
]

export default function Results() {

    useEffect(() => {
        document.title = `SAIA - Análise por Avaliação`
    })

    return (
        <Sidebar>
            <div >
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
                        <ResponsiveContainer width="95%" height={400} style={{ margin: "auto" }}>
                            <BarChart
                                width={500}
                                height={300}
                                data={barChartData}
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
                    <p className="title">GRÁFICO DE DESEMPENHO POR ALTERNATIVA</p>
                    <div className="chart-container">
                        <ResponsiveContainer width="95%" height={400} style={{ margin: "auto" }}>
                            <LineChart width={730} height={250} data={lineChartData}
                                margin={{ top: 60, right: 60, left: 30, bottom: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="Alternativa A" stroke="#FEA82F" />
                                <Line type="monotone" dataKey="Alternativa B" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="Alternativa C" stroke="#9C95DC" />
                                <Line type="monotone" dataKey="Alternativa D" stroke="#FF2E00" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="title">GRÁFICO DE DESEMPENHO POR ASSUNTO - PERCENTUAL DE ACERTO</p>
                    <div className="chart-container">
                        <ResponsiveContainer width="95%" height={400} style={{ margin: "auto" }}>
                            <RadarChart outerRadius={90} width={730} height={250} data={radarChartData}
                                margin={{ top: 60, right: 60, left: 30, bottom: 60 }}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="Conteúdo" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                <Radar name="Turma A" dataKey="Porcentagem" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
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
