import Hero from "./sections/Hero";
import Category from "./sections/Category";
import StatsMarquee from "./sections/StatsMarquee";
import BudgetTiers from "./sections/BudgetTiers";
import TrendingLineup from "./sections/TrendingLineup";
import QuickCompare from "./sections/QuickCompare";
import BrandSpotlight from "./sections/BrandSpotlight";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* 1. Interactive Hero with Search, State Price Scope & 4 Action Tiles */}
      <Hero />

      {/* 2. Quick Category Icon Row (Single Malts, Scotch, Gin, Beer, Vodka, Rum, etc.) */}
      <Category />

      {/* 2b. Animated Stats Marquee Strip */}
      <StatsMarquee />

      {/* 3. Budget & Occasion Explorer (Under ₹1,000, Weekend Parties, Luxury Single Malts) */}
      <BudgetTiers />

      {/* 4. The Pour Lineup (India's Top Trending Spirits Leaderboard) */}
      <TrendingLineup />

      {/* 5. Interactive 2-Bottle Side-by-Side Comparison Spotlight */}
      <QuickCompare />

      {/* 6. Brand Spotlight (Distillery & Iconic Houses) */}
      <BrandSpotlight />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}
