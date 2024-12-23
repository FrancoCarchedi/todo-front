import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../auth/context/AuthContext';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import updateTask from '../services/updateTask';
import deleteTask from '../services/deleteTask';
import getTaskById from '../services/getTaskById';
import adjustDateToLocal from '../utils/adjustDateToLocal';
import formatToBackendDate from '../utils/formatToBackendDate';

const TaskUpdaterModal = ({ dialogStatus = false, handleOnClose = () => {}, taskId }) => {
  const [taskName, setTaskName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const { user } = useContext( AuthContext )

  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId, user.token),
    enabled: !!taskId,
  })

  useEffect(() => {
    if (data) {
      setTaskName(data.name || '');
      setEndDate(data.endsDate ? data.endsDate.split('T')[0] : ''); // Ajusta el formato de la fecha
      setDescription(data.description || '');
      setStatus(data.status || 'pending'); // Valor por defecto 'pending'
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: async ({ taskId, taskData }) => {
      return updateTask(taskId, taskData, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      handleOnClose();
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async ({ taskId }) => {
      return deleteTask(taskId, user.token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      handleOnClose();
    },
  })

  const handleSaveChanges = () => {
    const updatedTask = {
      name: taskName,
      endsDate: formatToBackendDate(endDate),
      description: description,
      status: status,
    };
    
    updateMutation.mutate({ taskId, taskData: updatedTask });
    handleOnClose();
  };

  const handleDeleteTask = () => {
    deleteMutation.mutate({ taskId });
    handleOnClose(); 
  };

  useEffect(() => {
    if (!dialogStatus) {
      setTaskName('');
      setEndDate('');
      setDescription('');
      setStatus('pending');
    }
  }, [dialogStatus]);

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
              onChange={(e) => {
                console.log("Fecha seleccionada (sin procesar):", e.target.value);
                setEndDate(adjustDateToLocal(e.target.value));
              }}
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
        <Button onClick={handleDeleteTask} color="error">
          Borrar Tarea
        </Button>
        <Button onClick={handleSaveChanges} color="primary" variant='contained'>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskUpdaterModal