import React from "react";

import './index.css';


export default function EditorButtons({ ...props }){
  return(
    <div className="editor-buttons">
      {props.children}
    </div>
  )
}