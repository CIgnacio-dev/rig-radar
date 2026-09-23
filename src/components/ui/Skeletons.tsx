// src/components/ui/Skeletons.tsx

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 animate-pulse">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="h-5 w-16 rounded-full bg-slate-800" />
          <div className="h-4 w-12 rounded bg-slate-800" />
        </div>
        <div className="mb-4 aspect-square w-full rounded-lg bg-slate-800" />
        <div className="h-4 w-3/4 rounded bg-slate-800 mb-2" />
        <div className="h-4 w-1/2 rounded bg-slate-800" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-slate-800" />
          <div className="h-3 w-2/3 rounded bg-slate-800" />
        </div>
      </div>
      <div className="mt-4 border-t border-slate-800/80 pt-3">
        <div className="h-3 w-10 rounded bg-slate-800 mb-1" />
        <div className="h-6 w-24 rounded bg-slate-800" />
      </div>
    </div>
  );
}

export function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 space-y-8 animate-pulse">
      <div className="h-4 w-28 rounded bg-slate-800" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square w-full rounded-2xl bg-slate-800" />
        <div className="space-y-6">
          <div className="h-6 w-32 rounded-full bg-slate-800" />
          <div className="h-8 w-3/4 rounded bg-slate-800" />
          <div className="h-20 w-full rounded-xl bg-slate-800" />
          <div className="space-y-3">
            <div className="h-4 w-1/3 rounded bg-slate-800" />
            <div className="h-10 w-full rounded bg-slate-800" />
            <div className="h-10 w-full rounded bg-slate-800" />
          </div>
        </div>
      </div>
      <div className="h-64 w-full rounded-xl bg-slate-800" />
    </div>
  );
}