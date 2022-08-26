import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'

import api from '../../services/api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('access_token'))
  
  useEffect(() => {
    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      setToken(token)
      setUser(JSON.parse(user))
      
    } else{
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      api.defaults.headers.Authorization = undefined;
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);
  
 

  async function handleLogout(e) {
    e.preventDefault()
    try {
      const response = await api.get('logout')
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      api.defaults.headers.Authorization = undefined;
      setAuthenticated(false);
      history.push('/login');
      window.location.reload()
    } catch(error){
      console.log(error.response)
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      api.defaults.headers.Authorization = undefined;
      setAuthenticated(false);
    }
  }
  
  return { authenticated, loading, handleLogout,user, token};
}