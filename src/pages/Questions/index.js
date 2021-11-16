import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';

import { ButtonTwo } from "../../components/Button";
import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css';

export default function Questions() {
  const { user } = useContext(AuthContext);

  const [questoes, setQuestoes] = useState([])

  useEffect(() => {
    document.title = `SAIA - Questões`

    setTimeout(async () => {
      const response = await api.get(`/questao/user/${user.idUsuario}`);
      setQuestoes(response.data.result)
    }, 500)

  }, [])

  return (
    <Sidebar>
      <PageTitle title="Questões" />

      <div className="educational-test-nav">
        <ListCard content={
          <Link to="questions/create">
            <ButtonTwo icon={<AddIcon />} name="Criar Questão" />
          </Link>
        } />
      </div>

      {questoes.map(items => (
        <div className="educational-test-list">
          <ListCard content={items.nome}
            buttons={
              <div className="educational-test-list-buttons">
                <Link to={`questions/update/${items.idQuestao}`}>
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