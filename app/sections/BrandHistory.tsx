"use client";

import React from "react";
import { AnimatedSection } from "../components/motion/AnimatedSection";
import { StaggerContainer } from "../components/motion/StaggerContainer";
import { StaggerItem } from "../components/motion/StaggerItem";

interface Chef {
  id: number;
  name: string;
  role: string;
  experience: string;
  image: string;
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
}

const chefsData: Chef[] = [
  {
    id: 1,
    name: "Alice Mortal",
    role: "Master Sommelier",
    experience: "12 years experience",
    image: "/img/chefs/1.jpg",
    socials: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Michael Corn",
    role: "Distillery Craftsman",
    experience: "8 years experience",
    image: "/img/chefs/2.jpg",
    socials: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Faz Chowdel",
    role: "Pairing Specialist",
    experience: "10 years experience",
    image: "/img/chefs/3.jpg",
    socials: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "William Latnum",
    role: "Executive Cellarer",
    experience: "9 years experience",
    image: "/img/chefs/4.jpg",
    socials: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

export const BrandHistory: React.FC = () => {
  return (
    <section id="chefs" className="py-20 lg:py-24 bg-transparent relative transition-colors">
      {/* Decorative Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber/20 to-transparent" />

      <div className="max-w-[1320px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 lg:mb-14">
          <span className="block text-xs uppercase font-bold tracking-widest text-amber mb-2 font-sans">
            Our Artisans &amp; Sommeliers
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cream leading-tight mb-3 font-serif">
            Curated by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-amber-glow">Master Craftsmen</span>
          </h2>
          <div className="w-[58px] h-1 rounded-full bg-gradient-to-r from-amber to-amber-glow mx-auto" />
        </AnimatedSection>

        {/* Chef Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {chefsData.map((chef) => (
            <StaggerItem key={chef.id}>
              <div className="chcard group bg-surface/85 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:-translate-y-2 hover:border-amber/40 hover:shadow-[0_0_30px_rgba(193,122,61,0.2)] transition-all duration-400">
                {/* Chef Image & Social Container */}
                <div className="chimg relative overflow-hidden h-[268px] bg-base/80">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Social Overlay Bar */}
                  <div className="chsoc absolute -bottom-14 group-hover:bottom-0 left-0 right-0 flex justify-center gap-2 py-3 px-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-400">
                    <a
                      href={chef.socials.instagram}
                      aria-label={`${chef.name}'s Instagram`}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-amber hover:text-base backdrop-blur-md flex items-center justify-center text-white text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber shadow-sm"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href={chef.socials.facebook}
                      aria-label={`${chef.name}'s Facebook`}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-amber hover:text-base backdrop-blur-md flex items-center justify-center text-white text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber shadow-sm"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href={chef.socials.twitter}
                      aria-label={`${chef.name}'s Twitter`}
                      className="w-9 h-9 rounded-full bg-white/15 hover:bg-amber hover:text-base backdrop-blur-md flex items-center justify-center text-white text-xs transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber shadow-sm"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>

                {/* Chef Info */}
                <div className="chbody p-5 text-center">
                  <h3 className="chnm text-[1.1rem] font-bold text-cream mb-0.5 font-serif group-hover:text-amber transition-colors">
                    {chef.name}
                  </h3>
                  <div className="chrole text-[0.8rem] text-amber-glow font-bold uppercase tracking-wider">
                    {chef.role}
                  </div>
                  <div className="chexp text-[0.76rem] text-muted font-medium mt-1">
                    {chef.experience}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default BrandHistory;
