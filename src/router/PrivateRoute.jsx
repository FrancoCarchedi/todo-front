import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { AuthContext } from '../auth/context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { logged } = useContext( AuthContext );

  if (logged) {
    return children;
  }
  else {
    return <Navigate to={"/login"}/>
  }
}

export default PrivateRoute