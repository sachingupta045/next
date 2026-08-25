import { apiClient } from "./client";
import {
  BrandCreate,
  BrandResponse,
  BrandUpdate,
  PaginationParams,
} from "./types";

export const brandsApi = {
  /**
   * List all brands with pagination
   */
  list: (params?: PaginationParams) =>
    apiClient.get<BrandResponse[]>("/api/v1/brands/", {
      params: {
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 100,
      },
    }),

  /**
   * Get brand by ID
   */
  getById: (id: number) =>
    apiClient.get<BrandResponse>(`/api/v1/brands/${id}`),

  /**
   * Create a new brand
   */
  create: (data: BrandCreate) =>
    apiClient.post<BrandResponse>("/api/v1/brands/", data),

  /**
   * Update brand
   */
  update: (id: number, data: BrandUpdate) =>
    apiClient.patch<BrandResponse>(`/api/v1/brands/${id}`, data),

  /**
   * Delete brand
   */
  delete: (id: number) =>
    apiClient.delete<void>(`/api/v1/brands/${id}`),

  /**
   * Brand hello endpoint test
   */
  hello: () =>
    apiClient.get<Record<string, unknown>>("/api/v1/brands/hello"),
};
