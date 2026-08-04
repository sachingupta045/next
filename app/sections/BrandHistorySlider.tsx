"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { brandStories } from "../data/brandHistory";

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
        }, 2500);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section id="brand-history" className="py-20 lg:py-24 bg-[#f9f5f0] dark:bg-slate-950 transition-colors relative overflow-hidden">
            <div className="max-w-[1320px] mx-auto px-4 relative z-10">
                {/* Simple Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6" data-aos="fade-up">
                    <div>
                        <span className="block font-['Dancing_Script',cursive] text-2xl font-bold text-[#e8281a] dark:text-red-500 mb-1">
                            Heritage & Tradition
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white leading-tight font-serif">
                            Stories Behind <span className="text-[#e8281a] dark:text-red-500">Iconic Brands</span>
                        </h2>
                    </div>

                    {/* Simple Left / Right Arrow Buttons */}
                    <div className="flex items-center gap-3 self-start md:self-auto">
                        <button
                            onClick={() => scroll("left")}
                            aria-label="Previous story"
                            className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm hover:bg-[#e8281a] hover:border-[#e8281a] hover:text-white transition-all duration-300 group cursor-pointer"
                        >
                            <i className="fas fa-chevron-left text-sm transition-transform group-hover:-translate-x-0.5"></i>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            aria-label="Next story"
                            className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shadow-sm hover:bg-[#e8281a] hover:border-[#e8281a] hover:text-white transition-all duration-300 group cursor-pointer"
                        >
                            <i className="fas fa-chevron-right text-sm transition-transform group-hover:translate-x-0.5"></i>
                        </button>
                    </div>
                </div>

                {/* Simple Scrollable Slider Track */}
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
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none hover:shadow-[0_16px_36px_rgba(232,40,26,0.12)] hover:border-[#e8281a]/50 dark:hover:border-red-500/50 hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between h-full relative overflow-hidden">
                                    {/* Top Metadata */}
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-5">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fff0eb] to-[#fef0dc] dark:from-slate-800 dark:to-slate-800/80 border border-[#f6a623]/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-sm font-black text-[#e8281a] dark:text-red-400 font-serif">
                                                    {story.initials}
                                                </span>
                                            </div>

                                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-[#e8281a] dark:text-red-400 border border-red-100 dark:border-red-900/50">
                                                EST. {story.foundingYear}
                                            </span>
                                        </div>

                                        {/* Category & Origin */}
                                        <div className="text-[0.72rem] font-semibold text-[#f6a623] uppercase tracking-wider mb-1">
                                            {story.category} • {story.origin}
                                        </div>

                                        {/* Brand Name */}
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white font-serif mb-2 group-hover:text-[#e8281a] dark:group-hover:text-red-400 transition-colors">
                                            {story.name}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-6">
                                            {story.excerpt}
                                        </p>
                                    </div>

                                    {/* Card Footer Link */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                        <span className="text-xs font-bold text-[#e8281a] dark:text-red-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                                            <span>Read Heritage Story</span>
                                            <i className="fas fa-arrow-right text-xs"></i>
                                        </span>

                                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
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
