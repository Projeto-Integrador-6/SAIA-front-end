import React, { useEffect } from "react";

import Sidebar from '../../components/Sidebar'
import PageTitle from '../../components/PageTitle'

export default function GeneralResults() {

    useEffect(() => {
        document.title = `SAIA - Análises Gerais`
    })  

    return (
        <Sidebar>
            <PageTitle title="Análises Gerais" />
        </Sidebar>
    )
}
