import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from 'framer-motion';

const illustrationUrl = 'https://undraw.co/api/illustrations/undraw_note_list_re_r4u9.svg'; // Puedes cambiar por otra de undraw/storyset

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: 220, md: 320 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(90deg, #000 0%, #b71c1c 100%)',
        borderRadius: 4,
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        mb: 4,
        mt: 2,
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 4 },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 180 }}>
        <motion.img
          src={illustrationUrl}
          alt="Ilustración hero"
          style={{ width: '100%', maxWidth: 220, height: 'auto', borderRadius: 16 }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />
      </Box>
      <Box sx={{ flex: 2, color: '#fff', textAlign: { xs: 'center', md: 'left' } }}>
        <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: 2, fontFamily: 'Montserrat, Roboto, sans-serif', mb: 1 }}>
          qillqana
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, mb: 2, fontWeight: 400 }}>
          Gestor de Notas
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: 400, opacity: 0.9 }}>
          Organiza, crea y personaliza tus notas de manera profesional y visualmente atractiva. ¡Haz que tus ideas cobren vida!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ borderRadius: 20, fontWeight: 600, fontSize: 18, px: 4, boxShadow: '0 2px 8px rgba(183,28,28,0.2)' }}
          onClick={() => navigate('/create')}
        >
          Crear Nota
        </Button>
      </Box>
    </Box>
  );
};

export default Hero; 