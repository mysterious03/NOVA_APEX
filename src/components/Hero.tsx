"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThrusterCore from "./ThrusterCore";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-space"
    >
      {/* 3D Thruster Background */}
      <ThrusterCore />

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-space/50 to-brand-space pointer-events-none z-0" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl pt-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            NOVA APEX <span className="text-gradient">AI</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="mt-6 space-y-4"
        >
          <p className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto">
            Intelligent Self-Optimising Electrothermal Propulsion System
          </p>
          <p className="text-sm md:text-base font-mono text-brand-blue/80 tracking-widest uppercase">
            STATUS: SYSTEM READY • DIAGNOSTICS: NOMINAL
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
          Scroll to Experience
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-brand-blue drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
