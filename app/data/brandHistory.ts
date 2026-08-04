export interface Milestone {
    year: string;
    title: string;
    description: string;
}

export interface BrandGalleryImage {
    url: string;
    title: string;
    caption: string;
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
    originStory?: string;
    craftsmanshipText?: string;
    presentStatus?: string;
    fullStory: {
        intro: string;
        heritage: string;
        craftsmanship: string;
        legacy: string;
    };
    galleryImages?: BrandGalleryImage[];
    keyStats?: { label: string; value: string }[];
    milestones: Milestone[];
    quote: {
        text: string;
        author: string;
    };
}

export const brandStories: BrandStory[] = [
    {
        id: 100,
        slug: "chateau-margaux",
        name: "Château Margaux",
        initials: "CM",
        foundingYear: 1572,
        origin: "Médoc, Bordeaux, France",
        category: "Premier Grand Cru Classé",
        tagline: "The Queen of Bordeaux – 500 Years of Elegance, Terroir & Perfection",
        excerpt: "One of only five Premier Grand Cru Classé estates in Bordeaux, revered globally for centuries for producing red wines of legendary elegance and longevity.",
        coverImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=400&q=80",
        mastermind: "Pierre de Lestonnac & Corinne Mentzelopoulos",
        signatureProduct: "Château Margaux Grand Cru Classé 2018",
        originStory: "The roots of Château Margaux date back to the 12th century when it was known as 'La Mothe de Margaux'. However, it was in 1572 under Pierre de Lestonnac that the estate was transformed into a dedicated vineyard, replacing grain fields with premier vines. Lestonnac foresaw the extraordinary potential of the Medoc gravel soil, establishing meticulous grape selection and cellaring techniques that laid the groundwork for centuries of winemaking dominance.",
        craftsmanshipText: "Spanning 262 hectares in the Margaux appellation, the vineyard thrives on deep gravel beds over clay and limestone, providing natural drainage and deep root penetration. Cabernet Sauvignon forms the backbone (75%), complemented by Merlot, Cabernet Franc, and Petit Verdot. Hand-harvested grapes undergo rigorous optical sorting before fermenting in traditional oak and stainless steel vats. The grand vin is aged for 18 to 24 months in 100% new French oak barrels crafted in the estate's own cooperage.",
        presentStatus: "Today, Château Margaux remains at the pinnacle of international fine wine under the visionary stewardship of the Mentzelopoulos family. In 2015, the estate unveiled its spectacular new cellars and research laboratory designed by world-renowned architect Sir Norman Foster — seamlessly blending 18th-century Palladian architecture with state-of-the-art winemaking precision and organic viticulture.",
        fullStory: {
            intro: "Château Margaux is synonymous with elegance, complexity, and silky tannins that age gracefully across decades.",
            heritage: "Formally recognized in the historic 1855 Bordeaux Classification as one of only four original Premier Grand Cru Classé (First Growth) estates, a status it has maintained unbroken for over 170 years.",
            craftsmanship: "Every barrel is handcrafted by the château's in-house master cooper. Micro-vinification allows each vineyard plot to express its unique micro-terroir.",
            legacy: "Celebrated by historical figures from Thomas Jefferson to modern connoisseurs, Château Margaux represents the ultimate benchmark for fine wine perfection."
        },
        galleryImages: [
            {
                url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
                title: "Historic Palladian Estate",
                caption: "Built in 1810 by Louis Combes, often called the 'Parthenon of the Médoc'."
            },
            {
                url: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80",
                title: "Sun-Drenched Gravel Vineyards",
                caption: "Deep Garonne gravel soils providing ideal warmth and natural drainage."
            },
            {
                url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
                title: "French Oak Barrel Cellars",
                caption: "Aged for 18–24 months in 100% new French oak crafted by in-house coopers."
            },
            {
                url: "https://images.unsplash.com/photo-1528823872057-9c018a7a70b3?auto=format&fit=crop&w=800&q=80",
                title: "Precision Sommelier Tasting",
                caption: "Notes of violets, dark blackcurrant, cedarwood, and velvety tannins."
            }
        ],
        keyStats: [
            { label: "Established", value: "1572" },
            { label: "Appellation", value: "Margaux AOC" },
            { label: "Vineyard Area", value: "262 Hectares" },
            { label: "Classification", value: "Premier Grand Cru" }
        ],
        milestones: [
            { year: "1572", title: "Establishment of Estate", description: "Pierre de Lestonnac restructures the estate into dedicated high-density vineyards." },
            { year: "1787", title: "Thomas Jefferson Endorsement", description: "Future US President visits and lists Margaux at the very top of Bordeaux wines." },
            { year: "1855", title: "Premier Grand Cru Classé", description: "Officially ranked as a First Growth in Napoleon III's 1855 Bordeaux Classification." },
            { year: "1977", title: "Mentzelopoulos Era", description: "André Mentzelopoulos acquires the estate, revitalizing vineyards and cellars." },
            { year: "2015", title: "Norman Foster Cellar", description: "Unveiling the revolutionary new cellar and research winemaking complex." }
        ],
        quote: {
            text: "Château Margaux is not merely a wine; it is bottled poetry, combining power with unparalleled finesse across centuries.",
            author: "Corinne Mentzelopoulos, Estate Owner"
        }
    },
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
        coverImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "img/category/2.jpg",
        mastermind: "John Walker & Alexander Walker",
        signatureProduct: "Black Label 12-Year Scotch",
        originStory: "The story of Johnnie Walker begins in 1820 when young John Walker sold his family farm to open a grocer's shop in Kilmarnock, Scotland. Driven by a vision of quality, he began blending single malts to overcome the inconsistency of single cask whiskies of the day.",
        craftsmanshipText: "Every drop of Johnnie Walker is blended using rare whiskies aged in oak casks across the four corners of Scotland. From Lowland elegance to Islay smoke, the master blenders balance flavor layers with unmatched precision.",
        presentStatus: "Today, Johnnie Walker stands as a global symbol of progress, resilience, and celebratory excellence, enjoyed in over 180 countries across the globe.",
        fullStory: {
            intro: "The story of Johnnie Walker begins with the man who gave our whisky his name. In 1820, young John Walker used the proceeds from selling his family's farm to open a grocer's shop in Kilmarnock, Scotland.",
            heritage: "John had a passion for blending single malts to create consistent, high-quality flavor profiles. His son Alexander later introduced the iconic square bottle in 1860, designed to reduce breakage during long ocean voyages and allow more bottles to fit per crate.",
            craftsmanship: "Every drop of Johnnie Walker is blended using rare whiskies aged in oak casks across the four corners of Scotland. From Lowland elegance to Islay smoke, the master blenders balance flavor layers with unmatched precision.",
            legacy: "Today, Johnnie Walker stands as a global symbol of progress, resilience, and celebratory excellence, enjoyed in over 180 countries across the globe."
        },
        galleryImages: [
            {
                url: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=800&q=80",
                title: "Oak Barrel Maturation",
                caption: "Selecting rare casks aged across Scotland's four corners."
            },
            {
                url: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80",
                title: "The Art of Blending",
                caption: "Harmonizing peat smoke, sweet vanilla, and rich dark fruits."
            }
        ],
        keyStats: [
            { label: "Established", value: "1820" },
            { label: "Origin", value: "Kilmarnock, Scotland" },
            { label: "Master Blender", value: "Emma Walker" },
            { label: "Distribution", value: "180+ Countries" }
        ],
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
        coverImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "img/category/3.jpg",
        mastermind: "James & John Chivas",
        signatureProduct: "Chivas Regal 12 Year Old",
        originStory: "In 1801, James and John Chivas opened a luxury emporium in Aberdeen, selling fine coffee, exotic spices, and aged French brandies. Finding standard whiskies harsh, they pioneered blending aged Scotch malts in their cellar under the shop.",
        craftsmanshipText: "At the heart of Chivas Regal is the Strathisla distillery, the oldest operating highland distillery in Scotland, lending rich notes of hazelnut, wild herbs, and orchard fruits.",
        presentStatus: "Chivas Regal remains the benchmark for smooth, celebratory luxury blended whisky enjoyed by connoisseurs worldwide.",
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
        coverImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "img/category/4.jpg",
        mastermind: "Michel Roux & Master Botanical Ivano Tonutti",
        signatureProduct: "Bombay Sapphire Vapor Infused Gin",
        originStory: "Launched in 1987, Bombay Sapphire reinvented the gin category with its striking translucent blue bottle and delicate botanical recipe dating back to 1761 created by Thomas Dakin.",
        craftsmanshipText: "Unlike traditional gins that boil botanicals directly in the spirit, Bombay Sapphire uses a gentle vapor infusion process in Carter-Head copper stills at historic Laverstoke Mill.",
        presentStatus: "Renowned by mixologists globally, Bombay Sapphire inspires cocktail creativity and elevates every classic Gin & Tonic.",
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
        slug: "brewdog",
        name: "BrewDog",
        initials: "BD",
        foundingYear: 2007,
        origin: "Ellon, Aberdeenshire, Scotland",
        category: "Craft Beer",
        tagline: "Craft Beer for the People – Disruptive, Bold & Carbon Negative",
        excerpt: "From a small garage in Aberdeenshire to a global craft beer revolution with bars in over 30 countries.",
        coverImage: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80",
        mastermind: "James Watt & Martin Dickie",
        signatureProduct: "BrewDog Hazy Jane New England IPA",
        originStory: "In 2007, 24-year-olds James Watt and Martin Dickie got fed up with the stuffy, mass-produced beers flooding the UK market. Renting a small shed in Fraserburgh, they brewed bold craft ales by hand, bottled them manually, and sold them out of the back of a beat-up van.",
        craftsmanshipText: "BrewDog combines unfiltered hoppy intensity with smooth oats and wheat. Hazy Jane features dry-hopping with Mosaic, Citra, and Simcoe hops for explosion of tropical pineapple and mango aromas with ultra-low bitterness.",
        presentStatus: "Today, BrewDog operates state-of-the-art breweries in Scotland, Ohio, Australia, and Germany, alongside over 100 craft beer bars globally. They are proud to be the world's first carbon-negative craft brewery.",
        fullStory: {
            intro: "BrewDog sparked a craft beer revolution that redefined how people experience beer.",
            heritage: "Driven by an rebellious spirit, BrewDog launched Equity for Punks, crowdfunding tens of millions from hundreds of thousands of craft beer lovers.",
            craftsmanship: "Pioneers of dry-hopping and non-alcoholic craft brews, using solar power and anaerobic digesters at their eco-brewery.",
            legacy: "BrewDog continues to challenge convention, prioritizing planet earth and hop-forward quality above all."
        },
        galleryImages: [
            {
                url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80",
                title: "Eco-Friendly Brewery",
                caption: "State-of-the-art eco-brewery powered by renewable energy."
            },
            {
                url: "https://images.unsplash.com/photo-1518176258614-458493026071?auto=format&fit=crop&w=800&q=80",
                title: "Hop Infusion",
                caption: "Dry-hopping with Mosaic, Citra, and Simcoe hops."
            }
        ],
        keyStats: [
            { label: "Established", value: "2007" },
            { label: "Headquarters", value: "Ellon, Scotland" },
            { label: "Impact", value: "Carbon Negative" },
            { label: "Global Bars", value: "100+ Venues" }
        ],
        milestones: [
            { year: "2007", title: "Garage Founding", description: "James & Martin start brewing in Fraserburgh with small batch tanks." },
            { year: "2009", title: "Equity for Punks", description: "Launching revolutionary community crowdfunding." },
            { year: "2020", title: "World's First Carbon Negative Brewery", description: "Planting the BrewDog Lost Forest in the Scottish Highlands." }
        ],
        quote: {
            text: "We make beer we love, for people who care about taste and our planet.",
            author: "James Watt, Co-Founder"
        }
    },
    {
        id: 5,
        slug: "the-macallan",
        name: "The Macallan",
        initials: "TM",
        foundingYear: 1824,
        origin: "Craigellachie, Moray, Scotland",
        category: "Single Malt Scotch Whisky",
        tagline: "The Incomparable Single Malt – Matured in Sherry-Seasoned Oak Casks",
        excerpt: "Regarded worldwide as the pinnacle of single malt Scotch whisky, renowned for exceptional sherry cask maturation.",
        coverImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80",
        badgeImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=400&q=80",
        mastermind: "Alexander Reid",
        signatureProduct: "The Macallan 12 Year Double Cask",
        originStory: "Founded in 1824 by Alexander Reid, a barley farmer and schoolteacher, The Macallan was one of the first distilleries in Scotland to be legally licensed. Situated on a plateau above the River Spey, the distillery built its reputation on uncompromising quality.",
        craftsmanshipText: "The Macallan relies on Six Pillars: Spiritual Home (Easter Elchies House), Curiously Small Stills, Finest Cut, Exceptional Oak Casks, Natural Color, and Peerless Spirit. Up to 80% of the whisky's final flavor and 100% of its natural color comes from hand-selected sherry oak casks.",
        presentStatus: "In 2018, The Macallan opened a architectural masterpiece distillery and visitor center in Speyside, continuing to break world records at auction as the world's most valuable single malt whisky.",
        fullStory: {
            intro: "The Macallan is universally recognized as the gold standard of single malt Scotch whisky.",
            heritage: "Nestled on a 485-acre estate with Easter Elchies House at its heart, established in 1700.",
            craftsmanship: "Sourcing oak from Spain and North America, seasoned with Oloroso sherry for 18 months before filling.",
            legacy: "Setting world records for vintage spirit craftsmanship and timeless luxury."
        },
        milestones: [
            { year: "1824", title: "Distillery Founded", description: "Alexander Reid secures one of Scotland's first legal distilling licenses." },
            { year: "1980", title: "Sherry Oak Focus", description: "Establishing full commitment to 100% sherry-seasoned oak maturation." },
            { year: "2018", title: "Subterranean Distillery", description: "Opening the iconic £140m subterranean Speyside distillery." }
        ],
        quote: {
            text: "Wood makes the whisky. Time and sherry-seasoned oak create perfection.",
            author: "Master of Wood Stuart MacPherson"
        }
    }
];

export const getBrandBySlug = (slug: string): BrandStory | undefined => {
    return brandStories.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
};

export const getBrandStoryByNameOrSlug = (query: string): BrandStory | undefined => {
    const normalized = query.toLowerCase().replace(/[^a-z0-9]/g, "");
    return brandStories.find(
        (b) =>
            b.slug.toLowerCase() === query.toLowerCase() ||
            b.name.toLowerCase() === query.toLowerCase() ||
            b.slug.replace(/[^a-z0-9]/g, "") === normalized ||
            b.name.replace(/[^a-z0-9]/g, "") === normalized
    );
};
