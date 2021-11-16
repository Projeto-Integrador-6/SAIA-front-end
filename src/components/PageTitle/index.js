import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from "react-router-dom";
import { Icon } from '../../components/Button';

import './index.css';

export default function PageTitle({ ...props }){
  return(
    <div className="page-title-container">
      {props.backLink !== undefined &&
        <Link to={props.backLink}>
           <Icon icon={<ArrowBackIcon />}/>
        </Link>
      }
      <h2 className="title">{props.title}</h2>
    </div>
  )
}