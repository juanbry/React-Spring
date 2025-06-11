import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, Chip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const estados = [
  { label: 'Ideas', color: 'info' },
  { label: 'En Proceso', color: 'warning' },
  { label: 'Completadas', color: 'success' },
];

const cardColors = [
  { bg: 'linear-gradient(135deg, #fff 60%, #f8bbd0 100%)', color: '#b71c1c' },
  { bg: 'linear-gradient(135deg, #212121 60%, #b71c1c 100%)', color: '#fff' },
  { bg: 'linear-gradient(135deg, #f5f5f5 60%, #bdbdbd 100%)', color: '#b71c1c' },
  { bg: 'linear-gradient(135deg, #b71c1c 60%, #fff 100%)', color: '#fff' },
];

const KanbanBoard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/notas');
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

  // Agrupar notas por estado
  const notesByEstado = estados.reduce((acc, est) => {
    acc[est.label] = notes.filter(n => n.estado === est.label);
    return acc;
  }, {});

  // Drag & Drop
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    const noteId = parseInt(draggableId);
    const newEstado = destination.droppableId;
    try {
      await axios.patch(`http://localhost:8080/api/notas/${noteId}`, { estado: newEstado });
      setNotes(notes => notes.map(n => n.id === noteId ? { ...n, estado: newEstado } : n));
    } catch (error) {
      console.error('Error al actualizar el estado de la nota:', error);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 4 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {estados.map((estado, colIdx) => (
            <Grid item xs={12} md={4} key={estado.label}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 4, minHeight: 400, background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#b71c1c', mb: 2, letterSpacing: 1, textAlign: 'center' }}>
                  {estado.label}
                </Typography>
                <Droppable droppableId={estado.label}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 340, background: snapshot.isDraggingOver ? 'rgba(183,28,28,0.07)' : 'transparent', transition: 'background 0.2s' }}
                    >
                      {notesByEstado[estado.label].map((note, idx) => {
                        const colorIdx = idx % cardColors.length;
                        const { bg, color } = cardColors[colorIdx];
                        return (
                          <Draggable draggableId={note.id.toString()} index={idx} key={note.id}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                sx={{
                                  background: bg,
                                  color,
                                  borderRadius: 4,
                                  boxShadow: snapshot.isDragging ? '0 8px 32px rgba(183,28,28,0.18)' : '0 2px 8px rgba(183,28,28,0.10)',
                                  transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                                  position: 'relative',
                                  overflow: 'hidden',
                                }}
                              >
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
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard; 