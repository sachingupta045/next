export interface Product {
    id: number;
    title: string;
    category: string;
    categoryKey: string;
    price: string;
    oldPrice?: string;
    rating: number;
    reviews: number;
    calories: number;
    prepTime: number;
    description: string;
    shortDesc: string;
    image: string;
    badge?: string;
    badgeType?: 'hot' | 'new' | 'bestseller';
    tags: string[];
}

export const products: Product[] = [
    {
        id: 1,
        title: "Classic Smash Burger",
        category: "Burgers",
        categoryKey: "burgers",
        price: "$14.99",
        oldPrice: "$18.99",
        rating: 4.9,
        reviews: 128,
        calories: 620,
        prepTime: 12,
        shortDesc: "Double smashed patty, cheddar, caramelized onions, pickles & special sauce",
        description: "Double smashed patty, cheddar cheese, caramelized onions, house pickles and our legendary special sauce. Made fresh to order on a toasted brioche bun.",
        image: "img/menu/1.jpg",
        badge: "Hot",
        badgeType: "hot",
        tags: ["Spicy", "Bestseller", "Beef"],
    },
    {
        id: 2,
        title: "Margherita Royale",
        category: "Pizza",
        categoryKey: "pizza",
        price: "$19.99",
        oldPrice: "$24.99",
        rating: 4.8,
        reviews: 95,
        calories: 480,
        prepTime: 18,
        shortDesc: "San Marzano tomatoes, buffalo mozzarella, basil & truffle oil on sourdough",
        description: "San Marzano tomatoes, fresh buffalo mozzarella, fragrant basil leaves, drizzled with Italian truffle oil on a hand-stretched sourdough base.",
        image: "img/menu/2.jpg",
        badge: "New",
        badgeType: "new",
        tags: ["Vegetarian", "New", "Italian"],
    },
    {
        id: 3,
        title: "Nashville Hot Chicken",
        category: "Chicken",
        categoryKey: "chicken",
        price: "$12.99",
        oldPrice: "$16.99",
        rating: 5.0,
        reviews: 210,
        calories: 710,
        prepTime: 15,
        shortDesc: "Crispy fried chicken in fiery Nashville spice blend with honey drizzle",
        description: "Extra-crispy fried chicken tossed in our signature fiery Nashville spice blend, served with honey drizzle and house pickles on a toasted brioche bun.",
        image: "img/menu/3.jpg",
        badge: "Best Seller",
        badgeType: "bestseller",
        tags: ["Spicy", "Bestseller", "Crispy"],
    },
    {
        id: 4,
        title: "Loaded Fajita Wrap",
        category: "Wraps",
        categoryKey: "wraps",
        price: "$10.99",
        rating: 4.5,
        reviews: 74,
        calories: 520,
        prepTime: 10,
        shortDesc: "Grilled chicken, peppers, sour cream & guacamole in a warm tortilla",
        description: "Grilled chicken strips, sautéed bell peppers and onions, sour cream, fresh guacamole and salsa wrapped in a warm flour tortilla with melted cheddar.",
        image: "img/menu/4.jpg",
        tags: ["Grilled", "Fresh", "Mexican"],
    },
    {
        id: 5,
        title: "Nutella Lava Cake",
        category: "Desserts",
        categoryKey: "desserts",
        price: "$8.99",
        oldPrice: "$11.99",
        rating: 4.9,
        reviews: 56,
        calories: 390,
        prepTime: 8,
        shortDesc: "Molten chocolate cake with Nutella center, vanilla ice cream & caramel",
        description: "Warm molten chocolate cake with a gooey Nutella center, served alongside Madagascar vanilla bean ice cream with salted caramel drizzle and fresh berries.",
        image: "img/menu/5.jpg",
        badge: "New",
        badgeType: "new",
        tags: ["Sweet", "New", "Chocolate"],
    },
    {
        id: 6,
        title: "Truffle Mushroom Pasta",
        category: "Pasta",
        categoryKey: "pasta",
        price: "$16.99",
        rating: 4.9,
        reviews: 88,
        calories: 560,
        prepTime: 20,
        shortDesc: "Al dente tagliatelle, wild mushrooms, black truffle, parmesan & thyme",
        description: "Al dente tagliatelle tossed with mixed wild mushrooms, freshly shaved black truffle, aged parmesan, fresh thyme and a touch of cream in garlic butter.",
        image: "img/menu/6.jpg",
        badge: "Chef's Pick",
        badgeType: "hot",
        tags: ["Vegetarian", "Chef's Pick", "Italian"],
    },
];

export const filterCategories = [
    { key: "all", label: "All" },
    { key: "burgers", label: "Burgers" },
    { key: "pizza", label: "Pizza" },
    { key: "chicken", label: "Chicken" },
    { key: "wraps", label: "Wraps" },
    { key: "desserts", label: "Desserts" },
    { key: "pasta", label: "Pasta" },
];
