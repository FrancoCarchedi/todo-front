import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import formatDate from '../utils/formatDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../services/updateTask';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';

const TaskCard = ({ taskId = 0, taskName = "", endsDate = null, status = "", handleClickOpen = () => {} }) => {

  const { user } = useContext( AuthContext )

  const queryClient = useQueryClient();
  const formattedDate = formatDate(endsDate);

  const mutation = useMutation({
    mutationFn: async ({ taskId, taskData }) => {
      return updateTask(taskId, taskData, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleStatusChange = () => {
    const newStatus = status === "completed" ? "pending" : "completed";

    mutation.mutate({
      taskId,
      taskData: { status: newStatus }
    });
  };

  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&.MuiCardContent-root': { padding: 2 } }}>
        <Box onClick={() => handleClickOpen(taskId)} sx={{ width: '100%', ':hover': { cursor: 'pointer', color: '#1976d2' } }}>
          <Typography variant="body1" sx={{ color: '#000', ':hover': { cursor: 'pointer', color: '#1976d2' } }} onClick={(e) => { 
              e.stopPropagation(); 
              handleClickOpen(taskId);
            }}
          >{ taskName }</Typography>
          { endsDate && 
            <Typography variant="body1" sx={{ color: '#666666' }}>Vence el { formattedDate }</Typography>
          }
        </Box>
        <Box>
          <Checkbox checked={ status === "completed" } onChange={handleStatusChange} disabled={mutation.isLoading}/>
        </Box>
        
      </CardContent>
    </Card>
  )
}

export default TaskCard