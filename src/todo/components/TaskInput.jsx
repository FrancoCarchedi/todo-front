import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const TaskInput = () => {
  const [taskState, setTaskState] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (taskState.trim()) {
      console.log("Se cargó la tarea:", taskState);
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
      <IconButton aria-label="add">
        <AddIcon />
      </IconButton>
      <InputBase
        size='small'
        sx={{ ml: 1, flex: 1 }}
        placeholder="Agregar una tarea"
        inputProps={{ 'aria-label': 'agregar una tarea' }}
        value={taskState}
        onChange={(e) => setTaskState(e.target.value)}
      />
    </Paper>
  )
}

export default TaskInput