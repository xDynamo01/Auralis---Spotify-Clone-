import { Clock3, Play } from 'lucide-react';

function formatDuration(ms) {
  if (!ms) {
    return '--:--';
  }

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function TrackList({ tracks = [], onTrackSelect }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/5">
      <div className="grid grid-cols-[3rem_1fr_4rem] items-center bg-white/[0.035] px-3 py-2 text-xs uppercase text-mist">
        <span>#</span>
        <span>Faixa</span>
        <Clock3 size={15} className="justify-self-end" />
      </div>
      <div className="divide-y divide-white/5">
        {tracks.map((track, index) => (
          <button
            key={`${track.id}-${index}`}
            type="button"
            onClick={() => onTrackSelect(track)}
            className="grid w-full grid-cols-[3rem_1fr_4rem] items-center px-3 py-3 text-left transition hover:bg-white/[0.05]"
          >
            <span className="text-sm text-mist">
              <Play size={15} className="hidden text-auralis" />
              <span>{index + 1}</span>
            </span>
            <span className="flex min-w-0 items-center gap-3">
              <img src={track.image || '/assets/Auralis-logo.png'} alt="" className="h-11 w-11 rounded object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-white">{track.name}</span>
                <span className="block truncate text-xs text-mist">{track.artists?.join(', ')}</span>
              </span>
            </span>
            <span className="justify-self-end text-xs text-mist">{formatDuration(track.durationMs)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
