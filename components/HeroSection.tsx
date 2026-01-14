"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-3xl floating-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Available for Freelance Projects</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Hi, I'm{" "}
            <span className="gradient-text">Younas Khan</span>
            <br />
            <span className="text-muted-foreground">MERN Stack Developer</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            Crafting exceptional digital experiences with modern web technologies.
            Specializing in <span className="text-primary font-medium">MERN Stack</span>,
            building scalable applications that make an impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button {...({ variant: "hero", size: "lg", asChild: true } as any)}>
              <a href="#contact">
                <Send className="w-5 h-5" />
                Hire Me
              </a>
            </Button>
            <Button {...({ variant: "outline", size: "lg", asChild: true } as any)}>
              <a href="#projects">View My work</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-4 max-w-xl mx-auto"
          >
            {[
              { value: "1+", label: "Years Experience" },
              { value: "06+", label: "Projects Completed" },
              { value: "04+", label: "Happy Clients" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
