import React from "react";
import FullCard from "../../components/FullCard";
import { Input } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function CreateQuestions() {
  return (
    <Sidebar>
      <PageTitle title="Criando Questão" />


        <FullCard title="Dados da questão">
          <div className="input-block">
            <Input
              label="Nome da questão"
              type="text"
              placeholder="Digite o nome da questão"
            />
          </div>
        </FullCard>


    </Sidebar>
  )
}