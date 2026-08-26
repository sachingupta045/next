"use client";

import React, { useState } from "react";
import { products, filterCategories, Product } from "../data/products";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";
import { AnimatedSection } from "../components/motion/AnimatedSection";

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
            <section id="menu" className="py-20 lg:py-24 bg-transparent relative transition-colors">
                {/* Decorative Section Glow & Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

                <div className="max-w-[1320px] mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <AnimatedSection className="text-center mb-10 lg:mb-12">
                        <span className="block text-xs uppercase font-bold tracking-widest text-amber mb-2 font-sans">
                            Special Reserve &amp; Menu
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream leading-tight mb-3 font-serif">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-glow">Selections</span>
                        </h2>
                        <div className="w-[58px] h-1 rounded-full bg-gradient-to-r from-amber to-amber-glow mx-auto mb-3" />
                    </AnimatedSection>

                    {/* Filter Category Buttons */}
                    <AnimatedSection className="flex flex-wrap justify-center gap-2.5 mb-10 lg:mb-12">
                        {filterCategories.map((cat) => {
                            const isActive = activeFilter === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveFilter(cat.key)}
                                    className={`px-5 py-2.5 rounded-full text-[0.85rem] font-bold transition-all duration-300 cursor-pointer border font-sans focus-visible:ring-2 focus-visible:ring-amber ${
                                        isActive
                                            ? "bg-gradient-to-r from-amber to-amber-glow border-amber text-base shadow-[0_5px_20px_rgba(193,122,61,0.35)] scale-105"
                                            : "bg-surface/80 backdrop-blur-sm border-white/10 text-muted hover:border-amber/40 hover:text-cream hover:bg-surface"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </AnimatedSection>

                    {/* Products Grid */}
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredProducts.map((product) => {
                            const isLiked = likedProducts.has(product.id);

                            let badgeStyle = "bg-amber text-base";
                            if (product.badgeType === "new") {
                                badgeStyle = "bg-sage text-base";
                            } else if (product.badgeType === "hot") {
                                badgeStyle = "bg-amber-glow text-base";
                            }

                            return (
                                <StaggerItem key={product.id}>
                                    <div
                                        onClick={() => setSelectedProduct(product)}
                                        className="group bg-surface/85 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 hover:border-amber/40 hover:shadow-[0_0_30px_rgba(193,122,61,0.18)] hover:scale-[1.02] cursor-pointer flex flex-col h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden h-[215px] bg-base/80 shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {/* Badge */}
                                            {product.badge && (
                                                <div className={`absolute top-[13px] left-[13px] rounded-full px-3 py-1 text-[0.7rem] font-bold z-10 flex items-center gap-1 shadow-md ${badgeStyle}`}>
                                                    <i className="fas fa-star text-[9px]"></i>
                                                    <span>{product.badge}</span>
                                                </div>
                                            )}

                                            {/* Wishlist Heart */}
                                            <button
                                                onClick={(e) => toggleLike(e, product.id)}
                                                className="absolute top-[13px] right-[13px] w-9 h-9 rounded-full bg-surface/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-white/15 z-10 hover:scale-110 focus-visible:ring-2 focus-visible:ring-amber"
                                                title={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                                            >
                                                <i className={`${isLiked ? "fas fa-heart text-amber" : "far fa-heart text-muted"} text-sm hover:text-amber transition-colors`}></i>
                                            </button>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 flex flex-col flex-grow justify-between">
                                            <div>
                                                <div className="text-[0.72rem] font-bold text-amber-glow uppercase tracking-wider mb-1">
                                                    {product.category}
                                                </div>
                                                <h3 className="text-[1.1rem] font-bold text-cream mb-1.5 font-serif group-hover:text-amber transition-colors">
                                                    {product.title}
                                                </h3>
                                                <p className="text-[0.8rem] text-muted mb-3 leading-relaxed line-clamp-2">
                                                    {product.shortDesc}
                                                </p>
                                            </div>

                                            {/* Card Footer */}
                                            <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                                <div>
                                                    <div className="text-[1.3rem] font-black text-amber font-serif leading-none flex items-baseline">
                                                        {product.price}
                                                        {product.oldPrice && (
                                                            <small className="text-[0.75rem] font-normal text-muted line-through ml-1.5">
                                                                {product.oldPrice}
                                                            </small>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[0.75rem] text-amber-glow mt-1.5">
                                                        <i className="fas fa-star text-[10px]"></i>
                                                        <span className="font-bold text-cream text-[0.75rem]">{product.rating}</span>
                                                        <span className="text-muted text-[0.72rem]">({product.reviews})</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedProduct(product);
                                                    }}
                                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber to-amber-glow text-base flex items-center justify-center transition-all duration-300 shadow-[0_4px_14px_rgba(193,122,61,0.3)] hover:scale-110 hover:rotate-90 text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-glow"
                                                    title="View Details"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>

                    {/* View Full Menu CTA */}
                    <AnimatedSection className="text-center mt-12 lg:mt-14">
                        <a
                            href="/drinkit"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-sm shadow-[0_8px_28px_rgba(193,122,61,0.35)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(193,122,61,0.45)] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-amber-glow cursor-pointer"
                        >
                            <i className="fas fa-th-large text-sm"></i>
                            <span>View Full Collection</span>
                        </a>
                    </AnimatedSection>
                </div>
            </section>

            {/* Quick View Details Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="bg-surface rounded-3xl max-w-lg w-full overflow-hidden border border-amber/20 shadow-2xl relative transition-transform animate-scaleUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-amber hover:text-base flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-amber"
                        >
                            <i className="fas fa-times text-sm"></i>
                        </button>

                        {/* Modal Image */}
                        <div className="relative h-60 bg-base">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-full object-cover"
                            />
                            {selectedProduct.badge && (
                                <div className="absolute top-4 left-4 bg-amber text-base rounded-full px-3 py-1 text-xs font-bold shadow-md">
                                    {selectedProduct.badge}
                                </div>
                            )}
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <div className="text-xs font-bold text-amber-glow uppercase tracking-wider mb-1">
                                {selectedProduct.category}
                            </div>
                            <h3 className="text-2xl font-black text-cream font-serif mb-2">
                                {selectedProduct.title}
                            </h3>

                            {/* Tags & Meta Info */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4">
                                <span className="flex items-center gap-1 text-amber-glow font-semibold">
                                    <i className="fas fa-star text-xs"></i> {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <i className="far fa-clock"></i> {selectedProduct.prepTime} mins
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <i className="fas fa-fire text-amber"></i> {selectedProduct.calories} kcal
                                </span>
                            </div>

                            <p className="text-sm text-muted leading-relaxed mb-6">
                                {selectedProduct.description}
                            </p>

                            {/* Tags List */}
                            <div className="flex flex-wrap gap-1.5 mb-6">
                                {selectedProduct.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-white/5 border border-white/10 text-cream text-xs px-3 py-1 rounded-full font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div>
                                    <div className="text-xs text-muted uppercase font-semibold">Price</div>
                                    <div className="text-2xl font-black text-amber font-serif flex items-baseline gap-2">
                                        {selectedProduct.price}
                                        {selectedProduct.oldPrice && (
                                            <span className="text-sm text-muted line-through font-normal">
                                                {selectedProduct.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-amber to-amber-glow text-base font-bold text-sm shadow-[0_4px_18px_rgba(193,122,61,0.35)] hover:shadow-[0_8px_24px_rgba(193,122,61,0.45)] transition-all hover:-translate-y-0.5 flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-glow"
                                >
                                    <i className="fas fa-shopping-bag"></i>
                                    <span>Add to Selection</span>
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
