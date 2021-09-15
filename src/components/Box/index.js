import React from "react";

import { Link } from "react-router-dom";

import './index.css';

export default function Box({...props}) {
    return (
        <>
        {props.link !== undefined ? 
            <div className="box-container">
                <Link to={props.link}>
                    <button className="box">
                        <h3>{props.title}</h3>
                    </button>
                </Link>
            </div>
            :
            <div className="box-container">
                <div className="box">
                    <p>{props.title}</p>
                    <p className="box-content">{props.content}</p>
                </div>
            </div>
        }
        </>
    )
}