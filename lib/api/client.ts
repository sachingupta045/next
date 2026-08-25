/**
 * Production-ready HTTP API Client for WJunction Backend
 */

import { HTTPValidationError } from "./types";

export class ApiError extends Error {
  public status: number;
  public data: unknown;
  public validationErrors?: HTTPValidationError;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;

    if (
      status === 422 &&
      typeof data === "object" &&
      data !== null &&
      "detail" in data
    ) {
      this.validationErrors = data as HTTPValidationError;
    }
  }
}

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | null | undefined>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...restOptions } = options;

  let url = `${DEFAULT_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (restOptions.body && !(restOptions.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Network error or server unreachable";
    throw new ApiError(0, `Cannot connect to backend (${DEFAULT_BASE_URL}): ${errorMsg}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  let responseData: unknown = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  } else {
    try {
      responseData = await response.text();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    let message = `API request failed with status ${response.status} (${response.statusText})`;
    if (
      responseData &&
      typeof responseData === "object" &&
      "detail" in responseData
    ) {
      const detail = (responseData as { detail: unknown }).detail;
      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        message = detail
          .map((d: { msg?: string; loc?: (string | number)[] }) => {
            const field = d.loc ? d.loc.slice(1).join(".") : "";
            return field ? `${field}: ${d.msg}` : d.msg || "Validation error";
          })
          .join(", ");
      }
    }
    throw new ApiError(response.status, message, responseData);
  }

  return responseData as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};
