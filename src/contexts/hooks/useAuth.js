import { useState, useEffect, useContext } from 'react';
import jwtDecode from "jwt-decode";

import { SnackContext } from '../SnackContext';

import api from '../../services/external';

export default function useAuth() {
  const { setSnack } = useContext(SnackContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (jwtDecode(token).exp < Date.now() / 1000) {
          handleLogout();
        }

        else {
          setUser(JSON.parse(user));
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
      const response = await api.post('/api/login', { ...values });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
    } catch (res) {
      setSnack({ message: res.response.data.message, type: 'error', open: true });
    }
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return { user, loading, handleLogin, handleLogout };
}