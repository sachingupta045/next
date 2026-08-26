"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { categoriesData, productsData } from "../../data/quickCommerceData";
import { drinkitProducts } from "../../data/drinkitData";
import { getCategorySpotlightBySlug, CategorySpotlightData } from "../../data/categorySpotlightData";
import { FilterState } from "../../types/category";
import { CategoryTopHeader } from "../../components/category/CategoryTopHeader";
import { CategorySidebar } from "../../components/category/CategorySidebar";
import { SubcategoryBar } from "../../components/category/SubcategoryBar";
import { CategoryToolbar } from "../../components/category/CategoryToolbar";
import { CategoryBanner } from "../../components/category/CategoryBanner";
import { ProductGrid } from "../../components/category/ProductGrid";
import { FloatingCartBar } from "../../components/category/FloatingCartBar";
import { CartDrawer } from "../../components/category/CartDrawer";
import { FilterModal } from "../../components/category/FilterModal";
import { WishlistCompareProvider } from "../../context/WishlistCompareContext";
import { FloatingCompareBar } from "../../components/drinkit/FloatingCompareBar";
import { WishlistDrawer } from "../../components/drinkit/WishlistDrawer";
import { CompareModal } from "../../components/drinkit/CompareModal";

import {
  ChevronRight,
  ArrowLeft,
  Award,
  Calendar,
  Flame,
  Wine,
  Sparkles,
  BookOpen,
  Clock,
  ExternalLink,
  Droplet,
  GlassWater,
  Thermometer,
  Layers,
  MapPin,
  CheckCircle2,
  Star,
  ChevronDown,
  Info,
  Utensils,
  GlassWater as CocktailIcon,
  HelpCircle,
  ShieldCheck
} from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

function CategorySpotlightView({ spotlight }: { spotlight: CategorySpotlightData }) {
  // State for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Get all drinkit products belonging to this category or categorySlug
  const categoryProducts = drinkitProducts.filter(p =>
    p.categorySlug === spotlight.slug ||
    p.category.toLowerCase().includes(spotlight.name.toLowerCase().split(" ")[0]) ||
    spotlight.slug === "spirits"
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-transparent text-cream transition-colors pb-16">
      {/* Top Breadcrumb Header */}
      <div className="bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted">
            <Link href="/" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/drinkit" className="hover:text-amber transition-colors font-medium focus-visible:ring-2 focus-visible:ring-amber rounded">Drinkit</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cream font-bold">{spotlight.name}</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
            <a href="#overview" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Overview</a>
            <a href="#tasting-notes-grid" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Tasting Notes</a>
            <a href="#how-to-enjoy" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">How To Enjoy</a>
            <a href="#why-choose" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">Why Choose</a>
            <a href="#faqs" className="text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded">FAQs</a>
            <a href="#drinks-catalog" className="text-amber font-bold hover:underline focus-visible:ring-2 focus-visible:ring-amber rounded">Explore Drinks ({categoryProducts.length})</a>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-base via-surface/70 to-base text-cream border-b border-white/5">
        <div className="absolute inset-0">
          <img
            src={spotlight.heroImage}
            alt={spotlight.name}
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
            Back to All Beverages
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-amber/15 border border-amber/30 text-amber px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber" />
                {spotlight.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md text-cream px-3 py-1 rounded-full text-xs font-semibold border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-glow" />
                {spotlight.origin}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-cream font-serif tracking-tight leading-none mb-3">
              {spotlight.name}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-amber-glow/90 italic font-serif mb-6 leading-relaxed">
              &quot;{spotlight.subtitle}&quot;
            </p>

            <p className="text-sm sm:text-base text-muted max-w-2xl mb-8 leading-relaxed">
              {spotlight.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#drinks-catalog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-black text-sm shadow-[0_4px_18px_rgba(193,122,61,0.3)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.4)] hover:-translate-y-0.5 transition-all focus-visible:ring-2 focus-visible:ring-amber-glow"
              >
                <Wine className="w-4 h-4" /> Explore Drinks Selection
              </a>
              <a
                href="#tasting-notes-grid"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface/80 backdrop-blur-md border border-white/15 text-cream font-bold text-sm hover:border-amber hover:text-amber transition-all focus-visible:ring-2 focus-visible:ring-amber"
              >
                <Sparkles className="w-4 h-4 text-amber" /> Tasting Notes &amp; Profile ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-1">Ideal Glassware</p>
            <p className="text-base sm:text-lg font-black text-cream font-serif flex items-center gap-2">
              <GlassWater className="w-5 h-5 text-amber" /> {spotlight.glassware}
            </p>
          </div>
          <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-1">Serving Temp</p>
            <p className="text-base sm:text-lg font-black text-cream font-serif flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-amber" /> {spotlight.idealTemp}
            </p>
          </div>
          <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-1">Aging &amp; Maturation</p>
            <p className="text-base sm:text-lg font-black text-cream font-serif flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber" /> {spotlight.agingPeriod}
            </p>
          </div>
          <div className="bg-surface/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl flex flex-col justify-between">
            <p className="text-[10px] font-black uppercase text-amber-glow tracking-widest mb-1">Origin Region</p>
            <p className="text-base sm:text-lg font-black text-cream font-serif flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber" /> {spotlight.origin.split(",")[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Narrative Content Container */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* SECTION 1: OVERVIEW & STORY */}
        <section id="overview" className="scroll-mt-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1.5 h-8 bg-amber rounded-full" />
            <span className="text-xs font-black uppercase tracking-widest text-amber">Chapter I</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream font-serif mb-6">
            Overview &amp; Story of <span className="text-amber">{spotlight.name}</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-base sm:text-lg text-cream/90 leading-relaxed font-sans">
                {spotlight.overviewText || spotlight.historyIntro}
              </p>

              <div className="bg-amber/10 border-l-4 border-amber p-5 rounded-r-2xl my-6">
                <p className="text-sm font-semibold text-amber-glow leading-relaxed">
                  {spotlight.historyDetail}
                </p>
              </div>

              {/* Milestones timeline grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {spotlight.milestones.map((m, idx) => (
                  <div key={idx} className="bg-surface/85 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-sm">
                    <span className="text-xs font-black text-amber font-serif bg-amber/15 px-2.5 py-0.5 rounded-full inline-block mb-2">
                      Anno {m.year}
                    </span>
                    <h4 className="text-sm font-bold text-cream mb-1">{m.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{m.description || m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-surface">
                <img
                  src={spotlight.heroImage}
                  alt={spotlight.name}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-cream">
                  <span className="bg-amber text-base text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-1.5 inline-block">Category Heritage</span>
                  <h4 className="text-xl font-bold font-serif">{spotlight.name}</h4>
                  <p className="text-xs text-muted mt-1">Centuries of distillation art, natural spring water &amp; oak aging.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4-CARD TASTING NOTES GRID */}
        {spotlight.tastingNotesGrid && (
          <section id="tasting-notes-grid" className="scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-amber">Sensory Evaluation</span>
              <h2 className="text-3xl sm:text-4xl font-black text-cream font-serif mt-1">
                Tasting Notes Breakdown
              </h2>
              <p className="text-sm text-muted mt-2">
                A 4-dimensional breakdown of nose, palate, finish, and natural appearance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nose */}
              <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber/10 text-amber flex items-center justify-center text-xl font-bold">
                    👃
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream font-serif capitalize">Nose</h3>
                    <span className="text-[10px] font-bold text-amber-glow uppercase tracking-widest">Initial Bouquet &amp; Aromatics</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {spotlight.tastingNotesGrid.nose}
                </p>
              </div>

              {/* Palate */}
              <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber/10 text-amber flex items-center justify-center text-xl font-bold">
                    👅
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream font-serif capitalize">Palate</h3>
                    <span className="text-[10px] font-bold text-amber-glow uppercase tracking-widest">Mouthfeel &amp; Body Flavor</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {spotlight.tastingNotesGrid.palate}
                </p>
              </div>

              {/* Finish */}
              <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber/10 text-amber flex items-center justify-center text-xl font-bold">
                    ✨
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream font-serif capitalize">Finish</h3>
                    <span className="text-[10px] font-bold text-amber-glow uppercase tracking-widest">Persistence &amp; Warm Fade</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {spotlight.tastingNotesGrid.finish}
                </p>
              </div>

              {/* Appearance */}
              <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber/10 text-amber flex items-center justify-center text-xl font-bold">
                    🍷
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cream font-serif capitalize">Appearance</h3>
                    <span className="text-[10px] font-bold text-amber-glow uppercase tracking-widest">Natural Color &amp; Leg Clarity</span>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {spotlight.tastingNotesGrid.appearance}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: HOW IT'S PROCESSED */}
        <section id="processing" className="scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber">Production Methods</span>
            <h2 className="text-3xl sm:text-4xl font-black text-cream font-serif mt-1">
              How <span className="text-amber">{spotlight.name}</span> Is Processed
            </h2>
            <p className="text-sm text-muted mt-2">
              From raw grain harvesting to decade-long oak cask maturation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spotlight.processSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-lg relative flex flex-col justify-between group hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="w-8 h-8 rounded-full bg-amber/15 text-amber flex items-center justify-center font-black text-xs font-serif">
                      0{step.stepNumber}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-cream mb-2 font-serif group-hover:text-amber transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-bold text-amber">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Stage {step.stepNumber} Completed
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: HOW TO ENJOY & SIGNATURE COCKTAILS */}
        {spotlight.howToEnjoy && spotlight.howToEnjoy.length > 0 && (
          <section id="how-to-enjoy" className="scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-6 bg-amber rounded-full" />
                  <span className="text-xs font-black uppercase tracking-widest text-amber">Serving &amp; Recipes</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-cream font-serif">
                  How To Enjoy &amp; Cocktails
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spotlight.howToEnjoy.map((hte, idx) => (
                <div
                  key={idx}
                  className="bg-surface/85 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-amber/10 text-amber flex items-center justify-center font-bold mb-4 text-lg">
                      🍸
                    </div>
                    <h4 className="text-lg font-bold text-cream mb-2 font-serif">
                      {hte.title}
                    </h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {hte.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: FOOD & PAIRING IDEAS */}
        {spotlight.pairings && spotlight.pairings.length > 0 && (
          <section id="pairings" className="scroll-mt-20">
            <div className="bg-surface/85 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <Utensils className="w-6 h-6 text-amber" />
                <h3 className="text-2xl font-black text-cream font-serif">
                  Pairing Ideas &amp; Culinary Inspirations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {spotlight.pairings.map((pGroup, idx) => (
                  <div key={idx} className="bg-base/60 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-base font-bold text-cream mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber" /> {pGroup.title}
                    </h4>
                    <ul className="space-y-2">
                      {pGroup.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-muted flex items-start gap-2">
                          <span className="text-sage shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6: WHY CHOOSE THIS CATEGORY */}
        {spotlight.whyChoose && spotlight.whyChoose.length > 0 && (
          <section id="why-choose" className="scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-amber">Excellence &amp; Distinction</span>
              <h2 className="text-3xl sm:text-4xl font-black text-cream font-serif mt-1">
                Why Choose <span className="text-amber">{spotlight.name}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spotlight.whyChoose.map((reason, idx) => (
                <div key={idx} className="bg-surface/85 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-start gap-3 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-cream leading-relaxed">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
        {spotlight.faqs && spotlight.faqs.length > 0 && (
          <section id="faqs" className="scroll-mt-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-amber">Knowledge Base</span>
              <h2 className="text-3xl sm:text-4xl font-black text-cream font-serif mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {spotlight.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-surface/85 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 text-left font-bold text-sm text-cream flex items-center justify-between gap-4 hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-amber"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-muted transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-amber" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-muted leading-relaxed border-t border-white/5 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 8: FINAL SOMMELIER VERDICT */}
        {spotlight.finalVerdict && (
          <section id="verdict">
            <div className="bg-gradient-to-r from-surface via-surface/90 to-base text-cream border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber text-base text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Sommelier Final Verdict
                </span>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-amber-glow leading-relaxed">
                &quot;{spotlight.finalVerdict}&quot;
              </p>
            </div>
          </section>
        )}

        {/* SECTION 9: OTHER DRINKS IN THIS CATEGORY */}
        <section id="drinks-catalog" className="scroll-mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-6 bg-amber rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-amber">Category Collection</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-cream font-serif">
                {spotlight.name} Drinks Showcase
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
            {categoryProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-surface/85 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-md hover:border-amber/40 hover:shadow-[0_0_28px_rgba(193,122,61,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-base/50">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-base/80 backdrop-blur-md text-amber-glow text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                        {prod.brand}
                      </span>
                      {prod.badge && (
                        <span className="bg-amber text-base text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-muted font-semibold mb-1">
                      <span>{prod.origin}</span>
                      <span>{prod.volume} · {prod.abv}</span>
                    </div>

                    <h4 className="text-lg font-bold text-cream group-hover:text-amber transition-colors line-clamp-2 leading-snug mb-2 font-serif">
                      {prod.title}
                    </h4>

                    <p className="text-xs text-muted line-clamp-2 mb-4">
                      {prod.description}
                    </p>

                    {prod.tastingNotes && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {prod.tastingNotes.slice(0, 3).map((tn: string, idx: number) => (
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

// ─── Grocery Category Component (Fallback) ───────────────────────────────────
function GroceryCategoryView({ categorySlug }: { categorySlug: string }) {
  const activeCategory = useMemo(() => {
    return categoriesData.find((c) => c.slug === categorySlug) || categoriesData[0];
  }, [categorySlug]);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    selectedSubcategory: "all",
    sortBy: "relevance",
    isVegOnly: false,
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
  });

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      selectedSubcategory: "all",
      sortBy: "relevance",
      isVegOnly: false,
      minPrice: 0,
      maxPrice: 500,
      minRating: 0,
    });
  };

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((product) => {
        if (product.categorySlug !== activeCategory.slug) return false;
        if (filters.selectedSubcategory !== "all" && product.subcategorySlug !== filters.selectedSubcategory) return false;
        if (filters.isVegOnly && !product.isVeg) return false;
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = product.title.toLowerCase().includes(q);
          const matchesSubtitle = product.subtitle?.toLowerCase().includes(q);
          const matchesBrand = product.brand?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesSubtitle && !matchesBrand) return false;
        }
        if (product.price > filters.maxPrice) return false;
        if (filters.minRating > 0 && product.rating < filters.minRating) return false;
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "price-low") return a.price - b.price;
        if (filters.sortBy === "price-high") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        if (filters.sortBy === "discount") return (b.discountPercent || 0) - (a.discountPercent || 0);
        return 0;
      });
  }, [activeCategory, filters]);

  return (
    <div className="min-h-screen bg-transparent text-cream transition-colors">
      <CategoryTopHeader
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => handleFilterChange({ searchQuery: q })}
        categoryName={activeCategory.name}
      />
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row">
        <CategorySidebar categories={categoriesData} activeCategorySlug={activeCategory.slug} />
        <main className="flex-1 min-w-0 px-3 sm:px-6 py-4">
          <SubcategoryBar
            subcategories={activeCategory.subcategories}
            activeSubcategorySlug={filters.selectedSubcategory}
            onSelectSubcategory={(subSlug) => handleFilterChange({ selectedSubcategory: subSlug })}
          />
          <CategoryBanner categoryName={activeCategory.name} />
          <CategoryToolbar
            totalProducts={filteredProducts.length}
            filters={filters}
            onFilterChange={handleFilterChange}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
          />
          <ProductGrid products={filteredProducts} onResetFilters={handleResetFilters} />
        </main>
      </div>
      <FloatingCartBar />
      <CartDrawer />
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.slug;

  // Check if beverage category spotlight exists for this slug
  const spotlight = getCategorySpotlightBySlug(categorySlug);

  if (spotlight) {
    return (
      <WishlistCompareProvider>
        <CategorySpotlightView spotlight={spotlight} />
      </WishlistCompareProvider>
    );
  }

  return <GroceryCategoryView categorySlug={categorySlug} />;
}
