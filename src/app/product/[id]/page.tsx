// src/app/product/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { productRepository } from '@/services/productRepository';
import { PriceHistoryChart } from '@/components/features/PriceHistoryChart';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  // Consumo asíncrono desacoplado mediante el Repository Pattern
  const product = await productRepository.getProductById(id);

  if (!product) {
    notFound();
  }

  const formatCLP = (val: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen Principal */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Detalles e Información Básica */}
        <div className="space-y-6">
          <div>
            <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-800/50">
              {product.category} • {product.brand}
            </span>
            <h1 className="text-2xl font-bold text-slate-100 mt-3">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="rounded-xl bg-slate-900/80 p-4 border border-slate-800">
            <span className="text-xs text-slate-400">Mejor precio detectado</span>
            <div className="text-3xl font-extrabold text-blue-400 mt-1">
              {formatCLP(product.currentLowestPrice)}
            </div>
          </div>

          {/* Especificaciones Técnicas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Especificaciones Clave
            </h3>
            <div className="divide-y divide-slate-800/60 border-t border-b border-slate-800/60">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-2 text-xs">
                  <span className="text-slate-400">{spec.name}</span>
                  <span className="font-medium text-slate-200">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparador de Tiendas Disponibles */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-100">
          Precios Disponibles por Tienda ({product.availableAt.length})
        </h2>
        <div className="divide-y divide-slate-800">
          {product.availableAt.map((store) => (
            <div
              key={store.id}
              className="flex items-center justify-between py-3 hover:bg-slate-800/30 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-400">
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{store.name}</h4>
                  <span className="text-xs text-emerald-400">En stock</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-base font-bold text-slate-100">
                  {formatCLP(product.currentLowestPrice)}
                </span>
                <a
                  href={store.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-500 transition-colors"
                >
                  Ir a la oferta ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gráfico de Historial */}
      <PriceHistoryChart data={product.priceHistory} />
    </main>
  );
}