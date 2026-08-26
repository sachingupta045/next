import Link from 'next/link';

const BrandSpotlightNew = () => {
  return (
    <div className="bg-surface/85 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-xl sm:text-2xl text-cream font-serif">
          Brand <span className="font-bold text-amber">Spotlight</span>
        </h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-amber/30 via-white/5 to-transparent" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5">
        {[
          { name: "Indri", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
          { name: "Dalmore", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
          { name: "Glenfiddich", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
          { name: "Paul John", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
          { name: "Laphroaig", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
          { name: "Amrut", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
          { name: "Macallan", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" },
          { name: "Talisker", image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=300&q=80" },
          { name: "Château Margaux", image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=300&q=80" },
          { name: "BrewDog", image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=300&q=80" },
          { name: "Bombay Sapphire", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80" },
          { name: "Jack Daniels", image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=300&q=80" }
        ].map((brand, idx) => (
          <Link
            key={idx}
            href={`/brand/${encodeURIComponent(brand.name)}`}
            className="group flex flex-col items-center cursor-pointer text-center focus-visible:ring-2 focus-visible:ring-amber rounded-2xl"
          >
            <div className="w-full aspect-square bg-base/70 rounded-2xl border border-white/10 p-3 flex items-center justify-center group-hover:shadow-[0_0_24px_rgba(193,122,61,0.2)] group-hover:scale-105 group-hover:border-amber/40 transition-all duration-300 overflow-hidden relative">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-cream mt-2 line-clamp-1 group-hover:text-amber transition-colors">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BrandSpotlightNew;