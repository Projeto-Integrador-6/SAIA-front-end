import React from "react";
import { BiPlus, BiCog, BiFileBlank } from "react-icons/bi";

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function EducationalTest() {
  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="test-nav">
        <ListCard content={
          <div className="test-nav-buttons">
            <button><BiPlus />Nova Avaliação</button>
          </div>
        } />
      </div>

      <div className="test-list">
        <ListCard content="Avaliação de Algoritmos"
          buttons={
            <div className="test-list-buttons">
              <button><BiFileBlank/>Visualizar</button>
              <button><BiCog/>Configurações</button>
            </div>
          } />
      </div>
    </Sidebar>
  )
}