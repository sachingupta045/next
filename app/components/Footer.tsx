"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
    footerBrand,
    footerQuickLinks,
    footerMenuLinks,
    footerContactInfo,
    footerSocialLinks,
    footerLegalLinks,
} from "../data/footer";

const Footer = () => {
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="bg-surface text-muted pt-16 lg:pt-20 pb-0 relative font-sans border-t border-white/5">
            <div className="max-w-[1320px] mx-auto px-4">
                {/* 4 Column Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
                    {/* Col 1: Brand Info & Social */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block focus-visible:ring-2 focus-visible:ring-sky-400 rounded">
                            <span className="font-serif text-3xl font-black text-cream tracking-tight">
                                Drink<span className="text-sky-400">it.</span>
                            </span>
                        </Link>

                        <p className="text-muted text-[0.86rem] leading-[1.8] mt-3.5 max-w-sm">
                            Independent liquor pricing, flavor profiles, and state comparison guide for spirits enthusiasts across India. Drink responsibly (25+).
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2.5 mt-6">
                            {footerSocialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-9 h-9 rounded-[9px] bg-white/[0.06] flex items-center justify-center text-muted text-sm hover:bg-sky-500 hover:text-white hover:-translate-y-1 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sky-400"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-cream text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-sky-400">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {footerQuickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-muted hover:text-sky-300 hover:translate-x-1.5 text-[0.86rem] transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                                    >
                                        <i className="fas fa-chevron-right text-[0.68rem] text-sky-400 group-hover:text-sky-300"></i>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Spirits Catalog */}
                    <div className="lg:col-span-2">
                        <h3 className="text-cream text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-sky-400">
                            Spirits &amp; Wine
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {footerMenuLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-muted hover:text-sky-300 hover:translate-x-1.5 text-[0.86rem] transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                                    >
                                        <i className="fas fa-chevron-right text-[0.68rem] text-sky-400 group-hover:text-sky-300"></i>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Get In Touch */}
                    <div className="lg:col-span-4">
                        <h3 className="text-cream text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-sky-400">
                            Community &amp; Sommelier
                        </h3>
                        <div className="space-y-4">
                            {footerContactInfo.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <div className="w-[34px] h-[34px] rounded-[7px] bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0 text-sm mt-0.5">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <strong className="text-cream/70 font-semibold text-[0.77rem] block leading-tight">
                                            {item.title}
                                        </strong>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="text-muted hover:text-sky-300 text-[0.83rem] leading-relaxed transition-colors block focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span className="text-muted text-[0.83rem] leading-relaxed block">
                                                {item.text}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Separator & Copyright */}
                <div className="border-t border-white/[0.06] py-5 mt-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                        {/* Copyright */}
                        <p className="text-muted/60 text-[0.8rem] m-0 leading-relaxed">
                            © {currentYear}{" "}
                            <span className="text-sky-400 font-semibold">Drinkit India</span>. All Rights Reserved. For legal drinking age only (25+).
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4 text-muted/60 text-[0.8rem]">
                            {footerLegalLinks.map((legal) => (
                                <a
                                    key={legal.label}
                                    href={legal.href}
                                    className="hover:text-sky-300 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                                >
                                    {legal.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Floating Button */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed bottom-6 right-6 w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 z-40 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                    }`}
            >
                <i className="fas fa-chevron-up text-white"></i>
            </button>
        </footer>
    );
};

export default Footer;
