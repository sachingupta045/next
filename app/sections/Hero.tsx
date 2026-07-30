import React from "react";

const Hero = () => {
    return (
        <section id="hero" className="relative bg-[#fff8f0] dark:bg-slate-950 min-h-[92vh] flex items-center overflow-hidden py-12 lg:py-0">
            {/* Background Decorative Circles */}
            <div className="absolute -top-24 -right-20 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(232,40,26,0.08),transparent_70%)] animate-pulse pointer-events-none" />
            <div className="absolute -bottom-12 left-[8%] w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(246,166,35,0.1),transparent_70%)] animate-pulse pointer-events-none" />

            {/* Large Background Watermark Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-black font-serif text-black/[0.04] dark:text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
                FOOD
            </div>

            <div className="max-w-[1320px] mx-auto px-3 sm:px-4 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[88vh] py-8">

                    {/* Left Column - Content */}
                    <div className="lg:col-span-6 flex flex-col items-start">
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 rounded-full px-4 py-1.5 shadow-lg shadow-black/5 border border-slate-100 dark:border-slate-800 mb-6">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white text-xs shadow-sm">
                                <i className="fas fa-star text-[10px]"></i>
                            </div>
                            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                #1 Rated Fast Food Restaurant in New York
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-5 tracking-tight">
                            Delicious{" "}
                            <span className="relative inline-block text-red-600 dark:text-red-500 after:content-[''] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-2.5 after:bg-red-500/20 after:rounded-md after:-z-10">
                                Fast Food
                            </span>
                            <br />
                            for Every Moment
                        </h1>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                            Experience bold flavors crafted from premium ingredients. From crispy burgers to gourmet pizzas - every bite is an adventure worth savoring.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center gap-4 mb-2">
                            <a
                                href="#menu"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/30 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5"
                            >
                                <i className="fas fa-utensils text-xs"></i>
                                <span>Explore Menu</span>
                            </a>

                            {/* Video Trigger */}
                            <a
                                href="https://www.youtube.com/watch?v=RXv_uIN6e-Y"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full text-slate-900 dark:text-white font-semibold text-sm hover:text-red-600 dark:hover:text-red-500 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg shadow-black/10 text-red-600 dark:text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:scale-110 transition-all shrink-0">
                                    <i className="fas fa-play text-xs ml-0.5"></i>
                                </div>
                                <span>Watch Our Story</span>
                            </a>
                        </div>

                        {/* Hero Stats */}
                        <div className="flex items-center gap-4 sm:gap-6 flex-wrap mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
                            {/* Stat 1 */}
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white leading-none">
                                    850<em className="text-red-600 dark:text-red-500 not-italic">+</em>
                                </span>
                                <small className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                                    Happy Customers
                                </small>
                            </div>

                            <div className="w-px h-9 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                            {/* Stat 2 */}
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white leading-none">
                                    120<em className="text-red-600 dark:text-red-500 not-italic">+</em>
                                </span>
                                <small className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                                    Menu Items
                                </small>
                            </div>

                            <div className="w-px h-9 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                            {/* Stat 3 */}
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white leading-none">
                                    15<em className="text-red-600 dark:text-red-500 not-italic">+</em>
                                </span>
                                <small className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                                    Expert Chefs
                                </small>
                            </div>

                            <div className="w-px h-9 bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

                            {/* Stat 4 */}
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white leading-none">
                                    12<em className="text-red-600 dark:text-red-500 not-italic">yr</em>
                                </span>
                                <small className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                                    Experience
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image & Floating Cards */}
                    <div className="lg:col-span-6 relative flex justify-center">
                        <div className="relative w-full max-w-[480px]">

                            {/* Hero Main Circle */}
                            <div className="w-72 h-72 sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full bg-gradient-to-br from-amber-50 to-orange-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center mx-auto shadow-2xl shadow-red-500/10 p-3 sm:p-5 border-4 border-white dark:border-slate-800">
                                <img
                                    src="/img/banner-img.jpg"
                                    alt="Burger"
                                    className="w-full h-full object-cover rounded-full shadow-inner"
                                />
                            </div>

                            {/* Floating Card 1: Hot Deal */}
                            <div className="absolute top-6 -left-2 sm:-left-6 bg-white dark:bg-slate-900 rounded-2xl p-4 max-[400px]:p-[34px] shadow-xl shadow-black/10 border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                                <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center text-sm shrink-0">
                                    <i className="fas fa-fire"></i>
                                </div>
                                <div>
                                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block leading-tight">
                                        Hot Deal
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                                        30% off today
                                    </span>
                                </div>
                            </div>

                            {/* Floating Card 2: Rating */}
                            <div className="absolute bottom-6 -right-2 sm:-right-4 bg-white dark:bg-slate-900 rounded-2xl p-4 max-[400px]:p-[34px] shadow-xl shadow-black/10 border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce [animation-duration:4.5s]">
                                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-sm shrink-0">
                                    <i className="fas fa-star"></i>
                                </div>
                                <div>
                                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block leading-tight">
                                        4.9/5
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                                        2k+ reviews
                                    </span>
                                </div>
                            </div>

                            {/* Floating Card 3: Fast Delivery */}
                            <div className="absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-2xl p-4 max-[400px]:p-[34px] shadow-xl shadow-black/10 border border-slate-100 dark:border-slate-800 flex items-center gap-3 animate-bounce [animation-duration:5s]">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-sm shrink-0">
                                    <i className="fas fa-clock"></i>
                                </div>
                                <div>
                                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block leading-tight">
                                        20 min
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                                        Fast delivery
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;