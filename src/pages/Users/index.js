import React, { useEffect, useState } from "react";
import { GridOverlay, DataGrid, ptBR } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import LoadingProgress from "../../components/LoadingProgress";
import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { Icon, ButtonTwo } from "../../components/Button";

import api from '../../services/api';

import './index.css';

export default function Users() {

  const [usuarios, setUsuarios] = useState([])

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Usuários`

    setTimeout(async () => {
      const response = await api.get(`/usuario`)
      setUsuarios(response.data.result);

      setLoading(false);
    }, 500)

  }, [])

    // TIPOS DE USUÁRIO
    function type(value){
      let types = ['Aluno', 'Professor', 'Coordenador'];
  
      return types[value];
    }

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
      field: 'tipoUsuario',
      headerName: 'Categoria',
      minWidth: 150,
      flex: 1,
      renderCell: (category) => {
        return (
          type(category.row.tipoUsuario)
        )
      }
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (user) => {
        return (
          <>
            <Link to={`users/update/${user.row.idUsuario}`}>
              <Icon icon={<CreateIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

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
          loading={loading}
        />
      </DataGridContainer>
    </Sidebar>
  )
}