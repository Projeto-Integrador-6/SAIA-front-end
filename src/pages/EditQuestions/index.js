import React, { useEffect, useState } from "react";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Formik, Form } from 'formik';

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonOne, ButtonTwo } from "../../components/Button";
import EditorButtons from "../../components/EditorButtons";
import { Input, RadioButton } from "../../components/Input";

import '../CreateQuestions/index.css';
import 'draft-js/dist/Draft.css';


export default function EditQuestions() {

  useEffect(() => {
    document.title = `SAIA - Editando Questão`
  })

  const [questao, setQuestao] = useState(
    () => EditorState.createEmpty(),
  );

  const [alternativa, setAlternativa] = useState(
    () => EditorState.createEmpty(),
  );

  const [contadorAlternativas, setContadorAlternativas] = useState(1)

  const _onBoldMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'BOLD'))
    }

    if (input === 'b') {
      setQuestao(RichUtils.toggleInlineStyle(questao, 'BOLD'))
    }
  }

  const _onItalicMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'ITALIC'))
    }

    if (input === 'b') {
      setQuestao(RichUtils.toggleInlineStyle(questao, 'ITALIC'))
    }
  }

  const _onUnderlineMouseDown = (e, input) => {
    e.preventDefault();

    if (input === 'a') {
      setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'UNDERLINE'))
    }

    if (input === 'b') {
      setQuestao(RichUtils.toggleInlineStyle(questao, 'UNDERLINE'))
    }
  }

  function handleContadorAlternativas(e, type) {
    if (contadorAlternativas < 7) {
      if(type === 'a')
        setContadorAlternativas(contadorAlternativas + 1);
      
      if(type === 'r')
        setContadorAlternativas(contadorAlternativas - 1);
    }
  }

  function returnLetter(number) {
    if (number === 0)
      return 'A'

    if (number === 1)
      return 'B'

    if (number === 2)
      return 'C'

    if (number === 3)
      return 'D'

    if (number === 4)
      return 'E'

    if (number === 5)
      return 'F'
  }

  return (
    <Sidebar>
      <PageTitle title="Editando Questão" />
      <Formik
        initialValues={{
          tipoQuestao: '',
          alternativa: []
        }}
        onSubmit={async (values) => {

        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <FullCard title="Tipo da questão">
              <div className="input-block">
                <RadioButton
                  label="Questão aberta"
                  name="tipoQuestao"
                  value="1"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Questão fechada"
                  name="tipoQuestao"
                  value="2"
                  onChange={handleChange}
                />
              </div>
            </FullCard>

            {values.tipoQuestao !== "" &&
              <FullCard title="Dados da questão">
                <div className="input-block">
                  <Input
                    label="Nome da questão"
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
                        editorState={questao}
                        onChange={setQuestao}
                        placeholder="Digite o enunciado da questão"
                      />

                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <Input
                    label="Tags"
                    type="text"
                    placeholder="Digite as tags da questão"
                    data-role="taginput"
                  />
                </div>
              </FullCard>
            }


            {values.tipoQuestao === "2" &&
              <>
                <FullCard title="Alternativas" button={
                  <ButtonTwo
                    onClick={(e) => handleContadorAlternativas(e, 'a')}
                    name="Nova Alternativa"
                    disabled={contadorAlternativas > 5}
                  />
                }>

                  {[...Array(contadorAlternativas)].map((_, i) =>
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
                      <div className="editor">
                        <EditorButtons>
                          <button onMouseDown={e => { _onBoldMouseDown(e, 'a') }}>B</button>
                          <button onMouseDown={e => { _onItalicMouseDown(e, 'a') }}><i>I</i></button>
                          <button onMouseDown={e => { _onUnderlineMouseDown(e, 'a') }}>U</button>
                        </EditorButtons>

                        <div className="editor-input">
                          <Editor
                            editorState={alternativa}
                            onChange={setAlternativa}
                            placeholder="Digite o conteúdo da alternativa"
                          />

                        </div>
                      </div>
                    </div>

                  )}



                </FullCard>
              </>
            }

            <ButtonOne
              description="Confirmar Alterações"
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