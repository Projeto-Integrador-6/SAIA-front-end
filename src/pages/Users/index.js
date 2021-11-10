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

export default function Users() {

  const columns = [
    {
      field: 'nome',
      headerName: 'Nome',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'email',
      headerName: 'E-mail',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
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
    { id: 1, nome: 'Snow', email: 'Jon@gmail.com', categoria: 'Aluno' },
    { id: 2, nome: 'Snow', email: 'Jon@gmail.com', categoria: 'Aluno' },
    { id: 3, nome: 'Snow', email: 'Jon@gmail.com', categoria: 'Aluno' },
    { id: 4, nome: 'Snow', email: 'Jon@gmail.com', categoria: 'Professor' },
    { id: 5, nome: 'Snow', email: 'Jon@gmail.com', categoria: 'Aluno' },
  ];


  return (
    <Sidebar>
      <PageTitle title="Usuários" />

      <ListCard content={
        <div className="educational-test-nav-buttons">
          <Link to="educational_test/create">
            <ButtonTwo icon={<AddIcon />} name="Novo Usuário" />
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