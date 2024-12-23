import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const TaskToolbar = ({ setFilterStatus }) => {
  const [taskStatus, setTaskStatus] = useState("all");

  const handleStatus = (event, status) => {
    setTaskStatus(status);
    setFilterStatus(status);
  };

  return (
    <ToggleButtonGroup
      value={taskStatus} 
      exclusive
      onChange={handleStatus}
      sx={{ marginBottom: 3, backgroundColor: '#F5F5F5', width: { xs: '100%', sm: 'fit-content' } }}
    >
      <ToggleButton value="all" sx={{ width: { xs: '100%', md: 160 }, fontWeight: 600 }}>Todas</ToggleButton>
      <ToggleButton value="pending" sx={{ width: { xs: '100%', md: 160 }, fontWeight: 600 }}>Pendientes</ToggleButton>
      <ToggleButton value="complete" sx={{ width: { xs: '100%', md: 160 }, fontWeight: 600 }}>Completadas</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TaskToolbar