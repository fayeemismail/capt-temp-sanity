// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Footer from "@/components/home/Footer";
import { manrope, outfit, poppins } from "@/public/assets/css/font";
import { getOrganizationSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fontcreativestudio.com"),

  title: {
    default: "Font Creative Studio",
    template: "%s | Font Creative Studio",
  },

  description:
    "Font Creative Studio is an advertising and branding company founded in 2019, specializing in brand identity, social media marketing, and website development.",

  keywords: [
    "branding company",
    "advertising agency",
    "brand identity design",
    "social media marketing",
    "website development",
    "creative studio",
  ],

  openGraph: {
    title: "Font Creative Studio",
    description:
      "We help businesses build powerful brands through strategy, creativity, and customer-centric insights.",
    url: "https://www.fontcreativestudio.com",
    siteName: "Font Creative Studio",
    images: [
      {
        url: "https://cdn.sanity.io/images/offgjs63/production/17f48c935935f36a131e160678e5e49b12b1f11f-2174x471.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Font Creative Studio",
    description:
      "Brand positioning, marketing, and creative solutions for modern businesses.",
    images: [
      "https://cdn.sanity.io/images/offgjs63/production/17f48c935935f36a131e160678e5e49b12b1f11f-2174x471.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children, }: {  children: React.ReactNode;}) {

   const schema = getOrganizationSchema();


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} ${outfit.className} ${manrope.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
          <Navbar />

          <div className="app-layout flex flex-1">
            <LeftSidebar className="hidden lg:flex" />
            
            <main className="content flex-1 bg-black">
              {children}
              <Footer />
            </main>
            
            <RightSidebar className="hidden lg:flex" />
          </div>
        </div>
      </body>
    </html>
  );
}