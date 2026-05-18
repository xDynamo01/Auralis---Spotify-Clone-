import { Loader2, Music2 } from 'lucide-react';

export function LoadingState({ label = 'Carregando' }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-line text-mist">
      <Loader2 size={18} className="mr-2 animate-spin text-auralis" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-line px-6 text-center">
      <Music2 size={28} className="text-auralis" />
      <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-mist">{description}</p>
    </div>
  );
}
