import React from "react";
import Link from "next/link";
import { brands } from "../data/brands";

const BrandSpotlight = () => {
    return (
        <section id="brand-spotlight" className="py-20 lg:py-24 bg-[#fff8f0] dark:bg-slate-950 transition-colors">
            <div className="max-w-[1320px] mx-auto px-4">
                {/* Header with Title and 'View all' link */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 lg:mb-12 gap-4" data-aos="fade-up">
                    <div>
                        <span className="block text-xs uppercase font-bold tracking-widest text-[#e8281a] dark:text-red-500 mb-2 font-sans">
                            Brand Spotlight
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white font-serif leading-tight">
                            Iconic houses, one shelf
                        </h2>
                    </div>

                    <a
                        href="#brand-history"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#e8281a] dark:text-red-500 hover:text-[#c01e12] dark:hover:text-red-400 transition-colors group self-start sm:self-auto"
                    >
                        <span>View all stories</span>
                        <i className="fas fa-arrow-right text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </a>
                </div>

                {/* 8-Column Grid matching the screenshot layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
                    {brands.map((brand, index) => (
                        <div
                            key={brand.id}
                            data-aos="zoom-in"
                            data-aos-delay={index * 40}
                        >
                            <Link
                                href={`/brands/${brand.slug}`}
                                className="group bg-white dark:bg-slate-900 rounded-2xl p-5 flex flex-col items-center justify-center text-center border border-slate-200/70 dark:border-slate-800/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-[0_12px_30px_rgba(232,40,26,0.12)] hover:border-[#e8281a]/50 dark:hover:border-red-500/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer min-h-[140px] block"
                            >
                                {/* Circle Avatar Icon */}
                                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#fff0eb] to-[#fef0dc] dark:from-slate-800 dark:to-slate-800/70 border border-red-500/20 dark:border-slate-700 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-[#e8281a] transition-all duration-300 shadow-inner mx-auto">
                                    <span className="text-xs sm:text-sm font-black text-[#e8281a] dark:text-red-400 font-serif tracking-tight">
                                        {brand.initials}
                                    </span>
                                </div>

                                {/* Brand Name */}
                                <span className="text-xs sm:text-[0.82rem] font-medium text-[#1a1a1a] dark:text-slate-200 group-hover:text-[#e8281a] dark:group-hover:text-red-400 transition-colors leading-tight line-clamp-2 block">
                                    {brand.name}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandSpotlight;
