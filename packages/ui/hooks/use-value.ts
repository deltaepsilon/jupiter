import { useMemo } from 'react';

export function useValue<Map extends Record<string, any>>(map: Map): Map {
  return useMemo(() => map, Object.values(map)); // eslint-disable-line react-hooks/exhaustive-deps
}
