import { apiClient } from "./client";
import {
  CountryCreate,
  CountryResponse,
  PaginationParams,
} from "./types";

export const countryApi = {
  /**
   * List all countries with pagination
   */
  list: (params?: PaginationParams) =>
    apiClient.get<CountryResponse[]>("/api/v1/country/", {
      params: {
        skip: params?.skip ?? 0,
        limit: params?.limit ?? 100,
      },
    }),

  /**
   * Get country by ID
   */
  getById: (id: number) =>
    apiClient.get<CountryResponse>(`/api/v1/country/${id}`),

  /**
   * Create a new country
   */
  create: (data: CountryCreate) =>
    apiClient.post<CountryResponse>("/api/v1/country/create", data),
};
