// src/app/loading.tsx
import { CatalogSkeleton } from '@/components/ui/Skeletons';

export default function Loading() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto p-6 space-y-8">
      <div className="h-16 w-full max-w-md rounded-xl bg-slate-800/50 animate-pulse" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 h-96 rounded-xl bg-slate-900/80 border border-slate-800 animate-pulse" />
        <section className="flex-1">
          <CatalogSkeleton />
        </section>
      </div>
    </main>
  );
}