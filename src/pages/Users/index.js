import React, { useEffect, useState } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { Icon, ButtonTwo } from "../../components/Button";

import api from '../../services/api';

import './index.css';

export default function Users() {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    document.title = `SAIA - Usuários`

    setTimeout(async () => {
      const response = await api.get(`/usuario`)
      setUsuarios(response.data);
    }, 500)

  }, [])

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
      minWidth: 150,
      renderCell: (user) => {
        return (
          <>
            <Link to="">
              <Icon icon={<CreateIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Usuários" />

      <ListCard content={
        <Link to="users/create">
          <ButtonTwo icon={<AddIcon />} name="Novo Usuário" />
        </Link>
      } />

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idUsuario}
          autoHeight={true}
          rows={usuarios}
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