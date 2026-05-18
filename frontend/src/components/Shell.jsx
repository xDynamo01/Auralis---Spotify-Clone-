import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.jsx';
import { PlayerBar } from './PlayerBar.jsx';

export function Shell({ user, currentTrack, onTrackSelect, onLogout }) {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar user={user} onLogout={onLogout} />
      <main className="thin-scrollbar min-h-screen flex-1 overflow-y-auto px-4 pb-28 pt-5 md:h-screen md:px-8 md:pb-28">
        <Outlet context={{ user, currentTrack, onTrackSelect }} />
      </main>
      <PlayerBar track={currentTrack} />
    </div>
  );
}
