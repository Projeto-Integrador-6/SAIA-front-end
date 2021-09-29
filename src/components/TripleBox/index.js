import React from "react";

import './index.css';

export default function TripleBox({...props}) {

    let {firstTitle, firstContent, firstContentColor, secondTitle, secondContent, secondContentColor, thirdTitle, thirdContent, thirdContentColor} = props;

    return(
        <div className="triple-box-container">
            <div className="triple-box">
                <p className="box-title">{firstTitle}</p>
                <p className="box-content" style={{color: firstContentColor}}>{firstContent}</p>
            </div>
            <div className="triple-box">
                <p className="box-title">{secondTitle}</p>
                <p className="box-content" style={{color: secondContentColor}}>{secondContent}</p>
            </div>
            <div className="triple-box">
                <p className="box-title">{thirdTitle}</p>
                <p className="box-content" style={{color: thirdContentColor}}>{thirdContent}</p>
            </div>
        </div>
    )
}