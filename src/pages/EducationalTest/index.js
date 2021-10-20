import React, { useEffect } from "react";
import { Space, Table } from 'antd';
import { Link } from "react-router-dom";

import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonTwo } from "../../components/Button";

import './index.css';

export default function EducationalTest() {

  useEffect(() => {
    document.title = `SAIA - Avaliações`
  })

  const columns = [
    {
      title: 'Avaliação',
      dataIndex: 'avaliacao',
      key: 'avaliacao'
    },
    {
      title: 'Disciplina',
      dataIndex: 'disciplina',
      key: 'disciplina'
    },
    {
      title: 'Início',
      dataIndex: 'inicio',
      key: 'inicio'
    },
    {
      title: 'Fim',
      dataIndex: 'fim',
      key: 'fim'
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor'
    },
    {
      title: 'Ação',
      key: 'acao',
      render: () => (
        <Space size="middle">
          <Link to="/educational_test/test" style={{ textDecoration: 'none'}}>
            <ButtonTwo name="Acessar" />
          </Link>
        </Space>
      ),
    },
  ];

  const rows = [
    {
      key: '1',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      key: '2',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      key: '3',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      key: '4',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      key: '5',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      key: '6',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="educational-test-student-list">
        <Table
          dataSource={rows}
          columns={columns}
        />
      </div>
    </Sidebar>
  )
}