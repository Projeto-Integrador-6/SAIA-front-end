import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import { FormControl, FormControlLabel, Pagination, Radio, RadioGroup, TextField } from "@mui/material";
import produce from 'immer';
import { generate } from 'shortid';
import Countdown from 'react-countdown';

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

  const [aplicacao, setAplicacao] = useState([]);
  const [resposta, setResposta] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(async () => {
      const response = await api.get(`/aplicacao/avaliacao/${id}`);
      setAplicacao(response.data.result);

      // GERA RESPOSTAS PELA QUANTIDADE DE QUESTÃO
      for (let i = 0; i < response.data.result.avaliacao.questaos.length; i++) {
        setResposta(currentResponse => [...currentResponse, {
          idQuestao: generate(),
          resposta: ''
        }])
      }

      document.title = `SAIA - Avaliação: ${response.data.result.nome}`

      setLoading(false);

    }, 500)


  }, [])

  async function save(e) {
    e.preventDefault();
    try {
      let idAplicacao = id;
      let idUsuario = user.idUsuario;
      await api.post(`/resposta_aberta`, { idAplicacao, idUsuario, resposta });
      setSnack({ message: "Avaliação respondida com sucesso.", type: 'success', open: true });
      history.push("/educational_test")
    } catch (err) {
      setSnack({ message: "Houve um problema durante o envio das respostas.", type: 'error', open: true });
    }
  }

  const Completionist = () => <span>You are good to go!</span>;

  // FUNÇÃO PARA RETORNAR HORAS, MINUTOS E SEGUNDOS DO COUNTDOWN
  function renderer({ hours, minutes, seconds, completed }) {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  function convertHoursInMilliseconds(value) {
    let date = new Date(value)

    let dateFormated = date.getTime();

    return dateFormated;
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
              <h3>{aplicacao.nome}</h3>
              <p>{aplicacao.avaliacao.descricao}</p>
            </div>

            <div className="educational-test-progress-coutdown">
              <h4>
                <TimerIcon />
                {/* <Countdown
                  date={Date.now() }
                  renderer={renderer}
                /> */}
              </h4>
            </div>
          </div>

          <div className="educational-test-progress-body">
            <form onSubmit={save} method="POST">
              {aplicacao.avaliacao.questaos
                .map((items, index) => (
                  <div key={index}>
                    <div className="educational-test-progress-question">
                      <div className="educational-test-question-container">
                        <div className="educational-test-question-items">
                          <div className="educational-test-question-name">
                            <h4>{items.nome}</h4>
                          </div>
                          <div className="educational-test-question-description">
                            <p>{items.enunciado}</p>
                          </div>

                          <FormControl component="fieldset">
                            <RadioGroup
                              name="radio-buttons-group"
                            >
                              {items.alternativas.map(items => (
                                <FormControlLabel value={items.idAlternativa} control={<Radio />} label={items.descricao} />
                              ))}

                            </RadioGroup>
                          </FormControl>

                          {/* <>
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
                          </> */}

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <ButtonOne
                description="Enviar"
                color="var(--green)"
                type="submit"
              />
            </form>

          </div>
        </div>
      }
    </>
  )
}