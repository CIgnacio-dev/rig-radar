// src/hooks/useSyncFiltersWithUrl.ts
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useFilterStore } from '@/store/useFilterStore';
import { Category, SortOption } from '@/types';

export function useSyncFiltersWithUrl() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { category, brands, minPrice, maxPrice, searchQuery, sortBy, setAllFilters } = useFilterStore();
  const isUpdatingFromUrl = useRef(false);

  // 1. Carga inicial desde la URL a Zustand
  useEffect(() => {
    isUpdatingFromUrl.current = true;

    const urlCategory = searchParams.get('category') as Category | null;
    const urlBrands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
    const urlMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const urlMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const urlSearchQuery = searchParams.get('q') || '';
    const urlSortBy = (searchParams.get('sort') as SortOption) || 'price-asc';

    setAllFilters({
      category: urlCategory,
      brands: urlBrands,
      minPrice: urlMinPrice,
      maxPrice: urlMaxPrice,
      searchQuery: urlSearchQuery,
      sortBy: urlSortBy,
    });

    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 0);
  }, [searchParams, setAllFilters]);

  // 2. Sincronizar cambios de Zustand hacia la URL
  useEffect(() => {
    if (isUpdatingFromUrl.current) return;

    const params = new URLSearchParams();

    if (category) params.set('category', category);
    if (brands.length > 0) params.set('brands', brands.join(','));
    if (minPrice !== null) params.set('minPrice', minPrice.toString());
    if (maxPrice !== null) params.set('maxPrice', maxPrice.toString());
    if (searchQuery) params.set('q', searchQuery);
    if (sortBy && sortBy !== 'price-asc') params.set('sort', sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [category, brands, minPrice, maxPrice, searchQuery, sortBy, pathname, router]);
}