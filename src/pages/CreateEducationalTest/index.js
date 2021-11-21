import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField, DialogActions } from "@mui/material";
import { Formik, Form } from 'formik';

import { ButtonOne, ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import FullCard from "../../components/FullCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import './index.css';
import SimpleCard from "../../components/SimpleCard";

export default function CreateEducationalTest() {
  const { user } = useContext(AuthContext);
  const { setSnack } = useContext(SnackContext);

  const [modalQuestion, setModalQuestion] = useState(false);

  const [questoes, setQuestoes] = useState([]);

  const [questaoAvaliacao, setQuestaoAvaliacao] = useState([]);
  const [currentQuestoes, setCurrentQuestoes] = useState([]);

  useEffect(() => {
    document.title = `SAIA - Criando Avaliação`;

    setTimeout(async () => {
      const response = await api.get(`/questao/user/${user.idUsuario}`)
      setQuestoes(response.data.result)
    }, 500)
  }, [])

  // CRIA AVALIAÇÃO
  async function create(values) {
    try {
      let idUsuario = user.idUsuario;
      let questoes = currentQuestoes;

      await api.post(`/avaliacao`, { idUsuario, ...values, questoes });

      setSnack({ message: "Avaliação criada com sucesso.", type: 'success', open: true });
      history.push("/manager/educational_test")

    } catch (err) {
      setSnack({ message: "Houve um problema durante a criação da avaliação.", type: 'error', open: true });
    }
  }

  // ADICIONA NOVAS TAGS AO ARRAY "QUESTAOAVALIACAO"
  function addQuestion(values) {
    let question = []

    for (let i = 0; i < questaoAvaliacao.length; i++) {
      question.push(questaoAvaliacao[i])
    }

    for (let i = 0; i < values.length; i++) {
      question.push(values[i])
    }

    setQuestaoAvaliacao(question);
  }

  return (
    <Sidebar>
      <PageTitle title="Criando Avaliação" backLink="/manager/educational_test" />

      <Formik
        initialValues={{
          nome: '',
          descricao: ''
        }}
        onSubmit={async (values) => {
          if (currentQuestoes.length < 1) {
            setSnack({ message: "Uma avaliação precisa ter no mínimo 1 questão.", type: 'error', open: true });
          }
          else {
            create(values);
          }
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <FullCard title="Dados da avaliação">
              <div className="input-block">
                <TextField
                  name="nome"
                  value={values.nome}
                  onChange={handleChange}
                  label="Nome da avaliação"
                  type="text"
                  fullWidth
                />
              </div>
              <div className="input-block">
                <TextField
                  name="descricao"
                  value={values.descricao}
                  onChange={handleChange}
                  label="Descrição da avaliação"
                  fullWidth
                  multiline
                  rows={5}
                />
              </div>
            </FullCard>

            <FullCard title="Questões da avaliação" button={<ButtonTwo name="Adicionar Questão" onClick={() => setModalQuestion(true)} />} noBody={true} >
              {questaoAvaliacao.map((items, index) =>
                <SimpleCard
                  key={items.idQuestao}
                  buttons={
                    <ButtonTwo
                      onClick={() => {
                        setQuestaoAvaliacao(currentQuestion =>
                          currentQuestion.filter(x => x.idQuestao !== items.idQuestao)
                        );
                      }}
                      name="Remover Questão"
                      color="error"
                    />
                  }
                >
                  <div className="questions-list">
                    <h4>{items.nome}</h4>
                    <p>Enunciado: {items.enunciado}</p>
                    <p>Valor: {items.valor}</p>
                  </div>
                </SimpleCard>
              )}
            </FullCard>

            <ButtonOne
              description="Criar"
              color="var(--green)"
              type="submit"
            />

          </Form>
        )}
      </Formik>

      <DialogBox
        open={modalQuestion}
        onClose={() => setModalQuestion(false)}
        title="Adicionando Questões"
      >
        <form>
          <div className="input-block">
            <Autocomplete
              multiple
              disableCloseOnSelect
              id="tags-outlined"
              options={questoes}
              onChange={(val, values) => setCurrentQuestoes(values)}
              getOptionLabel={(option) => option.nome}
              filterSelectedOptions
              noOptionsText={'Não há questões para mostrar'}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Questões"
                />
              )}
            />
          </div>
        </form>

        <DialogActions>
          <ButtonTwo name="Adicionar" onClick={() => { setModalQuestion(false); addQuestion(currentQuestoes) }} />
          <ButtonTwo name="Fechar" onClick={() => setModalQuestion(false)} />
        </DialogActions>
      </DialogBox>

    </Sidebar>
  )
}