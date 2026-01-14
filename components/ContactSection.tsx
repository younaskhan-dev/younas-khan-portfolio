"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "younaskhan1870@gmail.com",
    href: "mailto:younaskhan1870@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+923141506230",
    href: "tel:+923141506230",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Peshawar, Pakistan",
    href: "https://www.google.com/maps?q=Peshawar+Pakistan",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/younaskhan-dev", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/younaskhanofficial/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:younaskhan1870@gmail.com", label: "Email" },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      console.log("this is result:", result)
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    } else {
      console.log(result)
      toast({
        title: "Failed to send",
        description: result.message || "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 p-14 lg:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-bold text-lg uppercase tracking-wider">Contact</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Have a project in mind? Let's work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">
                Let's talk about your project
              </h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl gradient-primary shadow-glow">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-card border border-border hover:border-primary hover:shadow-glow transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 rounded-2xl bg-card border border-border">

              {/* HONEYPOT FIELD */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input id="name" name="name" placeholder="younas khan" required className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Your Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="younas@example.com" required className="h-12 rounded-xl" />
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="Project Inquiry" required className="h-12 rounded-xl" />
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea id="message" name="message" placeholder="Tell me about your project..." required className="min-h-37.5 rounded-xl resize-none" />
              </div>


              <Button {...({ type: "submit", variant: "hero", size: "lg", className: "w-full", disabled: isSubmitting } as any)}>
                {isSubmitting ? "Sending..." : <><Send className="w-5 h-5" /> Send Message</>}
              </Button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
