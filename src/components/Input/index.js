import React from "react";

import './index.css';

function FieldInput({ ...props }) {
  return (
    <div className="textbox">
      <label>{props.label}</label>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      {props.children}
    </div>
  )
}

function Textarea({ ...props }) {
  return (
    <div className="textarea">
      <label>{props.label}</label>
      <textarea
        {...props}
      />
    </div>
  )
}

function RadioButton({ ...props }) {
  return (
    <div className="radio-button">
      <label className="radio-button-container">
        {props.label}
        <input
          type="radio"
          {...props}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}


export { FieldInput, Textarea, RadioButton };