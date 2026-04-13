"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="py-40 bg-black relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tighter mb-8 leading-tight">
            Built at Home.<br />
            Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-blue drop-shadow-[0_0_20px_rgba(160,32,240,0.5)]">AI.</span><br />
            Inspired by Rockets.
          </h2>
          
          <p className="text-xl md:text-2xl text-white/50 font-light mb-12">
            The next generation of propulsion systems starts here.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-medium text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300">
               Initialize Sequence <Rocket className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer details */}
      <div className="absolute bottom-8 left-0 right-0 text-center text-white/30 text-sm font-mono flex items-center justify-center gap-8">
         <span>v2.0 AI Edition</span>
         <span>|</span>
         <span>NOVA APEX SYSTEM</span>
      </div>
    </section>
  );
}
