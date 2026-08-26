"use client";

import React from "react";
import Link from "next/link";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";
import { Sparkles } from "lucide-react";

const BrandSpotlight = () => {
    const brandItems = [
        { name: "Indri", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
        { name: "Dalmore", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
        { name: "Glenfiddich", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
        { name: "Paul John", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
        { name: "Laphroaig", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
        { name: "Amrut", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
        { name: "Macallan", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
        { name: "Talisker", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
        { name: "Château Margaux", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=300&q=80" },
        { name: "BrewDog", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=300&q=80" },
        { name: "Bombay Sapphire", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" },
        { name: "Jack Daniels", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
    ];

    return (
        <section id="brand-spotlight" className="py-20 lg:py-24 bg-gradient-to-b from-transparent via-rose-950/10 to-transparent relative transition-colors">
            {/* Section Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

            <div className="max-w-[1320px] mx-auto px-4 relative z-10">
                {/* Header with Title and 'View all' link */}
                <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold mb-2">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Heritage &amp; Distilleries</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream font-serif leading-tight">
                            Iconic Houses, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400">One Shelf</span>
                        </h2>
                    </div>
                    <Link
                        href="/drinkit"
                        className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300 transition-colors group self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
                    >
                        <span>View all collections</span>
                        <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </Link>
                </AnimatedSection>

                {/* Grid */}
                <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {brandItems.map((brand, idx) => (
                        <StaggerItem key={idx}>
                            <Link
                                href={`/brand/${encodeURIComponent(brand.name)}`}
                                className="group flex flex-col items-center cursor-pointer text-center focus-visible:ring-2 focus-visible:ring-rose-400 rounded-2xl"
                            >
                                <div className="w-full aspect-square bg-surface/90 backdrop-blur-md rounded-2xl border border-rose-500/15 p-3 flex items-center justify-center group-hover:shadow-[0_0_24px_rgba(244,63,94,0.2)] group-hover:scale-105 group-hover:border-rose-500/50 transition-all duration-300 overflow-hidden relative">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-30 transition-opacity" />
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-cream mt-2 line-clamp-1 group-hover:text-rose-300 transition-colors">
                                    {brand.name}
                                </span>
                            </Link>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
};

export default BrandSpotlight;
