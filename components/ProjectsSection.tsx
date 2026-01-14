"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Textutils Web APP",
    description:
      "TextUtils is a powerful and user-friendly text processing web application built using React.js...",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80", // code editor with colorful syntax
    tags: ["React", "Node.js", "bootstrap", "express"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
  {
    title: "iNotebook – Secure Notes App",
    description:
      "iNotebook is a full-featured MERN stack application that allows users to securely create, edit, and organize notes...",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80", // person taking notes on laptop
    tags: ["React.js", "express.js", "mongoDB", "Node.js"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
  {
    title: "Newswave Web App",
    description:
      "NewsWave is a modern React.js news application that fetches real-time headlines...",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80", // news on tablet/phone
    tags: ["React", "Fetch API", "Express", "API Integration"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
  {
    title: "HelpDesk Modern UI",
    description:
      "HelpDesk is a clean and user-friendly help section design built with Bootstrap and custom CSS...",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80", // customer service/support team
    tags: ["Bootstrap", "custom css", "react.js", "Responsive"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
  {
    title: "MobiCart – Mobile E-Commerce UI",
    description:
      "MobiCart is a responsive frontend eCommerce website designed for mobile devices...",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80", // online shopping on mobile
    tags: ["Bootstrap", "custom css", "E-Commerce UI", "UI/UX"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
  {
    title: "Foodio – Food Ordering UI",
    description:
      "Foodio is a modern frontend food ordering website built with HTML, CSS, JS, and Bootstrap...",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80", // food/healthy meal
    tags: ["custom css", "UI/UX", "JavaScript", "Bootstrap"],
    liveUrl: "https://www.linkedin.com/in/younaskhanofficial/",
    githubUrl: "https://github.com/younaskhan-dev",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {/* Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-primary opacity-10" />

        {/* Folder Icon (only visible when image is loading/fails) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Folder className="w-16 h-16 text-primary/30" />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <motion.a
            href={project.liveUrl}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl gradient-primary text-primary-foreground shadow-lg"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl glass text-foreground shadow-lg"
          >
            <Github className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">My Work</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            A selection of projects that showcase my skills and passion for building great products
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            {...({
              variant: "outline",
              size: "lg",
              onClick: () =>
                window.open("https://www.linkedin.com/in/younaskhanofficial/"),
            } as any)}
          >
            View All Work on LinkedIn
          </Button>

        </motion.div>

      </div>
    </section>
  );
}
