import React from "react";

import './index.css';

export default function FullCard({ ...props }) {
  return (
    <div className="full-card-container">
      <h4>{props.title}</h4>
      <div className="full-card">
        {props.children}
      </div>
    </div>
  )
}