"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Concept", href: "#concept" },
    { name: "Mechanisms", href: "#mechanisms" },
    { name: "AI Brain", href: "#ai" },
    { name: "Performance", href: "#performance" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
            isScrolled ? "glass" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Rocket className="w-6 h-6 text-brand-blue group-hover:text-brand-violet transition-colors" />
            <span className="font-display font-bold text-lg tracking-wider text-white">
              NOVA APEX
            </span>
            <span className="font-display font-medium text-xs tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-full ml-2">
              AI
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-violet transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
            <button className="px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Initialize
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-4"
          >
            <div className="glass-dark rounded-2xl flex flex-col p-4 shadow-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="p-4 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <button className="mt-4 p-4 text-base font-medium rounded-xl bg-white text-black text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Initialize Sequence
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
