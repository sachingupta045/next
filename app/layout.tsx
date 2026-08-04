import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { WishlistCompareProvider } from "./context/WishlistCompareContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <WishlistCompareProvider>
            <Header />
            {children}
          </WishlistCompareProvider>
        </CartProvider>
      </body>
    </html>
  );
}
