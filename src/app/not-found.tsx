// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 flex flex-col items-center justify-center text-center">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 max-w-md space-y-4">
        <span className="text-4xl font-extrabold text-blue-500">404</span>
        <h1 className="text-xl font-bold text-slate-100">Producto o Ruta no encontrada</h1>
        <p className="text-xs text-slate-400">
          El ítem o la ruta a la que intentas acceder no existe en el catálogo de RigRadar.
        </p>
        <Link
          href="/"
          className="inline-block w-full rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Volver al catálogo principal
        </Link>
      </div>
    </main>
  );
}