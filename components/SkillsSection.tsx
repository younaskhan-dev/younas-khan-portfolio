"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Front-End Development",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "javaScript", level: 75 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    title: "Back-End Development",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "SQL DataBase", level: 70 },
      { name: "APIs Handling", level: 82 },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 95 },
      { name: "vercel", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 80 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 88 },
      { name: "Team Leadership", level: 85 },
      { name: "Time Management", level: 90 },
      { name: "Adaptability", level: 92 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay, ease: "easeOut" }}
          className="h-full rounded-full gradient-primary relative"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">My Skills</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Technical Expertise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A comprehensive toolkit of technologies and skills I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full gradient-primary" />
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={catIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
