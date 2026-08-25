/**
 * Axios HTTP Client with Interceptors for WJunction FastAPI Backend
 */

import axios, { AxiosError } from "axios";
import { HTTPValidationError } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Response interceptor for formatting error messages & FastAPI validation details
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as
        | { detail?: unknown }
        | undefined;

      let customMessage = `Server error (${error.response.status}): ${error.response.statusText}`;

      if (data && typeof data === "object" && "detail" in data) {
        if (typeof data.detail === "string") {
          customMessage = data.detail;
        } else if (Array.isArray(data.detail)) {
          customMessage = (data.detail as Array<{ msg?: string; loc?: (string | number)[] }>)
            .map((d) => {
              const field = d.loc ? d.loc.slice(1).join(".") : "";
              return field ? `${field}: ${d.msg}` : d.msg || "Validation error";
            })
            .join(", ");
        }
      }

      const enhancedError = new Error(customMessage);
      (enhancedError as Error & { status?: number; validationErrors?: HTTPValidationError }).status =
        error.response.status;
      (enhancedError as Error & { data?: unknown }).data = error.response.data;

      return Promise.reject(enhancedError);
    } else if (error.request) {
      return Promise.reject(
        new Error(`Cannot reach backend at ${BASE_URL}. Ensure the server is online.`)
      );
    }

    return Promise.reject(error);
  }
);
