import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import { Pagination, TextField } from "@mui/material";
import produce from 'immer';
import { generate } from 'shortid';

import { ButtonOne, Icon } from "../../components/Button";
import LoadingProgress from "../../components/LoadingProgress";

import { AuthContext } from '../../contexts/AuthContext';
import { SnackContext } from '../../contexts/SnackContext';

import history from '../../history';
import api from '../../services/api';

import './index.css';

export default function EducationalTestInProgress() {
  let { id } = useParams();

  const { user } = useContext(AuthContext);
  const { setSnack } = useContext(SnackContext);

  const [avaliacao, setAvaliacao] = useState([]);
  const [resposta, setResposta] = useState([]);

  const [loading, setLoading] = useState(true);
  const itemsPerPage = 1;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {

    setTimeout(async () => {
      const response = await api.get(`/aplicacao/avaliacao/${id}`);
      setAvaliacao(response.data.result);
      setNoOfPages(Math.ceil(response.data.result.questaos.length / itemsPerPage))

      // GERA RESPOSTAS PELA QUANTIDADE DE QUESTÃO
      for (let i = 0; i < response.data.result.questaos.length; i++) {
        setResposta(currentResponse => [...currentResponse, {
          idQuestao: generate(),
          resposta: ''
        }])
      }

      document.title = `SAIA - Avaliação: ${response.data.result.nome}`

      setLoading(false);

    }, 500)


  }, [])


  const handleChange = (event, value) => {
    setPage(value);
  };

  async function save(e) {
    e.preventDefault();
    try {
      let idAplicacao = id;
      let idUsuario = user.idUsuario;
      await api.post(`/resposta_aberta`, { idAplicacao, idUsuario, resposta } );
      setSnack({ message: "Avaliação respondida com sucesso.", type: 'success', open: true });
      history.push("/educational_test")
    } catch (err) {
      setSnack({ message: "Houve um problema durante o envio das respostas.", type: 'error', open: true });
    }
  }

  return (
    <>
      {loading ?
        <LoadingProgress />
        :
        <div className="educational-test-progress-container">
          <div className="educational-test-progress-header">
            <div className="educational-test-progress-btn-back">
              <Link to="/educational_test">
                <Icon icon={<ArrowBackIcon />} size="large" />
              </Link>
            </div>

            <div className="educational-test-progress-title">
              <h3>{avaliacao.nome}</h3>
              <p>{avaliacao.descricao}</p>
            </div>

            <div className="educational-test-progress-coutdown">
              <h4><TimerIcon /> 2:00</h4>
            </div>
          </div>

          <div className="educational-test-progress-body">
            {/* <div className="educational-test-progress-pagination">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
                size="large"
              />
            </div> */}

            <div className="educational-test-progress-question">

              <form onSubmit={save} method="POST">
                <div className="educational-test-question-container">
                  {avaliacao.questaos
                    .map((items, index) => (
                      <div key={index}>
                        <div className="educational-test-question-items">
                          <div className="educational-test-question-name">
                            <h4>{items.nome}</h4>
                          </div>
                          <div className="educational-test-question-description">
                            <p>{items.enunciado}</p>
                          </div>
                          <>
                            <TextField
                              label="Resposta"
                              value={resposta[index].resposta}
                              onChange={e => {
                                const resposta = e.target.value;
                                setResposta(currentResponse =>
                                  produce(currentResponse, v => {
                                    v[index].idQuestao = items.idQuestao;
                                    v[index].resposta = resposta;
                                  })
                                );
                              }}
                              fullWidth
                              multiline
                              rows={7}
                            />
                          </>

                        </div>

                      </div>
                    ))}
                  <ButtonOne
                    description="Enviar"
                    color="var(--green)"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}