import React from "react";

import './index.css';

function Input({ ...props }) {
  return (
    <div className="textbox">
      <label>{props.label}</label>
      <input name={props.label} type={props.type} placeholder={props.placeholder} />
      {props.children}
    </div>
  )
}

function Textarea({ ...props }) {
  return (
    <div className="textarea">
      <label>{props.label}</label>
      <textarea name={props.label} {...props} />
    </div>
  )
}


export {Input, Textarea};