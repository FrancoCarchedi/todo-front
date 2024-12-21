import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const TaskToolbar = () => {
  const [taskStatus, setTaskStatus] = useState("all");

  const handleStatus = (event, status) => {
    setTaskStatus(status);
  };

  return (
    <ToggleButtonGroup
      value={taskStatus} 
      exclusive
      onChange={handleStatus}
      sx={{ marginBottom: 3, backgroundColor: '#F5F5F5' }}
    >
      <ToggleButton value="all" sx={{ width: 160, fontWeight: 600 }}>Todas</ToggleButton>
      <ToggleButton value="pending" sx={{ width: 160, fontWeight: 600 }}>Pendientes</ToggleButton>
      <ToggleButton value="complete" sx={{ width: 160, fontWeight: 600 }}>Completadas</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TaskToolbar