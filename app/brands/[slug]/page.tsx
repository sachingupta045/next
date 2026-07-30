import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug, brandStories } from "../../data/brandHistory";
import Footer from "../../components/Footer";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BrandBlogPage({ params }: PageProps) {
    const resolvedParams = await params;
    const story = getBrandBySlug(resolvedParams.slug);

    if (!story) {
        notFound();
    }

    const otherStories = brandStories.filter((b) => b.slug !== story.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#fff8f0] dark:bg-slate-950 transition-colors text-slate-800 dark:text-slate-200">
            {/* Top Navigation / Breadcrumbs Bar */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#e8281a] dark:hover:text-red-400 transition-colors"
                    >
                        <i className="fas fa-arrow-left text-xs"></i>
                        <span>Back to Home</span>
                    </Link>

                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span>/</span>
                        <Link href="/#brand-history" className="hover:underline">Brand History</Link>
                        <span>/</span>
                        <span className="text-[#e8281a] dark:text-red-400 font-bold">{story.name}</span>
                    </div>
                </div>
            </div>

            {/* Brand Hero Header */}
            <section className="relative py-16 lg:py-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white dark:from-slate-900 to-[#fff8f0] dark:to-slate-950">
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Circle Avatar / Badge */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-[#fff0eb] to-[#fef0dc] dark:from-slate-800 dark:to-slate-800/90 border-2 border-[#f6a623]/40 flex items-center justify-center shadow-xl shrink-0">
                            <span className="text-3xl lg:text-4xl font-black text-[#e8281a] dark:text-red-400 font-serif">
                                {story.initials}
                            </span>
                        </div>

                        {/* Title & Metadata */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="px-3.5 py-1 rounded-full bg-[#e8281a] text-white text-xs font-bold uppercase tracking-wider">
                                    {story.category}
                                </span>
                                <span className="px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
                                    EST. {story.foundingYear}
                                </span>
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                    <i className="fas fa-map-marker-alt text-red-500"></i>
                                    {story.origin}
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white font-serif leading-tight mb-3">
                                {story.name}
                            </h1>

                            <p className="text-lg sm:text-xl text-[#f6a623] dark:text-amber-400 font-serif italic max-w-3xl">
                                "{story.tagline}"
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content & Specs Grid */}
            <main className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Main Story Column */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Introduction */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif mb-4 flex items-center gap-3">
                                <span className="w-2 h-7 bg-[#e8281a] rounded-full inline-block"></span>
                                The Origin Story
                            </h2>
                            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                                {story.fullStory.intro}
                            </p>
                        </div>

                        {/* Heritage & Craftsmanship */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif mb-3 flex items-center gap-2">
                                    <i className="fas fa-landmark text-[#e8281a]"></i>
                                    Heritage & Evolution
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {story.fullStory.heritage}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif mb-3 flex items-center gap-2">
                                    <i className="fas fa-vial text-[#e8281a]"></i>
                                    Master Craftsmanship
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {story.fullStory.craftsmanship}
                                </p>
                            </div>
                        </div>

                        {/* Quote Block */}
                        <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            <i className="fas fa-quote-right absolute -bottom-6 -right-6 text-9xl text-white/10 pointer-events-none"></i>
                            <p className="text-xl sm:text-2xl font-serif italic mb-4 leading-relaxed relative z-10">
                                "{story.quote.text}"
                            </p>
                            <div className="text-sm font-bold uppercase tracking-wider text-amber-200">
                                — {story.quote.author}
                            </div>
                        </div>

                        {/* Milestones Timeline */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif mb-8 flex items-center gap-3">
                                <span className="w-2 h-7 bg-[#e8281a] rounded-full inline-block"></span>
                                Historical Milestones
                            </h2>

                            <div className="relative border-l-2 border-red-500/30 dark:border-slate-700 ml-4 space-y-8 pl-6">
                                {story.milestones.map((m, idx) => (
                                    <div key={idx} className="relative group transition-all duration-300">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#e8281a] ring-4 ring-white dark:ring-slate-900 group-hover:scale-150 group-hover:bg-amber-500 transition-all duration-300 shadow-md" />
                                        <div className="inline-block px-3 py-0.5 rounded-md bg-red-100 dark:bg-red-950/80 text-[#e8281a] dark:text-red-400 font-bold text-xs mb-1 transition-transform group-hover:translate-x-1">
                                            {m.year}
                                        </div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white font-serif mb-1 group-hover:text-[#e8281a] dark:group-hover:text-red-400 transition-colors">
                                            {m.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                            {m.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modern Legacy */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-serif mb-3">
                                Modern Legacy
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                {story.fullStory.legacy}
                            </p>
                        </div>
                    </div>

                    {/* Right Column Specs Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Quick Facts Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif mb-4 pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                <i className="fas fa-certificate text-[#e8281a]"></i>
                                Brand Specifications
                            </h3>

                            <dl className="space-y-4 text-xs sm:text-sm">
                                <div>
                                    <dt className="text-slate-400 uppercase font-semibold text-[0.7rem] tracking-wider">Established</dt>
                                    <dd className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{story.foundingYear}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 uppercase font-semibold text-[0.7rem] tracking-wider">Origin</dt>
                                    <dd className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{story.origin}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 uppercase font-semibold text-[0.7rem] tracking-wider">Master Craftsman</dt>
                                    <dd className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{story.mastermind}</dd>
                                </div>
                                <div>
                                    <dt className="text-slate-400 uppercase font-semibold text-[0.7rem] tracking-wider">Signature Bottle</dt>
                                    <dd className="font-bold text-[#e8281a] dark:text-red-400 mt-0.5">{story.signatureProduct}</dd>
                                </div>
                            </dl>

                            {/* Explore Other Brands */}
                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">
                                    Explore Other Stories
                                </h4>
                                <div className="space-y-3">
                                    {otherStories.map((other) => (
                                        <Link
                                            key={other.id}
                                            href={`/brands/${other.slug}`}
                                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-[#fff0eb] dark:bg-slate-800 border border-red-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-bold text-[#e8281a] dark:text-red-400">
                                                    {other.initials}
                                                </span>
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#e8281a] dark:group-hover:text-red-400 transition-colors truncate">
                                                    {other.name}
                                                </div>
                                                <div className="text-[0.7rem] text-slate-400">
                                                    Est. {other.foundingYear}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
