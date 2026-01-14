// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Younas Khan | Full Stack Developer & MERN Specialist",
  description:
    "Younas Khan - Full Stack Developer specializing in MERN Stack, React, Node.js. Building modern web applications with exceptional user experiences.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "React",
    "Node.js",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Younas Khan" }],
  metadataBase: new URL("https://younaskhan.dev"),
  alternates: {
    canonical: "https://younaskhan.dev",
  },
  openGraph: {
    title: "Younas Khan | Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN Stack. Building modern web applications with exceptional user experiences.",
    type: "website",
    images: [
      {
        url: "homepage.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Younas Khan | Full Stack Developer",
    description:
      "Full Stack Developer specializing in MERN Stack. Building modern web applications.",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Providers>
          <Navbar />       {/* common Navbar */}
          {children}       {/* page-specific content */}
          <Footer />       {/* common Footer */}
        </Providers>
      </body>
    </html>
  );
}
