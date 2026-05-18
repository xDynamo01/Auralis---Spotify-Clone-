import { Home, Library, LogOut, Search, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/', label: 'Library', icon: Library }
];

export function Sidebar({ user, onLogout }) {
  return (
    <aside className="glass fixed inset-x-3 bottom-3 z-30 flex h-16 items-center justify-between rounded-lg px-3 md:static md:inset-auto md:h-screen md:w-72 md:flex-col md:items-stretch md:rounded-none md:border-y-0 md:border-l-0 md:p-6">
      <div className="hidden md:block">
        <div className="flex items-center gap-3">
          <img
            src="/assets/Auralis-log-transparente.png"
            alt="Auralis"
            className="h-11 w-11 rounded-lg object-contain"
          />
          <div>
            <p className="text-lg font-extrabold tracking-wide text-white">Auralis</p>
            <p className="text-xs uppercase text-auralis">Signal music</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 items-center justify-center gap-1 md:mt-10 md:flex-none md:flex-col md:items-stretch md:justify-start">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex h-11 min-w-11 items-center justify-center gap-3 rounded-lg px-3 text-sm font-semibold transition md:justify-start ${
                  isActive && item.label !== 'Library'
                    ? 'bg-auralis text-ink'
                    : 'text-mist hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={19} />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="hidden rounded-lg bg-panelSoft p-4 md:block">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-auralis text-ink">
          <Sparkles size={18} />
        </div>
        <p className="text-sm font-bold text-white">{user?.displayName || 'Auralis Guest'}</p>
        <p className="mt-1 text-xs leading-5 text-mist">Biblioteca sincronizada pela Spotify Web API.</p>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="flex h-11 min-w-11 items-center justify-center rounded-lg text-mist transition hover:bg-white/5 hover:text-white md:mt-4 md:gap-3 md:px-3"
        aria-label="Logout"
        title="Logout"
      >
        <LogOut size={19} />
        <span className="hidden text-sm font-semibold md:inline">Logout</span>
      </button>
    </aside>
  );
}
