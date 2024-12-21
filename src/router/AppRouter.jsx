import React from 'react'
import { Route, Routes } from 'react-router'
import PrivateRoute from './PrivateRoute'
import Login from '../auth/Login'
import TodoContainer from '../todo/TodoContainer'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path='/*' element={
        <PrivateRoute>
          <Routes>
            <Route path="/" element={<TodoContainer/>} />
          </Routes>
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default AppRouter