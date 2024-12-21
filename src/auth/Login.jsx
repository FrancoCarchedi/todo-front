import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router';

const Login = () => {
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  //TODO: Si está logeado, redirigir al todo
  // useEffect(() => {
    
  // }, [logged, navigate])
  

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("El usuario no puede estar vacío"),
      password: Yup.string().required("La contraseña no puede estar vacía")
    }),
    onSubmit: async (values) => {
      try {
        // Simulación de llamada a API
        const response = await fakeApiCall(values);
        console.log("Login exitoso:", response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          const { field, message } = error.response.data;
          if (field) {
            // Si el error es de un campo específico, se usa setFieldError
            formik.setFieldError(field, message);
          } else {
            // Si es un error general, lo guardamos en setApiError
            setApiError(message || "Ocurrió un error al iniciar sesión.");
          }
        } else {
          setApiError("Error de conexión con el servidor.");
        }
      }
    }
  });

  console.log(apiError)

  return (
    <Box component="section" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh', backgroundColor: '#262D68' }}>
      <Box component="form" onSubmit={formik.handleSubmit} autoComplete="off" sx={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '420px',
        padding: 3,
        backgroundColor: '#F5F5F5',
        borderRadius: 1
      }}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant='h6' gutterBottom color='textPrimary'>Iniciar sesión</Typography>
          <Typography variant='body1' color='info'>Sistema de Gestión de Tareas</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 3, paddingInline: 1 }}>
          <TextField 
            label="Usuario" 
            variant="outlined" 
            size="small" 
            type='text' 
            {...formik.getFieldProps('username')} 
            error={formik.touched.username && Boolean(formik.errors.username)} 
            helperText={formik.touched.username && formik.errors.username}/>
          <TextField 
            label="Contraseña" 
            variant="outlined" 
            size="small" 
            type='password' 
            {...formik.getFieldProps('password')} 
            error={formik.touched.password && Boolean(formik.errors.password)} 
            helperText={formik.touched.password && formik.errors.password}/>
        </Box>
        <Box>
          <Button type='submit' variant='contained'>Iniciar sesión</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login