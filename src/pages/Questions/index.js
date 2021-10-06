import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import { ButtonTwo } from "../../components/Button";
import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';


export default function Questions() {

  useEffect(() => {
    document.title = `SAIA - Questões`
  })

  return (
    <Sidebar>
      <PageTitle title="Questões" />

      <div className="educational-test-nav">
        <ListCard content={
          <div className="educational-test-nav-buttons">
            <Link to="questions/create">
              <ButtonTwo icon={<AddIcon />} name="Criar Questão" />
            </Link>
          </div>
        } />
      </div>

      <div className="educational-test-list">
        <ListCard content="Questão de Algoritmos"
          buttons={
            <div className="educational-test-list-buttons">
              <Link to="questions/edit">
                <ButtonTwo icon={<CreateIcon />} name="Editar" />
              </Link>
            </div>
          } />
      </div>
    </Sidebar>
  )
}