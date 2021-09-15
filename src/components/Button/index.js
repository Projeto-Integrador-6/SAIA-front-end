import React from "react";
import { Link } from "react-router-dom";

import './index.css';

export default function Button({ ...props }) {
  return (
    <>
      {props.link !== undefined
        ?
        <>
          <Link to={props.link}>
            <button
              className="button"
              style={{ background: props.color }}
            >
              {props.description}
            </button>
          </Link>
        </>
        :
        <>
          <button
            className="button"
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