import { apiClient } from "./client";
import { HealthCheckResponse } from "./types";

export const healthApi = {
  /**
   * Health check root endpoint
   */
  check: () => apiClient.get<HealthCheckResponse>("/"),
};
