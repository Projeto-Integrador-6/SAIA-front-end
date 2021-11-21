import React, { useEffect, useState } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { Icon, ButtonTwo } from "../../components/Button";

import api from '../../services/api'

import './index.css';
import MenuDropDown from "../../components/MenuDropDown";


export default function Subjects() {

  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Disciplinas`

    setTimeout(async () => {
      const subjectsResponse = await api.get(`/disciplina`)
      setSubjects(subjectsResponse.data);

      setLoading(false);
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
            <Link to={`subjects/update/${subjects.row.idDisciplina}`}>
              <Icon icon={<CreateIcon />} />
            </Link>

            <MenuDropDown 
              icon={<InsertLinkIcon/>}
              buttons={[
                { nome: 'Alunos vinculados a disciplina', link: ''},
                { nome: 'Professores vinculados a disciplina', link: `subjects/teacher/${subjects.row.nome}/${subjects.row.idDisciplina}`}
              ]}
            />
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
            <ButtonTwo icon={<AddIcon />} name="Nova Disciplina" />
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
          loading={loading}
        />
      </DataGridContainer>
    </Sidebar>
  )
}