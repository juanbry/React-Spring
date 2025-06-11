import { useState, useRef } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import { motion } from 'framer-motion';

const getProfile = () => {
  const data = localStorage.getItem('profile');
  return data ? JSON.parse(data) : {
    nombre: '',
    usuario: localStorage.getItem('user') || '',
    password: 'admin',
    avatar: ''
  };
};

const Profile = ({ onProfileUpdate }) => {
  const [profile, setProfile] = useState(getProfile());
  const [message, setMessage] = useState('');
  const fileInput = useRef();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev) => ({ ...prev, avatar: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('user', profile.usuario);
    setMessage('Perfil actualizado correctamente');
    if (onProfileUpdate) onProfileUpdate(profile);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, background: '#fff' }}>
          <Typography variant="h5" sx={{ fontWeight: 500, mb: 3 }}>
            Mi Perfil
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar src={profile.avatar} sx={{ width: 80, height: 80, mb: 1 }} />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
              ref={fileInput}
            />
            <label htmlFor="avatar-upload">
              <IconButton color="primary" component="span" onClick={() => fileInput.current.click()}>
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={profile.nombre}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Usuario"
              name="usuario"
              value={profile.usuario}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={profile.password}
              onChange={handleChange}
              sx={{ mb: 4 }}
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              fullWidth
              sx={{ backgroundColor: '#2196F3', '&:hover': { backgroundColor: '#1976D2' } }}
            >
              Guardar Cambios
            </Button>
            {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Profile; 