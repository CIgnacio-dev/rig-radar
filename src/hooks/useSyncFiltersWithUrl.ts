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
  const isInitialRender = useRef(true);

  // 1. Al cargar la página: Leer los parámetros de la URL e inyectarlos en Zustand
  useEffect(() => {
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
  }, [searchParams, setAllFilters]);

  // 2. Al cambiar el estado de Zustand: Actualizar la URL sin recargar la página
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

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