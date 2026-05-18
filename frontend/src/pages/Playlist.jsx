import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { EmptyState, LoadingState } from '../components/States.jsx';
import { TrackList } from '../components/TrackList.jsx';
import { api } from '../services/api.js';

export function Playlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onTrackSelect } = useOutletContext();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api
      .playlist(id)
      .then((data) => {
        if (active) {
          setPlaylist(data);
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          navigate('/session-expired');
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id, navigate]);

  if (loading) {
    return <LoadingState label="Abrindo playlist" />;
  }

  if (!playlist) {
    return <EmptyState title="Playlist nao encontrada" description="Nao foi possivel carregar esta playlist." />;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="mb-8 grid gap-6 border-b border-white/5 pb-8 md:grid-cols-[14rem_1fr] md:items-end">
        <img
          src={playlist.image || '/assets/Auralis-logo.png'}
          alt=""
          className="aspect-square w-full max-w-56 rounded-lg object-cover shadow-glow"
        />
        <div>
          <p className="text-sm font-bold uppercase text-auralis">Playlist</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white md:text-6xl">{playlist.name}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-mist">{playlist.description || playlist.owner}</p>
          <p className="mt-4 text-sm font-semibold text-white">{playlist.tracksTotal} faixas</p>
        </div>
      </section>

      {playlist.tracks.length > 0 ? (
        <TrackList tracks={playlist.tracks} onTrackSelect={onTrackSelect} />
      ) : (
        <EmptyState title="Playlist vazia" description="Esta playlist nao retornou faixas pela API." />
      )}
    </div>
  );
}
