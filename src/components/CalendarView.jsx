import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Card, CardContent, Chip, IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const cardColors = [
  { bg: 'linear-gradient(135deg, #fff 60%, #f8bbd0 100%)', color: '#b71c1c' },
  { bg: 'linear-gradient(135deg, #212121 60%, #b71c1c 100%)', color: '#fff' },
  { bg: 'linear-gradient(135deg, #f5f5f5 60%, #bdbdbd 100%)', color: '#b71c1c' },
  { bg: 'linear-gradient(135deg, #b71c1c 60%, #fff 100%)', color: '#fff' },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const CalendarView = () => {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notas');
      setNotes(response.data.map(n => ({ ...n, estado: n.estado || 'Ideas' })));
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

  // Agrupar notas por fecha (YYYY-MM-DD)
  const notesByDate = notes.reduce((acc, note) => {
    const dateKey = note.fechaCreacion ? note.fechaCreacion.split('T')[0] : '';
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(note);
    return acc;
  }, {});

  const selectedKey = formatDate(selectedDate);
  const notesForDay = notesByDate[selectedKey] || [];

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 4, background: '#fff', minWidth: 320 }}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date, view }) => {
            const key = formatDate(date);
            if (view === 'month' && notesByDate[key]) {
              return <span style={{ color: '#b71c1c', fontWeight: 700 }}>•</span>;
            }
            return null;
          }}
        />
      </Paper>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#b71c1c', mb: 2 }}>
          Notas del {selectedDate.toLocaleDateString()}
        </Typography>
        {notesForDay.length === 0 && (
          <Typography variant="body2" sx={{ color: '#888' }}>No hay notas para este día.</Typography>
        )}
        {notesForDay.map((note, idx) => {
          const colorIdx = idx % cardColors.length;
          const { bg, color } = cardColors[colorIdx];
          return (
            <Card key={note.id} sx={{
              background: bg,
              color,
              borderRadius: 4,
              boxShadow: '0 2px 8px rgba(183,28,28,0.10)',
              transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
              position: 'relative',
              overflow: 'hidden',
              mb: 2
            }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {note.titulo}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, minHeight: 32, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {note.contenido}
                </Typography>
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
                    mb: 1
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 500, color: color === '#fff' ? 'rgba(255,255,255,0.85)' : '#b71c1c' }}>
                    Por: {note.autor}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => navigate(`/note/${note.id}`)} sx={{ color: color === '#fff' ? '#fff' : '#b71c1c', mr: 1 }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(note.id)} sx={{ color: '#d32f2f' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CalendarView; 