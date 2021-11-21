import { useState, useEffect, useContext } from 'react';
import jwtDecode from "jwt-decode";

import { SnackContext } from '../SnackContext';

import api from '../../services/api';

export default function useAuth() {
  const { setSnack } = useContext(SnackContext);

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // TIPOS DE USUÁRIO
  function type(value) {
    let types = ['Aluno', 'Professor', 'Coordenador'];

    return types[value];
  }

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem('token');

      if (token) {
        let tokenDecoded = jwtDecode(token);
        tokenDecoded.usuario.password = null;

        await new Promise(resolve => setTimeout(resolve, 1000))

        if (tokenDecoded.exp < Date.now() / 1000) {
          handleLogout();
        }

        else {
          setUser(tokenDecoded.usuario);
          setUserType({ id: tokenDecoded.usuario.tipoUsuario, descricao: type(tokenDecoded.usuario.tipoUsuario) });
          api.defaults.headers['Authorization'] = `Bearer ${token}`;
          setLoading(false);
        }
      }
      setLoading(false);
    }

    loadData();
  }, []);

  async function handleLogin(values) {
    try {
      const response = await api.post('/login', { ...values });
      localStorage.setItem('token', response.data.token);
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      response.data.usuario.password = null;
      setUser(response.data.usuario);
      setUserType({ id: response.data.usuario.tipoUsuario, descricao: type(response.data.usuario.tipoUsuario) });
    } catch (res) {
      if (!res.response) {
        setSnack({ message: res.response.data.error, type: 'error', open: true });
      }
    }
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return { user, userType, loading, handleLogin, handleLogout };
}