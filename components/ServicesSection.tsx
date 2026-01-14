"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Palette, Database, Plug, Smartphone, Zap } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Building responsive, fast, and scalable web applications using modern technologies and best practices.",
    features: ["React & Next.js", "Performance Optimized", "SEO Friendly"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating beautiful, intuitive interfaces that provide exceptional user experiences across all devices.",
    features: ["User Research", "Wireframing", "Prototyping"],
  },
  {
    icon: Database,
    title: "Full Stack Development",
    description: "End-to-end development from database design to frontend implementation with seamless integration.",
    features: ["MERN Stack", "APIs & SQL", "vercel Deployment"],
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Connecting your applications with third-party services and creating custom API solutions.",
    features: ["APIs handling", "Social Auth", "Custom APIs"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Ensuring your applications look and work perfectly on all devices and screen sizes.",
    features: ["Mobile First", "Cross Browser", "Accessibility"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Making your applications lightning fast with advanced optimization techniques.",
    features: ["Code Splitting", "Caching", "CDN Setup"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-glow"
      >
        <service.icon className="w-7 h-7 text-primary-foreground" />
      </motion.div>

      {/* Content */}
      <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-5">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 via-transparent to-accent/5" />
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">Services</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            What I Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Comprehensive development services to help bring your ideas to life
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
