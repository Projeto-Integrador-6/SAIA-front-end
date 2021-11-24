import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridToolbarFilterButton, ptBR } from '@mui/x-data-grid';
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
      const response = await api.get(`/aplicacao/disciplina/${user.idUsuario}?date=${formatDateUS(new Date())}`)
      setAplicacao(response.data.result);

      setLoading(false);
    }, 500)

  }, [user.idUsuario])

  function formatDateUS(date) {
    var d = new Date(date);
    d = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = d.getFullYear();

    return [year, month, day].join('-') + " " + ['23', '59'].join(':');
  }

  function formatDateDayFrist(date) {
    var d = new Date(date);
    var h = new Date(date)
    d = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = d.getFullYear();

    var hours = h.getHours();
    var minutes = h.getMinutes();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('/') + " " + [hours, minutes].join(':');
  }

  function verifyStatus(value) {
    if (value === 0) {
      return 'Não'
    }

    if (value === 1) {
      return 'Sim'
    }
  }

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
      flex: 1,
      renderCell: (discipline) => {
        return (
          discipline.row.disciplina.nome
        )
      }
    },
    {
      field: 'dataInicio',
      headerName: 'Início',
      minWidth: 150,
      flex: 1,
      renderCell: (date) => {
        return (
          formatDateDayFrist(date.row.dataInicio)
        )
      }
    },
    {
      field: 'dataFim',
      headerName: 'Fim',
      minWidth: 150,
      flex: 1,
      renderCell: (date) => {
        return (
          formatDateDayFrist(date.row.dataFim)
        )
      }
    },
    {
      field: 'valor',
      headerName: 'Valor',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'participacao',
      headerName: 'Participação',
      minWidth: 150,
      flex: 1,
      renderCell: (status) => {
        return (
          <>
            <p>{verifyStatus(status.row.participacao)}</p>
          </>
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
            {user.row.participacao === 0 ?
              <Link to={`educational_test/open_test/${user.row.idAplicacao}`}>
                <Icon icon={<PlayArrowIcon />} />
              </Link>
              :
              <Icon icon={<PlayArrowIcon />} disabled/>
            }
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
          components={{
            Toolbar: GridToolbarFilterButton,
          }}
        />
      </DataGridContainer>

    </Sidebar>
  )
}