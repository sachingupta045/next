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
        <div className="min-h-screen bg-transparent text-cream transition-colors">
            {/* Top Navigation / Breadcrumbs Bar */}
            <div className="bg-surface/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-amber transition-colors focus-visible:ring-2 focus-visible:ring-amber rounded"
                    >
                        <i className="fas fa-arrow-left text-xs"></i>
                        <span>Back to Home</span>
                    </Link>

                    <div className="text-xs font-semibold text-muted flex items-center gap-2">
                        <Link href="/" className="hover:text-amber">Home</Link>
                        <span>/</span>
                        <Link href="/#brand-history" className="hover:text-amber">Brand History</Link>
                        <span>/</span>
                        <span className="text-amber font-bold">{story.name}</span>
                    </div>
                </div>
            </div>

            {/* Brand Hero Header */}
            <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-surface/80 to-base/40">
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                        {/* Circle Avatar / Badge */}
                        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl bg-gradient-to-br from-amber/20 to-amber-glow/10 border-2 border-amber/30 flex items-center justify-center shadow-xl shrink-0">
                            <span className="text-3xl lg:text-4xl font-black text-amber font-serif">
                                {story.initials}
                            </span>
                        </div>

                        {/* Title & Metadata */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="px-3.5 py-1 rounded-full bg-amber text-base text-xs font-bold uppercase tracking-wider">
                                    {story.category}
                                </span>
                                <span className="px-3.5 py-1 rounded-full bg-surface border border-white/10 text-cream text-xs font-bold">
                                    EST. {story.foundingYear}
                                </span>
                                <span className="text-xs font-semibold text-muted flex items-center gap-1">
                                    <i className="fas fa-map-marker-alt text-amber"></i>
                                    {story.origin}
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cream font-serif leading-tight mb-3">
                                {story.name}
                            </h1>

                            <p className="text-lg sm:text-xl text-amber-glow font-serif italic max-w-3xl">
                                &quot;{story.tagline}&quot;
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
                        <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-black text-cream font-serif mb-4 flex items-center gap-3">
                                <span className="w-2 h-7 bg-amber rounded-full inline-block"></span>
                                The Origin Story
                            </h2>
                            <p className="text-base sm:text-lg text-cream/90 leading-relaxed font-sans">
                                {story.fullStory.intro}
                            </p>
                        </div>

                        {/* Heritage & Craftsmanship */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm">
                                <h3 className="text-xl font-bold text-cream font-serif mb-3 flex items-center gap-2">
                                    <i className="fas fa-landmark text-amber"></i>
                                    Heritage &amp; Evolution
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {story.fullStory.heritage}
                                </p>
                            </div>

                            <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm">
                                <h3 className="text-xl font-bold text-cream font-serif mb-3 flex items-center gap-2">
                                    <i className="fas fa-vial text-amber"></i>
                                    Master Craftsmanship
                                </h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {story.fullStory.craftsmanship}
                                </p>
                            </div>
                        </div>

                        {/* Quote Block */}
                        <div className="bg-gradient-to-r from-amber to-amber-glow rounded-2xl p-8 text-base shadow-xl relative overflow-hidden">
                            <i className="fas fa-quote-right absolute -bottom-6 -right-6 text-9xl text-base/10 pointer-events-none"></i>
                            <p className="text-xl sm:text-2xl font-serif italic mb-4 leading-relaxed relative z-10 font-bold">
                                &quot;{story.quote.text}&quot;
                            </p>
                            <div className="text-sm font-bold uppercase tracking-wider text-base/80">
                                — {story.quote.author}
                            </div>
                        </div>

                        {/* Milestones Timeline */}
                        <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-sm">
                            <h2 className="text-2xl sm:text-3xl font-black text-cream font-serif mb-8 flex items-center gap-3">
                                <span className="w-2 h-7 bg-amber rounded-full inline-block"></span>
                                Historical Milestones
                            </h2>

                            <div className="relative border-l-2 border-amber/30 ml-4 space-y-8 pl-6">
                                {story.milestones.map((m, idx) => (
                                    <div key={idx} className="relative group transition-all duration-300">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber ring-4 ring-base group-hover:scale-150 group-hover:bg-amber-glow transition-all duration-300 shadow-md" />
                                        <div className="inline-block px-3 py-0.5 rounded-md bg-amber/15 text-amber font-bold text-xs mb-1 transition-transform group-hover:translate-x-1">
                                            {m.year}
                                        </div>
                                        <h4 className="text-lg font-bold text-cream font-serif mb-1 group-hover:text-amber transition-colors">
                                            {m.title}
                                        </h4>
                                        <p className="text-sm text-muted leading-relaxed">
                                            {m.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modern Legacy */}
                        <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-sm">
                            <h2 className="text-2xl font-bold text-cream font-serif mb-3">
                                Modern Legacy
                            </h2>
                            <p className="text-sm sm:text-base text-muted leading-relaxed">
                                {story.fullStory.legacy}
                            </p>
                        </div>
                    </div>

                    {/* Right Column Specs Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Quick Facts Card */}
                        <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-cream font-serif mb-4 pb-3 border-b border-white/10 flex items-center gap-2">
                                <i className="fas fa-certificate text-amber"></i>
                                Brand Specifications
                            </h3>

                            <dl className="space-y-4 text-xs sm:text-sm">
                                <div>
                                    <dt className="text-muted uppercase font-semibold text-[0.7rem] tracking-wider">Established</dt>
                                    <dd className="font-bold text-cream mt-0.5">{story.foundingYear}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted uppercase font-semibold text-[0.7rem] tracking-wider">Origin</dt>
                                    <dd className="font-bold text-cream mt-0.5">{story.origin}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted uppercase font-semibold text-[0.7rem] tracking-wider">Master Craftsman</dt>
                                    <dd className="font-bold text-cream mt-0.5">{story.mastermind}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted uppercase font-semibold text-[0.7rem] tracking-wider">Signature Bottle</dt>
                                    <dd className="font-bold text-amber mt-0.5">{story.signatureProduct}</dd>
                                </div>
                            </dl>

                            {/* Explore Other Brands */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <h4 className="text-xs uppercase font-bold text-muted tracking-wider mb-4">
                                    Explore Other Stories
                                </h4>
                                <div className="space-y-3">
                                    {otherStories.map((other) => (
                                        <Link
                                            key={other.id}
                                            href={`/brands/${other.slug}`}
                                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group focus-visible:ring-2 focus-visible:ring-amber"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                                                <span className="text-xs font-bold text-amber">
                                                    {other.initials}
                                                </span>
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-xs font-bold text-cream group-hover:text-amber transition-colors truncate">
                                                    {other.name}
                                                </div>
                                                <div className="text-[0.7rem] text-muted">
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
