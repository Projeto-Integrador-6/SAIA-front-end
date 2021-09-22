import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { BiHomeAlt, BiMenu, BiFile, BiFileBlank, BiCheck } from "react-icons/bi";

import './index.css';

export default function Sidebar({ ...props }) {

  const [sidebar, setSidebar] = useState(false);

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <>
      <div className={sidebar === true ? 'sidebar active' : 'sidebar'}>
        <ul>
          <li>
            <div className="toggle">
              <button className={sidebar === true ? 'toggle-btn active' : 'toggle-btn'} onClick={handleSidebar}><BiMenu /></button>
            </div>
          </li>
          <li>
            <NavLink to="/home" activeStyle={{ background: 'var(--green-dark)'}}>
              <span className="icon"><BiHomeAlt /></span>
              <span className="title">Início</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/educational_test" activeStyle={{ background: 'var(--green-dark)'}}>
              <span className="icon"><BiFile /></span>
              <span className="title">Avaliações</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/questions" activeStyle={{ background: 'var(--green-dark)'}}>
              <span className="icon"><BiFileBlank /></span>
              <span className="title">Questões</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/manager/results" activeStyle={{ background: 'var(--green-dark)'}}>
              <span className="icon"><BiCheck /></span>
              <span className="title">Resultados</span>
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

    </>
  )
}