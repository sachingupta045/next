"use client";

import React from "react";

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
    role: "Head Chef",
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
    role: "Grill Master",
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
    role: "Pastry Chef",
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
    role: "Pizza Artisan",
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
    <section id="chefs" className="py-20 lg:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-14" data-aos="fade-up">
          <span className="block font-['Dancing_Script',cursive] text-2xl font-bold text-[#e8281a] dark:text-red-500 mb-1">
            The Culinary Team
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1a1a] dark:text-white leading-tight mb-3 font-serif">
            Meet Our Expert <span className="text-[#e8281a] dark:text-red-500">Chefs</span>
          </h2>
          <div className="w-[58px] h-1 rounded-full bg-gradient-to-r from-[#e8281a] to-[#f6a623] mx-auto" />
        </div>

        {/* Chef Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {chefsData.map((chef, index) => (
            <div
              key={chef.id}
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="chcard group bg-white dark:bg-slate-900 rounded-[18px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-[0_4px_18px_rgba(0,0,0,0.07)] dark:shadow-none hover:-translate-y-[9px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-all duration-400">
                {/* Chef Image & Social Container */}
                <div className="chimg relative overflow-hidden h-[268px] bg-[#fdf5ed] dark:bg-slate-800">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Social Overlay Bar */}
                  <div className="chsoc absolute -bottom-14 group-hover:bottom-0 left-0 right-0 flex justify-center gap-2 py-3 px-3 bg-gradient-to-t from-black/70 to-transparent transition-all duration-400">
                    <a
                      href={chef.socials.instagram}
                      aria-label={`${chef.name}'s Instagram`}
                      className="w-[33px] h-[33px] rounded-full bg-white/20 hover:bg-[#e8281a] dark:hover:bg-red-600 backdrop-blur-sm flex items-center justify-center text-white text-xs transition-colors duration-300"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href={chef.socials.facebook}
                      aria-label={`${chef.name}'s Facebook`}
                      className="w-[33px] h-[33px] rounded-full bg-white/20 hover:bg-[#e8281a] dark:hover:bg-red-600 backdrop-blur-sm flex items-center justify-center text-white text-xs transition-colors duration-300"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href={chef.socials.twitter}
                      aria-label={`${chef.name}'s Twitter`}
                      className="w-[33px] h-[33px] rounded-full bg-white/20 hover:bg-[#e8281a] dark:hover:bg-red-600 backdrop-blur-sm flex items-center justify-center text-white text-xs transition-colors duration-300"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>

                {/* Chef Info */}
                <div className="chbody p-[18px] text-center">
                  <h3 className="chnm text-[1.05rem] font-bold text-[#1a1a1a] dark:text-white mb-0.5">
                    {chef.name}
                  </h3>
                  <div className="chrole text-[0.78rem] text-[#e8281a] dark:text-red-500 font-semibold uppercase tracking-[0.8px]">
                    {chef.role}
                  </div>
                  <div className="chexp text-[0.76rem] text-slate-500 dark:text-slate-400 font-normal mt-1">
                    {chef.experience}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandHistory;
