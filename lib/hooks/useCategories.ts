"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  categoriesApi,
  CategoryFilterParams,
  CategoryCreate,
  CategoryUpdate,
} from "@/lib/api";

export const CATEGORY_KEYS = {
  all: ["categories"] as const,
  lists: () => [...CATEGORY_KEYS.all, "list"] as const,
  list: (params?: CategoryFilterParams) =>
    [...CATEGORY_KEYS.lists(), params] as const,
  details: () => [...CATEGORY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...CATEGORY_KEYS.details(), id] as const,
  slug: (slug: string) => [...CATEGORY_KEYS.details(), "slug", slug] as const,
};

export function useCategories(params?: CategoryFilterParams) {
  return useQuery({
    queryKey: CATEGORY_KEYS.list(params),
    queryFn: () => categoriesApi.list(params),
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: CATEGORY_KEYS.detail(id),
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: CATEGORY_KEYS.slug(slug),
    queryFn: () => categoriesApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryCreate) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryUpdate }) =>
      categoriesApi.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: CATEGORY_KEYS.detail(variables.id),
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}
