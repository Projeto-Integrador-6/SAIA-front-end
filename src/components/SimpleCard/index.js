import React from "react";

import './index.css';

export default function SimpleCard({ ...props }) {
  return (
    <div key={props.key} className="simple-card" >
      <div className="simple-card-items">
        <div className="simple-card-item-1">
          {props.children}
        </div>
        <div className="simple-card-item-2">
          {props.buttons}
        </div>
      </div>
    </div >
  )
}