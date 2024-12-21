import React from 'react'
import Box from '@mui/material/Box'
import TaskCard from './components/TaskCard'
import TaskInput from './components/TaskInput'
import TaskToolbar from './components/TaskToolbar'
import { Typography } from '@mui/material'

const TASKS = [
  {
    id: 1,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "completed"
  },
  {
    id: 2,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 3,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 4,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 5,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 6,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 7,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 8,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 9,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
  {
    id: 10,
    name: "Iniciar sesión con el usuario otorgado",
    endsDate: "19/12/2024",
    status: "pending"
  },
]

const TodoContainer = () => {
  return (
    <Box 
      component="section" 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        minHeight: '100dvh', 
        backgroundColor: '#262D68'  
    }}>
      <Box 
        component="div"
        sx={{
          width: '100%',
          maxWidth: 1280,
          backgroundColor: 'transparent' 
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#F5F5F5' }}>Mis tareas</Typography>
        <TaskToolbar />
        <Box
          sx={{
            height: 400,
            overflowY: 'auto',
            paddingRight: 3,
            marginBottom: 3,
            '&::-webkit-scrollbar': {
              width: '4px',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#666666', // Color del "thumb" (parte que se arrastra)
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#555', // Color al pasar el mouse
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F5F5F5', // Color de fondo del scrollbar
              borderRadius: '4px'
            },
          }}
        >
          { TASKS.map( t => <TaskCard key={t.id} taskId={t.id} taskName={t.name} endsDate={t.endsDate} status={t.status} /> ) }
        </Box>
        <TaskInput />
      </Box>
    </Box>
  )
}

export default TodoContainer