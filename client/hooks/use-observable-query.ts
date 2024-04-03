import { QueryKey, useQuery } from "@tanstack/react-query";

export function useObserveQuery<TData = unknown>(queryKey: QueryKey) {
  return useQuery<TData>({ queryKey, enabled: false });
}
