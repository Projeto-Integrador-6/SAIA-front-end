import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, Checkbox, Chip, DialogActions, FormControlLabel, TextField } from "@mui/material";
import { Formik, Form } from 'formik';
import produce from 'immer';
import { generate } from 'shortid';

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonOne, ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import './index.css';
import 'draft-js/dist/Draft.css';


export default function CreateQuestions() {
  const { user } = useContext(AuthContext);
  const { setSnack } = useContext(SnackContext);

  const [alternativas, setAlternativas] = useState([{
    idAlternativa: generate(),
    descricao: '',
    isAlternativaCorreta: false
  }]);
  const [tags, setTags] = useState([]);
  const [tagQuestao, setTagQuestao] = useState([]);

  const [modalTagCreate, setModalTagCreate] = useState(false);
  const [modalTagList, setModalTagList] = useState(false);
  const [currentTags, setCurrentTags] = useState([]);

  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = `SAIA - Criando Questão`;

    setTimeout(async () => {
      const response = await api.get(`/tag`)
      setTags(response.data);

    }, 500)
  }, [status])


  function returnLetter(number) {
    let letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return letters[number];
  }

  // Cria Questão
  async function create(values) {
    try {
      let tags = tagQuestao;
      let idUsuario = user.idUsuario;

      await api.post(`/questao`, { idUsuario, ...values, alternativas, tags });
    
      setSnack({ message: "Questão criada com sucesso.", type: 'success', open: true });
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

    for (let i = 0; i < tagQuestao.length; i++) {
      tag.push(tagQuestao[i])
    }

    for (let i = 0; i < values.length; i++) {
      tag.push(values[i])
    }

    setTagQuestao(tag)
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Questão" backLink="/manager/questions" />
      <Formik
        initialValues={{
          nome: '',
          enunciado: '',
          valor: ''
        }}
        onSubmit={async (values) => {
          if (alternativas.length < 2 && values.idTipoQuestao === '2') {
            setSnack({ message: "Uma questão precisa ter no mínimo 2 alternativas.", type: 'error', open: true });
          }
          else {
            create(values);
          }
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
                  label="Pontuação"
                  name="valor"
                  value={values.valor}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
              </div>
              <div className="input-block">
                <div className="editor-buttons">
                  <div className="editor-buttons-label">
                    <p>Tags</p>
                  </div>
                  <div className="editor-buttons-button">
                    <ButtonTwo
                      name="Adicionar Tag"
                      onClick={(e) => setModalTagList(true)}
                    />
                  </div>
                </div>
                <div className="chips-block">
                  {tagQuestao.map((items) =>
                    <Chip
                      key={items.idTag}
                      label={items.descricao}
                      color="primary"
                    />
                  )}
                </div>
              </div>
            </FullCard>
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
                    <div key={index} >
                      <div className="input-block">
                        <div className="editor-buttons">
                          <div className="editor-buttons-1">
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Alternativa Correta"
                              value={alternativas[index].isAlternativaCorreta}
                              onChange={e => {
                                setAlternativas(currentAlternative =>
                                  produce(currentAlternative, (v) => {
                                    v[index].isAlternativaCorreta = !alternativas[index].isAlternativaCorreta;
                                  })
                                );

                              }}
                            />
                          </div>
                          <div className="editor-buttons-2">
                            <ButtonTwo
                              onClick={() => {
                                setAlternativas(currentAlternative =>
                                  currentAlternative.filter(x => x.idAlternativa !== a.idAlternativa)
                                );
                              }}
                              name="Remover Alternativa"
                              color="error"
                            />
                          </div>

                        </div>
                        <>
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
                        </>
                      </div>

                    </div>
                  )
                })}

              </FullCard>
            </>

            <ButtonOne
              description="Criar"
              color="var(--green)"
              type="submit"
            />

          </Form>
        )}
      </Formik>

      <DialogBox
        open={modalTagList}
        onClose={() => setModalTagList(false)}
        title="Listando Tags"
      >
        <form>
          <div className="input-block">
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="tags-outlined"
              options={tags}
              onChange={(val, values) => setCurrentTags(values)}
              getOptionSelected={(option, value) => option.idTag === value.idTag}
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

    </Sidebar>
  )
}