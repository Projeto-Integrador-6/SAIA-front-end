import React from "react";
import FullCard from "../../components/FullCard";

import { Input, Textarea } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function EducationalTestCreate() {
  return (
    <Sidebar>
      <PageTitle title="Criando Avaliação" />


      <FullCard title="Dados da avaliação">
        <div className="input-block">
          <Input
            label="Nome da avaliação"
            type="text"
            placeholder="Digite o nome da avaliação"
          />
        </div>
        <div className="input-block">
          <Textarea
            label="Descrição da avaliação"
            placeholder="Digite a descrição da avaliação"
          />
        </div>
      </FullCard>

      <FullCard title="Questões da avaliação">

      </FullCard>


    </Sidebar>
  )
}