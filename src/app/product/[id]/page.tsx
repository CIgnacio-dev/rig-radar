// src/app/product/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/services/mockData';
import { PriceHistoryChart } from '@/components/features/PriceHistoryChart';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(product.currentLowestPrice);

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 space-y-8">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería / Imagen Principal */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-800">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Detalles del Producto */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {product.category} • {product.brand}
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {product.name}
            </h1>
            <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
            <span className="text-xs text-gray-500">Mejor precio disponible</span>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {formattedPrice}
            </div>
          </div>

          {/* Especificaciones */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
              Especificaciones Técnicas
            </h3>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-500">{spec.name}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Historial */}
      <PriceHistoryChart data={product.priceHistory} />
    </main>
  );
}