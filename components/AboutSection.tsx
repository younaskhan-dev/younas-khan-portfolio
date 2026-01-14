"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Code } from "lucide-react";

const experiences = [
  {
    icon: Briefcase,
    title: "Junior MERN Stack Developer",
    company: "Tech Solutions.",
    period: "2025- Present",
  },
  {
    icon: Briefcase,
    title: "Junior Web Designer",
    company: "Digital Agency",
    period: "2024 -2025 ",
  },
  {
    icon: GraduationCap,
    title: "BS Software Engineering",
    company: "Abasyn University peshawar",
    period: "2024 - progress",
  },
];

const highlights = [
  { icon: Code, label: "Clean Code", description: "Writing maintainable code" },
  { icon: Award, label: "Best Practices", description: "Industry standards" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">About Me</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Know Me Better
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Photo & Decorations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative Ring */}
              <div className="absolute inset-0 rounded-3xl gradient-primary opacity-20 blur-2xl scale-110" />

              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-lg">
                <div className="aspect-4/5 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">

                  <img src="/younas_khan.jpg" alt="younas khan" className="relative rounded shadow-4xl w-full max-w-md mx-auto transform group-hover:scale-105 transition-transform duration-300"></img>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-lg"
              >
                <div className="text-3xl font-heading font-bold gradient-text">1+</div>
                <div className="text-xs text-muted-foreground">Year Exp.</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Web Designer & <span className="gradient-text">MERN Specialist</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate MERN Stack Developer with over  1 years of experience in building
              modern web applications. I specialize in the MERN stack (MongoDB, Express.js, React, Node.js)
              and love creating seamless user experiences.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              My journey in tech started with a curiosity for how things work on the web.
              Today, I help businesses transform their ideas into powerful digital solutions
              that drive growth and engagement.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3  rounded-xl bg-card border border-border p-1"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground  mx-1.5 ml-0 mr-2">{item.label}</div>
                    <div className="text-xs text-muted-foreground  mx-1.5 ml-0 mr-2.5">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience Timeline */}
            <div className="space-y-4 pt-6">
              <h4 className="font-heading font-semibold text-foreground">Experience & Education</h4>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-card transition-colors"
                >
                  <div className="p-2 rounded-lg gradient-primary">
                    <exp.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{exp.title}</div>
                    <div className="text-sm text-muted-foreground">{exp.company}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{exp.period}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
