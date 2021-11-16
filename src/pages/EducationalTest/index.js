import React, { useEffect } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonTwo } from "../../components/Button";
import DataGridContainer from "../../components/DataGridContainer";

import './index.css';

export default function EducationalTest() {

  useEffect(() => {
    document.title = `SAIA - Avaliações`
  })

  const columns = [
    {
      title: 'Avaliação',
      dataIndex: 'avaliacao',
      id: 'avaliacao'
    },
    {
      title: 'Disciplina',
      dataIndex: 'disciplina',
      id: 'disciplina'
    },
    {
      title: 'Início',
      dataIndex: 'inicio',
      id: 'inicio'
    },
    {
      title: 'Fim',
      dataIndex: 'fim',
      id: 'fim'
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      id: 'valor'
    }
  ];

  const rows = [
    {
      id: '1',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      id: '2',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      id: '3',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      id: '4',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      id: '5',
      avaliacao: 'Avaliação de Algoritmos',
      disciplina: 'Algoritmos',
      inicio: '31/10/2021 09:00',
      fim: '31/10/2021 09:00',
      valor: '10 pontos'
    },
    {
      id: '6',
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

        <DataGridContainer>
          <DataGrid
            autoHeight={true}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            hideFooterSelectedRowCount={true}
            selectionModel={false}
          />
        </DataGridContainer>

    </Sidebar>
  )
}