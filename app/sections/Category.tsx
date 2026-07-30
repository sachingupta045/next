
"use client";

import React, { useState } from "react";
import { categories } from "../data/category";

const Category = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <section id="category" className="py-20 lg:py-24 bg-[#fff8f0] dark:bg-slate-950 transition-colors">
            <div className="max-w-[1320px] mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-14" data-aos="fade-up">
                    <span className="block font-['Dancing_Script',cursive] text-2xl font-bold text-[#e8281a] dark:text-red-500 mb-1">
                        What We Offer
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white leading-tight mb-3 font-serif">
                        Browse by <span className="text-[#e8281a] dark:text-red-500">Category</span>
                    </h2>
                    <div className="w-[58px] h-1 rounded-full bg-gradient-to-r from-[#e8281a] to-[#f6a623] mx-auto mb-3" />
                    <p className="text-[#777] dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-[480px] mx-auto">
                        From sizzling burgers to exotic world cuisines - find your favourite in our menu
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 justify-center">
                    {categories.map((category, index) => {
                        const filterKey = category.name.toLowerCase() === "all items" ? "all" : category.name.toLowerCase();
                        const isActive = activeFilter === filterKey;

                        return (
                            <div
                                key={category.id}
                                data-aos="zoom-in"
                                data-aos-delay={index * 70}
                            >
                                <div
                                    onClick={() => setActiveFilter(filterKey)}
                                    data-filter={filterKey}
                                    className={`group bg-white dark:bg-slate-900 rounded-[15px] py-[22px] px-[14px] text-center cursor-pointer transition-all duration-400 border-2 ${
                                        isActive
                                            ? "border-[#e8281a] dark:border-red-500 -translate-y-1.5 shadow-[0_14px_38px_rgba(232,40,26,0.14)]"
                                            : "border-transparent hover:border-[#e8281a] dark:hover:border-red-500 hover:-translate-y-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_14px_38px_rgba(232,40,26,0.14)]"
                                    }`}
                                >
                                    <img
                                        className="w-[86px] h-[86px] rounded-full object-cover mx-auto mb-3 block transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-4"
                                        src={category.image}
                                        alt={category.name}
                                    />
                                    <div className="text-[0.86rem] font-semibold text-[#1a1a1a] dark:text-white mb-[3px]">
                                        {category.name}
                                    </div>
                                    <div className="text-[0.73rem] text-[#bbb] dark:text-slate-400 font-medium">
                                        {category.count} items
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Category;