import { useEffect, useReducer } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../types/types'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");

  return {
    logged: !!user && !!token,
    user: { ...user, token },
    // token: token,
  }
}

const AuthProvider = ({children}) => {

  const [ authState, dispatch ] = useReducer( authReducer, {}, init );

  const login = async ( email, password ) => {

    const userToLogin = { email, password };

    try {
      const loginResponse = await axios.post(`${process.env.RENDER_API_URL}/users/login`, userToLogin);

      const { token } = loginResponse.data;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const userResponse = await axios.get(`${process.env.RENDER_API_URL}/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      const user = userResponse.data;

      localStorage.setItem('user', JSON.stringify(user));

      const action = {
        type: types.login,
        payload: { ...user, token }
      };

      dispatch(action);

      return { success: true };  // Indicar éxito
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };  // Indicar error
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const action = {
      type: types.logout,
    }
    dispatch(action)
  }

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeLeft = (exp - currentTime) * 1000;
  
        if (timeLeft <= 0) {
          logout(); // Token expirado, cerrar sesión
        } else {
          // Configurar un timeout para cuando el token expire
          setTimeout(() => logout(), timeLeft);
        }
      }
    };
  
    checkTokenExpiration(); // Ejecutar la función inmediatamente
  
    return () => clearTimeout(); // Limpiar el timeout al desmontar
  }, []);


  return (
    <AuthContext.Provider value={{ 
      ...authState,
      login: login,
      logout: logout
     }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider