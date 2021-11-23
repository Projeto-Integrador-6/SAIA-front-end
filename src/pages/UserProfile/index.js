import React, { useEffect, useState, useContext } from "react";

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";

import api from '../../services/api';

import { AuthContext } from '../../contexts/AuthContext';

import './index.css';

export default function UserProfile() {

  const { user } = useContext(AuthContext);

  const [userData, setUser] = useState({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Perfil`

    setTimeout (async () => {
      const userResponse = api.get(`usuario/${user.idUsuario}`)
      setUser(userResponse.data.usuario)

      setLoading(false);
    }, 500)
  }, [user.idUsuario])
  

  return (
    <Sidebar>
      <PageTitle title={userData.nome} />

      <div className="user-profile">
        <h4>Meus Dados</h4>

        <div className="user-profile-items">
          <div className="user-profile-item">
            <h3>E-mail</h3>
            <p>{userData.email}</p>
          </div>

          <div className="user-profile-item">
            <h3>Curso</h3>
            <p>Sistemas de Informação</p>
          </div>
        </div>

        <h4>Dados do Curso</h4>

        <div className="user-profile-subjects">
          <h3>Disciplinas em curso</h3>

          <div className="user-profile-subject">
            <p>Algoritmos</p>
          </div>

          <div className="user-profile-subject">
            <p>Auditoria e Segurança</p>
          </div>

          <div className="user-profile-subject">
            <p>Projeto Integrador</p>
          </div>

          <div className="user-profile-subject">
            <p>Desenvolvimento WEB II</p>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}