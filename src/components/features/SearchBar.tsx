// src/components/features/SearchBar.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFilterStore } from '@/store/useFilterStore';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Sincronización limpia si el store se resetea externamente
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);
  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery);
    setLocalQuery(searchQuery);
  }

  // Debounce de 300ms antes de actualizar Zustand
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== searchQuery) {
        setSearchQuery(localQuery);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localQuery, searchQuery, setSearchQuery]);

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-4 w-4 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre o modelo (ej. RTX 4060, Ryzen 5)..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {localQuery && (
        <button
          onClick={() => {
            setLocalQuery('');
            setSearchQuery('');
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}