import React from "react";

import './index.css';

export default function ListCard({ ...props }) {
  return (
    <div className="list-card">
      <div className="list-info">
        <h4>{props.content}</h4>
      </div>
      {props.buttons !== undefined &&
        <div className="list-btn">
          {props.buttons}
        </div>
      }
    </div >
  )
}