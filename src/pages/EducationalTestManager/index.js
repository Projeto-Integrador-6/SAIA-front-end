import React, { useEffect } from "react";
import { BiPlus, BiCog, BiFileBlank } from "react-icons/bi";
import { Link } from "react-router-dom";

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function EducationalTest() {

  useEffect(() => {
    document.title = `SAIA - Avaliações`
  })

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="educational-test-nav">
        <ListCard content={
          <div className="educational-test-nav-buttons">
            <Link to="educational_test/create">
              <button><BiPlus />Criar Avaliação</button>
            </Link>
          </div>
        } />
      </div>

      <div className="educational-test-list">
        <ListCard content="Avaliação de Algoritmos"
          buttons={
            <div className="educational-test-list-buttons">
              <button><BiFileBlank/>Visualizar</button>
              <button><BiCog/>Configurações</button>
            </div>
          } />
      </div>
    </Sidebar>
  )
}