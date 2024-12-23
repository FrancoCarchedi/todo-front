import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import TaskCard from './components/TaskCard'
import TaskInput from './components/TaskInput'
import TaskToolbar from './components/TaskToolbar'
import Typography from '@mui/material/Typography'
import { AuthContext } from '../auth/context/AuthContext'
import getTasksByUser from './services/getTasksByUser'
import { useQuery } from '@tanstack/react-query'
import CircularProgress from '@mui/material/CircularProgress'
import TaskUpdaterModal from './components/TaskUpdaterModal'

const TodoContainer = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [taskToEditState, setTaskToEditState] = useState(null);
  const [updaterModalState, setUpdaterModalState] = useState(false);

  const handleClickOpen = (taskId) => {
    setTaskToEditState(taskId);
    setUpdaterModalState(true);
  };

  const handleClose = () => {
    setUpdaterModalState(false);
    setTaskToEditState(null);
  };

  const { user } = useContext( AuthContext )

  const { isLoading, data, error } = useQuery({
    queryKey: ['tasks', { orderBy: "id", orderDirection: "ASC" }],
    queryFn: () => getTasksByUser(user.id, user.token)
  })

  const filteredTasks = data?.filter( task => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return task.status === 'pending';
    if (filterStatus === 'complete') return task.status === 'completed';
    return true;
  });

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
        <TaskToolbar setFilterStatus={setFilterStatus}/>
        { isLoading ? 
        <Box>
          <CircularProgress />
        </Box> : 
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
          { filteredTasks?.map( t => <TaskCard key={t.id} taskId={t.id} taskName={t.name} endsDate={t.endsDate} status={t.status} handleClickOpen={handleClickOpen}/> ) }
          <button onClick={handleClickOpen}>Abrir modal</button>
          <TaskUpdaterModal taskId={taskToEditState} dialogStatus={ updaterModalState } handleOnClose={handleClose}/>
        </Box>
        }
        <TaskInput />
      </Box>
    </Box>
  )
}

export default TodoContainer