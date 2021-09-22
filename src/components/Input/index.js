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

function RadioButton({ ...props }) {
  return (
    <div className="radio-button">
      <label className="radio-button-container">
        {props.label}
        <input type="radio" name={props.name} {...props} />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}


export { Input, Textarea, RadioButton };