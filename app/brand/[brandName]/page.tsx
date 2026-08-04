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
    <div className="min-h-screen bg-[#faf6f0] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-900/5 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#e8281a] transition-colors font-medium">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/drinkit" className="hover:text-[#e8281a] transition-colors font-medium">Drinkit</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 dark:text-white font-bold">{decodedBrand}</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold">
            <a href="#brand-story" className="text-slate-600 dark:text-slate-300 hover:text-[#e8281a] transition-colors">Heritage & Story</a>
            <a href="#craftsmanship" className="text-slate-600 dark:text-slate-300 hover:text-[#e8281a] transition-colors">Craftsmanship</a>
            <a href="#milestones" className="text-slate-600 dark:text-slate-300 hover:text-[#e8281a] transition-colors">Timeline</a>
            <a href="#products-portfolio" className="text-[#e8281a] font-bold hover:underline">Product Portfolio ({allBrandProducts.length})</a>
          </div>
        </div>
      </div>

      {/* Hero Banner with Background Blur */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src={story?.coverImage || representativeProduct.image}
            alt={decodedBrand}
            className="w-full h-full object-cover opacity-25 scale-105 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <Link
            href="/drinkit"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400/90 hover:text-amber-300 transition-colors mb-6 group bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Return to Beverage Catalog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {story?.category || representativeProduct.category}
                </span>

                {story?.foundingYear && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-slate-200 px-3 py-1 rounded-full text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Est. {story.foundingYear}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {avgRating.toFixed(1)} Rating ({totalReviews} Reviews)
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-white font-serif tracking-tight leading-none mb-4">
                {decodedBrand}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-amber-200/90 italic font-serif max-w-2xl mb-6 leading-relaxed">
                "{story?.tagline || representativeProduct.description}"
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mb-8 border-y border-white/10 py-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span><strong>Origin:</strong> {story?.origin || representativeProduct.origin}</span>
                </div>
                {story?.mastermind && (
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span><strong>Mastermind:</strong> {story.mastermind}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Wine className="w-4 h-4 text-amber-400" />
                  <span><strong>Portfolio:</strong> {allBrandProducts.length} Fine Products</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#products-portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e8281a] to-[#c01e12] text-white font-black text-sm shadow-xl shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all"
                >
                  <Wine className="w-4 h-4" /> View Brand Products
                </a>
                <a
                  href="#brand-story"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" /> Explore Heritage & History ↓
                </a>
              </div>
            </div>

            {/* Featured Image Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl group">
                <img
                  src={story?.badgeImage || story?.coverImage || representativeProduct.image}
                  alt={decodedBrand}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black uppercase text-amber-400 tracking-widest mb-0.5">Signature Vintage</p>
                  <p className="text-xs font-bold text-white line-clamp-1">{representativeProduct.title}</p>
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
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-amber-900/10 dark:border-slate-800 shadow-xl shadow-amber-950/5 flex flex-col justify-between"
            >
              <p className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Narrative Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* SECTION 1: HOW THEY BUILT IT (Brand History & Origins) */}
        <section id="brand-story" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-[#e8281a] rounded-full" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Chapter I</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-serif mb-6">
            The Origins: How <span className="text-[#e8281a]">{decodedBrand}</span> Was Built
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {story?.originStory || story?.fullStory.intro || (
                  `${decodedBrand} stands as a historic monument to viticulture and liquid craftsmanship. From humble beginnings centuries ago, the estate was forged through unyielding dedication to terroir, pioneering high-density vine planting and meticulous cask cellaring that redefined the standards of fine wine.`
                )}
              </p>

              <div className="bg-amber-500/10 border-l-4 border-amber-600 dark:border-amber-500 p-5 rounded-r-2xl my-6">
                <p className="text-sm font-semibold text-amber-950 dark:text-amber-200 leading-relaxed">
                  {story?.fullStory.heritage || (
                    "Recognized in the historic 1855 classification as a Premier Grand Cru Classé estate, an honor bestowed upon only four elite châteaux in all of Bordeaux."
                  )}
                </p>
              </div>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {story?.excerpt || (
                  `Through centuries of historical turmoil, royal visits, and generational mastery, ${decodedBrand} preserved its commitment to perfection, cultivating deep gravel soils that impart unrivaled elegance, aroma complexity, and longevity.`
                )}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-950/10 dark:border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Terroir Distinction</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Deep Garonne gravel over clay subsoil</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-950/10 dark:border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Handcrafted Cooperage</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">100% new French oak crafted on-site</p>
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
                <div key={i} className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold font-serif">{img.title}</p>
                    <p className="text-[10px] text-slate-300 line-clamp-1">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: CRAFTSMANSHIP & PRODUCTION */}
        <section id="craftsmanship" className="scroll-mt-20">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-amber-900/10 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Media preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-100 dark:border-slate-800">
                  <img
                    src={story?.galleryImages?.[2]?.url || "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"}
                    alt="Craftsmanship and Cellar"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="bg-[#e8281a] px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 inline-block">Cellar Aging</span>
                    <p className="text-sm font-serif font-bold">18 to 24 Months Barrel Maturation</p>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Chapter II</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
                  Craftsmanship, Terroir & Production
                </h3>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {story?.craftsmanshipText || story?.fullStory.craftsmanship || (
                    `Every bottle produced under the ${decodedBrand} crest represents an extraordinary balance between nature and human mastery. From optical sorting of individual berries to plot-by-plot vinification in oak and steel vats, no effort is spared in perfecting flavor harmonitity.`
                  )}
                </p>

                {/* Signature Tasting Profile */}
                <div className="pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Signature Tasting Profile & Notes</h4>
                  <div className="flex flex-wrap gap-2">
                    {representativeProduct.tastingNotes.map((note: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        🍷 {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <span className="text-slate-400 font-medium">Serving Temp:</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{representativeProduct.servingTemp || "16°C – 18°C"}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <span className="text-slate-400 font-medium">Volume & ABV:</span>
                    <p className="font-bold text-slate-900 dark:text-white mt-0.5">{representativeProduct.volume} · {representativeProduct.abv}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT THEY ARE RIGHT NOW (Present Day & Legacy) */}
        <section id="present-day">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">Chapter III</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif">
                What They Are Right Now: <span className="text-emerald-600 dark:text-emerald-400">Modern Prestige & Legacy</span>
              </h3>

              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {story?.presentStatus || story?.fullStory.legacy || (
                  `Today, ${decodedBrand} stands as an undisputed global powerhouse in luxury beverages. Combining centuries of inherited tradition with progressive organic farming and architectural innovation, it remains the ultimate benchmark for collectors and connoisseurs worldwide.`
                )}
              </p>

              {/* Master Quote Card */}
              {story?.quote && (
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <Quote className="absolute right-4 bottom-4 w-24 h-24 text-amber-500/10 pointer-events-none" />
                  <p className="text-lg sm:text-xl font-serif italic text-amber-200/95 leading-relaxed mb-4">
                    "{story.quote.text}"
                  </p>
                  <p className="text-xs font-black uppercase tracking-widest text-amber-400">
                    — {story.quote.author}
                  </p>
                </div>
              )}
            </div>

            {/* Present day visual card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
                <img
                  src={story?.galleryImages?.[3]?.url || story?.badgeImage || representativeProduct.image}
                  alt={`${decodedBrand} Estate Today`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block">Current Era</span>
                  <h4 className="text-xl font-bold font-serif">{decodedBrand} Modern Estate</h4>
                  <p className="text-xs text-slate-300 mt-1">Organic viticulture & state-of-the-art Norman Foster cellars.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: HISTORICAL MILESTONES TIMELINE */}
        {story?.milestones && story.milestones.length > 0 && (
          <section id="milestones" className="scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Chronology</span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-serif mt-1">
                Key Historical Milestones
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Five centuries of defining moments that shaped {decodedBrand} into an international icon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {story.milestones.map((m: typeof story.milestones[0], idx: number) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-amber-900/10 dark:border-slate-800 shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black text-xs font-serif mb-4 group-hover:bg-[#e8281a] group-hover:text-white transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                    {m.year}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{m.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: PRODUCTS BY THIS BRAND (OTHER PRODUCTS SHOWCASE) */}
        <section id="products-portfolio" className="scroll-mt-20 pt-8 border-t border-amber-900/10 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-6 bg-[#e8281a] rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-[#e8281a]">Product Showcase</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif">
                Products & Vintages by {decodedBrand}
              </h3>
            </div>
            <Link
              href="/drinkit"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8281a] hover:underline"
            >
              Browse All Drinkit Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBrandProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                        {prod.vintage || "2018"}
                      </span>
                      {prod.badge && (
                        <span className="bg-[#e8281a] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                      <span>{prod.category}</span>
                      <span>{prod.volume} · {prod.abv}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#e8281a] transition-colors line-clamp-2 leading-snug mb-2 font-serif">
                      {prod.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                      {prod.description}
                    </p>

                    {/* Tasting Tags */}
                    {prod.tastingNotes && prod.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {prod.tastingNotes.slice(0, 3).map((tn, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium"
                          >
                            {tn}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-[#e8281a] dark:text-red-400 font-serif">
                        ₹{prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/drink/${prod.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-[#e8281a] dark:hover:bg-[#e8281a] dark:hover:text-white transition-colors"
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
