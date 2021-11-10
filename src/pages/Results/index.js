import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FormControl, MenuItem, TextField } from '@mui/material';

import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

import Sidebar from '../../components/Sidebar'
import TripleBox from '../../components/TripleBox'
import PageTitle from '../../components/PageTitle'
import Box from '../../components/Box'
import { Icon } from '../../components/Button';

import './index.css';

let enforcements = [
    {
        value: 0,
        label: "Avaliação de Algoritmos - 15/04",
        resume : {
            hitPercentage: 70,
            errorPercentage: 30,
            performance: "BOM"
        },
        barChartData: [
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
            }
        ],
        lineChartData: [
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
        ],
        radarChartData: [
            {
                "Conteúdo": "Estrutura de Repetição",
                "Porcentagem": 92
            },
            {
                "Conteúdo": "Funções de Ordenação",
                "Porcentagem": 35
            },
            {
                "Conteúdo": "Estruturas Condicionais",
                "Porcentagem": 78
            }
        ]
    },
    {
        value: 1,
        label: "Avaliação de Comandos Básicos SQL - 17/10",
        resume : {
            hitPercentage: 60,
            errorPercentage: 40,
            performance: "REGULAR"
        },
        barChartData: [
            {
                name: 'Questão 1',
                Acertos: 10,
                Erros: 26
            },
            {
                name: 'Questão 2',
                Acertos: 16,
                Erros: 20
            },
            {
                name: 'Questão 3',
                Acertos: 15,
                Erros: 21
            },
            {
                name: 'Questão 4',
                Acertos: 18,
                Erros: 17,
            },
            {
                name: 'Questão 5',
                Acertos: 12,
                Erros: 24
            }
        ],
        lineChartData: [
            {
                name: 'Questão 1',
                "Alternativa A": 5,
                "Alternativa B": 5,
                "Alternativa C": 14,
                "Alternativa D": 11
            },
            {
                name: 'Questão 2',
                "Alternativa A": 10,
                "Alternativa B": 8,
                "Alternativa C": 11,
                "Alternativa D": 6
            },
            {
                name: 'Questão 3',
                "Alternativa A": 7,
                "Alternativa B": 7,
                "Alternativa C": 8,
                "Alternativa D": 12
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
        ],
        radarChartData: [
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
    }
]

export default function Results() {

    useEffect(() => {
        document.title = `SAIA - Análise por Avaliação`
    })

    const [selectedEnforcement, setSelectedEnforcement] = useState(0);

    return (
        <Sidebar>
            {/* <div className="div-filters">
                <FormControl required={true} sx={{ m: 1, minWidth: 120 }}>
                    <TextField className="enforcement-select" label="Avaliação" select>
                        {enforcements.map((option) => (
                            <MenuItem key={option.value} value={option.value} onClick={() => setSelectedEnforcement(option.value)}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </div> */}
            <Link to='/manager/enforcement'>
                <Icon icon={<KeyboardReturnIcon/>}></Icon>
            </Link>
            <div >
                <PageTitle title={enforcements[selectedEnforcement].label} />
                <div className="results-resume">
                    <p className="title">RESUMO</p>
                    <TripleBox
                        firstTitle="PERCENTUAL DE ACERTO"
                        firstContent={`${enforcements[selectedEnforcement].resume.hitPercentage}%`}
                        firstContentColor="var(--green)"
                        secondTitle="PERCENTUAL DE ERROS"
                        secondContent={`${enforcements[selectedEnforcement].resume.errorPercentage}%`}
                        secondContentColor="var(--red)"
                        thirdTitle="DESEMPENHO GERAL"
                        thirdContent={enforcements[selectedEnforcement].resume.performance}
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
                                data={enforcements[selectedEnforcement].barChartData}
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
                            <LineChart width={730} height={250} data={enforcements[selectedEnforcement].lineChartData}
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
                            <RadarChart outerRadius={90} width={730} height={250} data={enforcements[selectedEnforcement].radarChartData}
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
            </div>
        </Sidebar>
    )
}
