import React from "react";

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";

import './index.css';

export default function UserProfile() {
  return (
    <Sidebar>
      <PageTitle title="LUIZ FERNANDO DE SOUZA" />

      <div className="user-profile">
        <h4>Meus Dados</h4>

        <div className="user-profile-items">
          <div className="user-profile-item">
            <h3>E-mail</h3>
            <p>zluizfs@outlook.com</p>
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