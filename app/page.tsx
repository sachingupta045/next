import BrandHistorySlider from "./sections/BrandHistorySlider";
import BrandSpotlight from "./sections/BrandSpotlight";
import Category from "./sections/Category";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Marquee from "./sections/Marquee";
import Products from "./sections/Products";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Category />
      <Products />
      <BrandSpotlight />
      <BrandHistorySlider />
      <Footer />
    </>
  );
}
