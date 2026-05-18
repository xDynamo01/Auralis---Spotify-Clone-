import { Headphones, ShieldCheck } from 'lucide-react';
import { api } from '../services/api.js';

export function Login({ onDemoLogin }) {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="grid w-full max-w-5xl gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <img src="/assets/Auralis-name-logo.png" alt="Auralis" className="mb-8 h-16 w-auto object-contain" />
          <p className="mb-4 inline-flex items-center rounded-full border border-auralis/25 bg-auralis/10 px-3 py-1 text-xs font-bold uppercase text-auralis">
            Spotify Web API
          </p>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Auralis
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-mist">
            Um player minimalista conectado a sua conta Spotify, com playlists, busca e top tracks
            servidos por um backend seguro.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={api.loginUrl}
              className="inline-flex h-12 items-center justify-center rounded-lg bg-auralis px-6 text-sm font-extrabold text-ink transition hover:scale-[1.02]"
            >
              Login com Spotify
            </a>
            <button
              type="button"
              onClick={onDemoLogin}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-line px-6 text-sm font-bold text-white transition hover:border-auralis hover:text-auralis"
            >
              Ver modo demo
            </button>
          </div>
        </div>

        <div className="glass rounded-lg p-5 shadow-glow">
          <div className="aspect-[4/5] overflow-hidden rounded-md bg-panelSoft">
            <img src="/assets/cyberpunkcity.gif" alt="" className="h-full w-full object-cover opacity-80" />
          </div>
          <div className="mt-5 grid gap-3">
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-3">
              <Headphones className="text-auralis" size={20} />
              <span className="text-sm font-semibold text-white">Playlists e faixas reais</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.04] p-3">
              <ShieldCheck className="text-auralis" size={20} />
              <span className="text-sm font-semibold text-white">Tokens protegidos no backend</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
