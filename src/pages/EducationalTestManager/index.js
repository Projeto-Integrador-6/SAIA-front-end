import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonTwo } from "../../components/Button";

import './index.css';

export default function EducationalTestManager() {

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
              <ButtonTwo icon={<AddIcon />} name="Criar Avaliação" />
            </Link>
          </div>
        } />
      </div>

      <div className="educational-test-list">
        <ListCard content="Avaliação de Algoritmos"
          buttons={
            <div className="educational-test-list-buttons">
              <ButtonTwo icon={<RemoveRedEyeIcon />} name="Visualizar" />
              <Link to="educational_test/edit">
                <ButtonTwo icon={<CreateIcon />} name="Editar" />
              </Link>
            </div>
          } />
      </div>
    </Sidebar>
  )
}