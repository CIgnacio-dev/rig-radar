// src/app/page.tsx
'use client';

import { useSyncFiltersWithUrl } from '@/hooks/useSyncFiltersWithUrl';
import { FilterSidebar } from '@/components/features/FilterSidebar';
import { ProductCard } from '@/components/ui/ProductCard';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { useFilterStore } from '@/store/useFilterStore';

export default function Home() {
  // Activa la sincronización bidireccional entre la URL y Zustand
  useSyncFiltersWithUrl();

  const { category, brands, maxPrice } = useFilterStore();

  // Filtrado dinámico client-side sobre el mock
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;
    if (maxPrice && product.currentLowestPrice > maxPrice) return false;
    return true;
  });

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          RigRadar
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Comparador y seguimiento de precios de hardware en tiempo real.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Panel de Filtros */}
        <FilterSidebar />

        {/* Grilla de Resultados */}
        <section className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-800">
              <p className="text-gray-500">No se encontraron productos con esos filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}