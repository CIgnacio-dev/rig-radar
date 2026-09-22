// src/components/features/PriceHistoryChart.tsx
'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PriceRecord } from '@/types';

interface PriceHistoryChartProps {
  data: PriceRecord[];
}

export function PriceHistoryChart({ data }: PriceHistoryChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short',
    }),
  }));

  const formatCLP = (val: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="h-64 w-full rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        Historial de Precios (Últimos 30 días)
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="formattedDate" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
          <Tooltip
            formatter={(value: number) => [formatCLP(value), 'Precio']}
            labelFormatter={(label) => `Fecha: ${label}`}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}