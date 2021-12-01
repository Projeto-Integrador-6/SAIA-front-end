import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import Sidebar from '../../components/Sidebar'
import PageTitle from '../../components/PageTitle'
import FullCard from "../../components/FullCard";
import LoadingProgress from "../../components/LoadingProgress";

import api from '../../services/api';

import './index.css';

export default function UserResults() {
  let { nome, idUsuario, idAplicacao } = useParams();

  const [aplicacao, setAplicacao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Resultados de: ${nome}`;

    setTimeout(async () => {
      const response = await api.get(`/resposta/${idUsuario}/${idAplicacao}`)
      setAplicacao(response.data);

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

          {aplicacao.aplicacao.avaliacao.questaos.map(questao => (
            <FullCard key={questao.idQuestao} title={questao.nome}>
              <FormControl component="fieldset">
                <div className="alternative-container-user-response">

                  <div className="alternative-user-response-type">
                    <p>Resposta Marcada Pelo Usuário</p>

                    <RadioGroup
                      name="alternativa-correta"
                    >
                      {aplicacao.respostas_usuario.map(alternativa_corrreta => (
                        questao.idQuestao === alternativa_corrreta.idQuestao &&
                        <FormControlLabel
                          value={alternativa_corrreta.idAlternativa}
                          control={<Radio />}
                          checked={true}
                          label={alternativa_corrreta.descricao}
                        />
                      ))}

                    </RadioGroup>
                  </div>

                  <div className="alternative-user-response-type">
                    <RadioGroup
                      name="alternativas-questao"
                    >
                      <p>Alternativas da Questão (A Alternativa Marcada é a alternativa correta da questão)</p>

                      {questao.alternativas.map(alternativa => (
                        <>
                          <FormControlLabel
                            value={alternativa.idAlternativa}
                            control={<Radio />}
                            checked={alternativa.isAlternativaCorreta}
                            label={alternativa.descricao}
                          />
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