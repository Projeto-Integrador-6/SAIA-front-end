import React, { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Formik, Form } from 'formik';
import produce, { current, producer } from 'immer';

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonOne, ButtonTwo } from "../../components/Button";
import EditorButtons from "../../components/EditorButtons";
import { FieldInput, RadioButton, Textarea } from "../../components/Input";

import api from '../../services/api';

import './index.css';
import 'draft-js/dist/Draft.css';

export default function CreateQuestions() {

  const [enunciado, setEnunciado] = useState(
    () => EditorState.createEmpty(),
  );

  const [alternativa, setAlternativa] = useState([{}]);
  const [contadorAlternativas, setContadorAlternativas] = useState(1)


  useEffect(() => {
    document.title = `SAIA - Criando Questão`
  })

  const _onBoldMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'BOLD'))
    }

    if (input === 'b') {
      setEnunciado(RichUtils.toggleInlineStyle(enunciado, 'BOLD'))
    }
  }

  const _onItalicMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'ITALIC'))
    }

    if (input === 'b') {
      setEnunciado(RichUtils.toggleInlineStyle(enunciado, 'ITALIC'))
    }
  }

  const _onUnderlineMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'UNDERLINE'))
    }

    if (input === 'b') {
      setEnunciado(RichUtils.toggleInlineStyle(enunciado, 'UNDERLINE'))
    }
  }

  function handleContadorAlternativas(e, type) {
    if (contadorAlternativas < 7) {
      if (type === 'a')
        setContadorAlternativas(contadorAlternativas + 1);

      if (type === 'r')
        setContadorAlternativas(contadorAlternativas - 1);
    }
  }

  function returnLetter(number) {

    let letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    return letters[number];
  }

  // Pagamento de horário
  async function create(idTipoQuestao, nome, enunciado, valor) {
    try {
      await api.post(`/questao`, { nome, enunciado, valor, idTipoQuestao });
    } catch (err) {
      console.log(err.response.data.error)
    }
  }


  return (
    <Sidebar>
      <PageTitle title="Criando Questão" />
      <Formik
        initialValues={{
          idTipoQuestao: '',
          nome: '',
          valor: ''
        }}
        onSubmit={async (values) => {
          create(values.idTipoQuestao, values.nome, enunciado.getCurrentContent(), values.valor);
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
                  <div className="editor-label">
                    <label>Enunciado da questão</label>
                  </div>
                  <div className="editor">
                    <EditorButtons>
                      <button onMouseDown={e => { _onBoldMouseDown(e, 'b') }}>B</button>
                      <button onMouseDown={e => { _onItalicMouseDown(e, 'b') }}><i>I</i></button>
                      <button onMouseDown={e => { _onUnderlineMouseDown(e, 'b') }}>U</button>
                    </EditorButtons>

                    <div className="editor-input">
                      <Editor
                        editorState={enunciado}
                        onChange={setEnunciado}
                        placeholder="Digite o enunciado da questão"
                      />

                    </div>
                  </div>
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
                  <FieldInput
                    label="Tags"
                    name={values.tags}
                    onChange={handleChange}
                    type="text"
                    placeholder="Digite as tags da questão"
                    data-role="taginput"
                  />
                </div>
              </FullCard>
            }

            {values.idTipoQuestao === "2" &&
              <>
                <FullCard title="Alternativas" button={
                  <ButtonTwo
                    onClick={() => {
                      setAlternativa(currentAlternative => [...currentAlternative, {
                        texto: ''
                      }])
                    }}
                    name="Nova Alternativa"
                    disabled={alternativa.length > 5}
                  />
                }>

                  {alternativa.map((_, i) =>
                    <div className="input-block">
                      <div className="editor-label">
                        <div className="editor-label-label">
                          <label>Alternativa: {returnLetter(i)}</label>
                        </div>
                        {i !== 0 &&
                          <div className="editor-label-button">
                            <ButtonTwo
                              onClick={(e) => handleContadorAlternativas(e, 'r')}
                              name="Remover Alternativa"
                              color="error"
                            />
                          </div>
                        }
                      </div>
                      <div className="alternative">
                        <Textarea
                          name="alternativa"
                          value={i.alternativa}
                          onChange={e => {
                            const texto = e.target.value;
                            setAlternativa(currentAlternative =>
                              produce(currentAlternative, (v) => {
                                v[i].texto = texto;
                              })
                            )
                          }}
                        />
                      </div>
                    </div>
                  )}

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


    </Sidebar>
  )
}