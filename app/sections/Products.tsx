"use client";

import React, { useState } from "react";
import { products, filterCategories, Product } from "../data/products";

export const Products = () => {
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const toggleLike = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setLikedProducts((prev) => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    };

    const filteredProducts = activeFilter === "all"
        ? products
        : products.filter((p) => p.categoryKey === activeFilter);

    return (
        <>
            <section id="menu" className="py-20 lg:py-24 bg-[#f9f5f0] dark:bg-slate-950 transition-colors">
                <div className="max-w-[1320px] mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-10 lg:mb-12" data-aos="fade-up">
                        <span className="block font-['Dancing_Script',cursive] text-2xl font-bold text-[#e8281a] dark:text-red-500 mb-1">
                            What's Cooking
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white leading-tight mb-3 font-serif">
                            Our Delicious <span className="text-[#e8281a] dark:text-red-500">Menu</span>
                        </h2>
                        <div className="w-[58px] h-1 rounded-full bg-gradient-to-r from-[#e8281a] to-[#f6a623] mx-auto mb-3" />
                    </div>

                    {/* Filter Category Buttons */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-12" data-aos="fade-up">
                        {filterCategories.map((cat) => {
                            const isActive = activeFilter === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveFilter(cat.key)}
                                    className={`px-5 py-2 rounded-full text-[0.84rem] font-semibold transition-all duration-300 cursor-pointer border-2 font-sans ${
                                        isActive
                                            ? "bg-[#e8281a] border-[#e8281a] text-white shadow-[0_5px_18px_rgba(232,40,26,0.24)] scale-105"
                                            : "bg-white dark:bg-slate-900 border-[#e5e5e5] dark:border-slate-800 text-[#666] dark:text-slate-300 hover:bg-[#e8281a] hover:border-[#e8281a] hover:text-white hover:shadow-[0_5px_18px_rgba(232,40,26,0.24)]"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProducts.map((product, index) => {
                            const isLiked = likedProducts.has(product.id);

                            let badgeStyle = "bg-[#e8281a] text-white";
                            if (product.badgeType === "new") {
                                badgeStyle = "bg-[#2d6a4f] text-white";
                            } else if (product.badgeType === "hot") {
                                badgeStyle = "bg-[#f6a623] text-[#1a1a1a]";
                            }

                            return (
                                <div
                                    key={product.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 80}
                                    className="transition-all duration-350"
                                >
                                    <div
                                        onClick={() => setSelectedProduct(product)}
                                        className="group bg-white dark:bg-slate-900 rounded-[18px] overflow-hidden transition-all duration-400 shadow-[0_4px_22px_rgba(0,0,0,0.07)] dark:shadow-none hover:shadow-[0_18px_48px_rgba(0,0,0,0.13)] hover:-translate-y-2 cursor-pointer border border-slate-100 dark:border-slate-800 flex flex-col h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden h-[215px] bg-[#fef0dc] dark:bg-slate-800 shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-109"
                                            />

                                            {/* Badge */}
                                            {product.badge && (
                                                <div className={`absolute top-[13px] left-[13px] rounded-[7px] px-[11px] py-[3px] text-[0.7rem] font-bold z-10 flex items-center gap-1 shadow-sm ${badgeStyle}`}>
                                                    <i className="fas fa-star text-[9px]"></i>
                                                    <span>{product.badge}</span>
                                                </div>
                                            )}

                                            {/* Wishlist Heart */}
                                            <button
                                                onClick={(e) => toggleLike(e, product.id)}
                                                className="absolute top-[13px] right-[13px] w-[33px] h-[33px] rounded-full bg-white dark:bg-slate-900 flex items-center justify-center transition-all duration-300 shadow-[0_2px_9px_rgba(0,0,0,0.1)] z-10 hover:scale-118"
                                                title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                                            >
                                                <i className={`${isLiked ? "fas fa-heart text-[#e8281a]" : "far fa-heart text-[#ccc] dark:text-slate-500"} text-sm hover:text-[#e8281a] transition-colors`}></i>
                                            </button>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-[18px] flex flex-col flex-grow justify-between">
                                            <div>
                                                <div className="text-[0.7rem] font-semibold text-[#f6a623] uppercase tracking-[1px] mb-1">
                                                    {product.category}
                                                </div>
                                                <h3 className="text-[1.05rem] font-bold text-[#1a1a1a] dark:text-white mb-1 font-serif group-hover:text-[#e8281a] dark:group-hover:text-red-500 transition-colors">
                                                    {product.title}
                                                </h3>
                                                <p className="text-[0.78rem] text-[#aaa] dark:text-slate-400 mb-3 leading-[1.5] line-clamp-2">
                                                    {product.shortDesc}
                                                </p>
                                            </div>

                                            {/* Card Footer */}
                                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                                <div>
                                                    <div className="text-[1.25rem] font-extrabold text-[#e8281a] dark:text-red-500 font-serif leading-none flex items-baseline">
                                                        {product.price}
                                                        {product.oldPrice && (
                                                            <small className="text-[0.72rem] font-normal text-[#ccc] dark:text-slate-500 line-through ml-1.5">
                                                                {product.oldPrice}
                                                            </small>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[0.73rem] text-[#f6a623] mt-1">
                                                        <i className="fas fa-star text-[10px]"></i>
                                                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-[0.72rem]">{product.rating}</span>
                                                        <span className="text-[#bbb] dark:text-slate-500 text-[0.7rem]">({product.reviews})</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProduct(product);
                                                    }}
                                                    className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white flex items-center justify-center transition-all duration-300 shadow-[0_4px_11px_rgba(232,40,26,0.28)] hover:scale-115 hover:rotate-90 text-sm cursor-pointer"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* View Full Menu CTA */}
                    <div className="text-center mt-12 lg:mt-14" data-aos="fade-up">
                        <a
                            href="#full-menu"
                            className="inline-flex items-center gap-[9px] px-[32px] py-[14px] rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-semibold text-[0.93rem] shadow-[0_8px_24px_rgba(232,40,26,0.35)] transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <i className="fas fa-th-large text-sm"></i>
                            <span>View Full Menu</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Quick View Details Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 relative transition-transform animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center transition-colors"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>

                        {/* Modal Image */}
                        <div className="relative h-60 bg-[#fef0dc] dark:bg-slate-800">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-full object-cover"
                            />
                            {selectedProduct.badge && (
                                <div className="absolute top-4 left-4 bg-[#e8281a] text-white rounded-md px-3 py-1 text-xs font-bold shadow-md">
                                    {selectedProduct.badge}
                                </div>
                            )}
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="text-xs font-bold text-[#f6a623] uppercase tracking-wider mb-1">
                                {selectedProduct.category}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif mb-2">
                                {selectedProduct.title}
                            </h3>

                            {/* Tags & Meta Info */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                                <span className="flex items-center gap-1 text-[#f6a623] font-semibold">
                                    <i className="fas fa-star text-xs"></i> {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <i className="far fa-clock"></i> {selectedProduct.prepTime} mins
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <i className="fas fa-fire text-amber-500"></i> {selectedProduct.calories} kcal
                                </span>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                {selectedProduct.description}
                            </p>

                            {/* Tags List */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {selectedProduct.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                    <div className="text-xs text-slate-400 uppercase font-semibold">Price</div>
                                    <div className="text-2xl font-black text-[#e8281a] dark:text-red-500 font-serif flex items-baseline gap-2">
                                        {selectedProduct.price}
                                        {selectedProduct.oldPrice && (
                                            <span className="text-sm text-slate-400 line-through font-normal">
                                                {selectedProduct.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="px-6 py-3 rounded-full bg-gradient-to-br from-[#e8281a] to-[#c01e12] text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <i className="fas fa-shopping-bag"></i>
                                    <span>Add to Order</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Products;
