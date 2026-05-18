import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { MusicCard } from '../components/MusicCard.jsx';
import { EmptyState, LoadingState } from '../components/States.jsx';
import { TrackList } from '../components/TrackList.jsx';
import { api } from '../services/api.js';

export function Home() {
  const navigate = useNavigate();
  const { user, onTrackSelect } = useOutletContext();
  const [state, setState] = useState({ loading: true, profile: null, playlists: [], topTracks: [] });

  useEffect(() => {
    let active = true;

    Promise.all([api.profile(), api.playlists(), api.topTracks()])
      .then(([profile, playlists, topTracks]) => {
        if (active) {
          setState({
            loading: false,
            profile,
            playlists: playlists.items,
            topTracks: topTracks.items
          });
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate('/session-expired');
          return;
        }

        if (active) {
          setState((current) => ({ ...current, loading: false }));
        }
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  if (state.loading) {
    return <LoadingState label="Carregando sua biblioteca" />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="mb-8 flex flex-col justify-between gap-4 border-b border-white/5 pb-7 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase text-auralis">Bom som, {user?.displayName}</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Seu pulso musical em um painel limpo.
          </h1>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/[0.035] px-4 py-3">
          <p className="text-xs uppercase text-mist">Seguidores</p>
          <p className="text-2xl font-extrabold text-white">{state.profile?.followers ?? 0}</p>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">Playlists</h2>
          <span className="text-sm text-mist">{state.playlists.length} itens</span>
        </div>
        {state.playlists.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {state.playlists.slice(0, 10).map((playlist) => (
              <MusicCard key={playlist.id} item={playlist} />
            ))}
          </div>
        ) : (
          <EmptyState title="Nenhuma playlist encontrada" description="Sua biblioteca aparecera aqui depois do login." />
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white">Top tracks</h2>
          <span className="text-sm text-mist">Medium term</span>
        </div>
        {state.topTracks.length > 0 ? (
          <TrackList tracks={state.topTracks.slice(0, 10)} onTrackSelect={onTrackSelect} />
        ) : (
          <EmptyState title="Top tracks indisponiveis" description="O Spotify precisa de historico suficiente para gerar esta lista." />
        )}
      </section>
    </div>
  );
}
