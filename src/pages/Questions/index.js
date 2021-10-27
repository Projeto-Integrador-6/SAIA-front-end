import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import { ButtonTwo } from "../../components/Button";
import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import api from '../../services/api';

import './index.css';

export default function Questions() {

  const [questoes, setQuestoes] = useState([])

  useEffect(() => {
    document.title = `SAIA - Questões`

    setTimeout(async () => {
      const response = await api.get(`/questao`)
      setQuestoes(response.data)
    }, 500)

  }, [])

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

      {questoes.map(items => (
        <div className="educational-test-list">
          <ListCard content={items.nome}
            buttons={
              <div className="educational-test-list-buttons">
                <Link to="questions/edit">
                  <ButtonTwo icon={<CreateIcon />} name="Editar" />
                </Link>
              </div>
            } />
        </div>
      ))

      }
    </Sidebar>
  )
}