import React from "react";

import './index.css';

export default function FullCard({ ...props }) {
  return (
    <div className="full-card-container">
      <div className="full-card-title">
        <h4>{props.title}</h4>
        {props.button && 
          props.button
        }
      </div>
      <div className="full-card">
        {props.children}
      </div>
    </div>
  )
}