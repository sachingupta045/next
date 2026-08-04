export interface FoodPairing {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  pairingReason: string;
  rating: number;
}

export interface DrinkReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  likes: number;
}

export interface DrinkProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  volume: string;
  abv: string;
  origin: string;
  vintage?: string;
  type?: string;
  servingTemp: string;
  tastingNotes: string[];
  image: string;
  eta: string;
  rating: number;
  reviewCount: number;
  description: string;
  brandHistory?: string;
  badge?: string;
  foodPairings: FoodPairing[];
  reviewsList: DrinkReview[];
}
