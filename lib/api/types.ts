/**
 * WJunction API Type Definitions
 * Matches FastAPI OpenAPI Schema (v1.0.0)
 */

// ==========================================
// Base & Shared Types
// ==========================================

export interface ValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface HTTPValidationError {
  detail?: ValidationErrorDetail[];
}

export interface HealthCheckResponse {
  status: string;
  project: string;
  environment: string;
  [key: string]: unknown;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

// ==========================================
// Brands
// ==========================================

export interface BrandCreate {
  name: string;
  slug: string;
  country_id?: number | null;
  logo_url?: string | null;
  founded_year?: number | null;
  history_story?: Record<string, unknown> | null;
  short_story?: string | null;
  website_url?: string | null;
  is_active?: boolean | null;
}

export interface BrandUpdate {
  name?: string | null;
  slug?: string | null;
  country_id?: number | null;
  logo_url?: string | null;
  founded_year?: number | null;
  history_story?: Record<string, unknown> | null;
  short_story?: string | null;
  website_url?: string | null;
  is_active?: boolean | null;
}

export interface BrandResponse {
  id: number;
  name: string;
  slug: string;
  country_id?: number | null;
  logo_url?: string | null;
  founded_year?: number | null;
  history_story?: Record<string, unknown> | null;
  short_story?: string | null;
  website_url?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ==========================================
// Categories
// ==========================================

export interface CategoryCreate {
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string | null;
  icon_url?: string | null;
  attributes_schema?: Record<string, unknown> | null;
}

export interface CategoryUpdate {
  name?: string | null;
  slug?: string | null;
  parent_id?: number | null;
  description?: string | null;
  icon_url?: string | null;
  attributes_schema?: Record<string, unknown> | null;
}

export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  parent_id?: number | null;
  description?: string | null;
  icon_url?: string | null;
  attributes_schema?: Record<string, unknown> | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface CategoryFilterParams extends PaginationParams {
  parent_id?: number | null;
}

// ==========================================
// Country
// ==========================================

export interface CountryCreate {
  name: string;
  iso_code: string;
  flag_url?: string | null;
  description?: string | null;
  currency_code?: string | null;
  created_at?: string | null;
}

export interface CountryResponse {
  id: number;
  name: string;
  iso_code: string;
  flag_url?: string | null;
  description?: string | null;
  currency_code?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// ==========================================
// Products
// ==========================================

export interface ProductCreate {
  name: string;
  slug: string;
  brand_id: number;
  category_id: number;
  abv: string | number; // Alcohol By Volume (0-100)
  description?: string | null;
  short_description?: string | null;
  age_years?: number | null;
  alcohol_type?: string | null;
  region?: string | null;
  production_details?: Record<string, unknown> | null;
  status?: boolean | null;
}

export interface ProductUpdate {
  name?: string | null;
  slug?: string | null;
  brand_id?: number | null;
  category_id?: number | null;
  abv?: string | number | null;
  description?: string | null;
  short_description?: string | null;
  age_years?: number | null;
  alcohol_type?: string | null;
  region?: string | null;
  production_details?: Record<string, unknown> | null;
  status?: boolean | null;
}

export interface ProductResponse {
  id: number;
  name: string;
  slug: string;
  brand_id: number;
  category_id: number;
  abv: string;
  description?: string | null;
  short_description?: string | null;
  age_years?: number | null;
  alcohol_type?: string | null;
  region?: string | null;
  production_details?: Record<string, unknown> | null;
  status?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductFilterParams extends PaginationParams {
  brand_id?: number | null;
  category_id?: number | null;
  status?: boolean | null;
  search?: string;
}

// ==========================================
// Users
// ==========================================

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  is_active?: boolean;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  is_active?: boolean;
}
