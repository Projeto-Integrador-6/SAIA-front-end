import React from "react";

import './index.css';

export default function PageTitle({ ...props }){
  return(
    <div className="page-title-container">
      <h2 className="title">{props.title}</h2>
    </div>
  )
}