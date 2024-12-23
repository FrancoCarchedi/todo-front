import { useContext, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import createTask from '../services/createTask';
import { AuthContext } from '../../auth/context/AuthContext';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

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
    }
  };

  return (
    <FormControl 
      sx={{ width: '100%', marginBottom: 3 }} 
      component="form" 
      onSubmit={handleSubmit}
    >
      <Paper
        sx={{ p: '4px 6px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <AddIcon />
        <InputBase
          size="small"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Agregar una tarea"
          inputProps={{ 'aria-label': 'agregar una tarea' }}
          value={taskState}
          onChange={(e) => setTaskState(e.target.value)}
          disabled={mutation.isLoading}
        />
      </Paper>
      <FormHelperText sx={{ color: '#F5F5F5' }}>
        {mutation.isError ? "Hubo un error al agregar la tarea" : "Presiona ENTER para añadir la tarea"}
      </FormHelperText>
    </FormControl>
  )
}

export default TaskInput