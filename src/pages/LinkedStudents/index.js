import React, { useContext, useEffect, useState } from "react";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { Link, useParams } from "react-router-dom";
import { Autocomplete, DialogActions, TextField, Checkbox } from "@mui/material";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LinkOffIcon from '@mui/icons-material/LinkOff';

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import ListCard from "../../components/ListCard";
import DataGridContainer from "../../components/DataGridContainer";
import { Icon, ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";

import { SnackContext } from '../../contexts/SnackContext';

import api from '../../services/api';

export default function LinkedStudents() {
  let { nome, id } = useParams();

  const { setSnack } = useContext(SnackContext);

  const [alunos, setAlunos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [currentUsersSeleted, setCurrentUsersSeleted] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [modalLink, setModalLink] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = `SAIA - Alunos Vinculados a ${nome}`

    setTimeout(async () => {
      const response = await api.get(`/disciplina/alunos/${id}`)
      setAlunos(response.data.result.disciplina_aluno);

      setLoading(false);
    }, 500)

  }, [status])

  // TIPOS DE USUÁRIO
  function type(value) {
    let types = ['Aluno', 'Professor', 'Coordenador'];

    return types[value];
  }

  async function loadStudents() {
    const response = await api.get(`/usuario/type/0`);
    setUsuarios(response.data.result);
  }

  async function linkUsers(values) {
    try {
      let alunos = [];

      for (let i = 0; i < values.length; i++) {
        alunos.push({ usuario_id: values[i].idUsuario, disciplina_id: id })
      }

      await api.post(`/aluno_disciplina`, { alunos });
      setSnack({ message: `Alunos foram vinculados a disciplina de ${nome}.`, type: 'success', open: true });
      setStatus(status + 1);
    } catch {
      setSnack({ message: `Falha ao vincular os alunos na disciplina de ${nome}.`, type: 'error', open: true });
      setStatus(status + 1);
    }
  }

  async function unlinkUsers() {
    try {
      await api.delete(`/aluno_disciplina/${currentUser.idUsuario}/${id}`);
      setSnack({ message: `${currentUser.nome} foi desvinculado da disciplina de ${nome}.`, type: 'success', open: true });
      setStatus(status + 1);
    } catch {
      setSnack({ message: `Falha ao desvincular ${currentUser.nome} na disciplina de ${nome}.`, type: 'error', open: true });
      setStatus(status + 1);
    }
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
            <Icon icon={<LinkOffIcon />} onClick={(e) => { setCurrentUser(user.row); setModalDelete(true) }}/>
          </>
        )
      }
    }
  ];

  return (
    <Sidebar>
      <PageTitle title={`Alunos Vinculados a ${nome}`} backLink="/manager/subjects" />

      <ListCard content={
        <ButtonTwo icon={<AddIcon />} name="Vincular" onClick={(e) => { loadStudents(); setModalLink(true) }} />
      } />

      <DataGridContainer>
        <DataGrid
          getRowId={(r) => r.idUsuario}
          autoHeight={true}
          rows={alunos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          hideFooterSelectedRowCount={true}
          selectionModel={false}
          loading={loading}
        />
      </DataGridContainer>

      {/* MODAL - VINCULAR ALUNOS */}
      <DialogBox
        open={modalLink}
        onClose={() => setModalLink(false)}
        title="Vinculando Alunos"
      >
        <form>
          <div className="input-block">
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="tags-outlined"
              options={usuarios}
              onChange={(val, values) => setCurrentUsersSeleted(values)}
              getOptionSelected={(option, value) => option.idUsuario === value.idUsuario}
              getOptionLabel={(option) => option.nome}
              filterSelectedOptions
              noOptionsText={'Não há alunos para mostrar'}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.nome}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Alunos"
                />
              )}
            />
          </div>
        </form>

        <DialogActions>
          <ButtonTwo name="Adicionar" onClick={() => { linkUsers(currentUsersSeleted); setModalLink(false) }} />
          <ButtonTwo name="Fechar" onClick={() => setModalLink(false)} />
        </DialogActions>
      </DialogBox>

      {/* MODAL - DESVINCULAR ALUNOS */}
      <DialogBox
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        title={`Desvinculando ${currentUser.nome}`}
      >
        <p>Após a confirmação o {currentUser.nome} será desvinculado da disciplina de {nome}, deseja prosseguir?</p>

        <DialogActions>
          <ButtonTwo name="Desvincular" onClick={() => { unlinkUsers(); setModalDelete(false) }} />
          <ButtonTwo name="Fechar" onClick={() => setModalDelete(false)} />
        </DialogActions>
      </DialogBox>
    </Sidebar>
  )
}