import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Sidebar from '../../components/Sidebar'
import PageTitle from '../../components/PageTitle'
import FullCard from "../../components/FullCard";
import ListCard from "../../components/ListCard";
import LoadingProgress from "../../components/LoadingProgress";

import api from '../../services/api';
import { ButtonTwo } from "../../components/Button";

export default function IndividualResults() {
  let { id } = useParams();

  const [aplicacao, setAplicacao] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Análise Individual por Avaliação`;

    setTimeout(async () => {
      const response = await api.get(`/resposta/procurar_pessoas/${id}`)
      setAplicacao(response.data);

      setLoading(false);
    }, 500);

  }, [id])

  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title={"Resultados Individuais de: " + aplicacao.aplicacao} backLink="/manager/enforcement" />

          <FullCard title="Alunos que responderam" noBody={true}>
            {
              aplicacao.respondeu.length != 0
                ?
                aplicacao.respondeu.map((items, index) => (
                  <ListCard
                    key={index}
                    content={items.nome}
                    buttons={
                      <Link to={`/manager/enforcement/individual_results/user_results/${items.nome}/${items.idUsuario}/${id}`}>
                        <ButtonTwo icon={<PlayArrowIcon />} name="Acessar respostas" />
                      </Link>
                    }
                  />
                ))
                :
                <p>Nenhum aluno respondeu essa avaliação ainda.</p>
            }
          </FullCard>

          <FullCard title="Alunos que não responderam" noBody={true}>
            {
              aplicacao.nao_respondeu.length != 0
                ?
                aplicacao.nao_respondeu.map((items, index) => (
                  <ListCard key={index} title={items.nome} />
                ))
                :
                <p>Todos alunos responderam a avaliação.</p>
            }
          </FullCard>
        </>
      }

    </Sidebar>
  )
}