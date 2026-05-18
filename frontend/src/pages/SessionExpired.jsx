import { Link } from 'react-router-dom';

export function SessionExpired() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <section className="max-w-md">
        <p className="text-sm font-bold uppercase text-auralis">Session expired</p>
        <h1 className="mt-3 text-4xl font-extrabold text-white">Sessao expirada</h1>
        <p className="mt-4 leading-7 text-mist">Entre novamente para renovar sua conexao com Spotify.</p>
        <Link
          to="/login"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-lg bg-auralis px-5 text-sm font-bold text-ink"
        >
          Login com Spotify
        </Link>
      </section>
    </main>
  );
}
