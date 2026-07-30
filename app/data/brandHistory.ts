export interface Milestone {
    year: string;
    title: string;
    description: string;
}

export interface BrandStory {
    id: number;
    slug: string;
    name: string;
    initials: string;
    foundingYear: number;
    origin: string;
    category: string;
    tagline: string;
    excerpt: string;
    coverImage: string;
    badgeImage: string;
    mastermind: string;
    signatureProduct: string;
    fullStory: {
        intro: string;
        heritage: string;
        craftsmanship: string;
        legacy: string;
    };
    milestones: Milestone[];
    quote: {
        text: string;
        author: string;
    };
}

export const brandStories: BrandStory[] = [
    {
        id: 1,
        slug: "johnnie-walker",
        name: "Johnnie Walker",
        initials: "JW",
        foundingYear: 1820,
        origin: "Kilmarnock, Scotland",
        category: "Scotch Whisky",
        tagline: "Keep Walking – Two Centuries of Craftsmanship & Flavor Pioneering",
        excerpt: "From a humble Ayrshire grocer shop in 1820 to the world's leading Scotch whisky empire.",
        coverImage: "img/menu/1.jpg",
        badgeImage: "img/category/2.jpg",
        mastermind: "John Walker & Alexander Walker",
        signatureProduct: "Black Label 12-Year Scotch",
        fullStory: {
            intro: "The story of Johnnie Walker begins with the man who gave our whisky his name. In 1820, young John Walker used the proceeds from selling his family's farm to open a grocer's shop in Kilmarnock, Scotland.",
            heritage: "John had a passion for blending single malts to create consistent, high-quality flavor profiles. His son Alexander later introduced the iconic square bottle in 1860, designed to reduce breakage during long ocean voyages and allow more bottles to fit per crate.",
            craftsmanship: "Every drop of Johnnie Walker is blended using rare whiskies aged in oak casks across the four corners of Scotland. From Lowland elegance to Islay smoke, the master blenders balance flavor layers with unmatched precision.",
            legacy: "Today, Johnnie Walker stands as a global symbol of progress, resilience, and celebratory excellence, enjoyed in over 180 countries across the globe."
        },
        milestones: [
            { year: "1820", title: "The Humble Beginning", description: "John Walker opens his grocery shop in Kilmarnock and begins blending whiskies." },
            { year: "1860", title: "The Iconic Square Bottle", description: "Alexander Walker designs the slant label and square bottle for worldwide transport." },
            { year: "1908", title: "The Striding Man Logo", description: "Illustrator Tom Browne draws the famous Striding Man logo on a menu card." },
            { year: "1992", title: "Blue Label Launch", description: "Creation of Johnnie Walker Blue Label, the pinnacle of rare luxury Scotch." }
        ],
        quote: {
            text: "When you walk, keep walking forward. Craft isn't a destination; it's a perpetual journey of taste.",
            author: "Master Blender Emma Walker"
        }
    },
    {
        id: 2,
        slug: "chivas-regal",
        name: "Chivas Regal",
        initials: "CR",
        foundingYear: 1801,
        origin: "Aberdeen, Scotland",
        category: "Blended Scotch Whisky",
        tagline: "Blended to Uplift – Smooth Luxury Since 1801",
        excerpt: "Pioneered by the Chivas brothers, blending smooth luxury malts with rich Speyside character.",
        coverImage: "img/menu/2.jpg",
        badgeImage: "img/category/3.jpg",
        mastermind: "James & John Chivas",
        signatureProduct: "Chivas Regal 12 Year Old",
        fullStory: {
            intro: "In 1801, James and John Chivas opened a luxury emporium in Aberdeen, selling fine coffee, exotic spices, and aged French brandies to discerning clientele.",
            heritage: "Finding standard whiskies harsh, the brothers pioneered the art of blending aged Scotch malts in their cellar under the shop, crafting a signature smooth and generous style.",
            craftsmanship: "At the heart of Chivas Regal is the Strathisla distillery, the oldest operating highland distillery in Scotland, lending rich notes of hazelnut, wild herbs, and orchard fruits.",
            legacy: "Chivas Regal remains the benchmark for smooth, celebratory luxury blended whisky enjoyed by connoisseurs worldwide."
        },
        milestones: [
            { year: "1801", title: "Emporium Founded", description: "Chivas Brothers establish their luxury shop in King Street, Aberdeen." },
            { year: "1843", title: "Royal Warrant", description: "Awarded the Royal Warrant to supply fine goods to Queen Victoria." },
            { year: "1909", title: "Chivas 25 Unveiled", description: "Launched as the world's first luxury 25-year-old blended Scotch in New York." },
            { year: "2020", title: "Sustainable Distillation", description: "Pioneering eco-friendly cask finishing and sustainable distillery practices." }
        ],
        quote: {
            text: "Blending is an art form of harmony — combining distinct spirits into one timeless masterpiece.",
            author: "Sandy Hyslop, Master Custodian"
        }
    },
    {
        id: 3,
        slug: "bombay-sapphire",
        name: "Bombay Sapphire",
        initials: "BS",
        foundingYear: 1987,
        origin: "Laverstoke Mill, England",
        category: "London Dry Gin",
        tagline: "Stir Your Senses – 10 Exotic Botanicals Vapor Infused",
        excerpt: "Revolutionizing gin with vapor infusion of 10 hand-selected exotic botanicals.",
        coverImage: "img/menu/3.jpg",
        badgeImage: "img/category/4.jpg",
        mastermind: "Michel Roux & Master Botanical Ivano Tonutti",
        signatureProduct: "Bombay Sapphire Vapor Infused Gin",
        fullStory: {
            intro: "Launched in 1987, Bombay Sapphire reinvented the gin category with its striking translucent blue bottle and delicate botanical recipe dating back to 1761.",
            heritage: "Unlike traditional gins that boil botanicals directly in the spirit, Bombay Sapphire uses a gentle vapor infusion process in Carter-Head copper stills at historic Laverstoke Mill.",
            craftsmanship: "Ten precious botanicals are sourced from sustainable farmers worldwide: Moroccan coriander, Spanish lemon peel, Tuscan juniper, and grains of paradise from West Africa.",
            legacy: "Renowned by mixologists globally, Bombay Sapphire inspires cocktail creativity and elevates every classic Gin & Tonic."
        },
        milestones: [
            { year: "1761", title: "Original Recipe", description: "Thomas Dakin creates the original botanical distillation recipe." },
            { year: "1987", title: "Brand Re-imagining", description: "Launch of the iconic translucent blue bottle inspired by the Star of Bombay sapphire." },
            { year: "2014", title: "Laverstoke Mill Opening", description: "Historic paper mill restored into a state-of-the-art sustainable distillery." },
            { year: "2021", title: "100% Sustainable Botanicals", description: "Certified 100% sustainably sourced botanicals across all suppliers." }
        ],
        quote: {
            text: "Vapor infusion captures the delicate essence of each botanical without harshness.",
            author: "Master Botanical Ivano Tonutti"
        }
    },
    {
        id: 4,
        slug: "jack-daniels",
        name: "Jack Daniels",
        initials: "JD",
        foundingYear: 1866,
        origin: "Lynchburg, Tennessee, USA",
        category: "Tennessee Whiskey",
        tagline: "Every Day We Make It, We'll Make It The Best We Can",
        excerpt: "Mellowed drop by drop through 10 feet of sugar maple charcoal in Lynchburg.",
        coverImage: "img/menu/4.jpg",
        badgeImage: "img/category/5.jpg",
        mastermind: "Jasper Newton 'Jack' Daniel",
        signatureProduct: "Old No. 7 Tennessee Whiskey",
        fullStory: {
            intro: "Established in 1866 as the first registered distillery in the United States, Jack Daniel's has crafted its iconic Tennessee Whiskey using pure cave spring water.",
            heritage: "Jack Daniel learned the art of whiskey making from Dan Call and Nearest Green, an enslaved master distiller who became the distillery's first head distiller.",
            craftsmanship: "The defining step is Charcoal Mellowing: un-aged spirit slowly drips through 10 feet of hard sugar maple charcoal, imparting signature smoothness and sweet wood smoke.",
            legacy: "Encased in its famous square black-label bottle, Jack Daniel's is an enduring cultural icon of American craftsmanship."
        },
        milestones: [
            { year: "1866", title: "First US Registered Distillery", description: "Jack Daniel officially registers the Lynchburg distillery with the US government." },
            { year: "1904", title: "Gold Medal Winner", description: "Old No. 7 wins the Gold Medal at the St. Louis World's Fair." },
            { year: "1956", title: "Cultural Expansion", description: "Frank Sinatra brings Jack Daniel's into the international spotlight." },
            { year: "2016", title: "150th Anniversary", description: "Celebrating 150 years of continuous Tennessee whiskey production." }
        ],
        quote: {
            text: "Every day we make it, we'll make it the best we can. Never compromise on charcoal mellowing.",
            author: "Jack Daniel"
        }
    },
    {
        id: 5,
        slug: "absolut",
        name: "Absolut",
        initials: "A",
        foundingYear: 1879,
        origin: "Åhus, Sweden",
        category: "Pure Swedish Vodka",
        tagline: "One Source. One Community. Pure Passion Since 1879",
        excerpt: "Crafted entirely from winter wheat harvested around Åhus, Sweden.",
        coverImage: "img/menu/5.jpg",
        badgeImage: "img/category/6.jpg",
        mastermind: "L.O. Smith",
        signatureProduct: "Absolut Original Vodka",
        fullStory: {
            intro: "Founded in 1879 by L.O. Smith in Sweden, Absolut introduced continuous distillation to create 'Rent Brännvin' (Pure Vodka) of unheard smoothness.",
            heritage: "Absolut is produced adhering to 'One Source': all winter wheat is grown in the fertile fields surrounding Åhus, and all deep water is drawn from pristine local wells.",
            craftsmanship: "Distilled hundreds of times to remove impurities while retaining natural grain character, Absolut uses no added sugar or artificial additives.",
            legacy: "Famous for its minimalist apothecary bottle design and artistic collaborations, Absolut remains a beacon of creativity and pure Swedish heritage."
        },
        milestones: [
            { year: "1879", title: "Continuous Distillation", description: "L.O. Smith invents fractional distillation for pure vodka." },
            { year: "1979", title: "Global Launch in NYC", description: "Absolut launches in New York, captivating the world with iconic bottle art." },
            { year: "1985", title: "Andy Warhol Collaboration", description: "Andy Warhol paints the famous Absolut bottle, starting an iconic art campaign." },
            { year: "2022", title: "CO2 Neutral Distillery", description: "Achieving one of the world's most energy-efficient distilleries." }
        ],
        quote: {
            text: "One source means complete commitment to purity from wheat field to glass.",
            author: "Master Distiller Per Hermansson"
        }
    },
    {
        id: 6,
        slug: "don-julio",
        name: "Don Julio",
        initials: "DJ",
        foundingYear: 1942,
        origin: "Atotonilco El Alto, Jalisco, Mexico",
        category: "Luxury Craft Tequila",
        tagline: "Por Amor – 100% Blue Weber Agave Crafted with Heart",
        excerpt: "Handcrafted in the highlands of Jalisco from slow-roasted 100% Blue Weber Agave.",
        coverImage: "img/menu/6.jpg",
        badgeImage: "img/category/1.jpg",
        mastermind: "Don Julio González",
        signatureProduct: "Don Julio 1942 Añejo Tequila",
        fullStory: {
            intro: "In 1942, a 17-year-old Don Julio González set out to revolutionize tequila making by prioritizing passion and quality over quantity.",
            heritage: "Choosing the rich volcanic soil of Los Altos de Jalisco, Don Julio planted agave with wider spacing to allow each plant to reach peak maturity over 7 to 10 years.",
            craftsmanship: "The agave piñas are slow-roasted for 72 hours in traditional masonry ovens, then distilled in small copper pot stills and aged in American white oak barrels.",
            legacy: "Don Julio pioneered luxury tequila, introducing lower bottle shapes so dinner guests could see each other across the table."
        },
        milestones: [
            { year: "1942", title: "La Primavera Founded", description: "Young Don Julio opens his distillery in Atotonilco El Alto." },
            { year: "1987", title: "50th Birthday Special Reserve", description: "Friends create Don Julio 1942 to honor his lifelong passion." },
            { year: "2002", title: "Global Luxury Benchmark", description: "Don Julio 1942 sets the standard for super-premium sipping tequila." },
            { year: "2023", title: "Agave Conservation Program", description: "Initiating sustainable water recycling and agave soil preservation." }
        ],
        quote: {
            text: "When you have passion, you have everything. Tequila is made with heart.",
            author: "Don Julio González"
        }
    }
];

export const getBrandBySlug = (slug: string): BrandStory | undefined => {
    return brandStories.find((b) => b.slug === slug);
};
