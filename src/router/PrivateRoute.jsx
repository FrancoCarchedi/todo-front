import React from 'react'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  // const { logged } = useContext( AuthContext );
  const logged = true;

  if (logged) {
    return children;
  }
  else {
    console.log("No estas logeado, es una ruta privada")
    return <Navigate to={"/login"}/>
  }
}

export default PrivateRoute