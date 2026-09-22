// src/hooks/useSyncFiltersWithUrl.ts
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFilterStore } from '@/store/useFilterStore';
import { Category } from '@/types';

export function useSyncFiltersWithUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { category, brands, minPrice, maxPrice, searchQuery, setAllFilters } = useFilterStore();
  const isUpdatingFromUrl = useRef(false);

  // 1. Carga inicial desde la URL a Zustand (solo se ejecuta una vez al montar o al navegar manualmente)
  useEffect(() => {
    isUpdatingFromUrl.current = true;

    const urlCategory = searchParams.get('category') as Category | null;
    const urlBrands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
    const urlMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const urlMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const urlSearchQuery = searchParams.get('q') || '';

    setAllFilters({
      category: urlCategory,
      brands: urlBrands,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      searchQuery: urlSearchQuery,
    });

    // Permitimos que el siguiente render actualice la URL si el usuario cambia un filtro
    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 0);
  }, [searchParams, setAllFilters]);

  // 2. Sincronizar cambios del Store de Zustand hacia la URL
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (brands.length > 0) params.set('brands', brands.join(','));
    if (minPrice !== null) params.set('minPrice', minPrice.toString());
    if (maxPrice !== null) params.set('maxPrice', maxPrice.toString());
    if (searchQuery) params.set('q', searchQuery);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [category, brands, minPrice, maxPrice, searchQuery, pathname, router]);
}