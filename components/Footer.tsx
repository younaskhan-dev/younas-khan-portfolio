"use client";
import { motion } from "framer-motion";
import { ArrowUp, Heart, Code2 } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 p-14 border-t border-border">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Code2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg text-foreground">
              Younas Khan
            </span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© 2026 Made with</span>
            <Heart
              className="w-5 h-5 transition-all duration-300 cursor-pointer 
             text-slate-400 hover:text-red-500 hover:fill-red-500 
             active:scale-125"
            />
            <span>by Younas Khan</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl gradient-primary text-primary-foreground shadow-glow"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}



