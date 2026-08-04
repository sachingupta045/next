export interface CategoryMilestone {
  year: string;
  title: string;
  desc?: string;
  description?: string;
}

export interface ProcessingStep {
  stepNumber: number;
  title: string;
  desc: string;
  icon: string;
}

export interface SpotlightNote {
  note: string;
  intensity: number;
  desc: string;
}

export interface PouringStep {
  stepNumber: number;
  title: string;
  desc: string;
  icon: string;
}

export interface HowToEnjoyItem {
  title: string;
  desc: string;
  recipe?: string;
}

export interface CategoryPairingGroup {
  title: string;
  items: string[];
}

export interface CategoryFAQ {
  question: string;
  answer: string;
}

export interface CategorySpotlightData {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  heroImage: string;
  badge: string;
  origin: string;
  glassware: string;
  idealTemp: string;
  agingPeriod: string;
  overviewText: string;
  historyIntro: string;
  historyDetail: string;
  milestones: CategoryMilestone[];
  processSteps: ProcessingStep[];
  tastingNotesGrid: {
    nose: string;
    palate: string;
    finish: string;
    appearance: string;
  };
  spotlightNotes: SpotlightNote[];
  pouringRitual: PouringStep[];
  howToEnjoy: HowToEnjoyItem[];
  pairings: CategoryPairingGroup[];
  whyChoose: string[];
  faqs: CategoryFAQ[];
  finalVerdict: string;
}

export const categorySpotlightList: CategorySpotlightData[] = [
  {
    slug: "spirits",
    name: "Single Malts & Spirits",
    subtitle: "The Liquid Gold of Highlands & Speyside",
    tagline: "Distilled from 100% Malted Barley in Copper Pot Stills & Aged in Rare Oak Casks",
    heroImage: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1400&q=80",
    badge: "Master Distiller's Legacy",
    origin: "Highlands & Speyside, Scotland",
    glassware: "Glencairn Tulip Glass",
    idealTemp: "18°C – 20°C (Room Temp)",
    agingPeriod: "12 to 25+ Years in Oak Casks",
    overviewText: "Single Malt Whisky represents the pinnacle of liquid craftsmanship. Distilled in traditional copper pot stills at a single distillery using 100% malted barley and mountain spring water, it undergoes years of maturation in ex-bourbon, ex-wine, and Pedro Ximénez sherry casks. This triple-cask system interacts with the wood to create extraordinary depth, velvet smoothness, and international acclaim.",
    historyIntro: "The origins of Single Malt Scotch date back to 1494 in Scottish monasteries, where aqua vitae was distilled in small copper pots. Over centuries, illicit Highland distillers refined the art using pure mountain spring water, peat fire kilns, and sherry-seasoned oak maturation.",
    historyDetail: "The landmark 1823 Excise Act legalized small-scale Highland distilling, sparking a golden age of Single Malts. Unlike blended whiskies, a Single Malt is produced exclusively from 100% malted barley at a single distillery, capturing the unique micro-climate, water source, and still shape of its birthplace.",
    milestones: [
      { year: "1494", title: "Earliest Recorded Aqua Vitae", description: "Friar John Cor receives 8 bolls of malt by order of King James IV to craft aqua vitae in Fife." },
      { year: "1823", title: "The Excise Act", description: "Legalization of Highland distilling leads to the founding of legendary distilleries." },
      { year: "1963", title: "The Single Malt Revolution", description: "Glenfiddich begins marketing single malt outside Scotland, sparking global appreciation." },
      { year: "2024", title: "Triple-Cask & Rare Maturation", description: "Pioneering ex-Bourbon, French Wine, and Oloroso Sherry cask harmonies." }
    ],
    processSteps: [
      {
        stepNumber: 1,
        title: "Malting & Peat Kilning 🌾",
        desc: "Barley is steeped in spring water and allowed to germinate before being dried over peat fires to impart signature warmth and smoke.",
        icon: "🌾"
      },
      {
        stepNumber: 2,
        title: "Mashing & Washback Fermentation 🧪",
        desc: "Grist is mixed with hot mineral-rich spring water in copper mash tuns, then fermented with yeast in wooden washbacks for 48–72 hours.",
        icon: "🧪"
      },
      {
        stepNumber: 3,
        title: "Copper Pot Distillation ⚗️",
        desc: "Double distillation in tall swan-neck copper stills removes impurities and isolates the purest 'heart cut' of the spirit.",
        icon: "⚗️"
      },
      {
        stepNumber: 4,
        title: "Oak Cask Maturation 🪵",
        desc: "The clear spirit is filled into hand-selected Spanish Oloroso Sherry or American Bourbon oak casks to mature for decades.",
        icon: "🪵"
      }
    ],
    tastingNotesGrid: {
      nose: "Complex and inviting bouquet with rich honey and vanilla notes from bourbon barrels, dark fruit aromas from wine casks, dried fruits, nuts, warm spices, and subtle peat smoke. Hints of orchard fruits, red berries, and a whisper of spice add further depth.",
      palate: "Full-bodied and well-balanced with initial sweetness from honey and caramel, followed by rich dark fruit flavors (blackcurrant, raisins), nutty character from six-row barley, oak tannins for structure, and vanilla for smoothness.",
      finish: "Long and satisfying with lingering notes of dark chocolate, dried fruits, warm spices, and a subtle peppery warmth. The triple-cask maturation reveals itself in waves, ending with oak influence and a smooth, warming fade.",
      appearance: "Rich dark amber color with golden highlights, naturally achieved through triple-cask aging. Excellent clarity and good legs, indicating quality craftsmanship and proper maturation."
    },
    spotlightNotes: [
      { note: "Rich Butterscotch & Vanilla", intensity: 90, desc: "Derived from slow caramelization inside toasted American oak barrels." },
      { note: "Peat Smoke & Heather", intensity: 85, desc: "Traditional Highland peat kilning imparting earthy aromatic complexity." },
      { note: "Dried Orchard Fruits & Fig", intensity: 88, desc: "Rich notes resulting from decades of European Oloroso sherry cask aging." },
      { note: "Warm Oak & Cinnamon Spice", intensity: 82, desc: "Natural wood tannins providing depth, structure, and a lingering finish." }
    ],
    pouringRitual: [
      {
        stepNumber: 1,
        title: "Select a Glencairn Glass 🥃",
        desc: "Use a tulip-shaped Glencairn glass designed to concentrate volatile aromas towards your nose while letting alcohol fumes dissipate.",
        icon: "🥃"
      },
      {
        stepNumber: 2,
        title: "Pour a Clean 1.5 oz Dram 🌊",
        desc: "Pour 45ml of Single Malt at natural room temperature (18°C – 20°C). Avoid freezing cold ice which can numb delicate flavor notes.",
        icon: "🌊"
      },
      {
        stepNumber: 3,
        title: "Gently Swirl & Nose 👃",
        desc: "Hold the glass by the base stem and gently swirl. Inhale softly slightly above the rim to discover layers of fruit, oak, and honey.",
        icon: "👃"
      },
      {
        stepNumber: 4,
        title: "Add 2-3 Drops of Spring Water 💧",
        desc: "Adding 2–3 drops of room-temperature spring water breaks the surface tension, opening up hidden floral and spice notes.",
        icon: "💧"
      }
    ],
    howToEnjoy: [
      {
        title: "Neat or With a Splash of Water",
        desc: "Serve at room temperature or with a few drops of water to open up the aromas and reveal the triple-cask maturation layers."
      },
      {
        title: "Indri Old Fashioned",
        desc: "Mix 60ml Single Malt with 10ml honey syrup and 2 dashes of orange bitters. Stir with ice and garnish with an orange peel and a single large ice cube for a sophisticated twist."
      },
      {
        title: "Himalayan Highball",
        desc: "Combine 50ml Single Malt with 100ml premium soda water and a splash of fresh lime juice. Serve over ice with a lime wedge and fresh mint."
      },
      {
        title: "Whisky Sour Royale",
        desc: "Shake 50ml Single Malt with 25ml fresh lemon juice, 15ml honey syrup, and egg white. Double strain and garnish with a lemon twist and cherry."
      },
      {
        title: "Spiced Indian Manhattan",
        desc: "Stir 60ml Single Malt with 20ml sweet vermouth and 5ml cardamom-infused simple syrup. Strain over ice and garnish with a cherry and orange peel."
      },
      {
        title: "Highland Hot Toddy",
        desc: "Mix 45ml Single Malt with 15ml honey, 10ml fresh lemon juice, and a pinch of cardamom. Add hot water and garnish with a cinnamon stick and star anise."
      }
    ],
    pairings: [
      {
        title: "Food Pairings",
        items: [
          "Dark chocolate desserts and rich Indian sweets like gulab jamun or ras malai",
          "Aged cheeses, particularly those with nutty or caramel notes",
          "Grilled meats and tandoori preparations that complement the smoky undertones",
          "Rich curries with coconut or cream-based sauces",
          "Nuts and dried fruits, especially almonds, walnuts, and dates",
          "Premium cigars with medium to full body"
        ]
      },
      {
        title: "Cocktail Inspirations",
        items: [
          "Indian Spice Infusions: Add cardamom, cinnamon, or star anise to complement warm spice notes",
          "Regional Garnishes: Experiment with Indian ingredients like jaggery, tamarind, or fresh mint",
          "Seasonal Variations: Try with mango, guava, or other tropical fruits during summer months"
        ]
      }
    ],
    whyChoose: [
      "India's & Scotland's finest triple-cask matured single malt whiskies offering unique complexity and depth",
      "Made from indigenous six-row barley grown in Rajasthan and Scottish malts for authentic character",
      "Crafted using traditional Scottish copper pot stills combined with unique climate maturation",
      "Award-winning quality recognized internationally across multiple prestigious spirit competitions",
      "Distilled near pure mountain water sources and aged under dramatic seasonal climate variations",
      "Produced by world-class malt master distilleries prioritizing quality in every single batch",
      "Represents the pinnacle of single malt whisky craftsmanship, innovation, and elegance",
      "Limited batch production ensures exclusivity and uncompromised attention to detail in every bottle"
    ],
    faqs: [
      {
        question: "What makes Single Malt different from other whiskies?",
        answer: "A Single Malt whisky is produced entirely from 100% malted barley at a single distillery in copper pot stills, whereas blended whiskies combine malts and grain whiskies from multiple distilleries."
      },
      {
        question: "What does 'Triple Cask Maturation' mean?",
        answer: "It means the spirit is aged in three distinct cask types — such as ex-bourbon, ex-wine, and Pedro Ximénez sherry casks — allowing each barrel to impart distinct layers of vanilla, dark fruit, and oak complexity."
      },
      {
        question: "How should I drink Single Malt whisky?",
        answer: "Single Malt is best enjoyed neat at room temperature (18°C–20°C) or with 2-3 drops of pure spring water to release hidden aromatic esters. It can also be enjoyed on the rocks or in premium craft cocktails."
      },
      {
        question: "What glass is recommended for tasting?",
        answer: "A Glencairn tulip glass is recommended as its narrow neck concentrates volatile aromas toward the nose while allowing alcohol fumes to dissipate smoothly."
      },
      {
        question: "Is Single Malt suitable for whisky beginners?",
        answer: "Yes! Well-balanced expressions with triple-cask maturation provide smooth caramel, vanilla, and fruit notes that make an inviting introduction for new whisky drinkers."
      }
    ],
    finalVerdict: "Single Malt Whisky represents a watershed moment for fine spirits, proving that dedicated copper pot distillation and triple-cask maturation produce expressions that rival the world's greatest luxury drinks. Whether you are a seasoned connoisseur or exploring single malts for the first time, it offers an extraordinary sensory journey through heritage, terroir, and liquid art."
  },
  {
    slug: "fine-wines",
    name: "Fine Wines",
    subtitle: "Terroir, Vintages & Centuries of Viticulture",
    tagline: "Hand-Picked Grapes Fermented with Indigenous Yeast & Aged in French Oak Vats",
    heroImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80",
    badge: "Sommelier Grand Cru Select",
    origin: "Bordeaux, Burgundy & Napa Valley",
    glassware: "Bordeaux Grand Bulb Glass",
    idealTemp: "16°C – 18°C (Cellar Temp)",
    agingPeriod: "18 to 36 Months in French Oak",
    overviewText: "Fine Wine represents the harmonious union of soil, sunlight, grape variety, and winemaker passion. From Premier Grand Cru Classé estates in Bordeaux to boutique Napa Valley vineyards, fine wine undergoes meticulous hand harvesting, optical sorting, and extended cellaring in French oak vats.",
    historyIntro: "Fine wine production spans over 6,000 years, perfected across Roman vineyards and French monastic estates. The 1855 Bordeaux Classification created an immortal hierarchy of grand vin estates celebrating micro-terroir.",
    historyDetail: "A fine wine reflects its terroir — the unique synergy of gravel soil, sunlight angle, rainfall, and grape variety. Hand-sorted grapes ferment slowly before aging in French oak to develop velvety tannins and lingering bouquet.",
    milestones: [
      { year: "1855", title: "Bordeaux Grand Cru Classification", description: "Official ranking of premier estates ordered by Emperor Napoleon III." },
      { year: "1976", title: "Judgment of Paris", description: "California wines shock the world in blind tastings alongside French Grand Crus." }
    ],
    processSteps: [
      { stepNumber: 1, title: "Precision Harvesting 🍇", desc: "Grapes are hand-harvested at peak sugar-acid balance and optically sorted.", icon: "🍇" },
      { stepNumber: 2, title: "Maceration & Fermentation 🍷", desc: "Skins remain in contact with juice to extract deep ruby color and firm tannins.", icon: "🍷" },
      { stepNumber: 3, title: "French Oak Barrel Cellaring 🪵", desc: "Aged for up to 24 months in toasted French oak vats.", icon: "🪵" }
    ],
    tastingNotesGrid: {
      nose: "Aromatic bouquet of ripe blackcurrant, cassis, French oak cedarwood, violets, and graphite notes.",
      palate: "Full-bodied with structured tannins, dark blackberry fruits, cocoa, and subtle minerality.",
      finish: "Long and silky finish with elegant notes of french oak, espresso, and dark berries.",
      appearance: "Deep ruby purple with brilliant clarity and slow tear legs down the glass."
    },
    spotlightNotes: [
      { note: "Ripe Blackcurrant & Cassis", intensity: 95, desc: "Classic Cabernet Sauvignon core aromas." },
      { note: "French Oak & Cedarwood", intensity: 88, desc: "Elegant spicy structure from French oak barrels." },
      { note: "Wild Violets & Truffle", intensity: 84, desc: "Subtle floral nuances developed during bottle aging." }
    ],
    pouringRitual: [
      { stepNumber: 1, title: "Decant for 45 Minutes 🫗", desc: "Pour into a glass decanter to let vintage tannins breathe and open up aromas.", icon: "🫗" },
      { stepNumber: 2, title: "Pour into a Large Bulb Glass 🍷", desc: "Fill 1/3 of a Bordeaux glass to allow oxygen interaction.", icon: "🍷" }
    ],
    howToEnjoy: [
      { title: "Decanted & Chilled to 16°C", desc: "Decant 45 minutes prior to serving to soften tannins and expand aromatic complexity." },
      { title: "Sommelier Cheese & Steak Pairing", desc: "Pair with prime ribeye steak, truffle mushroom risotto, or aged Gouda cheese." }
    ],
    pairings: [
      {
        title: "Food Pairings",
        items: [
          "Prime Aged Ribeye & Tenderloin Steak",
          "Truffle Mushroom Risotto",
          "Aged Gouda & Blue Cheese Platter",
          "Dark Chocolate Truffles"
        ]
      }
    ],
    whyChoose: [
      "Authentic Premier Grand Cru & Terroir Expressions",
      "Hand-Harvested and Aged in 100% New French Oak",
      "Proven Aging Longevity Spanning Decades"
    ],
    faqs: [
      { question: "Why should fine wine be decanted?", answer: "Decanting introduces oxygen, allowing tight tannins to soften and releasing complex aromas of fruits, oak, and florals." }
    ],
    finalVerdict: "Fine Wine is bottled heritage — an unforgettable expression of nature and centuries of winemaking mastery."
  }
];

export const getCategorySpotlightBySlug = (slug: string): CategorySpotlightData | undefined => {
  const norm = slug.toLowerCase();
  if (norm === "spirits" || norm === "single-malts" || norm === "single-malt") {
    return categorySpotlightList.find(c => c.slug === "spirits");
  }
  if (norm === "wine" || norm === "fine-wines" || norm === "fine-wine") {
    return categorySpotlightList.find(c => c.slug === "fine-wines");
  }
  return categorySpotlightList.find(c => c.slug.toLowerCase() === norm);
};
