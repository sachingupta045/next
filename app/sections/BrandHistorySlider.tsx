"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { brandStories } from "../data/brandHistory";
import { AnimatedSection } from "../components/motion/AnimatedSection";

const BrandHistorySlider = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const scroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const container = sliderRef.current;
            const scrollAmount = 740;

            if (direction === "right") {
                const maxScrollLeft = container.scrollWidth - container.clientWidth;
                if (container.scrollLeft >= maxScrollLeft - 10) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
                }
            } else {
                if (container.scrollLeft <= 10) {
                    container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
                } else {
                    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
                }
            }
        }
    };

    // Auto-scroll by default
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            scroll("right");
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section id="brand-history" className="py-20 lg:py-24 bg-transparent transition-colors relative overflow-hidden">
            {/* Decorative Divider */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

            <div className="max-w-[1320px] mx-auto px-4 relative z-10">
                {/* Header */}
                <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
                    <div>
                        <span className="block text-xs uppercase font-bold tracking-widest text-amber mb-2 font-sans">
                            Heritage &amp; Tradition
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream leading-tight font-serif">
                            Stories Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-glow">Iconic Brands</span>
                        </h2>
                    </div>

                    {/* Left / Right Arrow Buttons */}
                    <div className="flex items-center gap-3 self-start md:self-auto">
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Previous story"
                            className="w-11 h-11 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 text-cream flex items-center justify-center hover:bg-amber hover:border-amber hover:text-base transition-all duration-300 group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber shadow-md"
                        >
                            <i className="fas fa-chevron-left text-sm transition-transform group-hover:-translate-x-0.5"></i>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Next story"
                            className="w-11 h-11 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 text-cream flex items-center justify-center hover:bg-amber hover:border-amber hover:text-base transition-all duration-300 group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber shadow-md"
                        >
                            <i className="fas fa-chevron-right text-sm transition-transform group-hover:translate-x-0.5"></i>
                        </button>
                    </div>
                </AnimatedSection>

                {/* Slider Track */}
                <div
                    ref={sliderRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1 -mx-1 no-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {brandStories.map((story) => (
                        <div
                            key={story.id}
                            className="snap-start shrink-0 w-[300px] sm:w-[360px] group"
                        >
                            <Link href={`/brands/${story.slug}`} className="block h-full">
                                <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-amber/40 hover:shadow-[0_0_30px_rgba(193,122,61,0.18)] hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between h-full relative overflow-hidden">
                                    {/* Top Metadata */}
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-5">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber/20 to-amber-glow/10 border border-amber/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-sm font-black text-amber font-serif">
                                                    {story.initials}
                                                </span>
                                            </div>

                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber/15 text-amber border border-amber/30">
                                                EST. {story.foundingYear}
                                            </span>
                                        </div>

                                        {/* Category & Origin */}
                                        <div className="text-[0.72rem] font-bold text-amber-glow uppercase tracking-wider mb-1">
                                            {story.category} • {story.origin}
                                        </div>

                                        {/* Brand Name */}
                                        <h3 className="text-xl font-black text-cream font-serif mb-2 group-hover:text-amber transition-colors">
                                            {story.name}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-6">
                                            {story.excerpt}
                                        </p>
                                    </div>

                                    {/* Card Footer Link */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-xs font-bold text-amber flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                            <span>Read Heritage Story</span>
                                            <i className="fas fa-arrow-right text-xs"></i>
                                        </span>

                                        <span className="text-xs text-muted font-medium">
                                            {story.milestones.length} Milestones
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandHistorySlider;
