// src/hooks/useIsHydrated.ts
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Valor en el Cliente
    () => false  // Valor en el Servidor (SSR)
  );
}