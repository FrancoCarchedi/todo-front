import { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import createTask from '../services/createTask';
import { AuthContext } from '../../auth/context/AuthContext';

const TaskInput = () => {
  const [taskState, setTaskState] = useState("");

  const { user } = useContext( AuthContext )

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (taskName) => {
      return createTask(taskName, user.id, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskState.trim()) {
      mutation.mutate(taskState);
      setTaskState("");
    } else {
      console.log("La tarea está vacía");
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: '4px 6px', display: 'flex', alignItems: 'center', width: '100%' }}
      onSubmit={handleSubmit}
    >
      <IconButton aria-label="add" disabled={mutation.isLoading}>
        <AddIcon />
      </IconButton>
      <InputBase
        size='small'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Agregar una tarea"
        inputProps={{ 'aria-label': 'agregar una tarea' }}
        value={taskState}
        onChange={(e) => setTaskState(e.target.value)}
        disabled={mutation.isLoading}
      />
    </Paper>
  )
}

export default TaskInput