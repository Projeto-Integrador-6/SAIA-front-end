import React from "react";

import './index.css';

export default function Input({ ...props }) {
  return (
    <div className="textbox">
      <label>{props.label}</label>
      <input type={props.type} placeholder={props.placeholder} />
      {props.children}
    </div>
  )
}