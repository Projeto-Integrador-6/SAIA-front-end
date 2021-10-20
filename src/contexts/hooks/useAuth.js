import { useState, useEffect } from 'react';

export default function useAuth() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = localStorage.getItem('user');

      setLoading(false);
    }

    loadData();
  }, []);

  async function handleLogin(values) {

    try {
      const response = 'Luiz Fernando';
      localStorage.setItem('user', response);
      setUser(response);
    } catch (res) {
      console.log('Erro')
    }
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return { user, loading, handleLogin, handleLogout };
}