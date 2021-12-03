import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import Sidebar from '../../components/Sidebar'
import PageTitle from '../../components/PageTitle'
import FullCard from "../../components/FullCard";
import LoadingProgress from "../../components/LoadingProgress";
import TripleBox from "../../components/TripleBox";

import api from '../../services/api';

import './index.css';


export default function UserResults() {
  let { nome, idUsuario, idAplicacao } = useParams();

  const [aplicacao, setAplicacao] = useState([]);
  const [resumo, setResumo] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Resultados de: ${nome}`;

    setTimeout(async () => {
      const aplicacao_reponse = await api.get(`/resposta/${idUsuario}/${idAplicacao}`);
      const resumo_response = await api.get(`/analise/${idAplicacao}/${idUsuario}`);
      
      setAplicacao(aplicacao_reponse.data);
      setResumo(resumo_response.data);

      setLoading(false);
    }, 500);

  }, [idUsuario, idAplicacao, nome])

  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title={`Resultados de ${nome} da ` + aplicacao.aplicacao.nome} backLink={`/manager/enforcement/individual_results/${idAplicacao}`} />
          <div className="results-individual-resume">
            <p className="title">RESUMO</p>
            <TripleBox
              hasTooltip={true}
              tooltipTitle={<div><p>{"0% - 40% RUIM"}</p> <p>{"41% - 80% BOM"}</p> <p>{"80% - 100% ÓTIMO"}</p></div>}
              firstTitle="PERCENTUAL DE ACERTO"
              firstContent={`${resumo.resume[0].hitPercentage}`}
              firstContentColor="var(--green)"
              secondTitle="PERCENTUAL DE ERROS"
              secondContent={`${resumo.resume[0].errorPercentage}`}
              secondContentColor="var(--red)"
              thirdTitle="DESEMPENHO GERAL"
              thirdContent={resumo.resume[0].performance}
              thirdContentColor="var(--green)">
            </TripleBox>
          </div>

          {aplicacao.aplicacao.avaliacao.questaos.map(questao => (
            <FullCard key={questao.idQuestao} title={questao.nome}>
              <FormControl component="fieldset">
                <div className="alternative-container-user-response">

                  <div className="alternative-user-response-type">
                    <RadioGroup
                      name="alternativa-correta"
                    >
                      {aplicacao.respostas_usuario.map(alternativa_correta => (
                        questao.idQuestao === alternativa_correta.idQuestao &&
                        <>
                          <FormControlLabel
                            value={alternativa_correta.idAlternativa}
                            control={<Radio color={alternativa_correta.correta ? "primary" : "error"} />}
                            checked={true}
                            label={alternativa_correta.descricao}
                          />

                          {questao.alternativas.map(alternativa => (
                            alternativa_correta.idAlternativa !== alternativa.idAlternativa &&
                            <>
                              <FormControlLabel
                                value={alternativa.idAlternativa}
                                control={<Radio />}
                                checked={alternativa.isAlternativaCorreta}
                                label={alternativa.descricao}
                              />
                            </>
                          ))}
                        </>
                      ))}

                    </RadioGroup>
                  </div>
                </div>
              </FormControl>
            </FullCard>
          ))}
        </>
      }

    </Sidebar >
  )
}