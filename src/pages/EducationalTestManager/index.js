import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DataGridContainer from "../../components/DataGridContainer";

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonTwo, Icon } from "../../components/Button";

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css';

export default function EducationalTestManager() {
  const { user } = useContext(AuthContext);

  const [avaliacao, setAvaliacao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Avaliações`;

    setTimeout(async () => {
      const response = await api.get(`/avaliacao/user/${user.idUsuario}`);
      setAvaliacao(response.data.result);

      setLoading(false);
    }, 500)

  }, [])

  const columns = [
    {
      field: 'nome',
      headerName: 'Avaliação',
      flex: 1
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (test) => {
        return (
          <>
            <Link to={`educational_test/view/${test.row.idAvaliacao}`}>
              <Icon icon={<RemoveRedEyeIcon />} />
            </Link>
            <Link to={`educational_test/update/${test.row.idAvaliacao}`}>
              <Icon icon={<CreateIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="educational-test-nav">
        <ListCard content={
          <Link to="educational_test/create">
            <ButtonTwo icon={<AddIcon />} name="Criar Avaliação" />
          </Link>
        } />
      </div>

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idAvaliacao}
          autoHeight={true}
          rows={avaliacao}
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