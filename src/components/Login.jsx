import { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login: usuario: admin, password: admin
    if (form.usuario === 'admin' && form.password === 'admin') {
      onLogin(form.usuario);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2, background: '#fff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
              Iniciar Sesión
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuario"
              name="usuario"
              autoComplete="username"
              autoFocus
              value={form.usuario}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login; 