import React from 'react';

import Box from '../../components/Box'

import './index.css'

export default function Home(){
  return(
    <div className="home-container">
      <h1>Home</h1>
      <div className="side-navigation">
        <h3>Navegação</h3>
        <div className="boxes-container">
          <Box title="AVALIAÇÕES" link="/avaliacoes"/>
          <Box title="ALUNOS" link="/alunos"/>
          <Box title="TESTE" link="/teste"/>
        </div>
      </div>
      <div className="side-resume">
        <h3>Resumo</h3>
        <div className="boxes-container">
          <Box title="AVALIAÇÕES EM ANDAMENTO" content={10}/>
          <Box title="AVALIAÇÕES CRIADAS" content={12}/>
        </div>
      </div>
    </div>
  )
}

