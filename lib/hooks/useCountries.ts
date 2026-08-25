"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { countryApi, PaginationParams, CountryCreate } from "@/lib/api";

export const COUNTRY_KEYS = {
  all: ["countries"] as const,
  lists: () => [...COUNTRY_KEYS.all, "list"] as const,
  list: (params?: PaginationParams) =>
    [...COUNTRY_KEYS.lists(), params] as const,
  details: () => [...COUNTRY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...COUNTRY_KEYS.details(), id] as const,
};

export function useCountries(params?: PaginationParams) {
  return useQuery({
    queryKey: COUNTRY_KEYS.list(params),
    queryFn: () => countryApi.list(params),
  });
}

export function useCountry(id: number) {
  return useQuery({
    queryKey: COUNTRY_KEYS.detail(id),
    queryFn: () => countryApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCountry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CountryCreate) => countryApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUNTRY_KEYS.all });
    },
  });
}
