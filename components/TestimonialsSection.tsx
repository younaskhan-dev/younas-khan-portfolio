"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Ahmad Raza",
    // role: "CEO at TechStart",
    content: "Younas delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and problem-solving skills are remarkable. Highly recommend!",
    avatar: "AR",
  },
  {
    name: "Kamran Siddiqui",
    // role: "Product Manager at InnovateCo",
    content: "Working with Younas was a pleasure. He understood our requirements perfectly and delivered a beautiful, functional application on time. Great communication throughout!",
    avatar: "KS",
  },
  {
    name: "Sadia Iqbal",
    // role: "Founder of DesignHub",
    content: "Younas transformed our vision into reality. His expertise in MERN-stack development and UI/UX made our platform stand out. We'll definitely work together again!",
    avatar: "SI",
  },
  {
    name: "shahid jan",
    // role: "CTO at DataFlow",
    content: "The quality of code and architecture that Younas delivered was top-notch. He's not just a developer but a true problem solver who thinks about scalability.",
    avatar: "SJ",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Client Reviews
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <Quote className="w-5 h-5 text-primary-foreground" />
            </div>

            {/* Card */}
            <div className="bg-card rounded-3xl border border-border p-8 lg:p-12 text-center">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Content */}
                <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Avatar & Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    {/* <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                {...({ variant: "outline", size: "icon", onClick: prev, className: "rounded-full" } as any)}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                      ? "w-8 gradient-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                  />
                ))}
              </div>
              <Button
                {...({ variant: "outline", size: "icon", onClick: next, className: "rounded-full" } as any)}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
