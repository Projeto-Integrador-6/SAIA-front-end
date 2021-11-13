import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Checkbox, Chip, DialogActions, FormControlLabel, TextField } from "@mui/material";
import { Formik, Form } from 'formik';
import produce from 'immer';
import { useParams } from "react-router-dom";
import { generate } from 'shortid';

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import LoadingProgress from "../../components/LoadingProgress";
import { ButtonOne, ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';

import api from '../../services/api';

export default function EditQuestions() {
  let { id } = useParams();

  const { setSnack } = useContext(SnackContext);

  const [questao, setQuestao] = useState([]);
  const [alternativas, setAlternativas] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTagQuestao, setNewTagQuestao] = useState([]);
  const [oldTagQuestao, setOldTagQuestao] = useState([]);
  const [isAlternativaCorreta, setIsAlternativaCorreta] = useState(false);

  const [modalTagCreate, setModalTagCreate] = useState(false);
  const [modalTagList, setModalTagList] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = `SAIA - Editando Questão`;

    setTimeout(async () => {
      const loadQuestao = await api.get(`/questao/${id}`)

      setQuestao(loadQuestao.data.questao);

      if (loadQuestao.data.alternativas !== undefined) {

        for (let i = 0; i < loadQuestao.data.alternativas.length; i++) {

          // GERA ALTERNATIVA
          setAlternativas(currentAlternative => [...currentAlternative, {
            idAlternativa: generate(),
            descricao: '',
            isAlternativaCorreta: false
          }])

          // DEFINE ALTERNATIVA
          setAlternativas(currentAlternative =>
            produce(currentAlternative, (v) => {
              v[i].idAlternativa = loadQuestao.data.alternativas[i].idAlternativa;
              v[i].descricao = loadQuestao.data.alternativas[i].descricao;
              v[i].isAlternativaCorreta = loadQuestao.data.alternativas[i].isAlternativaCorreta;
            })
          )
        }

      }

      if (loadQuestao.data.questao.tags !== null) {
        for (let i = 0; i < loadQuestao.data.questao.tags.length; i++) {
          setOldTagQuestao(loadQuestao.data.questao.tags);
        }
      }

      const loadTagCreated = await api.get('/tag');
      setTags(loadTagCreated.data);


      setLoading(false);
    }, 500)
  }, [id])

  function returnLetter(number) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return letters[number];
  }

  // CRIA QUESTÃO
  async function edit(values) {
    try {
      let tags = newTagQuestao;

      if (values.idTipoQuestao === 1) {
        await api.put(`/questao/${id}`, { ...values, tags });
      }

      if (values.idTipoQuestao === 2) {
        await api.put(`/questao/${id}`, { ...values, alternativas, tags });
      }

      setSnack({ message: "Questão atualizada com sucesso.", type: 'success', open: true });
      history.push("/manager/questions")

    } catch (err) {
      setSnack({ message: err.response.data.error, type: 'error', open: true });
    }
  }

  // CRIA TAG
  async function createTag(values) {
    try {
      await api.post(`/tag`, { ...values });
      setSnack({ message: "Tag criada com sucesso.", type: 'success', open: true });
      setStatus(status + 1);
    } catch (err) {
      setSnack({ message: "Houve um problema durante a criação da tag.", type: 'error', open: true });
    }
  }

  // ADICIONA NOVAS TAGS AO ARRAY "NEWTAGQUESTAO"
  function addTags(values) {
    let tag = []

    for (let i = 0; i < newTagQuestao.length; i++) {
      tag.push(newTagQuestao[i])
    }

    for (let i = 0; i < values.length; i++) {
      tag.push(values[i])
    }

    setNewTagQuestao(tag)
  }

  return (
    <Sidebar>
      <PageTitle title="Editando Questão" />
      {loading ?
        <LoadingProgress />
        :
        <>

          <Formik
            enableReinitialize
            initialValues={questao}
            onSubmit={async (values) => {
              edit(values);

            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <FullCard title="Dados da questão">
                  <div className="input-block">
                    <TextField
                      label="Nome"
                      name="nome"
                      value={values.nome}
                      onChange={handleChange}
                      type="text"
                      fullWidth
                    />
                  </div>
                  <div className="input-block">
                    <TextField
                      label="Enunciado"
                      name="enunciado"
                      value={values.enunciado}
                      onChange={handleChange}
                      type="text"
                      fullWidth
                      multiline
                      rows={5}
                    />
                  </div>
                  <div className="input-block">
                    <TextField
                      label="Valor"
                      name="valor"
                      value={values.valor}
                      onChange={handleChange}
                      type="number"
                      fullWidth
                    />
                  </div>
                  <div className="input-block">
                    <div className="editor-label">
                      <div className="editor-label-label">
                        <p>Tags</p>
                      </div>
                      <div className="editor-label-button">
                        <ButtonTwo
                          name="Adicionar Tag"
                          onClick={(e) => setModalTagList(true)}
                        />
                      </div>
                    </div>
                    <div className="chips-block">
                      {oldTagQuestao.map((items) =>
                        <Chip
                          key={items.idTag}
                          label={items.descricao}
                          color="primary"
                        />
                      )}
                      {newTagQuestao.map((items) =>
                        <Chip
                          key={items.idTag}
                          label={items.descricao}
                          color="primary"
                        />
                      )}
                    </div>
                  </div>
                </FullCard>

                {values.idTipoQuestao === 2 &&
                  <>
                    <FullCard title="Alternativas" button={
                      <ButtonTwo
                        onClick={() => {
                          setAlternativas(currentAlternative => [...currentAlternative, {
                            idAlternativa: generate(),
                            descricao: '',
                            isAlternativaCorreta: false
                          }])
                        }}
                        name="Nova Alternativa"
                        disabled={alternativas.length > 5}
                      />
                    }>

                      {alternativas.map((a, index) => {
                        return (
                          <div key={index}>
                            <div className="input-block">
                              <TextField
                                label={'Alternativa ' + returnLetter(index)}
                                name="alternativa"
                                value={alternativas[index].descricao}
                                onChange={e => {
                                  const descricao = e.target.value;
                                  setAlternativas(currentAlternative =>
                                    produce(currentAlternative, v => {
                                      v[index].descricao = descricao;
                                    })
                                  );
                                }}
                                fullWidth
                                multiline
                                rows={3}
                              />
                              <FormControlLabel
                                control={<Checkbox />}
                                label="Alternativa Correta"
                                value={isAlternativaCorreta}
                                checked={alternativas[index].isAlternativaCorreta}
                                onChange={e => {
                                  setAlternativas(currentAlternative =>
                                    produce(currentAlternative, (v) => {
                                      v[index].isAlternativaCorreta = isAlternativaCorreta;
                                    })
                                  );
                                  setIsAlternativaCorreta(!isAlternativaCorreta);
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                      <div>{JSON.stringify(alternativas, null, 2)}</div>
                    </FullCard>
                  </>
                }

                <ButtonOne
                  description="Atualizar"
                  color="var(--green)"
                  type="submit"
                />

              </Form>
            )}
          </Formik>
          
          {/* MODAL: LISTANDO TAGS */}
          <DialogBox
            open={modalTagList}
            onClose={() => setModalTagList(false)}
            title="Listando Tags"
          >
            <form>
              <div className="input-block">
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={tags}
                  onChange={(val, values) => setCurrentTags(values)}
                  getOptionLabel={(option) => option.descricao}
                  filterSelectedOptions
                  noOptionsText={'Não há tags para mostrar'}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tags"
                    />
                  )}
                />
              </div>
              <div className="input-block">
                <p className="p-spacing">Não encontrou a tag que procurava?</p>
                <ButtonTwo
                  name="Criar nova tag"
                  onClick={() => { setModalTagCreate(true); setModalTagList(false) }}
                  variant="contained"
                />
              </div>
            </form>

            <DialogActions>
              <ButtonTwo name="Adicionar" onClick={() => { addTags(currentTags); setModalTagList(false) }} />
              <ButtonTwo name="Fechar" onClick={() => setModalTagList(false)} />
            </DialogActions>
          </DialogBox>
          
          {/* MODAL: CRIAR TAGS */}
          <DialogBox
            open={modalTagCreate}
            onClose={() => setModalTagCreate(false)}
            title="Criando Tag"
          >
            <Formik
              initialValues={{
                descricao: ''
              }}
              onSubmit={async (values) => {
                createTag(values);
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <div className="input-block">
                    <TextField
                      name="descricao"
                      label="Descrição"
                      value={values.descricao}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <DialogActions>
                    <ButtonTwo name="Criar" type="submit" onClick={() => { setModalTagCreate(false); setModalTagList(true) }} />
                    <ButtonTwo name="Voltar" onClick={() => { setModalTagCreate(false); setModalTagList(true) }} />
                  </DialogActions>

                </Form>
              )}
            </Formik>
          </DialogBox>

        </>
      }
    </Sidebar>
  )
}