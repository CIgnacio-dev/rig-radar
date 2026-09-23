// src/app/error.tsx
'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí puedes registrar el error en un servicio como Sentry o Datadog
    console.error('Error Boundary capturó una excepción:', error);
  }, [error]);

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 flex flex-col items-center justify-center text-center">
      <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-8 max-w-md space-y-4 backdrop-blur-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30 text-red-400">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-slate-100">Algo salió mal</h2>
        <p className="text-xs text-slate-400">
          Ocurrió un error inesperado al procesar la solicitud.
        </p>
        <button
          onClick={() => reset()}
          className="w-full rounded-xl bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors"
        >
          Reintentar operación
        </button>
      </div>
    </main>
  );
}