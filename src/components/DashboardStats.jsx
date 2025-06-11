import { Box, Paper, Typography, Avatar, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';

const DashboardStats = ({ user, avatar }) => {
  const [totalNotas, setTotalNotas] = useState(0);

  useEffect(() => {
    // Obtener el total de notas desde la API
    fetch('http://localhost:8080/api/notas')
      .then(res => res.json())
      .then(data => setTotalNotas(Array.isArray(data) ? data.length : 0));
  }, []);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mb: 4,
        borderRadius: 4,
        background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        flexWrap: 'wrap',
      }}
    >
      <Avatar src={avatar} sx={{ width: 72, height: 72, bgcolor: '#b71c1c', fontSize: 40, mr: 2 }}>
        {!avatar && user?.[0]?.toUpperCase()}
      </Avatar>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#b71c1c' }}>
          ¡Bienvenido, {user}!
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon sx={{ color: '#b71c1c' }} />
          <Typography variant="body1" sx={{ fontWeight: 500, color: '#181818' }}>
            Total de notas: {totalNotas}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DashboardStats; 