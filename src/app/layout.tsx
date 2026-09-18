import { SettingsProvider } from '@/context/SettingsContext';
import { LanguageProvider } from '@/context/LanguageContext';
import type { Metadata } from "next";
import { Playfair_Display, Inter, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrderProvider } from "@/context/OrderContext";
import OrderModal from "@/components/OrderModal";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Asia Wok Garden - Darmstadt",
  description: "Authentic Asian cuisine in Darmstadt. Order online for delivery or pickup. Specializing in wok dishes, sushi, and fresh salads.",
  openGraph: {
    title: 'Asia Wok Garden - Darmstadt',
    description: 'Authentic Asian cuisine in Darmstadt. Order online for delivery or pickup.',
    url: 'https://asia-wok-garden-darmstadt.de',
    siteName: 'Asia Wok Garden',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/p/AF1QipN38XQ2w58yX1w2y3X_58y3X58y3X58y3X58y3', // Placeholder for actual image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'de_DE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable} ${jakarta.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body-md text-body-md antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
        
        <LanguageProvider><SettingsProvider><OrderProvider>
          <Header />
          {children}
          <OrderModal />
          <Footer />
        </OrderProvider></SettingsProvider></LanguageProvider>
        
      </body>
    </html>
  );
}
