"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import CoreConcept from "@/components/CoreConcept";
import Mechanisms from "@/components/Mechanisms";
import AIOptimization from "@/components/AIOptimization";
import Performance from "@/components/Performance";
import Timeline from "@/components/Timeline";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-brand-space min-h-screen text-white overflow-hidden">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <CoreConcept />
      <Mechanisms />
      <AIOptimization />
      <Performance />
      <Timeline />
      <FooterCTA />
    </main>
  );
}
