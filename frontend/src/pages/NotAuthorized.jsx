import { Link } from 'react-router-dom';

export function NotAuthorized() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <section className="max-w-md">
        <p className="text-sm font-bold uppercase text-auralis">Not Authorized</p>
        <h1 className="mt-3 text-4xl font-extrabold text-white">Acesso nao autorizado</h1>
        <p className="mt-4 leading-7 text-mist">A autorizacao com Spotify foi cancelada ou recusada.</p>
        <Link
          to="/login"
          className="mt-7 inline-flex h-11 items-center justify-center rounded-lg bg-auralis px-5 text-sm font-bold text-ink"
        >
          Tentar novamente
        </Link>
      </section>
    </main>
  );
}
