import React from "react";

import './index.css';

export default function ListCard({ ...props }){
  return(
    <div className="list-card">
      <div className="list-info">
        <h4>{props.content}</h4>
      </div>
      <div className="list-btn">
        {props.buttons}
      </div>
    </div>
  )
}