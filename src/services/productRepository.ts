// src/services/productRepository.ts
import { Product, FilterState } from '@/types';
import { MOCK_PRODUCTS } from './mockData';

export interface IProductRepository {
  getProducts(filters?: Partial<FilterState>): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
}

class MockProductRepository implements IProductRepository {
  private latencyMs: number;
  private failureRate: number;

  constructor(latencyMs = 400, failureRate = 0) {
    this.latencyMs = latencyMs;
    this.failureRate = failureRate;
  }

  private async simulateNetwork(): Promise<void> {
    if (this.latencyMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.latencyMs));
    }

    if (this.failureRate > 0 && Math.random() < this.failureRate) {
      throw new Error('Error de conexión con el servidor de catálogo. Reintentando...');
    }
  }

  async getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
    await this.simulateNetwork();

    let result = [...MOCK_PRODUCTS];

    if (!filters) return result;

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.brands && filters.brands.length > 0) {
      result = result.filter((p) => filters.brands!.includes(p.brand));
    }

    if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
      result = result.filter((p) => p.currentLowestPrice <= filters.maxPrice!);
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
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
    }

    return result;
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.simulateNetwork();
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    return product || null;
  }
}

// Inyección de dependencia singleton exportada
export const productRepository: IProductRepository = new MockProductRepository(300, 0);