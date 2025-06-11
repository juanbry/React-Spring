import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TitleIcon from '@mui/icons-material/Title';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';

const bgGradients = [
  'linear-gradient(135deg, #fff 60%, #f8bbd0 100%)',
  'linear-gradient(135deg, #212121 60%, #b71c1c 100%)',
  'linear-gradient(135deg, #f5f5f5 60%, #bdbdbd 100%)',
  'linear-gradient(135deg, #b71c1c 60%, #fff 100%)',
];

const CreateNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    titulo: '',
    contenido: '',
    autor: ''
  });
  // Alternar fondo según el nombre de la nota
  const bgIdx = note.titulo.length % bgGradients.length;
  const bg = bgGradients[bgIdx];

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/notas', note);
      navigate('/');
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              color: bgIdx === 1 || bgIdx === 3 ? '#fff' : '#b71c1c',
              fontWeight: 700,
              mb: 3,
              letterSpacing: 1
            }}
          >
            Crear Nueva Nota
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Título"
              name="titulo"
              value={note.titulo}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon color={bgIdx === 1 || bgIdx === 3 ? 'inherit' : 'error'} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Contenido"
              name="contenido"
              value={note.contenido}
              onChange={handleChange}
              required
              multiline
              rows={4}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NotesIcon color={bgIdx === 1 || bgIdx === 3 ? 'inherit' : 'error'} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Autor"
              name="autor"
              value={note.autor}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color={bgIdx === 1 || bgIdx === 3 ? 'inherit' : 'error'} />
                  </InputAdornment>
                )
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: bgIdx === 1 || bgIdx === 3 ? '#fff' : '#b71c1c',
                  borderColor: bgIdx === 1 || bgIdx === 3 ? '#fff' : '#b71c1c',
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

              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  backgroundColor: '#b71c1c',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 20,
                  px: 4,
                  boxShadow: '0 2px 8px rgba(183,28,28,0.18)',
                  '&:hover': {
                    backgroundColor: '#7f0000'
                  }
                }}
              >
                Crear Nota
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default CreateNote; 