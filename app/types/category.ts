export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  itemCount: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  itemCount: number;
  subcategories: SubCategory[];
}

export interface QuickProduct {
  id: string;
  title: string;
  subtitle?: string;
  categoryId: string;
  categorySlug: string;
  subcategoryId: string;
  subcategorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  unit: string; // e.g. "500 g", "1 L", "Pack of 2"
  image: string;
  eta: string; // e.g. "10 MINS"
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  inStock: boolean;
  badge?: string; // e.g. "Bestseller", "Trending", "Must Try"
  brand?: string;
  description?: string;
}

export interface CartItem {
  product: QuickProduct;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  selectedSubcategory: string; // "all" or subcategory slug
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'discount';
  isVegOnly: boolean;
  minPrice: number;
  maxPrice: number;
  minRating: number;
}
