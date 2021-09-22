import React from 'react';

import Box from '../../components/Box'
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';

import './index.css'

export default function Home() {
  
  return (
    <Sidebar>
      <div className="home-container">
        <PageTitle title="HOME"/>
        <div className="boxes-navigation">
          <p className="box-title">NAVEGAÇÃO</p>
          <div className="boxes-container">
            <Box title="AVALIAÇÕES" link="/avaliacoes" />
            <Box title="ALUNOS" link="/alunos" />
            <Box title="TESTE" link="/teste" />
          </div>
        </div>
        <div className="boxes-navigation">
          <p className="box-title">RESUMO</p>
          <div className="boxes-container">
            <Box title="AVALIAÇÕES EM ANDAMENTO" content={10} />
            <Box title="AVALIAÇÕES CRIADAS" content={12} />
          </div>
        </div>
      </div>
    </Sidebar>
  )
}

