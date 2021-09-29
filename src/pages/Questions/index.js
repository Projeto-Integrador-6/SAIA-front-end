import React from "react";
import { BiPlus, BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function Questions() {


  return (
    <Sidebar>
      <PageTitle title="Questões" />

      <div className="educational-test-nav">
        <ListCard content={
          <div className="educational-test-nav-buttons">
            <Link to="questions/create">
              <button><BiPlus />Criar Questão</button>
            </Link>
          </div>
        } />
      </div>

      <div className="educational-test-list">
        <ListCard content="Questão de Algoritmos"
          buttons={
            <div className="educational-test-list-buttons">
              <button><BiCog />Configurações</button>
            </div>
          } />
      </div>
    </Sidebar>
  )
}