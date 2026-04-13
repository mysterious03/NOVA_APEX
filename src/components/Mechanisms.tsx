"use client";

import { useRef } from "react";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const mechanisms = [
  {
    id: "vortex",
    title: "Tangential Vortex Intake",
    desc: "Air spins inside, centrifugally compressing the central column. Free density increase, no moving parts. Efficiency gain: +8%.",
    color: "from-brand-blue to-teal-400",
  },
  {
    id: "heat",
    title: "Regenerative Copper Heat Coil",
    desc: "All intake air travels through a coil and arrives pre-heated to 80-120°C. Reduces heating energy by 30-40%. Efficiency gain: +12%.",
    color: "from-brand-orange to-red-500",
  },
  {
    id: "capacitor",
    title: "Capacitor-Bank Electrothermal Burst",
    desc: "Five 450V capacitors discharge 1,000 W instantaneously. Heats air to 300-400°C. Efficiency gain: +20%.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: "resonance",
    title: "Helmholtz Resonant Pulse",
    desc: "Pulses fired at the chamber's natural resonant frequency cause pressure wave reinforcement. Efficiency gain: +8%.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "nozzle",
    title: "De Laval Convergent-Divergent Nozzle",
    desc: "The most critical component. Accelerates exit velocity to 400-600 m/s past Mach 1. Efficiency gain: +25%.",
    color: "from-brand-violet to-purple-600",
  },
  {
    id: "ion",
    title: "Three-Stage Ion Wind",
    desc: "Three corona wire rings at 1 kV, 3 kV, 5 kV accelerate ionised exhaust in stages. Efficiency gain: +5%.",
    color: "from-cyan-400 to-blue-600",
  },
  {
    id: "cluster",
    title: "Triple Cluster Staggered Firing",
    desc: "Three NOVA units firing 120 degrees apart in the cycle. Combined output: 20-45 N.",
    color: "from-gray-300 to-white",
  },
];

export default function Mechanisms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create a timeline that animates the sequence of cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${mechanisms.length * 100}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    const cards = gsap.utils.toArray(".mechanism-card");

    cards.forEach((card: any, i) => {
      if (i > 0) {
        // Bring in next card
        tl.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "+=0.2" // slight delay before next comes in
        );
      }
      
      // If there is a next card, fade this one out
      if (i < cards.length - 1) {
        tl.to(
          card,
          { opacity: 0, y: -50, scale: 0.9, duration: 1 },
          "+=0.5" // stay for a bit, then fade out
        );
      }
    });
    
    // final pause at the end
    tl.to({}, { duration: 1 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="mechanisms" className="h-screen w-full bg-brand-space relative overflow-hidden flex items-center justify-center">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-violet blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-12 relative z-10 pt-20">
        
        {/* Left: Fixed Description */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <h2 className="text-sm font-mono text-brand-blue tracking-widest uppercase mb-4">
            Mechanical Foundation
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            7 Stages of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
              Evolution
            </span>
          </h3>
          <p className="text-white/60 mb-8 max-w-sm mx-auto md:mx-0">
            Each physical mechanism upgrades the system's thermodynamics, acting as a foundation for the AI engine.
          </p>
          <div className="hidden md:flex items-center gap-4 text-brand-blue/50 text-sm font-mono">
            <span>Scroll</span> <MoveRight className="w-4 h-4 ml-2" />
          </div>
        </div>

        {/* Right: Changing Cards */}
        <div ref={containerRef} className="w-full md:w-2/3 h-96 relative flex items-center justify-center">
          {mechanisms.map((mech, index) => (
            <div
              key={mech.id}
              className="mechanism-card absolute w-full max-w-lg glass-dark rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl font-bold text-white">
                  {index + 1}
                </div>
                <h4 className={cn("text-xl md:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r", mech.color)}>
                  {mech.title}
                </h4>
              </div>
              <p className="text-lg text-white/80 leading-relaxed font-light">
                {mech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
