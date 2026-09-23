// src/types/index.ts

export type Category = 'GPU' | 'CPU' | 'RAM' | 'MOTHERBOARD' | 'STORAGE';

export interface Store {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface PriceRecord {
  date: string; // Formato "YYYY-MM-DD"
  price: number;
  storeId: string;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Category;
  brand: string;
  imageUrl: string;
  currentLowestPrice: number;
  specs: ProductSpecification[];
  priceHistory: PriceRecord[];
  availableAt: Store[];
}

export interface FilterState {
  category: Category | null;
  brands: string[];
  minPrice: number | null;
  maxPrice: number | null;
  searchQuery: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  createdAt: string;
  filters: FilterState;
}