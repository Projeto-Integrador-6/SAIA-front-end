import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import ListCard from '../../components/ListCard';
import { ButtonTwo, Icon } from '../../components/Button';
import DataGridContainer from "../../components/DataGridContainer";
import MenuDropDown from "../../components/MenuDropDown";

import { AuthContext } from '../../contexts/AuthContext';
import api from "../../services/api"

export default function Enforcement() {

  const { user } = useContext(AuthContext);
  const [enforcements, setEnforcements] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Aplicações`

    setTimeout(async () => {
      const response = await api.get(`/aplicacao/user/${user.idUsuario}`)
      setEnforcements(response.data.result);

      setLoading(false);
    }, 500)
  }, [user.idUsuario])

  const columns = [
    {
      field: 'nome',
      headerName: 'Aplicação',
      flex: 1
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (enforcement) => {
        return (
          <>
            <Link to={`enforcement/update/${enforcement.row.idAplicacao}`}>
              <Icon icon={<CreateIcon />} />
            </Link>

            <MenuDropDown
              icon={<ShowChartIcon />}
              buttons={[
                { nome: 'Resultados gerais', link: `enforcement/results/${enforcement.row.idAplicacao}` },
                { nome: 'Resultados individuais', link: `enforcement/individual_results/${enforcement.row.idAplicacao}` }
              ]}
            />
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Aplicações" />
      <div className="educational-test-nav">
        <ListCard content={
          <Link to="enforcement/create">
            <ButtonTwo icon={<AddIcon />} name="Criar Aplicação" />
          </Link>
        } />
      </div>

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idAplicacao}
          autoHeight={true}
          rows={enforcements}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          hideFooterSelectedRowCount={true}
          selectionModel={false}
          loading={loading}
          components={{
            Toolbar: GridToolbarFilterButton,
          }}
        />
      </DataGridContainer>

    </Sidebar>
  )
}