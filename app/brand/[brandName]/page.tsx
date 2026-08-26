"use client";

import React, { use } from "react";
import Link from "next/link";
import { drinkitProducts } from "@/app/data/drinkitData";
import { getBrandStoryByNameOrSlug } from "@/app/data/brandHistory";
import { WishlistCompareProvider } from "@/app/context/WishlistCompareContext";
import { FloatingCompareBar } from "@/app/components/drinkit/FloatingCompareBar";
import { CompareModal } from "@/app/components/drinkit/CompareModal";
import { WishlistDrawer } from "@/app/components/drinkit/WishlistDrawer";
import {
  ArrowLeft,
  MapPin,
  Star,
  Award,
  ChevronRight,
  Droplets,
  ExternalLink,
  Calendar,
  Sparkles,
  BookOpen,
  Clock,
  Compass,
  CheckCircle2,
  Quote,
  Layers,
  Wine
} from "lucide-react";

interface BrandPageProps {
  params: Promise<{ brandName: string }>;
}

export interface PortfolioProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  volume: string;
  abv: string;
  origin: string;
  vintage: string;
  tastingNotes: string[];
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
}

function BrandPageContent({ brandName }: { brandName: string }) {
  const decodedBrand = decodeURIComponent(brandName);

  // Fetch story data from brandHistory
  const story = getBrandStoryByNameOrSlug(decodedBrand);

  // Get matching products from drinkitProducts
  const listedProducts = drinkitProducts.filter(
    (p: { brand: string }) => p.brand.toLowerCase() === decodedBrand.toLowerCase()
  );

  // Build extended portfolio items if listedProducts count is small
  const representativeProduct = listedProducts[0] || {
    id: "drink-101",
    title: `${decodedBrand} Grand Cru Classé 2018`,
    brand: decodedBrand,
    category: story?.category || "Fine Wines",
    price: 4500,
    originalPrice: 5200,
    volume: "750 ml",
    abv: "13.5%",
    origin: story?.origin || "Bordeaux, France",
    vintage: "2018",
    tastingNotes: ["Blackcurrant", "French Oak", "Cedarwood", "Violets", "Dark Chocolate"],
    image: story?.coverImage || "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviewCount: 380,
    badge: "Premier Vintage",
    description: story?.excerpt || `${decodedBrand} is a world-class producer of premier wines and fine spirits.`
  };

  // Create additional portfolio items if needed so section feels complete
  const extraPortfolioItems: PortfolioProduct[] = [
    {
      id: "cm-02",
      title: "Pavillon Rouge de Château Margaux 2019",
      brand: decodedBrand,
      category: "Second Vin Premier",
      price: 2400,
      originalPrice: 2800,
      volume: "750 ml",
      abv: "13.5%",
      origin: representativeProduct.origin,
      vintage: "2019",
      tastingNotes: ["Ripe Plum", "Silky Tannins", "Sweet Spice", "Cassisserie"],
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80",
      rating: 4.8,
      reviewCount: 145,
      badge: "Second Vin",
      description: "Produced from the estate's exceptional second selection, offering vibrant red fruit aromas and early accessibility with signature Margaux finesse."
    },
    {
      id: "cm-03",
      title: "Pavillon Blanc de Château Margaux 2021",
      brand: decodedBrand,
      category: "Bordeaux Blanc",
      price: 3100,
      originalPrice: 3500,
      volume: "750 ml",
      abv: "13.0%",
      origin: representativeProduct.origin,
      vintage: "2021",
      tastingNotes: ["White Peach", "Citrus Blossom", "Flinty Mineral", "French Oak Vanilla"],
      image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=600&q=80",
      rating: 4.9,
      reviewCount: 98,
      badge: "Rare White Vintage",
      description: "100% Sauvignon Blanc harvested from historic limestone-gravel plots. Rare, crystalline, and aged in French oak casks."
    },
    {
      id: "cm-04",
      title: "Château Margaux Premier Grand Cru Reserve 2015",
      brand: decodedBrand,
      category: "Collector's Cellar",
      price: 6800,
      originalPrice: 7500,
      volume: "750 ml",
      abv: "13.5%",
      origin: representativeProduct.origin,
      vintage: "2015",
      tastingNotes: ["Blackberry", "Truffle", "Smoky Oak", "Graphite", "Wild Rose"],
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
      rating: 5.0,
      reviewCount: 210,
      badge: "Iconic Vintage",
      description: "A monumental vintage commemorating 200 years of the Palladian Château and the opening of Norman Foster's modern cellar."
    }
  ];

  // Combine listed products with extra portfolio items if fewer than 3 listed
  const allBrandProducts = listedProducts.length >= 3
    ? listedProducts
    : [...listedProducts, ...extraPortfolioItems.filter(item => !listedProducts.some(lp => lp.title === item.title))];

  const avgRating = listedProducts.length > 0
    ? listedProducts.reduce((sum: number, p: { rating: number }) => sum + p.rating, 0) / listedProducts.length
    : representativeProduct.rating;

  const totalReviews = listedProducts.length > 0
    ? listedProducts.reduce((sum: number, p: { reviewCount: number }) => sum + p.reviewCount, 0)
    : representativeProduct.reviewCount;

  return (
    <div className="min-h-screen bg-transparent text-cream transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted">
            <Link href="/" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/drinkit" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Drinkit</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cream font-bold">{decodedBrand}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a href="#brand-story" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Heritage &amp; Story</a>
            <a href="#craftsmanship" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Craftsmanship</a>
            <a href="#milestones" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Timeline</a>
            <a href="#products-portfolio" className="text-amber font-bold hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">Product Portfolio ({allBrandProducts.length})</a>
          </div>
        </div>
      </div>

      {/* Hero Banner with Background Blur */}
      <div className="relative overflow-hidden bg-gradient-to-br from-base via-surface/60 to-base text-cream border-b border-white/5">
        <div className="absolute inset-0">
          <img
            src={story?.coverImage || representativeProduct.image}
            alt={decodedBrand}
            className="w-full h-full object-cover opacity-20 scale-105 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <Link
            href="/drinkit"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-glow hover:text-amber transition-colors mb-6 group bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 focus-visible:ring-2 focus-visible:ring-amber"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Return to Beverage Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-amber/15 border border-amber/30 text-amber px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber" />
                  {story?.category || representativeProduct.category}
                </span>

                {story?.foundingYear && (
                  <span className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md text-cream px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                    <Calendar className="w-3.5 h-3.5 text-amber-glow" />
                    Est. {story.foundingYear}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-glow bg-amber/10 px-3 py-1 rounded-full border border-amber/20">
                  <Star className="w-3.5 h-3.5 fill-amber-glow" />
                  {avgRating.toFixed(1)} Rating ({totalReviews} Reviews)
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-cream font-serif tracking-tight leading-none mb-4">
                {decodedBrand}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-amber-glow/90 italic font-serif max-w-2xl mb-6 leading-relaxed">
                &quot;{story?.tagline || representativeProduct.description}&quot;
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted mb-8 border-y border-white/10 py-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber" />
                  <span><strong className="text-cream">Origin:</strong> {story?.origin || representativeProduct.origin}</span>
                </div>
                {story?.mastermind && (
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber" />
                    <span><strong className="text-cream">Mastermind:</strong> {story.mastermind}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-amber" />
                  <span><strong className="text-cream">Portfolio:</strong> {allBrandProducts.length} Fine Products</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#products-portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-black text-sm shadow-[0_4px_18px_rgba(193,122,61,0.3)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.4)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow"
                >
                  <Wine className="w-4 h-4" /> View Brand Products
                </a>
                <a
                  href="#brand-story"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface/80 backdrop-blur-md border border-white/15 text-cream font-bold text-sm hover:border-amber hover:text-amber transition-all focus-visible:ring-2 focus-visible:ring-amber"
                >
                  <BookOpen className="w-4 h-4 text-amber" /> Explore Heritage &amp; History ↓
                </a>
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl group bg-surface">
                <img
                  src={story?.badgeImage || story?.coverImage || representativeProduct.image}
                  alt={decodedBrand}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-surface/90 backdrop-blur-md rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-0.5">Signature Vintage</p>
                  <p className="text-xs font-bold text-cream line-clamp-1">{representativeProduct.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Strip */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(story?.keyStats || [
            { label: "Established", value: story?.foundingYear ? `Anno ${story.foundingYear}` : "12th Century" },
            { label: "Terroir & Region", value: representativeProduct.origin.split(",")[0] },
            { label: "Classification", value: story?.category || "Grand Cru" },
            { label: "Global Rating", value: `${avgRating.toFixed(1)} ★ (${totalReviews})` }
          ]).map((stat, idx) => (
            <div
              key={idx}
              className="bg-surface/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between"
            >
              <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-black text-cream font-serif">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Narrative Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* SECTION 1: HOW THEY BUILT IT */}
        <section id="brand-story" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-amber rounded-full" />
            <span className="text-xs font-black uppercase tracking-widest text-amber">Chapter I</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream font-serif mb-6">
            The Origins: How <span className="text-amber">{decodedBrand}</span> Was Built
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-base sm:text-lg text-cream/90 leading-relaxed font-sans">
                {story?.originStory || story?.fullStory.intro || (
                  `${decodedBrand} stands as a historic monument to viticulture and liquid craftsmanship. From humble beginnings centuries ago, the estate was forged through unyielding dedication to terroir, pioneering high-density vine planting and meticulous cask cellaring that redefined the standards of fine wine.`
                )}
              </p>

              <div className="bg-amber/10 border-l-4 border-amber p-5 rounded-r-2xl my-6">
                <p className="text-sm font-semibold text-amber-glow leading-relaxed">
                  {story?.fullStory.heritage || (
                    "Recognized in the historic 1855 classification as a Premier Grand Cru Classé estate, an honor bestowed upon only four elite châteaux in all of Bordeaux."
                  )}
                </p>
              </div>

              <p className="text-base text-muted leading-relaxed">
                {story?.excerpt || (
                  `Through centuries of historical turmoil, royal visits, and generational mastery, ${decodedBrand} preserved its commitment to perfection, cultivating deep gravel soils that impart unrivaled elegance, aroma complexity, and longevity.`
                )}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-surface/85 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream uppercase tracking-wider">Terroir Distinction</h4>
                    <p className="text-xs text-muted mt-0.5">Deep Garonne gravel over clay subsoil</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface/85 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-cream uppercase tracking-wider">Handcrafted Cooperage</h4>
                    <p className="text-xs text-muted mt-0.5">100% new French oak crafted on-site</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Images for History */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {(story?.galleryImages && story.galleryImages.length >= 2 ? story.galleryImages : [
                {
                  url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
                  title: "The Historic Palladian Estate",
                  caption: "Architectural masterpiece built in the early 19th century."
                },
                {
                  url: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=800&q=80",
                  title: "Gravel Soils & Harvest",
                  caption: "Hand sorting prime harvest grapes."
                }
              ]).slice(0, 2).map((img, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-surface">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-cream">
                    <p className="text-xs font-bold font-serif">{img.title}</p>
                    <p className="text-[10px] text-muted line-clamp-1">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CRAFTSMANSHIP & PRODUCTION */}
        <section id="craftsmanship" className="scroll-mt-20">
          <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/10 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Media preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <img
                    src={story?.galleryImages?.[2]?.url || "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"}
                    alt="Craftsmanship and Cellar"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-cream">
                    <span className="bg-amber text-base px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 inline-block">Cellar Aging</span>
                    <p className="text-sm font-serif font-bold">18 to 24 Months Barrel Maturation</p>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-amber rounded-full" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber">Chapter II</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-cream font-serif">
                  Craftsmanship, Terroir &amp; Production
                </h3>

                <p className="text-base text-muted leading-relaxed">
                  {story?.craftsmanshipText || story?.fullStory.craftsmanship || (
                    `Every bottle produced under the ${decodedBrand} crest represents an extraordinary balance between nature and human mastery. From optical sorting of individual berries to plot-by-plot vinification in oak and steel vats, no effort is spared in perfecting flavor harmonitity.`
                  )}
                </p>

                {/* Signature Tasting Profile */}
                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-muted mb-3">Signature Tasting Profile &amp; Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {representativeProduct.tastingNotes.map((note: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs font-bold bg-amber/10 text-amber border border-amber/20 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        🍷 {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-base/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-muted font-medium">Serving Temp:</span>
                    <p className="font-bold text-cream mt-0.5">{representativeProduct.servingTemp || "16°C – 18°C"}</p>
                  </div>
                  <div className="bg-base/60 border border-white/5 p-3 rounded-xl">
                    <span className="text-muted font-medium">Volume &amp; ABV:</span>
                    <p className="font-bold text-cream mt-0.5">{representativeProduct.volume} · {representativeProduct.abv}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT THEY ARE RIGHT NOW */}
        <section id="present-day">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-sage rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-sage">Chapter III</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-cream font-serif">
                What They Are Right Now: <span className="text-amber">Modern Prestige &amp; Legacy</span>
              </h3>

              <p className="text-base text-muted leading-relaxed">
                {story?.presentStatus || story?.fullStory.legacy || (
                  `Today, ${decodedBrand} stands as an undisputed global powerhouse in luxury beverages. Combining centuries of inherited tradition with progressive organic farming and architectural innovation, it remains the ultimate benchmark for collectors and connoisseurs worldwide.`
                )}
              </p>

              {/* Master Quote Card */}
              {story?.quote && (
                <div className="bg-surface border border-white/10 text-cream p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <Quote className="absolute right-4 bottom-4 w-24 h-24 text-amber/10 pointer-events-none" />
                  <p className="text-lg sm:text-xl font-serif italic text-amber-glow leading-relaxed mb-4">
                    &quot;{story.quote.text}&quot;
                  </p>
                  <p className="text-xs font-black uppercase tracking-widest text-amber">
                    — {story.quote.author}
                  </p>
                </div>
              )}
            </div>

            {/* Present day visual card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-surface">
                <img
                  src={story?.galleryImages?.[3]?.url || story?.badgeImage || representativeProduct.image}
                  alt={`${decodedBrand} Estate Today`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <span className="bg-amber text-base font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block">Current Era</span>
                  <h4 className="text-xl font-bold font-serif">{decodedBrand} Modern Estate</h4>
                  <p className="text-xs text-muted mt-1">Organic viticulture &amp; state-of-the-art Norman Foster cellars.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HISTORICAL MILESTONES TIMELINE */}
        {story?.milestones && story.milestones.length > 0 && (
          <section id="milestones" className="scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-amber">Chronology</span>
              <h3 className="text-3xl sm:text-4xl font-black text-cream font-serif mt-1">
                Key Historical Milestones
              </h3>
              <p className="text-sm text-muted mt-2">
                Five centuries of defining moments that shaped {decodedBrand} into an international icon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {story.milestones.map((m: typeof story.milestones[0], idx: number) => (
                <div
                  key={idx}
                  className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-md hover:border-amber/40 hover:shadow-[0_0_24px_rgba(193,122,61,0.15)] transition-all group"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/10 text-amber font-black text-xs font-serif mb-4 group-hover:bg-amber group-hover:text-base transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                    {m.year}
                  </div>
                  <h4 className="text-base font-bold text-cream mb-2 line-clamp-2">{m.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: PRODUCTS BY THIS BRAND */}
        <section id="products-portfolio" className="scroll-mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-6 bg-amber rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-amber">Product Showcase</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-cream font-serif">
                Products &amp; Vintages by {decodedBrand}
              </h3>
            </div>
            <Link
              href="/drinkit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded"
            >
              Browse All Drinkit Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBrandProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-surface/85 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-md hover:border-amber/40 hover:shadow-[0_0_28px_rgba(193,122,61,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-60 overflow-hidden bg-base/50">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-base/80 backdrop-blur-md text-amber-glow text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                        {prod.vintage || "2018"}
                      </span>
                      {prod.badge && (
                        <span className="bg-amber text-base text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-muted font-semibold mb-1">
                      <span>{prod.category}</span>
                      <span>{prod.volume} · {prod.abv}</span>
                    </div>

                    <h4 className="text-lg font-bold text-cream group-hover:text-amber transition-colors line-clamp-2 leading-snug mb-2 font-serif">
                      {prod.title}
                    </h4>

                    <p className="text-xs text-muted line-clamp-2 mb-4">
                      {prod.description}
                    </p>

                    {/* Tasting Tags */}
                    {prod.tastingNotes && prod.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {prod.tastingNotes.slice(0, 3).map((tn, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white/5 text-muted px-2 py-0.5 rounded-md font-medium"
                          >
                            {tn}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted block font-medium">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-amber font-serif">
                        ₹{prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-muted line-through">
                          ₹{prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/drink/${prod.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-xs shadow-sm hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-amber-glow"
                  >
                    View Product <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <FloatingCompareBar />
      <WishlistDrawer />
      <CompareModal />
    </div>
  );
}

export default function BrandPage({ params }: BrandPageProps) {
  const { brandName } = use(params);
  return (
    <WishlistCompareProvider>
      <BrandPageContent brandName={brandName} />
    </WishlistCompareProvider>
  );
}
