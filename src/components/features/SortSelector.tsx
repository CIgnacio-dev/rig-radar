// src/components/features/SortSelector.tsx
'use client';

import { useFilterStore } from '@/store/useFilterStore';
import { SortOption } from '@/types';

export function SortSelector() {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-select" className="text-xs text-slate-400 font-medium">
        Ordenar por:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="rounded-lg border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
      >
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="name-asc">Nombre: A - Z</option>
        <option value="name-desc">Nombre: Z - A</option>
      </select>
    </div>
  );
}