// src/__tests__/useFilterStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useFilterStore } from '@/store/useFilterStore';

describe('useFilterStore', () => {
  beforeEach(() => {
    useFilterStore.getState().resetFilters();
  });

  it('debe iniciar con el estado por defecto', () => {
    const state = useFilterStore.getState();
    expect(state.category).toBeNull();
    expect(state.brands).toEqual([]);
    expect(state.searchQuery).toBe('');
    expect(state.sortBy).toBe('price-asc');
  });

  it('debe actualizar la categoría correctamente', () => {
    useFilterStore.getState().setCategory('GPU');
    expect(useFilterStore.getState().category).toBe('GPU');
  });

  it('debe agregar y quitar marcas dinámicamente con toggleBrand', () => {
    useFilterStore.getState().toggleBrand('ASUS');
    expect(useFilterStore.getState().brands).toContain('ASUS');

    useFilterStore.getState().toggleBrand('ASUS');
    expect(useFilterStore.getState().brands).not.toContain('ASUS');
  });

  it('debe resetear todos los filtros a su estado inicial', () => {
    useFilterStore.getState().setCategory('CPU');
    useFilterStore.getState().setSearchQuery('Ryzen');
    useFilterStore.getState().resetFilters();

    const state = useFilterStore.getState();
    expect(state.category).toBeNull();
    expect(state.searchQuery).toBe('');
  });
});