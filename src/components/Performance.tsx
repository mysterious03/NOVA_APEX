"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisons = [
  {
    name: "Model Rocket",
    type: "Estes E-Class",
    thrust: "10-40 N",
    isp: "80-100 s",
    cost: "₹600 / use",
    reusable: false,
    ai: false,
    highlight: false,
  },
  {
    name: "NOVA APEX AI",
    type: "Electrothermal",
    thrust: "22-48 N",
    isp: "72-98 s",
    cost: "₹9,300 total",
    reusable: true,
    ai: true,
    highlight: true,
  },
  {
    name: "Satellite Thruster",
    type: "Cold-gas",
    thrust: "1-5 N",
    isp: "50-75 s",
    cost: "₹25 Lakh+",
    reusable: true,
    ai: false,
    highlight: false,
  }
];

export default function Performance() {
  return (
    <section id="performance" className="py-32 bg-brand-space relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            Commercial-Grade <span className="text-gradient">Performance</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            At peak optimization, the Isp of 72-98 seconds exceeds commercial cold-gas satellite thrusters and approaches the lower range of liquid rocket engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {comparisons.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className={cn(
                "rounded-3xl p-8 relative overflow-hidden transition-all duration-500",
                item.highlight 
                  ? "glass-dark border-brand-violet/50 shadow-[0_0_30px_rgba(160,32,240,0.2)] md:-translate-y-4" 
                  : "glass border-white/10"
              )}
            >
              {item.highlight && (
                <div className="absolute top-0 right-0 py-1 px-4 bg-gradient-to-r from-brand-violet to-brand-blue text-xs font-bold tracking-widest uppercase rounded-bl-xl text-white shadow-lg">
                  This System
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={cn("text-2xl font-display font-bold mb-1", item.highlight ? "text-white" : "text-white/80")}>
                  {item.name}
                </h3>
                <p className="text-sm font-mono text-white/50">{item.type}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-white/40 mb-1">THRUST</p>
                  <p className={cn("text-2xl font-bold", item.highlight ? "text-brand-blue" : "text-white")}>
                    {item.thrust}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-white/40 mb-1">SPECIFIC IMPULSE (Isp)</p>
                  <p className={cn("text-2xl font-bold", item.highlight ? "text-brand-blue" : "text-white")}>
                    {item.isp}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono text-white/40 mb-1">BUILD COST</p>
                  <p className="text-xl font-medium text-white/90">{item.cost}</p>
                </div>
                
                <div className="pt-6 border-t border-white/10 space-y-4">
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">Reusable</span>
                      {item.reusable ? <Check className="w-5 h-5 text-green-400" /> : <X className="w-5 h-5 text-red-500" />}
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">AI Optimised</span>
                      {item.ai ? <Check className="w-5 h-5 text-brand-violet" /> : <X className="w-5 h-5 text-white/20" />}
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
