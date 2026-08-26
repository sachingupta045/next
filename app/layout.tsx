import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { WishlistCompareProvider } from "./context/WishlistCompareContext";
import { AmbientBackground } from "./components/AmbientBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarab | Fast Food & Drinkit Premium Beverages",
  description: "Order delicious fast food and explore premium wines, craft beers, and single malts with Drinkit — compare drinks side-by-side and discover perfect food pairings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-base text-cream relative">
        <CartProvider>
          <WishlistCompareProvider>
            {/* Ambient Animated Luxury Background with Illustrations & Light Auroras */}
            <AmbientBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </WishlistCompareProvider>
        </CartProvider>
      </body>
    </html>
  );
}
