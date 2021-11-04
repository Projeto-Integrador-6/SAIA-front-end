import React, { useContext, useEffect, useState } from "react";
import { Autocomplete, TextField, DialogActions } from "@mui/material";
import { Formik, Form } from 'formik';

import { ButtonOne, ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import FullCard from "../../components/FullCard";
import { FieldInput, Textarea } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import './index.css';

export default function CreateEducationalTest() {
  const { setSnack } = useContext(SnackContext);

  const [modalQuestion, setModalQuestion] = useState(false);

  const [questoes, setQuestoes] = useState([]);

  const [questaoAvaliacao, setQuestaoAvaliacao] = useState([]);
  const [currentQuestoes, setCurrentQuestoes] = useState([]);

  useEffect(() => {
    document.title = `SAIA - Criando Avaliação`;

    setTimeout(async () => {
      const response = await api.get(`/questao`)
      setQuestoes(response.data)
    }, 500)

  }, [])

    // Cria Avalicao
    async function create(values) {
      let questoes = currentQuestoes;
      
      try {
        await api.post(`/avaliacao`, { ...values, questoes });
        
        setSnack({ message: "Avaliação criada com sucesso.", type: 'success', open: true });
        history.push("/manager/educational_test")
  
      } catch (err) {
        setSnack({ message: "Houve um problema durante a criação da avaliação.", type: 'error', open: true });
      }
    }

  return (
    <Sidebar>
      <PageTitle title="Criando Avaliação" />

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
                <FieldInput
                  name="nome"
                  values={values.nome}
                  onChange={handleChange}
                  label="Nome da avaliação"
                  type="text"
                  placeholder="Digite o nome da avaliação"
                />
              </div>
              <div className="input-block">
                <Textarea
                  name="descricao"
                  values={values.descricao}
                  onChange={handleChange}
                  label="Descrição da avaliação"
                  placeholder="Digite a descrição da avaliação"
                />
              </div>
            </FullCard>

            <FullCard title="Questões da avaliação" button={<ButtonTwo name="Adicionar Questão" onClick={() => setModalQuestion(true)} />} >
              {questaoAvaliacao.map((items, i) =>
                <div className="questions-list">
                  <h3>{i} - {items.nome}</h3>
                  <p>{items.enunciado}</p>
                  <p>Valor: {items.valor}</p>
                </div>
              )}
            </FullCard>

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
        open={modalQuestion}
        onClose={() => setModalQuestion(false)}
        title="Adicionando Questões"
      >
        <form>
          <div className="input-block">
            <Autocomplete
              multiple
              id="tags-outlined"
              options={questoes}
              onChange={(val, values) => setCurrentQuestoes(values)}
              getOptionLabel={(option) => option.nome}
              filterSelectedOptions
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
          <ButtonTwo name="Adicionar" onClick={() => {setModalQuestion(false); setQuestaoAvaliacao(currentQuestoes)}} />
          <ButtonTwo name="Fechar" onClick={() => setModalQuestion(false)} />
        </DialogActions>
      </DialogBox>

    </Sidebar>
  )
}