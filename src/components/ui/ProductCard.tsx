// src/components/ui/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Formateador de moneda para Pesos Chilenos (CLP)
  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.currentLowestPrice);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div>
        {/* Badge de Categoría */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">
            {product.availableAt.length} {product.availableAt.length === 1 ? 'tienda' : 'tiendas'}
          </span>
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