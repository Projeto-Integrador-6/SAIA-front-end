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
import { FieldInput, RadioButton, Textarea } from "../../components/Input";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import './index.css';
import 'draft-js/dist/Draft.css';


export default function CreateQuestions() {
  const { setSnack } = useContext(SnackContext);

  const [alternativas, setAlternativas] = useState([{}]);
  const [tags, setTags] = useState([]);
  const [tagQuestao, setTagQuestao] = useState([]);
  const [isAlternativaCorreta, setIsAlternativaCorreta] = useState(false);

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
    let tags = tagQuestao;

    try {
      if (values.idTipoQuestao === '1') {
        await api.post(`/questao`, { ...values, tags });
      }

      if (values.idTipoQuestao === '2') {
        console.log(alternativas)
        await api.post(`/questao`, { ...values, alternativas, tags });
      }

      setSnack({ message: "Questão criada com sucesso.", type: 'success', open: true });
      history.push("/manager/questions")

    } catch (err) {
      setSnack({ message: err.response.data.error, type: 'error', open: true });
    }
  }

  // Cria Tag
  async function createTag(values) {
    try {
      await api.post(`/tag`, { ...values });
      setSnack({ message: "Tag criada com sucesso.", type: 'success', open: true });
      setStatus(status + 1);
    } catch (err) {
      setSnack({ message: "Houve um problema durante a criação da tag.", type: 'error', open: true });
    }
  }

  function handleAlternativa(e) {
    setIsAlternativaCorreta(!false)
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Questão" />
      <Formik
        initialValues={{
          nome: '',
          enunciado: '',
          valor: '',
          idTipoQuestao: ''
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
            <FullCard title="Tipo da questão">
              <div className="input-block">
                <RadioButton
                  label="Questão aberta"
                  name="idTipoQuestao"
                  value="1"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Questão fechada"
                  name="idTipoQuestao"
                  value="2"
                  onChange={handleChange}
                />
              </div>
            </FullCard>

            {values.idTipoQuestao !== "" &&
              <FullCard title="Dados da questão">
                <div className="input-block">
                  <FieldInput
                    label="Nome da questão"
                    name="nome"
                    values={values.nome}
                    onChange={handleChange}
                    type="text"
                    placeholder="Digite o nome da questão"
                  />
                </div>
                <div className="input-block">
                  <Textarea
                    label="Enunciado"
                    name="enunciado"
                    values={values.enunciado}
                    onChange={handleChange}
                    type="text"
                    placeholder="Digite o enunciado da questão"
                  />
                </div>
                <div className="input-block">
                  <FieldInput
                    label="Valor"
                    name="valor"
                    value={values.valor}
                    onChange={handleChange}
                    type="number"
                    placeholder="Digite o valor da questão"
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
            }

            {values.idTipoQuestao === "2" &&
              <>
                <FullCard title="Alternativas" button={
                  <ButtonTwo
                    onClick={() => {
                      setAlternativas(currentAlternative => [...currentAlternative, {
                        id: generate(),
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
                          <div className="editor-label">
                            <div className="editor-label-label">
                              <p>Alternativa: {returnLetter(index)}</p>
                            </div>
                            <div className="editor-label-button">
                              <ButtonTwo
                                onClick={() => {
                                  setAlternativas(currentAlternative =>
                                    currentAlternative.filter(x => x.id !== a.id)
                                  );
                                }}
                                name="Remover Alternativa"
                                color="error"
                              />
                            </div>

                          </div>
                          <div className="alternative">
                            <Textarea
                              name="alternativa"
                              value={a.alternativas}
                              onChange={e => {
                                const descricao = e.target.value;
                                setAlternativas(currentAlternative =>
                                  produce(currentAlternative, v => {
                                    v[index].descricao = descricao;
                                    v[index].isAlternativaCorreta = isAlternativaCorreta;
                                  })
                                )
                              }}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Alternativa Correta"
                              value={isAlternativaCorreta}
                              onChange={(e) => handleAlternativa(e)}
                            />
                          </div>
                        </div>
                        
                      </div>
                    )
                  })}

                </FullCard>
              </>
            }

            <ButtonOne
              description="Criar"
              color="var(--green)"
              width="200px"
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
              id="tags-outlined"
              options={tags}
              onChange={(val, values) => setCurrentTags(values)}
              getOptionLabel={(option) => option.descricao}
              filterSelectedOptions
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
          <ButtonTwo name="Adicionar" onClick={() => { setTagQuestao(currentTags); setModalTagList(false) }} />
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