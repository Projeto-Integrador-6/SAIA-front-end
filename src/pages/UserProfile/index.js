import React, { useContext, useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";
import LoadingProgress from "../../components/LoadingProgress";

import { AuthContext } from '../../contexts/AuthContext';

import api from '../../services/api';

import './index.css';

export default function UserProfile() {
  const { user } = useContext(AuthContext);

  const [usuario, setUsuario] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `SAIA - Meu Perfil`

    setTimeout(async () => {
      const response = await api.get(`/usuario/${user.idUsuario}`);
      setUsuario(response.data.usuario);
      setDisciplinas(response.data.disciplinas);

      setLoading(false);

    }, 500)


  }, [user.idUsuario])

  // TIPOS DE USUÁRIO
  function type(value) {
    let types = ['Aluno', 'Professor', 'Coordenador'];

    return types[value];
  }

  return (
    <Sidebar>
      {loading ?
        <LoadingProgress />
        :
        <>
          <PageTitle title={"[" + type(usuario.tipoUsuario) + "] " + usuario.nome} />
          <div className="user-profile">
            <h3 style={{fontWeight:"bold"}}>Meus Dados</h3>

            <div className="user-profile-items">
              <div className="user-profile-item">
                <h4 style={{fontWeight:"bold"}}>E-mail</h4>
                <p>{usuario.email}</p>
              </div>
            </div>

          {usuario.tipoUsuario === 0  &&
            <h4 style={{fontWeight:"bold"}}>Disciplinas em curso</h4>
          } 
          {usuario.tipoUsuario === 1 &&
            <h4 style={{fontWeight:"bold"}}>Disciplinas que ministra</h4>
          }
     
            <div className="user-profile-subjects">
              {disciplinas.map(items => (
                <div className="user-profile-subject">
                  <p>{items.nome}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    </Sidebar>
  )
}