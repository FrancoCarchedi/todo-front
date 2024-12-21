import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';

const TaskCard = ({ taskId = 0, taskName = "", endsDate = "", status = "" }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', '&.MuiCardContent-root': { padding: 2 } }}>
        <Box>
          <Typography variant="body1" sx={{ color: '#000' }} >Iniciar sesión con el usuario otorgado</Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>Vence el 19/12/2024</Typography>
        </Box>
        <Box>
          <Checkbox />
        </Box>
        
      </CardContent>
    </Card>
  )
}

export default TaskCard