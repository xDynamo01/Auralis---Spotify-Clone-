import { ExternalLink, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function PlayerBar({ track }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    audioRef.current?.pause();
  }, [track]);

  const togglePreview = async () => {
    if (!track?.previewUrl || !audioRef.current) {
      return;
    }

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    await audioRef.current.play();
    setPlaying(true);
  };

  return (
    <footer className="glass fixed inset-x-0 bottom-0 z-20 border-x-0 border-b-0 px-4 py-3 md:left-72">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <img
          src={track?.image || '/assets/Auralis-logo.png'}
          alt=""
          className="h-12 w-12 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{track?.name || 'Auralis Radio'}</p>
          <p className="truncate text-xs text-mist">
            {track?.artists?.join(', ') || 'Selecione uma faixa para abrir o player'}
          </p>
        </div>
        <button
          type="button"
          onClick={togglePreview}
          disabled={!track?.previewUrl}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-auralis text-ink transition hover:scale-105 disabled:cursor-not-allowed disabled:bg-line disabled:text-mist"
          aria-label={playing ? 'Pausar preview' : 'Tocar preview'}
          title={track?.previewUrl ? 'Preview' : 'Preview indisponivel'}
        >
          {playing ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
        </button>
        {track?.externalUrl && (
          <a
            href={track.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-line text-mist transition hover:border-auralis hover:text-auralis sm:flex"
            aria-label="Abrir no Spotify"
            title="Abrir no Spotify"
          >
            <ExternalLink size={18} />
          </a>
        )}
      </div>
      {track?.previewUrl && <audio ref={audioRef} src={track.previewUrl} onEnded={() => setPlaying(false)} />}
    </footer>
  );
}
