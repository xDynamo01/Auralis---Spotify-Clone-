import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MusicCard({ item, type = 'playlist', onPlay }) {
  const content = (
    <article className="group h-full rounded-lg border border-white/5 bg-white/[0.035] p-3 transition hover:-translate-y-0.5 hover:border-auralis/40 hover:bg-white/[0.07]">
      <div className="relative aspect-square overflow-hidden rounded-md bg-panelSoft">
        <img
          src={item.image || '/assets/Auralis-logo.png'}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {type === 'track' && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              onPlay?.(item);
            }}
            className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-auralis text-ink opacity-0 shadow-glow transition group-hover:opacity-100"
            aria-label="Selecionar faixa"
            title="Selecionar faixa"
          >
            <Play size={18} fill="currentColor" />
          </button>
        )}
      </div>
      <h3 className="mt-3 truncate text-sm font-bold text-white">{item.name}</h3>
      <p className="line-clamp-2 mt-1 min-h-9 text-xs leading-5 text-mist">
        {type === 'track' ? item.artists?.join(', ') : item.description || item.owner || 'Playlist'}
      </p>
    </article>
  );

  if (type === 'playlist') {
    return (
      <Link to={`/playlists/${item.id}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
