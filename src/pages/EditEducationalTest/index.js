import React, { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";
import { Formik, Form } from 'formik';
import { useParams } from "react-router-dom";

import { ButtonOne } from "../../components/Button";
import FullCard from "../../components/FullCard";
import LoadingProgress from "../../components/LoadingProgress";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import SimpleCard from "../../components/SimpleCard";

import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import '../CreateEducationalTest/index.css';
import './index.css';

export default function EditEducationalTest() {
  let { id } = useParams();
  const { setSnack } = useContext(SnackContext);

  const [avaliacao, setAvaliacao] = useState([]);
  const [questoes, setQuestoes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Editando Avaliação`;

    setTimeout(async () => {
      const response = await api.get(`/avaliacao/${id}`)
      setAvaliacao(response.data.avaliacao);
      setQuestoes(response.data.avaliacao.questaos)

      setLoading(false);
    }, 500);

  }, [id])

  // EDITA AVALIAÇÃO
  async function edit(values) {
    try {
      await api.put(`/avaliacao/${id}`, { ...values });
      setSnack({ message: "Avaliação editada com sucesso.", type: 'success', open: true });
      history.push("/manager/educational_test")

    } catch (err) {
      setSnack({ message: "Houve um problema durante a criação da avaliação.", type: 'error', open: true });
    }
  }


  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title="Editando Avaliação" backLink="/manager/educational_test" />

          <Formik
            enableReinitialize
            initialValues={avaliacao}
            onSubmit={async (values) => {
              edit(values);
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

                <FullCard title="Questões da avaliação" noBody={true}>
                  <p className="warning-question-edit"><strong>Atenção:</strong> No modo de edição, não é possível adicionar ou remover uma questão.</p>
                  {questoes.map(items =>
                    <SimpleCard key={items.idQuestao}>
                      <div className="questions-list">
                        <div className="question-items">
                          <h4>{items.nome}</h4>
                          <p>Enunciado: {items.enunciado}</p>
                          <p>Valor: {items.valor}</p>
                        </div>
                        <div className="alternative-items">
                          <h4>Alternativas</h4>
                          {items.alternativas.map(items => (
                            <p>- {items.descricao} {items.isAlternativaCorreta === true && "(Resposta Correta)"}</p>
                          ))}
                        </div>
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


        </>
      }
    </Sidebar >
  )
}