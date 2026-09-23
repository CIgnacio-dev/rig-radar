// src/app/page.tsx
'use client';

import { useSyncFiltersWithUrl } from '@/hooks/useSyncFiltersWithUrl';
import { FilterSidebar } from '@/components/features/FilterSidebar';
import { SearchBar } from '@/components/features/SearchBar';
import { SortSelector } from '@/components/features/SortSelector';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { useFilterStore } from '@/store/useFilterStore';

export default function Home() {
  useSyncFiltersWithUrl();

  const { category, brands, maxPrice, searchQuery, sortBy } = useFilterStore();

  // 1. Filtrado de productos
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;
    if (maxPrice && product.currentLowestPrice > maxPrice) return false;
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // 2. Ordenamiento de resultados
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.currentLowestPrice - b.currentLowestPrice;
      case 'price-desc':
        return b.currentLowestPrice - a.currentLowestPrice;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">RigRadar</h1>
          <p className="text-sm text-slate-400 mt-1">
            Comparador y seguimiento de precios de hardware en tiempo real.
          </p>
        </div>
        <SearchBar />
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Panel de Filtros */}
        <FilterSidebar />

        {/* Contenido Principal */}
        <section className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs text-slate-400 font-medium">
              {sortedProducts.length}{' '}
              {sortedProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </span>
            <SortSelector />
          </div>

          {sortedProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-900/40">
              <p className="text-slate-400">No se encontraron productos con esos criterios.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}