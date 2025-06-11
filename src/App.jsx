import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardStats from './components/DashboardStats';
import NotesList from './components/NotesList';
import KanbanBoard from './components/KanbanBoard';
import CalendarView from './components/CalendarView';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import Login from './components/Login';
import Profile from './components/Profile';
import ViewSwitcher from './components/ViewSwitcher';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000',
    },
    secondary: {
      main: '#fff',
      light: '#fff',
      dark: '#bdbdbd',
    },
    background: {
      default: mode === 'dark' ? '#181818' : '#fff',
      paper: mode === 'dark' ? '#232323' : '#fff',
    },
    text: {
      primary: mode === 'dark' ? '#fff' : '#181818',
      secondary: mode === 'dark' ? '#bdbdbd' : '#7f0000',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

function getProfile() {
  const data = localStorage.getItem('profile');
  return data ? JSON.parse(data) : {
    nombre: '',
    usuario: localStorage.getItem('user') || '',
    password: 'admin',
    avatar: ''
  };
}

function Dashboard({ user, avatar }) {
  const [view, setView] = useState('tradicional');
  return (
    <>
      <Hero />
      <DashboardStats user={user} avatar={avatar} />
      <ViewSwitcher view={view} setView={setView} />
      {view === 'tradicional' && <NotesList />}
      {view === 'kanban' && <KanbanBoard />}
      {view === 'calendario' && <CalendarView />}
    </>
  );
}

function App() {
  const [user, setUser] = useState(() => localStorage.getItem('user'));
  const [profile, setProfile] = useState(getProfile());
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    setProfile(getProfile());
  }, [user]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogin = (username) => {
    setUser(username);
    setProfile(getProfile());
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleProfileUpdate = (newProfile) => {
    setProfile(newProfile);
    setUser(newProfile.usuario);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Rutas protegidas
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  const theme = useMemo(() => createTheme(getDesignTokens(darkMode ? 'dark' : 'light')), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          {user && (
            <Navbar
              onLogout={handleLogout}
              user={profile.usuario}
              avatar={profile.avatar}
              darkMode={darkMode}
              onToggleDarkMode={handleToggleDarkMode}
            />
          )}
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/" element={<PrivateRoute><Dashboard user={profile.usuario} avatar={profile.avatar} /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreateNote /></PrivateRoute>} />
            <Route path="/note/:id" element={<PrivateRoute><ViewNote /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile onProfileUpdate={handleProfileUpdate} /></PrivateRoute>} />
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
