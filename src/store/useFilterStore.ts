// src/store/useFilterStore.ts
import { create } from 'zustand';
import { Category, FilterState, SortOption } from '@/types';

interface FilterStore extends FilterState {
  setCategory: (category: Category | null) => void;
  toggleBrand: (brand: string) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
  setAllFilters: (filters: Partial<FilterState>) => void;
}

const initialFilters: FilterState = {
  category: null,
  brands: [],
  minPrice: null,
  maxPrice: null,
  searchQuery: '',
  sortBy: 'price-asc',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilters,

  setCategory: (category) => set({ category }),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set(initialFilters),

  setAllFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));