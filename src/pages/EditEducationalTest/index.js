import React, { useEffect } from "react";
import { ButtonTwo } from "../../components/Button";
import FullCard from "../../components/FullCard";

import { FieldInput, Textarea } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import '../CreateEducationalTest/index.css';

export default function EditEducationalTest() {

  useEffect(() => {
    document.title = `SAIA - Editando Avaliação`
  })

  return (
    <Sidebar>
      <PageTitle title="Editando Avaliação" />

      <form>
        <FullCard title="Dados da avaliação">
          <div className="input-block">
            <FieldInput
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

        <FullCard title="Questões da avaliação" button={<ButtonTwo name="Adicionar Questão"/>} >

        </FullCard>
      </form>

    </Sidebar>
  )
}