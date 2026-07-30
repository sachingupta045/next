export interface Brand {
    id: number;
    name: string;
    slug: string;
    initials: string;
    category?: string;
}

export const brands: Brand[] = [
    { id: 1, name: "Bombay Sapphire", slug: "bombay-sapphire", initials: "BS", category: "Gin" },
    { id: 2, name: "Johnnie Walker", slug: "johnnie-walker", initials: "JW", category: "Whisky" },
    { id: 3, name: "Ballantines", slug: "johnnie-walker", initials: "B", category: "Whisky" },
    { id: 4, name: "Chivas Regal", slug: "chivas-regal", initials: "CR", category: "Whisky" },
    { id: 5, name: "Royal Salute", slug: "chivas-regal", initials: "RS", category: "Whisky" },
    { id: 6, name: "Absolut", slug: "absolut", initials: "A", category: "Vodka" },
    { id: 7, name: "Don Julio", slug: "don-julio", initials: "DJ", category: "Tequila" },
    { id: 8, name: "Jim Beam", slug: "jack-daniels", initials: "JB", category: "Bourbon" },
    { id: 9, name: "Fratelli", slug: "bombay-sapphire", initials: "F", category: "Wine" },
    { id: 10, name: "Old Monk", slug: "jack-daniels", initials: "OM", category: "Rum" },
    { id: 11, name: "Indri", slug: "johnnie-walker", initials: "I", category: "Single Malt" },
    { id: 12, name: "Dewars", slug: "chivas-regal", initials: "D", category: "Whisky" },
    { id: 13, name: "Baileys", slug: "absolut", initials: "B", category: "Liqueur" },
    { id: 14, name: "Jack Daniels", slug: "jack-daniels", initials: "JD", category: "Whiskey" },
    { id: 15, name: "Tuborg", slug: "johnnie-walker", initials: "T", category: "Beer" },
    { id: 16, name: "Sula", slug: "bombay-sapphire", initials: "S", category: "Wine" },
];
