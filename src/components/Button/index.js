import React from "react";
import { Link } from "react-router-dom";

import './index.css';

function ButtonOne({ ...props }) {

  return (
    <>
      {props.link !== undefined
        ?
        <>
          <Link to={props.link}>
            <button
              className={"button-one"}
              style={{ background: props.color }}
            >
              {props.description}
            </button>
          </Link>
        </>
        :
        <>
          <button
            className="button-one"
            style={{ background: props.color }}
            onClick={props.onClick}
          >
            {props.description}
          </button>
        </>
      }
    </>
  )
}

function ButtonTwo({ ...props }) {
  return (
    <>
      <button
        className="button-two"
        {...props}
      >
        {props.icon}
        {props.name}
      </button>
    </>
  )
}

export { ButtonOne, ButtonTwo }