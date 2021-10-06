import React, { useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';

import { Icon } from "../../components/Button";

import './index.css';
import { Pagination } from "@mui/material";

export default function EducationalTestInProgress() {

  useEffect(() => {
    document.title = `SAIA - Avaliação: Algoritmos XXX`
  })

  return (
    <div className="educational-test-progress-container">
      <div className="educational-test-progress-header">
        <div className="educational-test-progress-btn-back">
            <Icon icon={<ArrowBackIcon />} size="large" />
        </div>

        <div className="educational-test-progress-title">
          <h3>Avaliação</h3>
          <p>Descrição de Aplicação</p>
        </div>

        <div className="educational-test-progress-coutdown">
          <h4><TimerIcon/> 2:00</h4>
        </div>
      </div>

      <div className="educational-test-progress-body">
        <div className="educational-test-progress-pagination">
          <Pagination count={10} color="primary" size="large" boundaryCount={30}/>
        </div>

        <div className="educational-test-progress-question">

        </div>
      </div>
    </div>
  )
}