import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box, Divider, Avatar, Chip } from '@mui/material';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';

const bgGradients = [
  'linear-gradient(135deg, #fff 60%, #f8bbd0 100%)',
  'linear-gradient(135deg, #212121 60%, #b71c1c 100%)',
  'linear-gradient(135deg, #f5f5f5 60%, #bdbdbd 100%)',
  'linear-gradient(135deg, #b71c1c 60%, #fff 100%)',
];

const ViewNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/notas/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error al obtener la nota:', error);
        navigate('/');
      }
    };
    fetchNote();
  }, [id, navigate]);

  if (!note) {
    return null;
  }

  // Alternar fondo según el id de la nota
  const bgIdx = note.id % bgGradients.length;
  const bg = bgGradients[bgIdx];
  const isDark = bgIdx === 1 || bgIdx === 3;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          background: bg,
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(183,28,28,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 3,
            color: isDark ? '#fff' : '#b71c1c',
            borderColor: isDark ? '#fff' : '#b71c1c',
            fontWeight: 500,
            borderRadius: 20,
            '&:hover': {
              borderColor: '#d32f2f',
              backgroundColor: 'rgba(183,28,28,0.08)'
            }
          }}
        >
          Volver
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: isDark ? '#fff' : '#b71c1c', color: isDark ? '#b71c1c' : '#fff', width: 48, height: 48 }}>
            <NotesIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: isDark ? '#fff' : '#b71c1c',
                fontWeight: 700,
                mb: 0.5,
                letterSpacing: 1
              }}
            >
              {note.titulo}
            </Typography>
            <Chip
              icon={<AccessTimeIcon sx={{ color: isDark ? '#fff' : '#b71c1c' }} />}
              label={note.fechaCreacion ? new Date(note.fechaCreacion).toLocaleDateString() : 'Sin fecha'}
              size="small"
              sx={{
                bgcolor: isDark ? 'rgba(255,255,255,0.18)' : '#fff',
                color: isDark ? '#fff' : '#b71c1c',
                fontWeight: 500,
                px: 1.5,
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3, borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#b71c1c' }} />

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: isDark ? '#fff' : '#181818',
            fontSize: 18,
            mb: 3
          }}
        >
          {note.contenido}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <PersonIcon sx={{ color: isDark ? '#fff' : '#b71c1c', fontSize: 22 }} />
          <Typography variant="body2" sx={{ color: isDark ? '#fff' : '#b71c1c', fontWeight: 500 }}>
            {note.autor}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewNote; 