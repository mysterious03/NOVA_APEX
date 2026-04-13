"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Calculate opacities for the sequences
  const problemOpacity = useTransform(scrollYProgress, [0, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const problemY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  const solutionOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8, 1], [0, 1, 1, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.45, 0.6], [0.8, 1]);

  return (
    <section ref={containerRef} id="concept" className="relative h-[200vh] w-full bg-brand-space">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Decorative Grid Line */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Problem Statement */}
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-3xl md:text-5xl lg:text-7xl font-display font-bold text-white/50 tracking-tight max-w-5xl leading-tight">
            Modern propulsion is <span className="text-white">inefficient</span>,{" "}
            <span className="text-white">static</span>, and{" "}
            <span className="text-brand-orange drop-shadow-[0_0_15px_rgba(255,77,0,0.5)]">wasteful</span>.
          </p>
        </motion.div>

        {/* Solution Statement */}
        <motion.div
          style={{ opacity: solutionOpacity, scale: solutionScale }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            What if a thruster could <br />
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(160,32,240,0.6)]">learn?</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
