import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiMenu, BiFile, BiFileBlank, BiCalendar, BiCheck } from "react-icons/bi";

import Chatbot from "../Chatbot";

import './index.css';

export default function Sidebar({ ...props }) {

  const [sidebar, setSidebar] = useState(false);

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <>
      <div className={sidebar === true ? 'sidebar active' : 'sidebar'}>
        <ul className="nav-toggle">
          <li>
            <div className="toggle">
              <button className={sidebar === true ? 'toggle-btn active' : 'toggle-btn'} onClick={handleSidebar}><BiMenu /></button>
            </div>
          </li>
        </ul>
        <ul className="nav-icons">
          <li>
            <NavLink to="/home" activeStyle={{ background: 'var(--green-dark)' }}>
              <span className="side-icon"><BiHomeAlt /></span>
              <span className="side-title">Início</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/educational_test" activeStyle={{ background: 'var(--green-dark)' }}>
              <span className="side-icon"><BiFile /></span>
              <span className="side-title">Avaliações</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/questions" activeStyle={{ background: 'var(--green-dark)' }}>
              <span className="side-icon"><BiFileBlank /></span>
              <span className="side-title">Questões</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/enforcement" activeStyle={{ background: 'var(--green-dark)' }}>
              <span className="side-icon"><BiCalendar /></span>
              <span className="side-title">Aplicações</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/results" activeStyle={{ background: 'var(--green-dark)' }}>
              <span className="side-icon"><BiCheck /></span>
              <span className="side-title">Resultados</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="body">
        <div className="navbar">
          <div className="brand">
            <h3>SAIA</h3>
          </div>
          <div className="user">
            <p>Olá, Usuário</p>
          </div>
        </div>

        <div className="content">
          {props.children}

        </div>
      </div>
      
      {/* <Chatbot /> */}

    </>
  )
}