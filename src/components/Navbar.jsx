import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Tooltip, Switch, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';

const Navbar = ({ onLogout, user, avatar, darkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #000 0%, #b71c1c 100%)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}> 
          <EditIcon sx={{ color: '#fff', fontSize: 36, mr: 1 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 2, color: '#fff', fontFamily: 'Montserrat, Roboto, sans-serif', lineHeight: 1 }}>
              qillqana
            </Typography>
            <Typography variant="caption" sx={{ color: '#fff', opacity: 0.8, fontWeight: 400, fontSize: 13, ml: 0.5 }}>
              Gestor de Notas
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              color="inherit"
              startIcon={<CreateIcon />}
              onClick={() => navigate('/create')}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '8px 16px',
                fontWeight: 500,
                letterSpacing: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.18)',
                }
              }}
            >
              Nueva Nota
            </Button>
          </motion.div>
          <Tooltip title={darkMode ? 'Modo claro' : 'Modo oscuro'}>
            <Switch checked={darkMode} onChange={onToggleDarkMode} color="default" sx={{ ml: 2 }} />
          </Tooltip>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Tooltip title="Mi perfil">
              <IconButton onClick={() => navigate('/profile')}>
                <Avatar src={avatar} sx={{ width: 32, height: 32, bgcolor: 'secondary.main', mr: 1 }}>
                  {!avatar && <PersonIcon />}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 400, mr: 2 }}>
              {user}
            </Typography>
            <Tooltip title="Cerrar sesión">
              <IconButton color="inherit" onClick={onLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 