import React from "react";

import './index.css';

export default function DataGridContainer({ ...props }) {
  return (
    <div className="datagrid-container">
      {props.children}
    </div>
  )
}