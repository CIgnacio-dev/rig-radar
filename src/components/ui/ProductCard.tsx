// src/components/ui/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useIsHydrated } from '@/hooks/useIsHydrated';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isHydrated = useIsHydrated();
  const { toggleFavoriteProduct, isProductFavorite } = useFavoritesStore();

  const isFavorite = isHydrated ? isProductFavorite(product.id) : false;

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
          <span className="rounded-full bg-blue-950 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-800/50">
            {product.category}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavoriteProduct(product.id);
            }}
            aria-label="Guardar en favoritos"
            className="z-10 rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              className={`h-5 w-5 transition-colors ${
                isFavorite ? 'text-red-500' : 'text-slate-400'
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
        <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-slate-800">
          <Image
            src={product.imageUrl}
            alt={`Fotografía de ${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Título */}
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
          <Link href={`/product/${product.id}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        {/* Especificaciones clave */}
        <ul className="mt-3 space-y-1 text-xs text-slate-400">
          {product.specs.slice(0, 2).map((spec, index) => (
            <li key={index} className="flex justify-between">
              <span className="font-medium text-slate-400">{spec.name}:</span>
              <span className="text-slate-300">{spec.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Precio */}
      <div className="mt-4 border-t border-slate-800 pt-3">
        <span className="text-xs text-slate-400">Desde</span>
        <div className="text-lg font-bold text-slate-100">
          {formattedPrice}
        </div>
      </div>
    </article>
  );
}