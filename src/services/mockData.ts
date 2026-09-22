// src/services/mockData.ts
import { Product } from '@/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'GPU-ASUS-4060TI',
    name: 'ASUS Dual GeForce RTX 4060 Ti OC Edition 8GB',
    category: 'GPU',
    brand: 'ASUS',
    imageUrl: 'https://placehold.co/400x400/png?text=RTX+4060+Ti',
    currentLowestPrice: 380000,
    specs: [
      { name: 'Memoria', value: '8GB GDDR6' },
      { name: 'Frecuencia Core', value: '2565 MHz' },
      { name: 'Consumo', value: '160W' },
    ],
    priceHistory: [
      { date: '2026-09-01', price: 410000, storeId: 'st1' },
      { date: '2026-09-10', price: 395000, storeId: 'st1' },
      { date: '2026-09-22', price: 380000, storeId: 'st1' },
    ],
    availableAt: [
      { id: 'st1', name: 'PC Factory', logoUrl: '', websiteUrl: '#' },
      { id: 'st2', name: 'SP Digital', logoUrl: '', websiteUrl: '#' },
    ],
  },
  {
    id: '2',
    sku: 'CPU-AMD-7600X',
    name: 'AMD Ryzen 5 7600X 6-Core 12-Thread',
    category: 'CPU',
    brand: 'AMD',
    imageUrl: 'https://placehold.co/400x400/png?text=Ryzen+7600X',
    currentLowestPrice: 220000,
    specs: [
      { name: 'Socket', value: 'AM5' },
      { name: 'Núcleos/Hilos', value: '6 / 12' },
      { name: 'Frecuencia Base', value: '4.7 GHz' },
    ],
    priceHistory: [
      { date: '2026-09-01', price: 240000, storeId: 'st1' },
      { date: '2026-09-22', price: 220000, storeId: 'st2' },
    ],
    availableAt: [
      { id: 'st1', name: 'PC Factory', logoUrl: '', websiteUrl: '#' },
    ],
  },
];