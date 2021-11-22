import React, { useEffect, useState, useContext } from "react";
import { DataGrid, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import { ButtonTwo, Icon } from "../../components/Button";
import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import DataGridContainer from "../../components/DataGridContainer";

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css';

export default function Questions() {
  const { user } = useContext(AuthContext);

  const [questoes, setQuestoes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Questões`

    setTimeout(async () => {
      const response = await api.get(`/questao/user/${user.idUsuario}`);
      setQuestoes(response.data.result);

      setLoading(false);
    }, 500)

  }, [user.idUsuario])

  const columns = [
    {
      field: 'nome',
      headerName: 'Questão',
      flex: 1
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (question) => {
        return (
          <>
            <Link to={`questions/update/${question.row.idQuestao}`}>
              <Icon icon={<CreateIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Questões" />

      <div className="educational-test-nav">
        <ListCard content={
          <Link to="questions/create">
            <ButtonTwo icon={<AddIcon />} name="Criar Questão" />
          </Link>
        } />
      </div>

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idQuestao}
          autoHeight={true}
          rows={questoes}
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