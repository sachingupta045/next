"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Search,
  Flame,
  DollarSign,
  Scale,
  Utensils,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useReducedMotion } from "../components/motion/useReducedMotion";

/* â”€â”€â”€ Slider Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const heroSlides = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1600&q=85",
    badge: "ðŸ¥ƒ Single Malts",
    headline: "Discover Fine",
    headlineAccent: "Spirits",
    sub: "Explore India's most coveted whiskies, Scotch legends, and craft single malts with verified state prices.",
    cta: "Browse Whiskies",
    ctaHref: "/drinkit?category=single-malts",
    accent: "from-amber-500 to-yellow-400",
    glow: "rgba(245,158,11,0.35)",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1600&q=85",
    badge: "ðŸº Craft Beers",
    headline: "Artisan Beer",
    headlineAccent: "Culture",
    sub: "From hoppy IPAs to rich stouts â€” discover craft breweries and find your perfect pint.",
    cta: "Explore Beers",
    ctaHref: "/drinkit?category=craft-beers",
    accent: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.35)",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=85",
    badge: "ðŸ· Fine Wines",
    headline: "World-Class",
    headlineAccent: "Wines",
    sub: "Bordeaux, Burgundy, Barossa Valley â€” curated fine wines with tasting notes and food pairings.",
    cta: "View Wines",
    ctaHref: "/drinkit?category=fine-wines",
    accent: "from-rose-500 to-pink-400",
    glow: "rgba(244,63,94,0.35)",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=85",
    badge: "ðŸŒ¿ Premium Gin",
    headline: "India's Top",
    headlineAccent: "Gins",
    sub: "Bombay Sapphire, Hapusa, Greater Than â€” explore botanical gins with curated cocktail pairings.",
    cta: "Shop Gins",
    ctaHref: "/drinkit?category=gin",
    accent: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.35)",
  },
];

/* â”€â”€â”€ Variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.33, 1, 0.68, 1] } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 6 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const chipContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
};

/* â”€â”€â”€ MagneticCard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22, mass: 0.5 };
  const x = useSpring(mx, springCfg);
  const y = useSpring(my, springCfg);
  const rotateX = useTransform(y, [-40, 40], [5, -5]);
  const rotateY = useTransform(x, [-40, 40], [-5, 5]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.4);
        my.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

/* â”€â”€â”€ Hero Slider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = heroSlides.length;

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % total, 1);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, -1);
  }, [current, total, goTo]);

  useEffect(() => {
    if (isPaused || reduced) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, reduced]);

  const slide = heroSlides[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1, transition: { duration: 0.65, ease: [0.33, 1, 0.68, 1] } },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ height: "clamp(320px, 50vw, 540px)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={reduced ? {} : slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Slide Content */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-10 px-6 sm:px-10 lg:px-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="max-w-xl"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-4 border backdrop-blur-md bg-black/40 border-white/15 text-white/90">
                {slide.badge}
              </span>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white leading-[1.1] mb-3 drop-shadow-2xl">
                {slide.headline}{" "}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.accent}`}>
                  {slide.headlineAccent}
                </span>
              </h2>

              {/* Sub */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 drop-shadow-md">
                {slide.sub}
              </p>

              {/* CTA */}
              <Link
                href={slide.ctaHref}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${slide.accent} text-white font-extrabold text-sm shadow-lg hover:scale-105 hover:brightness-110 transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-white`}
                style={{ boxShadow: `0 8px 28px ${slide.glow}` }}
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/65 hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white flex items-center justify-center hover:bg-black/65 hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white ${
              i === current
                ? "w-6 h-2 bg-white shadow-lg"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 z-20 text-xs font-bold text-white/60 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
        {current + 1} / {total}
      </div>
    </div>
  );
}

/* â”€â”€â”€ Main Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const Hero: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const trendingTags = [
    { label: "Indri Trini", slug: "drink-indri" },
    { label: "Glenfiddich 12", slug: "drink-glenfiddich-12" },
    { label: "Monkey Shoulder", slug: "drink-monkey-shoulder" },
    { label: "Amrut Fusion", slug: "drink-amrut-fusion" },
    { label: "Old Monk", slug: "drink-old-monk-legend" },
    { label: "Corona Extra", slug: "drink-corona" },
    { label: "Bombay Sapphire", slug: "drink-bombay-sapphire" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/drinkit?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <motion.section
      ref={heroRef}
      className="relative pt-4 pb-10 sm:pt-6 sm:pb-14 overflow-hidden bg-transparent"
      style={reduced ? {} : { opacity }}
    >
      {/* Ambient orbs â€” warm amber/gold for liquor theme */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-[-60px] left-[5%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.07)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute top-[60px] right-[0%] w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(193,122,61,0.06)_0%,transparent_70%)] blur-3xl" />
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 relative z-10 space-y-6">

        {/* â”€â”€ Top Badge â”€â”€ */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-amber/30 text-amber text-xs font-bold shadow-lg backdrop-blur-md">
            <motion.span
              animate={{ rotate: [0, 15, -10, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber" />
            </motion.span>
            <span>India&apos;s Independent Liquor Price &amp; Taste Guide</span>
          </div>
        </motion.div>

        {/* â”€â”€ Full-width Slider â”€â”€ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
        >
          <HeroSlider />
        </motion.div>

        {/* â”€â”€ Search Bar â”€â”€ */}
        <motion.form
          onSubmit={handleSearchSubmit}
          className="max-w-2xl mx-auto relative flex items-center shadow-2xl"
          initial={{ opacity: 0, scaleX: 0.92, y: 10 }}
          animate={{ opacity: 1, scaleX: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
        >
          <div className="relative w-full flex items-center bg-surface/95 backdrop-blur-xl border-2 border-white/10 focus-within:border-amber focus-within:shadow-[0_0_32px_rgba(193,122,61,0.28)] rounded-2xl transition-all overflow-hidden p-1">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <Search className="w-5 h-5 text-muted ml-3 shrink-0" />
            </motion.div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Single Malts, Gin, Craft Beers, Rum, Wine..."
              className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-cream placeholder:text-muted outline-none"
            />
            <motion.button
              type="submit"
              className="bg-gradient-to-r from-amber to-amber-glow hover:brightness-110 text-base font-extrabold px-6 py-3 rounded-xl shadow-md text-xs sm:text-sm shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <span>Search</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </div>
        </motion.form>

        {/* â”€â”€ Trending Chips â”€â”€ */}
        <motion.div
          className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-xs"
          variants={chipContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="text-muted text-[11px] font-semibold mr-1" variants={fadeUp}>
            Trending:
          </motion.span>
          {trendingTags.map((tag) => (
            <motion.button
              key={tag.slug}
              variants={chipVariants}
              onClick={() => router.push(`/drinkit?search=${encodeURIComponent(tag.label)}`)}
              className="bg-surface/80 border border-white/10 text-cream px-2.5 py-1 rounded-full text-[11px] font-medium"
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(193,122,61,0.5)",
                backgroundColor: "rgba(193,122,61,0.08)",
              }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 350, damping: 18 }}
            >
              {tag.label}
            </motion.button>
          ))}
        </motion.div>

        {/* â”€â”€ 4 Action Cards (Magnetic) â”€â”€ */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1: The Pour Lineup */}
          <motion.div variants={cardVariants}>
            <MagneticCard className="h-full">
              <a
                href="#trending-lineup"
                className="group p-4 rounded-2xl bg-surface/80 hover:bg-orange-950/20 border border-white/10 hover:border-orange-500/50 backdrop-blur-md transition-colors duration-300 hover:shadow-[0_0_28px_rgba(249,115,22,0.22)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  >
                    <Flame className="w-4 h-4" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-black text-orange-300 bg-orange-500/15 px-2 py-0.5 rounded-md border border-orange-500/30">
                    Trending
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-orange-300 transition-colors">
                    The Pour Lineup
                  </h3>
                  <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                    India&apos;s most popular sips
                  </p>
                </div>
              </a>
            </MagneticCard>
          </motion.div>

          {/* Card 2: Budget Explorer */}
          <motion.div variants={cardVariants}>
            <MagneticCard className="h-full">
              <a
                href="#budget-tiers"
                className="group p-4 rounded-2xl bg-surface/80 hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/50 backdrop-blur-md transition-colors duration-300 hover:shadow-[0_0_28px_rgba(16,185,129,0.22)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: -12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  >
                    <DollarSign className="w-4 h-4" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-black text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    â‚¹ Price Tiers
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-emerald-300 transition-colors">
                    Budget Explorer
                  </h3>
                  <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                    Under â‚¹1k, â‚¹2.5k &amp; Luxury
                  </p>
                </div>
              </a>
            </MagneticCard>
          </motion.div>

          {/* Card 3: Compare Spirits */}
          <motion.div variants={cardVariants}>
            <MagneticCard className="h-full">
              <Link
                href="/compare"
                className="group p-4 rounded-2xl bg-surface/80 hover:bg-cyan-950/20 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-colors duration-300 hover:shadow-[0_0_28px_rgba(6,182,212,0.22)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  >
                    <Scale className="w-4 h-4" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-black text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-md border border-cyan-500/30">
                    Side-by-Side
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-cyan-300 transition-colors">
                    Compare Spirits
                  </h3>
                  <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                    ABV, flavor notes &amp; price
                  </p>
                </div>
              </Link>
            </MagneticCard>
          </motion.div>

          {/* Card 4: Brand Stories */}
          <motion.div variants={cardVariants}>
            <MagneticCard className="h-full">
              <a
                href="#brand-spotlight"
                className="group p-4 rounded-2xl bg-surface/80 hover:bg-rose-950/20 border border-white/10 hover:border-rose-500/50 backdrop-blur-md transition-colors duration-300 hover:shadow-[0_0_28px_rgba(244,63,94,0.22)] flex flex-col justify-between h-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <motion.div
                    className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: -12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  >
                    <Utensils className="w-4 h-4" />
                  </motion.div>
                  <span className="text-[10px] uppercase font-black text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded-md border border-rose-500/30">
                    Distilleries
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-cream group-hover:text-rose-300 transition-colors">
                    Brand Stories
                  </h3>
                  <p className="text-[11px] text-muted mt-0.5 line-clamp-1">
                    Heritage &amp; distilleries
                  </p>
                </div>
              </a>
            </MagneticCard>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default Hero;
