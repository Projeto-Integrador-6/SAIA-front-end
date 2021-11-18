import React, { useEffect, useState }  from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { Icon, ButtonTwo } from "../../components/Button";

import api from '../../services/api'

import './index.css';

export default function Subjects() {

  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    document.title = `SAIA - Disciplinas`

    setTimeout(async () => {
        const subjectsResponse = await api.get(`/disciplina`)
        setSubjects(subjectsResponse.data)

    }, 0)
}, [])

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
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      minWidth: 150,
      renderCell: (subjects) => {
        return (
          <>
            <Link to={`subjects/edit/${subjects.row.idDisciplina}`}>
              <Icon icon={<CreateIcon />} />
            </Link>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title="Disciplinas" />

      <ListCard content={
        <div className="educational-test-nav-buttons">
          <Link to="/manager/subjects/create">
            <ButtonTwo icon={<AddIcon />} name="Nova Disciplina"/>
          </Link>
        </div>
      } />

      <DataGridContainer>
        <DataGrid
          autoHeight={true}
          rows={subjects}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          hideFooterSelectedRowCount={true}
          selectionModel={false}
          getRowId={(r) => r.idDisciplina}
        />
      </DataGridContainer>
    </Sidebar>
  )
}