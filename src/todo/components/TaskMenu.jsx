import { useContext } from 'react';
import { Button, Box, Typography, Avatar } from '@mui/material';
import { AuthContext } from '../../auth/context/AuthContext'; // Ajusta esta ruta según tu proyecto

const TaskMenu = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        padding: 2, 
        backgroundColor: '#F5F5F5', 
        borderRadius: 2, 
        boxShadow: 2,
        marginBlock: 5,
        flexWrap: 'wrap', // Permite envolver contenido si es necesario
      }}
    >
      <Avatar sx={{ bgcolor: '#3f51b5' }}>
        {user?.username?.[0]?.toUpperCase() || 'U'}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1" fontWeight="bold">
          {user?.username || 'Usuario'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || 'correo@dominio.com'}
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={logout}
        sx={{ fontWeight: 'bold' }}
      >
        Cerrar sesión
      </Button>
    </Box>
  )
}

export default TaskMenu