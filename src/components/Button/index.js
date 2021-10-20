import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";

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
            {...props}
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
      <Button
        className="button-two"
        color="primary"
        disableElevation
        startIcon={props.icon}
        {...props}
      >
        {props.name}
      </Button>
    </>
  )
}

function Icon({...props}){
  return (
    <>
    <IconButton color="primary" {...props}>
      {props.icon}
    </IconButton>
    </>
  )
}

export { ButtonOne, ButtonTwo, Icon }