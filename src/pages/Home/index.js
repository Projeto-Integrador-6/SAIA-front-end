import React, { useContext, useEffect, useState } from 'react';

import Box from '../../components/Box'
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css'

export default function Home() {
  const { user } = useContext(AuthContext);

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [aplicacoes, setAplicacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Home`

    setTimeout(async () => {
      const response = await api.get(`/usuario/status/${user.idUsuario}`);
      setAvaliacoes(response.data.avaliacoes[0]);
      setAplicacoes(response.data.aplicacoes[0]);

      setLoading(false);

    }, 500)

  }, [user.idUsuario])

  return (
    <Sidebar>
      {console.log(aplicacoes)}
      <div className="home-container">
        <PageTitle title="HOME" />
        <div className="boxes-navigation">
          <p className="box-title">NAVEGAÇÃO</p>
          <div className="boxes-container">
            <Box title="AVALIAÇÕES" link="/educational_test" />
            {user.tipoUsuario !== 0 &&
              <>
                <Box title="APLICAÇÕES" link="manager/enforcement" />
                <Box title="ANÁLISES GERAIS" link="/manager/general_results" />
              </>
            }
          </div>
        </div>
        <div className="boxes-navigation">
          <p className="box-title">RESUMO</p>
          <div className="boxes-container">
            <Box title="AVALIAÇÕES EM ANDAMENTO" content={loading ? 0 : aplicacoes.AvaliacoesEmAndamento} />
            {user.tipoUsuario !== 0 &&
              <Box title="AVALIAÇÕES CRIADAS" content={loading ? 0 : avaliacoes.AvaliacoesCriadas} />
            }
          </div>
        </div>
      </div>
    </Sidebar>
  )
}

