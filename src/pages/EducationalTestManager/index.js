import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";
import { ButtonTwo } from "../../components/Button";

import api from '../../services/api';

import './index.css';

export default function EducationalTestManager() {

  const [avalicao, setAvalicao] = useState([]);

  useEffect(() => {
    document.title = `SAIA - Avaliações`;

    setTimeout(async () => {
      const response = await api.get(`/avaliacao`);
      setAvalicao(response.data);
    }, 500)

  })

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="educational-test-nav">
        <ListCard content={
          <Link to="educational_test/create">
            <ButtonTwo icon={<AddIcon />} name="Criar Avaliação" />
          </Link>
        } />
      </div>

      <div className="educational-test-list">
        {avalicao.map((items =>
          <ListCard content={items.nome}
            buttons={
              <div className="educational-test-list-buttons">
                <ButtonTwo icon={<RemoveRedEyeIcon />} name="Visualizar" />
                <Link to="educational_test/edit">
                  <ButtonTwo icon={<CreateIcon />} name="Editar" />
                </Link>
              </div>
            } />
        ))}
      </div>
    </Sidebar>
  )
}