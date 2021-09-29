import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Formik, Form } from 'formik';

import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonOne, ButtonTwo } from "../../components/Button";
import EditorButtons from "../../components/EditorButtons";
import { Input, RadioButton, Textarea } from "../../components/Input";

import './index.css';
import 'draft-js/dist/Draft.css';


export default function CreateQuestions() {

  const [alternativa, setAlternativa] = React.useState(
    () => EditorState.createEmpty(),
  );

  const _onBoldMouseDown = (e) => {
    e.preventDefault();
    setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'BOLD'))
  }

  const _onItalicMouseDown = (e) => {
    e.preventDefault();
    setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'ITALIC'))
  }

  const _onUnderlineMouseDown = (e) => {
    e.preventDefault();
    setAlternativa(RichUtils.toggleInlineStyle(alternativa, 'UNDERLINE'))
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Questão" />
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
                  <Textarea
                    label="Enunciado da questão"
                    placeholder="Digite o enunciado da avaliação"
                  />
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
                <FullCard title="Alternativas" button={<ButtonTwo name="Nova Alternativa" />}>

                  <div className="input-block">
                    <div className="editor-label">
                      <label>Alternativa: A</label>
                    </div>
                    <div className="editor">
                      <EditorButtons>
                        <button onMouseDown={e => { _onBoldMouseDown(e) }}>B</button>
                        <button onMouseDown={e => { _onItalicMouseDown(e) }}><i>I</i></button>
                        <button onMouseDown={e => { _onUnderlineMouseDown(e) }}>U</button>
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