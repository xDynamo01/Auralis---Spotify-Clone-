import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Shell } from './components/Shell.jsx';
import { LoadingState } from './components/States.jsx';
import { api } from './services/api.js';
import { Home } from './pages/Home.jsx';
import { Login } from './pages/Login.jsx';
import { NotAuthorized } from './pages/NotAuthorized.jsx';
import { Playlist } from './pages/Playlist.jsx';
import { Search } from './pages/Search.jsx';
import { SessionExpired } from './pages/SessionExpired.jsx';

export default function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ loading: true, authenticated: false, user: null });
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    let active = true;

    api
      .me()
      .then((data) => {
        if (active) {
          setAuth({ loading: false, authenticated: data.authenticated, user: data.user });
        }
      })
      .catch(() => {
        if (active) {
          setAuth({ loading: false, authenticated: false, user: null });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await api.logout().catch(() => null);
    setAuth({ loading: false, authenticated: false, user: null });
    setCurrentTrack(null);
    navigate('/login');
  };

  if (auth.loading) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="w-full max-w-md">
          <LoadingState label="Sincronizando sessao" />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Login
            onDemoLogin={() => {
              api.enableDemo();
              setAuth({ loading: false, authenticated: true, user: { displayName: 'Auralis Demo' } });
              navigate('/');
            }}
          />
        }
      />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/session-expired" element={<SessionExpired />} />
      {auth.authenticated ? (
        <Route
          element={
            <Shell
              user={auth.user}
              currentTrack={currentTrack}
              onTrackSelect={setCurrentTrack}
              onLogout={handleLogout}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlists/:id" element={<Playlist />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
