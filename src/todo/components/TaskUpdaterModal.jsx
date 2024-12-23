import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useMutation, useQuery } from '@tanstack/react-query';
import getTasksById from '../services/getTaskById';
import { AuthContext } from '../../auth/context/AuthContext';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import updateTask from '../services/updateTask';
import deleteTask from '../services/deleteTask';

const TaskUpdaterModal = ({ dialogStatus = false, handleOnClose = () => {}, taskId }) => {
  const [taskName, setTaskName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const { user } = useContext( AuthContext )

  const { isLoading, data, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTasksById(taskId, user.token),
    enabled: !!taskId,
    onSuccess: (taskData) => {
      // Sincroniza los datos obtenidos al estado local
      console.log(taskData)
      setTaskName(taskData.name);
      setEndDate(taskData.endsDate ? taskData.endsDate.split('T')[0] : ''); // Ajusta el formato de fecha
      setDescription(taskData.description);
      setStatus(taskData.status);
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ taskId, taskData }) => {
      return updateTask(taskId, taskData, user.token);
    },
    onSuccess: () => {
      handleOnClose();
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async ({ taskId }) => {
      return updateTask(taskId, user.token);
    },
    onSuccess: () => {
      handleOnClose();
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleSaveChanges = () => {
    const updatedTask = {
      name: taskName,
      endsDate: endDate,
      description: description,
      status: status,
    };
    
    updateMutation({ taskId, taskData: updatedTask });
    handleOnClose();  // Cerrar el modal
  };

  const handleDeleteTask = () => {
    deleteMutation({ taskId });
    handleOnClose();  // Cerrar el modal
  };

  useEffect(() => {
    if (!dialogStatus) {
      setTaskName('');
      setEndDate('');
      setDescription('');
      setStatus('pending');
    }
  }, [dialogStatus]);

  console.log(endDate)

  return (
    <Dialog
      open={dialogStatus}
      onClose={handleOnClose}
      fullWidth 
      maxWidth="sm"
    >
      <DialogTitle>
        Modificar tarea
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error al cargar los datos</Typography>
        ) : (
          <div>
            <TextField
              label="Nombre"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              // label="Fecha de Vencimiento"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Descripción"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
            />

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography sx={{ width: '30%' }}>Estado</Typography>
                <Typography>{ status === 'pending' ? "Pendiente" : "Completada"}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Button 
                    variant={status === 'pending' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setStatus('pending')}
                    fullWidth
                    sx={{ marginBottom: 1 }}
                  >
                    Pendiente
                  </Button>
                  <Button 
                    variant={status === 'completed' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setStatus('completed')}
                    fullWidth
                  >
                    Completada
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveChanges} color="primary">
          Guardar Cambios
        </Button>

        <Button onClick={handleDeleteTask} color="secondary">
          Borrar Tarea
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskUpdaterModal