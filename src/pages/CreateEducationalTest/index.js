import React, { useEffect, useState } from "react";
import DialogActions from '@mui/material/DialogActions';

import { ButtonTwo } from "../../components/Button";
import DialogBox from "../../components/DialogBox";
import FullCard from "../../components/FullCard";
import { FieldInput, Textarea } from "../../components/Input";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function CreateEducationalTest() {

  const [modalQuestion, setModalQuestion] = useState(false);

  useEffect(() => {
    document.title = `SAIA - Criando Avaliação`
  })

  return (
    <Sidebar>
      <PageTitle title="Criando Avaliação" />

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

        <FullCard title="Questões da avaliação" button={<ButtonTwo name="Adicionar Questão" onClick={() => setModalQuestion(true)} />} >

        </FullCard>
      </form>

      <DialogBox
        open={modalQuestion}
        onClose={() => setModalQuestion(false)}
        title="Adicionando Questões"
      >
        <form>
          <FieldInput
            name="questions"
            label="Questões"
            type="text"
            placeholder="Procure por questões..."
          />
        </form>

        <DialogActions>
          <ButtonTwo name="Fechar" onClick={() => setModalQuestion(false)}/>
        </DialogActions>
      </DialogBox>

    </Sidebar>
  )
}