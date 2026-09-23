// src/store/useFavoritesStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { FilterState, SavedSearch } from '@/types';

interface FavoritesStore {
  favoriteProductIds: string[];
  savedSearches: SavedSearch[];
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
  toggleFavoriteProduct: (productId: string) => void;
  isProductFavorite: (productId: string) => boolean;
  saveCurrentSearch: (name: string, filters: FilterState) => void;
  removeSavedSearch: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteProductIds: [],
      savedSearches: [],
      isHydrated: false,

      setHydrated: (state) => set({ isHydrated: state }),

      toggleFavoriteProduct: (productId) =>
        set((state) => {
          const exists = state.favoriteProductIds.includes(productId);
          return {
            favoriteProductIds: exists
              ? state.favoriteProductIds.filter((id) => id !== productId)
              : [...state.favoriteProductIds, productId],
          };
        }),

      isProductFavorite: (productId) => get().favoriteProductIds.includes(productId),

      saveCurrentSearch: (name, filters) =>
        set((state) => ({
          savedSearches: [
            ...state.savedSearches,
            {
              id: crypto.randomUUID(),
              name,
              createdAt: new Date().toISOString(),
              filters,
            },
          ],
        })),

      removeSavedSearch: (id) =>
        set((state) => ({
          savedSearches: state.savedSearches.filter((s) => s.id !== id),
        })),
    }),
    {
      name: 'rigradar-favorites-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);