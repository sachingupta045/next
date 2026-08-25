import { apiClient } from "./client";
import {
  ProductCreate,
  ProductFilterParams,
  ProductResponse,
  ProductUpdate,
} from "./types";

export const productsApi = {
  /**
   * List products with optional filters (brand_id, category_id, status, pagination)
   */
  list: (params?: ProductFilterParams) =>
    apiClient.get<ProductResponse[]>("/api/v1/products/", {
      params: {
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 100,
        ...(params?.brand_id !== undefined && params?.brand_id !== null
          ? { brand_id: params.brand_id }
          : {}),
        ...(params?.category_id !== undefined && params?.category_id !== null
          ? { category_id: params.category_id }
          : {}),
        ...(params?.status !== undefined && params?.status !== null
          ? { status: params.status }
          : {}),
      },
    }),

  /**
   * Get product by ID
   */
  getById: (id: number) =>
    apiClient.get<ProductResponse>(`/api/v1/products/${id}`),

  /**
   * Get product by Slug
   */
  getBySlug: (slug: string) =>
    apiClient.get<ProductResponse>(`/api/v1/products/slug/${slug}`),

  /**
   * Create a new product
   */
  create: (data: ProductCreate) =>
    apiClient.post<ProductResponse>("/api/v1/products/", data),

  /**
   * Update product
   */
  update: (id: number, data: ProductUpdate) =>
    apiClient.patch<ProductResponse>(`/api/v1/products/${id}`, data),

  /**
   * Delete product
   */
  delete: (id: number) =>
    apiClient.delete<void>(`/api/v1/products/${id}`),
};
