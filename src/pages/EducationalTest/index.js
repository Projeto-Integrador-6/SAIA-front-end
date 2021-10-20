import React, { useEffect } from "react";


import ListCard from "../../components/ListCard";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/Sidebar";

import './index.css';

export default function EducationalTest() {

  useEffect(() => {
    document.title = `SAIA - Avaliações`
  })

  return (
    <Sidebar>
      <PageTitle title="Avaliações" />

      <div className="educational-test-student-nav">
        <ListCard content={
          <div className="educational-test-nav-buttons">

          </div>
        } />
      </div>

      <div className="educational-test-student-list">
      
      </div>
    </Sidebar>
  )
}