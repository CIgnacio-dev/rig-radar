// src/components/ui/ProductCard.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useFavoritesStore } from '@/store/useFavoritesStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const { toggleFavoriteProduct, isProductFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFavorite = mounted ? isProductFavorite(product.id) : false;

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.currentLowestPrice);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm transition-all hover:border-slate-700 hover:shadow-xl hover:shadow-blue-500/5">
      <div>
        {/* Header con Badge y Botón de Favorito */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {product.category}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavoriteProduct(product.id);
            }}
            aria-label="Guardar en favoritos"
            className="z-10 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              className={`h-5 w-5 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Imagen del Producto */}
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.imageUrl}
            alt={`Fotografía de ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Título */}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          <Link href={`/product/${product.id}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        {/* Especificaciones clave */}
        <ul className="mt-3 space-y-1 text-xs text-gray-500 dark:text-gray-400">
          {product.specs.slice(0, 2).map((spec, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-medium">{spec.name}:</span>
              <span>{spec.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio y CTA */}
      <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs text-gray-500">Desde</span>
        <div className="text-lg font-bold text-gray-900 dark:text-white">
          {formattedPrice}
        </div>
      </div>
    </article>
  );
}