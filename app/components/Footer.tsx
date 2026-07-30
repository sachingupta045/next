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
        <footer className="bg-[#1a1a1a] text-slate-300 pt-16 lg:pt-20 pb-0 relative font-sans border-t border-slate-800">
            <div className="max-w-[1320px] mx-auto px-4">
                {/* 4 Column Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
                    {/* Col 1: Brand Info & Social */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-3xl font-black text-white tracking-tight">
                                {footerBrand.prefix}
                                <span className="text-[#e8281a]">{footerBrand.highlight}</span>
                            </span>
                        </Link>

                        <p className="text-[#777] text-[0.86rem] leading-[1.8] mt-3.5 max-w-sm">
                            {footerBrand.description}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-2.5 mt-6">
                            {footerSocialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-9 h-9 rounded-[9px] bg-white/[0.06] flex items-center justify-center text-[#777] text-sm hover:bg-[#e8281a] hover:text-white hover:-translate-y-1 transition-all duration-300"
                                >
                                    <i className={social.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#e8281a]">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {footerQuickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-[#777] hover:text-[#f6a623] hover:translate-x-1.5 text-[0.86rem] transition-all duration-300 group"
                                    >
                                        <i className="fas fa-chevron-right text-[0.68rem] text-[#e8281a] group-hover:text-[#f6a623]"></i>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Our Menu */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#e8281a]">
                            Our Menu
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {footerMenuLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="inline-flex items-center gap-2 text-[#777] hover:text-[#f6a623] hover:translate-x-1.5 text-[0.86rem] transition-all duration-300 group"
                                    >
                                        <i className="fas fa-chevron-right text-[0.68rem] text-[#e8281a] group-hover:text-[#f6a623]"></i>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4: Get In Touch */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white text-[0.95rem] font-bold mb-5 pb-2.5 relative inline-block font-sans after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#e8281a]">
                            Get In Touch
                        </h3>
                        <div className="space-y-4">
                            {footerContactInfo.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <div className="w-[34px] h-[34px] rounded-[7px] bg-[#e8281a]/15 text-[#e8281a] flex items-center justify-center shrink-0 text-sm mt-0.5">
                                        <i className={item.icon}></i>
                                    </div>
                                    <div>
                                        <strong className="text-[#bbb] font-semibold text-[0.77rem] block leading-tight">
                                            {item.title}
                                        </strong>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="text-[#777] hover:text-[#f6a623] text-[0.83rem] leading-relaxed transition-colors block"
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span className="text-[#777] text-[0.83rem] leading-relaxed block">
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
                        <p className="text-[#555] text-[0.8rem] m-0 leading-relaxed">
                            © {currentYear}{" "}
                            <span className="text-[#e8281a] font-semibold">Sarab Restaurant</span>. All Rights Reserved by{" "}
                            <a href="#" className="text-[#2d6a4f] font-medium hover:underline">
                                SgSolutions
                            </a>. Made with ❤️ Distributed by{" "}
                            <a href="#" className="text-[#2d6a4f] font-medium hover:underline">
                                SgSolutions
                            </a>
                        </p>

                        {/* Legal Links */}
                        <div className="flex items-center gap-4 text-[#555] text-[0.8rem]">
                            {footerLegalLinks.map((legal) => (
                                <a
                                    key={legal.label}
                                    href={legal.href}
                                    className="hover:text-[#f6a623] transition-colors"
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
                className={`fixed bottom-6 right-6 w-11 h-11 rounded-xl bg-[#e8281a] text-white flex items-center justify-center shadow-lg shadow-red-600/30 hover:scale-110 active:scale-95 transition-all duration-300 z-40 cursor-pointer ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                    }`}
            >
                <i className="fas fa-chevron-up text-base"></i>
            </button>
        </footer>
    );
};

export default Footer;
