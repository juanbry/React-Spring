import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EventIcon from '@mui/icons-material/Event';

const cardColors = [
  { bg: 'linear-gradient(135deg, #fff 60%, #f8bbd0 100%)', color: '#b71c1c' }, // blanco-rosado
  { bg: 'linear-gradient(135deg, #212121 60%, #b71c1c 100%)', color: '#fff' }, // negro-rojo
  { bg: 'linear-gradient(135deg, #f5f5f5 60%, #bdbdbd 100%)', color: '#b71c1c' }, // gris
  { bg: 'linear-gradient(135deg, #b71c1c 60%, #fff 100%)', color: '#fff' }, // rojo-blanco
];

const estadoColors = {
  'Ideas': 'info',
  'En Proceso': 'warning',
  'Completadas': 'success',
};

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notas');
      // Si la nota no tiene estado, asignar 'Ideas' por defecto
      const notesWithEstado = response.data.map(n => ({ ...n, estado: n.estado || 'Ideas' }));
      setNotes(notesWithEstado);
    } catch (error) {
      console.error('Error al obtener las notas:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notas/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.12
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4}>
          {notes.map((note, idx) => {
            const colorIdx = idx % cardColors.length;
            const { bg, color } = cardColors[colorIdx];
            return (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <motion.div variants={item}>
                  <Card
                    component={motion.div}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 8px 32px rgba(183,28,28,0.18)'
                    }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      background: bg,
                      color,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                      transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          gutterBottom
                          sx={{ fontWeight: 700, letterSpacing: 1 }}
                        >
                          {note.titulo}
                        </Typography>
                        <Chip
                          label={note.estado}
                          color={estadoColors[note.estado] || 'default'}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 2 }}
                        />
                      </Box>
                      <Typography 
                        variant="body2" 
                        color={color === '#fff' ? 'rgba(255,255,255,0.85)' : 'text.secondary'}
                        sx={{ mb: 2, minHeight: 48, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                      >
                        {note.contenido}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          icon={<EventIcon sx={{ color: color === '#fff' ? '#fff' : '#b71c1c' }} />}
                          label={note.fechaCreacion ? new Date(note.fechaCreacion).toLocaleDateString() : 'Sin fecha'}
                          size="small"
                          sx={{
                            bgcolor: color === '#fff' ? 'rgba(255,255,255,0.18)' : '#fff',
                            color: color === '#fff' ? '#fff' : '#b71c1c',
                            fontWeight: 500,
                            px: 1.5,
                            borderRadius: 2,
                          }}
                        />
                      </Box>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 'auto'
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          sx={{ fontWeight: 500, color: color === '#fff' ? 'rgba(255,255,255,0.85)' : '#b71c1c' }}
                        >
                          Por: {note.autor}
                        </Typography>
                        <Box>
                          <IconButton 
                            size="small" 
                            onClick={() => navigate(`/note/${note.id}`)}
                            sx={{ color: color === '#fff' ? '#fff' : '#b71c1c', mr: 1 }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDelete(note.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default NotesList; 