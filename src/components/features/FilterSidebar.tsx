// src/components/features/FilterSidebar.tsx
'use client';

import { useFilterStore } from '@/store/useFilterStore';
import { Category } from '@/types';

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Tarjetas de Video (GPU)', value: 'GPU' },
  { label: 'Procesadores (CPU)', value: 'CPU' },
  { label: 'Memorias RAM', value: 'RAM' },
  { label: 'Placas Madres', value: 'MOTHERBOARD' },
  { label: 'Almacenamiento', value: 'STORAGE' },
];

const POPULAR_BRANDS = ['ASUS', 'MSI', 'Gigabyte', 'AMD', 'Intel', 'Corsair'];

export function FilterSidebar() {
  const {
    category,
    brands,
    minPrice,
    maxPrice,
    setCategory,
    toggleBrand,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Filtros</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:underline dark:text-blue-400 font-medium"
        >
          Limpiar todo
        </button>
      </div>

      {/* Categorías */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Categoría
        </h3>
        <ul className="space-y-1 text-sm">
          {CATEGORIES.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => setCategory(category === cat.value ? null : cat.value)}
                className={`w-full text-left px-2 py-1.5 rounded-md transition-colors ${
                  category === cat.value
                    ? 'bg-blue-50 font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Marcas */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Marca
        </h3>
        <div className="space-y-2">
          {POPULAR_BRANDS.map((brand) => (
            <label
              key={brand}
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rango de Precios */}
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Precio Máximo (CLP)
        </h3>
        <input
          type="number"
          placeholder="Ej: 500000"
          value={maxPrice ?? ''}
          onChange={(e) =>
            setPriceRange(minPrice, e.target.value ? Number(e.target.value) : null)
          }
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>
    </aside>
  );
}