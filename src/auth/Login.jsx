import { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router';
import { AuthContext } from './context/AuthContext';

const Login = () => {
  const [apiError, setApiError] = useState("");

  const { login, logout, logged } = useContext( AuthContext )

  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, [logged, navigate, logout])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("El usuario no puede estar vacío"),
      password: Yup.string().required("La contraseña no puede estar vacía")
    }),
    onSubmit: () => {},
  });

  const handleLogin = async () => {
    // Evita la llamada si hay errores de validación
    if (!formik.isValid || formik.isSubmitting) {
      return;
    }

    try {
      const { email, password } = formik.values;
      const response = await login(email, password);

      if (response.success) {
        setApiError('');
        navigate('/');
      } else {
        setApiError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      setApiError('Ocurrió un error al intentar iniciar sesión.');
    }
  };

  return (
    <Box component="section" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh', backgroundColor: '#262D68' }}>
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }} autoComplete="off" sx={{
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
            label="Correo electrónico" 
            variant="outlined" 
            size="small" 
            type='email' 
            {...formik.getFieldProps('email')} 
            error={formik.touched.email && Boolean(formik.errors.email)} 
            helperText={formik.touched.email && formik.errors.email}/>
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
          <Typography gutterBottom color='error'>{ apiError }</Typography>
          <Button type='submit' variant='contained'>Iniciar sesión</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Login