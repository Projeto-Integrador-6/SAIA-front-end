import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

import './index.css';

export default function PageTitle({ ...props }) {
  return (
    <div className="page-title-container">
      {props.backLink !== undefined &&
        <div className="page-title-back-button">
          <Link to={props.backLink}>
            <Button variant="contained" startIcon={<ArrowBackIcon />} disableElevation>Voltar</Button>
          </Link>
        </div>
      }
      <h2 className="page-title-h2">{props.title}</h2>
    </div>
  )
}