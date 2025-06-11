import { ToggleButton, ToggleButtonGroup, Box, Paper } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ViewSwitcher = ({ view, setView }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
      <Paper elevation={2} sx={{ borderRadius: 4, px: 2, py: 1, background: 'linear-gradient(90deg, #fff 60%, #f8bbd0 100%)' }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, next) => next && setView(next)}
          aria-label="Vista de notas"
          size="large"
        >
          <ToggleButton value="tradicional" aria-label="Vista tradicional" sx={{ fontWeight: 600 }}>
            <ViewModuleIcon sx={{ mr: 1 }} /> Tradicional
          </ToggleButton>
          <ToggleButton value="kanban" aria-label="Vista Kanban" sx={{ fontWeight: 600 }}>
            <ViewKanbanIcon sx={{ mr: 1 }} /> Kanban
          </ToggleButton>
          <ToggleButton value="calendario" aria-label="Vista Calendario" sx={{ fontWeight: 600 }}>
            <CalendarMonthIcon sx={{ mr: 1 }} /> Calendario
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
};

export default ViewSwitcher; 