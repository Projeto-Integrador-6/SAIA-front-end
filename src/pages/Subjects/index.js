import React from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { ButtonTwo } from "../../components/Button";

import './index.css';

export default function Subjects() {

  const columns = [
    {
      field: 'nome',
      headerName: 'Nome',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150
    }
  ];

  const rows = [
    { id: 1, nome: 'Algoritmos I' },
    { id: 2, nome: 'Banco de Dados I' },
    { id: 3, nome: 'Banco de Dados II' },
    { id: 4, nome: 'Desenvolvimento de Sistemas' },
    { id: 5, nome: 'Estruturas de Dados' },
  ];


  return (
    <Sidebar>
      <PageTitle title="Disciplinas" />

      <ListCard content={
        <div className="educational-test-nav-buttons">
          <Link to="manager/subjects/create">
            <ButtonTwo icon={<AddIcon />} name="Nova Disciplina"/>
          </Link>
        </div>
      } />

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