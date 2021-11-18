import React, { useContext, useEffect, useState } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { Icon } from "../../components/Button";
import DataGridContainer from "../../components/DataGridContainer";

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css';

export default function EducationalTest() {
  const { user } = useContext(AuthContext);

  const [aplicacao, setAplicacao] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Avaliações`

    setTimeout(async () => {
      const response = await api.get(`/aplicacao/disciplina/${user.idUsuario}`)
      setAplicacao(response.data.result);

      setLoading(false);
    }, 500)

  }, [])

  const columns = [
    {
      field: 'nome',
      headerName: 'Avaliação',
      width: 350

    },
    {
      field: 'disciplina',
      headerName: 'Disciplina',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'dataInicio',
      headerName: 'Início',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'dataFim',
      headerName: 'Fim',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'valor',
      headerName: 'Valor',
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
            <Link to={`educational_test/open_test/${user.row.idAplicacao}`}>
              <Icon icon={<PlayArrowIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idAplicacao}
          autoHeight={true}
          rows={aplicacao}
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