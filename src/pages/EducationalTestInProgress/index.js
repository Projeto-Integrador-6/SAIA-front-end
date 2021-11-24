import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
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
      await api.post(`/resposta`, { idAplicacao, idUsuario, resposta });
      setSnack({ message: "Avaliação respondida com sucesso.", type: 'success', open: true });
      history.push("/educational_test")
    } catch (err) {
      setSnack({ message: "Houve um problema durante o envio das respostas.", type: 'error', open: true });
    }
  }

  function formatDateDayFrist(date) {
    var d = new Date(date);
    var h = new Date(date)
    d = new Date(d.getTime() + d.getTimezoneOffset() * 60000)

    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = d.getFullYear();

    var hours = h.getHours();
    var minutes = h.getMinutes();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    if (hours.length < 2)
      hours = '0' + hours;
    if (minutes.length < 2)
      minutes = '0' + minutes;

    return [day, month, year].join('/') + " às " + [hours, minutes].join(':');
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
              <div className="educational-test-progress-coutdown">
                <h4>
                  <TimerIcon />
                  <p>Disponível até {formatDateDayFrist(aplicacao.dataFim)}</p>
                </h4>
              </div>
            </div>
            <div></div>
          </div>

          <div className="educational-test-progress-body">
            <form onSubmit={save}>
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
                              name="alternativas"
                              onChange={e => {
                                const resposta = e.target.value;
                                setResposta(currentResponse =>
                                  produce(currentResponse, v => {
                                    v[index].idQuestao = items.idQuestao;
                                    v[index].resposta = resposta;
                                  })
                                );
                              }}

                            >
                              {items.alternativas.map(items => (
                                <FormControlLabel
                                  value={items.idAlternativa}
                                  control={<Radio />}
                                  label={items.descricao}
                                />
                              ))}

                            </RadioGroup>
                          </FormControl>

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