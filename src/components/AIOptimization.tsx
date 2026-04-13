"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Activity, Cpu } from "lucide-react";

export default function AIOptimization() {
  const [cycle, setCycle] = useState(1);
  const [efficiency, setEfficiency] = useState(55.2);
  const [pulseFreq, setPulseFreq] = useState(40.0);
  const [chargeV, setChargeV] = useState(380);

  // Fake optimization simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((c) => (c >= 200 ? 1 : c + 1));
      
      if (cycle < 50) {
        setEfficiency((e) => Math.min(61.0, e + Math.random() * 0.5));
        setPulseFreq((f) => +(f + (Math.random() < 0.5 ? 0.1 : -0.05)).toFixed(1));
      } else if (cycle < 100) {
        setEfficiency((e) => Math.min(65.0, e + Math.random() * 0.2));
        setChargeV((v) => Math.max(380, Math.min(450, v + Math.floor(Math.random() * 5))));
      } else {
        setEfficiency((e) => Math.min(72.0, e + Math.random() * 0.1));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [cycle]);

  return (
    <section id="ai" className="py-32 bg-brand-space relative border-t border-white/5">
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#A020F010_1px,transparent_1px),linear-gradient(to_bottom,#A020F010_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border-brand-violet/30"
          >
            <BrainCircuit className="w-5 h-5 text-brand-violet" />
            <span className="text-sm font-mono text-white">Gradient Descent Engine</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
            The Thruster That <span className="text-gradient">Learns</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A Raspberry Pi Zero runs continuous telemetry through a closed-loop Gradient Descent algorithm, autonomously tuning pulse timing, pressure, and voltage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left: Logic Flow */}
          <div className="glass-dark p-8 md:p-12 rounded-3xl border border-white/10 space-y-8 relative overflow-hidden">
             {/* Glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-violet/10 blur-[100px] rounded-full" />
             
             <div className="relative z-10 space-y-6">
               <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                     <p className="text-white/50 text-sm font-mono mb-1">INPUT (SENSORS)</p>
                     <p className="text-white font-medium flex items-center gap-2">
                        <Activity className="w-4 h-4 text-brand-blue" />
                        Pressure | Temp | Thrust | Watts
                     </p>
                  </div>
               </div>

               <div className="flex items-center justify-between border-b border-white/10 pb-6 pl-4 md:pl-8 border-l-2 border-brand-violet">
                  <div>
                     <p className="text-white/50 text-sm font-mono mb-1">PROCESSING</p>
                     <p className="text-brand-violet font-medium font-mono">
                        Score = Thrust(N) / Power(W)<br/>
                        param = param + (lr * grad)
                     </p>
                  </div>
               </div>

               <div className="flex items-center justify-between pt-2">
                  <div>
                     <p className="text-white/50 text-sm font-mono mb-1">OUTPUT (ACTUATORS)</p>
                     <p className="text-white font-medium flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-brand-orange" />
                        Valve (ms) | Charge (V) | PWM (Hz)
                     </p>
                  </div>
               </div>
             </div>
          </div>

          {/* Right: Live Simulation Dashboard */}
          <div className="glass p-8 md:p-10 rounded-3xl border border-brand-blue/30 relative">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-medium text-white flex items-center gap-2">
                   Live Telemetry
                   <span className="relative flex h-3 w-3 ml-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                   </span>
                </h3>
                <div className="text-right">
                   <p className="text-xs font-mono text-white/50">CYCLE</p>
                   <p className="font-mono text-brand-blue font-bold text-lg">{cycle.toString().padStart(4, '0')}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                   <p className="text-xs font-mono text-white/50 mb-2">EFFICIENCY</p>
                   <p className="text-3xl font-display font-bold text-green-400">
                     {efficiency.toFixed(1)}%
                   </p>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                   <p className="text-xs font-mono text-white/50 mb-2">PULSE FREQ</p>
                   <p className="text-3xl font-display font-bold text-white">
                     {pulseFreq.toFixed(1)}<span className="text-lg text-white/50 ml-1">Hz</span>
                   </p>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                   <p className="text-xs font-mono text-white/50 mb-2">CHARGE VOLTS</p>
                   <p className="text-3xl font-display font-bold text-white">
                     {chargeV}<span className="text-lg text-white/50 ml-1">V</span>
                   </p>
                </div>
                <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                   <p className="text-xs font-mono text-white/50 mb-2">THROTTLE</p>
                   <p className="text-3xl font-display font-bold text-brand-orange">
                     MAX
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
