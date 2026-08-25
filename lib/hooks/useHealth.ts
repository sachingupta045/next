"use client";

import { useQuery } from "@tanstack/react-query";
import { healthApi } from "@/lib/api";

export function useBackendHealth() {
  return useQuery({
    queryKey: ["backend-health"],
    queryFn: () => healthApi.check(),
    refetchInterval: 30000,
    retry: 1,
  });
}
