import { apiClient } from "./client";
import { UserCreate, UserResponse } from "./types";

export const usersApi = {
  /**
   * List all users
   */
  list: () => apiClient.get<UserResponse[]>("/api/v1/users/"),

  /**
   * Get user by ID
   */
  getById: (id: number) =>
    apiClient.get<UserResponse>(`/api/v1/users/${id}`),

  /**
   * Create a new user
   */
  create: (data: UserCreate) =>
    apiClient.post<UserResponse>("/api/v1/users/", data),
};
