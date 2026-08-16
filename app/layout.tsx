// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Younas Khan | Full Stack Developer — MERN & .NET",
  description:
    "Younas Khan - Full Stack Developer specializing in MERN Stack and .NET (ASP.NET Core, EF Core). Building modern web applications with exceptional user experiences.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    ".NET",
    "ASP.NET Core",
    "React",
    "Node.js",
    "Entity Framework Core",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Younas Khan" }],
  metadataBase: new URL("https://younas-khan-portfolio.vercel.app"),
  alternates: {
    canonical: "https://younas-khan-portfolio.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Younas Khan | Full Stack Developer — MERN & .NET",
    description:
      "Full Stack Developer specializing in MERN Stack and .NET. Building modern, production-ready web applications.",
    type: "website",
    images: [
      {
        url: "homepage.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Younas Khan | Full Stack Developer — MERN & .NET",
    description:
      "Full Stack Developer specializing in MERN Stack and .NET. Building modern, production-ready web applications.",
    images: ["homepage.png"],
  },
  icons: {
    icon: "favicon.ico",
    apple: "apple-touch-icon.png",
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
