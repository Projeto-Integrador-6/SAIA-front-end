import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BiHomeAlt, BiMenu, BiFile } from "react-icons/bi";

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
            <Link to="/">
              <span className="icon"><BiHomeAlt /></span>
              <span className="title">Início</span>
            </Link>
          </li>
          <li>
            <Link to="/educational_test">
              <span className="icon"><BiFile /></span>
              <span className="title">Avaliações</span>
            </Link>
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