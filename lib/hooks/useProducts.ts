"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productsApi,
  ProductFilterParams,
  ProductCreate,
  ProductUpdate,
} from "@/lib/api";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  lists: () => [...PRODUCT_KEYS.all, "list"] as const,
  list: (filters?: ProductFilterParams) =>
    [...PRODUCT_KEYS.lists(), filters] as const,
  details: () => [...PRODUCT_KEYS.all, "detail"] as const,
  detail: (id: number) => [...PRODUCT_KEYS.details(), id] as const,
  slug: (slug: string) => [...PRODUCT_KEYS.details(), "slug", slug] as const,
};

export function useProducts(params?: ProductFilterParams) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => productsApi.list(params),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.slug(slug),
    queryFn: () => productsApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductCreate) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProductUpdate }) =>
      productsApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: PRODUCT_KEYS.detail(variables.id),
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
}
