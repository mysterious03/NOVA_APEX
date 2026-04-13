"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const timelineEvents = [
  { week: "Week 01", title: "Pressure Vessel", desc: "Constructed 60 PSI PVC chamber with regenerative copper heat coil." },
  { week: "Week 02", title: "Heating Core", desc: "Mounted nichrome coil and 450V capacitor bank with MOSFET trigger." },
  { week: "Week 03", title: "Burst Control", desc: "Integrated high-speed 12V solenoid valve for precise millisecond bursts." },
  { week: "Week 04", title: "De Laval Nozzle", desc: "Machined convergent-divergent nozzle with graphite throat (Mach 1+)." },
  { week: "Week 05", title: "AI Brain Integration", desc: "Wired Raspberry Pi Zero, ADC, and 5 sensor types (Thrust, Temp, PSI, Watts)." },
  { week: "Week 06", title: "Ion Acceleration", desc: "Added 3-stage 5kV corona rings for electrostatic exhaust acceleration." },
  { week: "Week 07", title: "Triple Cluster", desc: "Synchronised 3 units with staggered peak-pressure firing logic." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="py-32 bg-brand-space relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            From Spare Parts to <span className="text-brand-orange drop-shadow-[0_0_15px_rgba(255,77,0,0.5)]">Space Tech</span>
          </h2>
          <p className="text-lg text-white/60">
            A 7-week journey of aerospace engineering at home.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-blue via-brand-violet to-brand-orange origin-top"
               style={{ scaleY: scrollYProgress }}
             />
          </div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
               const isEven = index % 2 === 0;
               return (
                 <div key={event.week} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                    
                    {/* Timeline Node */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-brand-space border-2 border-brand-violet z-10"
                    />

                    {/* Left Content (or empty space) */}
                    <div className={cn("w-full md:w-5/12 pl-16 md:pl-0", isEven ? "md:text-right md:pr-12" : "md:order-last md:text-left md:pl-12")}>
                       <motion.div
                         initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true, margin: "-100px" }}
                         transition={{ duration: 0.6, ease: "easeOut" }}
                         className="glass p-6 rounded-2xl border-white/5 hover:border-brand-violet/30 transition-colors"
                       >
                          <span className="text-xs font-mono text-brand-blue tracking-widest mb-2 block">{event.week}</span>
                          <h4 className="text-xl font-display font-bold text-white mb-2">{event.title}</h4>
                          <p className="text-white/60 text-sm leading-relaxed">{event.desc}</p>
                       </motion.div>
                    </div>

                    {/* Right Content (empty spacer for desktop to keep center aligned) */}
                    <div className="hidden md:block w-5/12" />
                 </div>
               );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
