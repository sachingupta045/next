import { apiClient } from "./client";
import {
  CategoryCreate,
  CategoryFilterParams,
  CategoryResponse,
  CategoryUpdate,
} from "./types";

export const categoriesApi = {
  /**
   * List all categories with optional parent_id filter and pagination
   */
  list: (params?: CategoryFilterParams) =>
    apiClient.get<CategoryResponse[]>("/api/v1/categories/", {
      params: {
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 100,
        ...(params?.parent_id !== undefined ? { parent_id: params.parent_id } : {}),
      },
    }),

  /**
   * Get category by ID
   */
  getById: (id: number) =>
    apiClient.get<CategoryResponse>(`/api/v1/categories/${id}`),

  /**
   * Get category by Slug
   */
  getBySlug: (slug: string) =>
    apiClient.get<CategoryResponse>(`/api/v1/categories/slug/${slug}`),

  /**
   * Create a new category
   */
  create: (data: CategoryCreate) =>
    apiClient.post<CategoryResponse>("/api/v1/categories/", data),

  /**
   * Update category
   */
  update: (id: number, data: CategoryUpdate) =>
    apiClient.patch<CategoryResponse>(`/api/v1/categories/${id}`, data),

  /**
   * Delete category
   */
  delete: (id: number) =>
    apiClient.delete<void>(`/api/v1/categories/${id}`),
};
