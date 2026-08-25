"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  brandsApi,
  PaginationParams,
  BrandCreate,
  BrandUpdate,
} from "@/lib/api";

export const BRAND_KEYS = {
  all: ["brands"] as const,
  lists: () => [...BRAND_KEYS.all, "list"] as const,
  list: (params?: PaginationParams) =>
    [...BRAND_KEYS.lists(), params] as const,
  details: () => [...BRAND_KEYS.all, "detail"] as const,
  detail: (id: number) => [...BRAND_KEYS.details(), id] as const,
};

export function useBrands(params?: PaginationParams) {
  return useQuery({
    queryKey: BRAND_KEYS.list(params),
    queryFn: () => brandsApi.list(params),
  });
}

export function useBrand(id: number) {
  return useQuery({
    queryKey: BRAND_KEYS.detail(id),
    queryFn: () => brandsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: BrandCreate) => brandsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.all });
    },
  });
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: BrandUpdate }) =>
      brandsApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: BRAND_KEYS.detail(variables.id),
      });
    },
  });
}

export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => brandsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BRAND_KEYS.all });
    },
  });
}
