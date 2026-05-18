import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { MusicCard } from '../components/MusicCard.jsx';
import { EmptyState, LoadingState } from '../components/States.jsx';
import { TrackList } from '../components/TrackList.jsx';
import { api } from '../services/api.js';

export function Search() {
  const navigate = useNavigate();
  const { onTrackSelect } = useOutletContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cleanQuery = query.trim();

    if (cleanQuery.length < 2) {
      setResults(null);
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(true);
      api
        .search(cleanQuery)
        .then(setResults)
        .catch((error) => {
          if (error.status === 401) {
            navigate('/session-expired');
          }
        })
        .finally(() => setLoading(false));
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [query, navigate]);

  return (
    <div className="mx-auto max-w-7xl">
      <section className="mb-8">
        <p className="text-sm font-bold uppercase text-auralis">Search</p>
        <h1 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">Encontre seu proximo loop.</h1>
        <label className="mt-6 flex h-14 max-w-2xl items-center gap-3 rounded-lg border border-line bg-panelSoft px-4 focus-within:border-auralis">
          <SearchIcon size={20} className="text-auralis" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar faixas, artistas ou playlists"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-mist"
          />
        </label>
      </section>

      {loading && <LoadingState label="Buscando no Spotify" />}

      {!loading && !results && (
        <EmptyState title="Digite para buscar" description="A busca roda pelo backend e consulta a Spotify Web API." />
      )}

      {!loading && results && (
        <div className="grid gap-10">
          <section>
            <h2 className="mb-4 text-xl font-extrabold text-white">Faixas</h2>
            {results.tracks.length > 0 ? (
              <TrackList tracks={results.tracks} onTrackSelect={onTrackSelect} />
            ) : (
              <EmptyState title="Sem faixas" description="Tente outra combinacao de palavras." />
            )}
          </section>

          <section>
            <h2 className="mb-4 text-xl font-extrabold text-white">Playlists</h2>
            {results.playlists.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
                {results.playlists.map((playlist) => (
                  <MusicCard key={playlist.id} item={playlist} />
                ))}
              </div>
            ) : (
              <EmptyState title="Sem playlists" description="Nenhuma playlist voltou nesta busca." />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
