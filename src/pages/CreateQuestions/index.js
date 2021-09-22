import React, { useState } from "react";

import FullCard from "../../components/FullCard";
import { Input, RadioButton, Textarea } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";

import './index.css';

export default function CreateQuestions() {

  return (
    <Sidebar>
      <PageTitle title="Criando Questão" />

      <form>
        <FullCard title="Tipo da questão">
          <div className="input-block">
            <RadioButton
              label="Questão aberta"
              name="tipoQuestao"
              value="1"
            />
            <RadioButton
              label="Questão fechada"
              name="tipoQuestao"
              value="2"
            />
          </div>
        </FullCard>
        <FullCard title="Dados da questão">
          <div className="input-block">
            <Input
              label="Nome da questão"
              type="text"
              placeholder="Digite o nome da questão"
            />
          </div>
          <div className="input-block">
            <Textarea
              label="Enunciado da questão"
              placeholder="Digite o enunciado da avaliação"
            />
          </div>
          <div className="input-block">
            <Input
              label="Tags"
              type="text"
              placeholder="Digite as tags da questão"
            />
          </div>
        </FullCard>

        <FullCard title="Alternativas">
          <div className="input-block">

          </div>
        </FullCard>

        <Button
          description="Criar"
          color="var(--green)"
          type="submit"
        />
      </form>


    </Sidebar>
  )
}