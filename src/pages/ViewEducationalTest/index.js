import React, { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import FullCard from "../../components/FullCard";
import LoadingProgress from "../../components/LoadingProgress";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import SimpleCard from "../../components/SimpleCard";

import api from '../../services/api';

import './index.css';

export default function ViewEducationalTest() {
  let { id } = useParams();

  const [avaliacao, setAvaliacao] = useState([]);
  const [questoes, setQuestoes] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      const response = await api.get(`/avaliacao/${id}`)
      setAvaliacao(response.data.avaliacao);
      setQuestoes(response.data.avaliacao.questaos)

      setLoading(false);
    }, 500);

    document.title = `SAIA - Visualizando Avaliação`;

  }, [])

  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title={`Visualizando Avaliação: ${avaliacao.nome}`} backLink="/manager/educational_test" />

          <FullCard title="Dados da avaliação" noBody={true}>
            <div className="educational-view-data">
              <div className="educational-view-data-item-1">
                <h4>Nome</h4>
                <p>{avaliacao.nome}</p>
              </div>
              <div className="educational-view-data-item-2">
                <h4>Descrição</h4>
                <p>{avaliacao.descricao}</p>
              </div>
            </div>
          </FullCard>

          <FullCard title="Questões da avaliação" noBody={true}>
            {questoes.map(items =>
              <SimpleCard key={items.idQuestao}>
                <div className="questions-view-list">
                  <div className="question-view-items">
                    <h4>{items.nome}</h4>
                    <p>Enunciado: {items.enunciado}</p>
                    <p>Valor: {items.valor}</p>
                  </div>
                  <div className="alternative-view-items">
                    <h4>Alternativas</h4>
                    {items.alternativas.map(items => (
                      <p>- {items.descricao} {items.isAlternativaCorreta === true && "(Resposta Correta)"}</p>
                    ))}
                  </div>
                </div>
              </SimpleCard>
            )}
          </FullCard>
        </>
      }
    </Sidebar >
  )
}