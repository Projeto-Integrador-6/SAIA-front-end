import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BiHomeAlt, BiMenu } from "react-icons/bi";

import './index.css';
import Navbar from "../Navbar";

export default function Sidebar({ ...props }) {

  const [sidebar, setSidebar] = useState(false);

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <div className="sidebar-container">
      <div className={sidebar === true ? 'sidebar active' : 'sidebar'}>
        <ul>
          <li>
            <div className="toggle">
              <button className={sidebar === true ? 'toggle-btn active' : 'toggle-btn'} onClick={handleSidebar}><BiMenu /></button>
            </div>
            <Link to="/">
              <span className="icon"><BiHomeAlt /></span>
              <span className="title">Home</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        {props.children}
      </div>
    </div>
  )
}