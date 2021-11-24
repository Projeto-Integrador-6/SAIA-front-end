import React from "react";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import './index.css';

export default function TripleBox({...props}) {

    let {
        hasTooltip,
        tooltipTitle,
        firstTitle, 
        firstContent, 
        firstContentColor, 
        secondTitle, secondContent, 
        secondContentColor, thirdTitle, 
        thirdContent, 
        thirdContentColor
    } = props;

    return(
        <>
        { hasTooltip ?
            <Tooltip 
            title={tooltipTitle} 
            followCursor={true}
        > 
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
        </Tooltip>
        :
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
        }
        </>
    )
}