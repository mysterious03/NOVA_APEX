"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoreConcept() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation state (updated by GSAP via scrub)
  const stateRef = useRef({
    intakeActive: 0,     // 0 to 1
    heatLevel: 0,        // 0 to 1
    pressureShake: 0,    // 0 to 1
    valveOpen: 0,        // 0 to 1
    acceleration: 0,     // 0 to 1
    recoilPhase: 0,      // 0 to 1
    labelIndex: 0        // 0 to 6
  });

  useGSAP(() => {
    // Determine bounds for pinned scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%", // 5 viewport heights of scrolling
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    const s = stateRef.current;

    // Timeline mapping
    // Stage 1: IDLE exists natively (index 0)
    
    // Stage 2: INTAKE (index 1)
    tl.to(s, { intakeActive: 1, labelIndex: 1, duration: 1, ease: "power1.inOut" })
    
    // Stage 3: HEATING (index 2)
    tl.to(s, { heatLevel: 1, labelIndex: 2, duration: 1, ease: "power2.inOut" })
    
    // Stage 4: PRESSURE (index 3)
    tl.to(s, { pressureShake: 1, labelIndex: 3, duration: 1, ease: "power1.in" })
    
    // Stage 5: PULSE RELEASE (index 4)
    tl.to(s, { valveOpen: 1, labelIndex: 4, duration: 0.5, ease: "power4.in" })
      .to(s, { pressureShake: 0, duration: 0.5, ease: "power1.out" }, "<")

    // Stage 6: NOZZLE ACCELERATION (index 5)
    tl.to(s, { acceleration: 1, labelIndex: 5, duration: 1, ease: "power2.out" })

    // Stage 7: EXHAUST THRUST (index 6)
    tl.to(s, { recoilPhase: 1, labelIndex: 6, duration: 1, ease: "sine.inOut" })
    
    // Hold at end
    tl.to(s, { duration: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: sectionRef });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    });
    resizeObserver.observe(canvas);
    
    // Initial size
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      stage: 'intake' | 'chamber' | 'exhaust';
      life: number;
      maxLife: number;
      offsetY: number;
    }
    
    let particles: Particle[] = [];
    let animationFrameId: number;

    const render = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const cx = cw / 2;
      const cy = ch / 2;
      const s = stateRef.current;

      ctx.clearRect(0, 0, cw, ch);

      // System Recoil Offset
      const recoilX = s.recoilPhase * -15;

      // Draw Chamber (Horizontal)
      const chamberW = 300;
      const chamberH = 100;
      const chamberX = cx - chamberW/2 + recoilX;
      const chamberY = cy - chamberH/2 + Math.sin(Date.now()*0.05) * (s.pressureShake * 3); // Shake effect

      // Chamber Glow based on state
      ctx.save();
      const glowIntensity = Math.min(1, s.heatLevel + (s.pressureShake * 0.5));
      if (glowIntensity > 0) {
        ctx.shadowBlur = 40 * glowIntensity;
        ctx.shadowColor = `rgba(255, 77, 0, ${glowIntensity * 0.6})`;
      }
      
      // Draw main body
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + (s.pressureShake*0.2)})`;
      ctx.lineWidth = 3;
      ctx.rect(chamberX, chamberY, chamberW, chamberH);
      ctx.stroke();
      if(s.heatLevel > 0) {
         ctx.fillStyle = `rgba(255, 77, 0, ${s.heatLevel * 0.1})`;
         ctx.fill();
      }
      ctx.restore();

      // Draw De Laval Nozzle (Appears active during acc/exhaust)
      const nozzleX = chamberX + chamberW;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 3;
      // Converging
      ctx.moveTo(nozzleX, chamberY);
      ctx.lineTo(nozzleX + 40, chamberY + 30);
      ctx.moveTo(nozzleX, chamberY + chamberH);
      ctx.lineTo(nozzleX + 40, chamberY + chamberH - 30);
      // Diverging
      ctx.moveTo(nozzleX + 40, chamberY + 30);
      ctx.lineTo(nozzleX + 120, chamberY - 10);
      ctx.moveTo(nozzleX + 40, chamberY + chamberH - 30);
      ctx.lineTo(nozzleX + 120, chamberY + chamberH + 10);
      ctx.stroke();

      // Draw Valve Separator
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 210, 255, ${1 - s.valveOpen})`; // Fades out when open
      ctx.lineWidth = 6;
      const valveGap = s.valveOpen * (chamberH / 2);
      ctx.moveTo(nozzleX, chamberY);
      ctx.lineTo(nozzleX, chamberY + chamberH/2 - valveGap);
      ctx.moveTo(nozzleX, chamberY + chamberH);
      ctx.lineTo(nozzleX, chamberY + chamberH/2 + valveGap);
      ctx.stroke();

      // Particle Management
      // Emit intake particles
      if (s.intakeActive > 0 && Math.random() < (0.2 + s.intakeActive*0.5) && !s.valveOpen) {
         particles.push({
           x: chamberX - 50,
           y: chamberY + Math.random() * chamberH,
           vx: 2 + Math.random() * 2,
           vy: (Math.random() - 0.5) * 0.5,
           stage: 'intake',
           life: 0,
           maxLife: 200,
           offsetY: Math.random() * 10
         });
      }

      // If valve opened strongly, push chamber particles to exhaust
      if (s.valveOpen > 0.5) {
         if (s.intakeActive > 0 && Math.random() < 0.8) {
             particles.push({
               x: chamberX + chamberW / 2 + Math.random() * 50,
               y: chamberY + Math.random() * chamberH,
               vx: 5 + Math.random() * 10 * s.acceleration,
               vy: (Math.random() - 0.5) * 2,
               stage: 'exhaust',
               life: 0,
               maxLife: 100,
               offsetY: Math.random() * 5
             });
         }
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.life++;
        
        // Physics
        if (p.stage === 'intake') {
          p.x += p.vx;
          p.y += p.vy;
          // Enter chamber logic
          if (p.x > chamberX + chamberW - 20) {
            p.vx = 0; // stop in chamber
            p.stage = 'chamber';
          }
        } else if (p.stage === 'chamber') {
           // Move randomly in chamber based on heat
           p.x += (Math.random() - 0.5) * (1 + s.heatLevel * 4);
           p.y += (Math.random() - 0.5) * (1 + s.heatLevel * 4);
           
           // Keep in bounds
           if (p.x < chamberX + 10) p.x = chamberX + 10;
           if (p.x > chamberX + chamberW - 10) p.x = chamberX + chamberW - 10;
           if (p.y < chamberY + 10) p.y = chamberY + 10;
           if (p.y > chamberY + chamberH - 10) p.y = chamberY + chamberH - 10;

           // If valve opens, convert to exhaust
           if (s.valveOpen > 0.5 && Math.random() < 0.3) {
             p.stage = 'exhaust';
             p.vx = 8 + (s.acceleration * 15) + (s.recoilPhase * 20); // Shoot out
             p.vy = (p.y - cy > 0 ? 1 : -1) * (s.acceleration * 2); // Diverge slightly
           }
        } else if (p.stage === 'exhaust') {
           // Acceleration
           p.vx += s.acceleration * 1.5;
           p.x += p.vx + (s.recoilPhase * 10);
           p.y += p.vy * (1 + s.acceleration);
        }

        // Draw Particle
        ctx.beginPath();
        if (p.stage === 'intake') {
           ctx.fillStyle = `rgba(0, 210, 255, ${1 - (p.life/p.maxLife)})`;
           ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
        } else if (p.stage === 'chamber') {
           const heatR = 100 + Math.floor(155 * s.heatLevel); // approaches 255
           const heatG = 210 - Math.floor(100 * s.heatLevel); // goes down to red
           const heatB = 255 - Math.floor(255 * s.heatLevel);
           // Slight flicker
           const flicker = Math.random() > 0.8 ? 0.5 : 1;
           ctx.fillStyle = `rgba(${heatR}, ${heatG}, ${heatB}, ${flicker})`;
           ctx.arc(p.x, p.y, 2.5 + (s.pressureShake), 0, Math.PI*2);
        } else if (p.stage === 'exhaust') {
           // Bright blue/white speed lines
           ctx.strokeStyle = `rgba(150, 230, 255, ${1 - (p.life/(p.maxLife*0.5))})`;
           ctx.lineWidth = 2;
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2); // Tail
           ctx.stroke();
        }
        
        ctx.fill();

        // Kill old particles
        if (p.life > p.maxLife || p.x > cw) {
          particles.splice(i, 1);
        }
      }

      // Update DOM labels directly for smooth scrolling
      const idx = Math.round(s.labelIndex);
      const stageIndexEl = document.getElementById('stage-index');
      const stageTitleEl = document.getElementById('stage-title');
      const stageDescEl = document.getElementById('stage-desc');
      const scrollIndicatorEl = document.getElementById('scroll-indicator');
      
      const labelsData = [
        { title: "Idle State", desc: "System awaiting ignition sequence." },
        { title: "Air Intake", desc: "Vortex generation pulls ambient air into the chamber." },
        { title: "Electrothermal Heating", desc: "Regenerative coil pre-heats air, building thermal energy." },
        { title: "Pressure Build-Up", desc: "Chamber reaches optimal resonant bounds via closed-loop control." },
        { title: "Pulsed Release", desc: "High-speed solenoid discharges compressed gas in 1ms." },
        { title: "De Laval Acceleration", desc: "Convergent-divergent geometry forces exhaust past Mach 1." },
        { title: "Thrust Generation", desc: "Ion-wind acceleration adds final specific impulse boost." }
      ];

      if (stageIndexEl && stageTitleEl && stageDescEl && scrollIndicatorEl) {
         if (stageIndexEl.innerText !== `Stage 0${idx + 1}`) {
             stageIndexEl.innerText = `Stage 0${idx + 1}`;
             stageTitleEl.innerText = labelsData[idx] ? labelsData[idx].title : "";
             stageDescEl.innerText = labelsData[idx] ? labelsData[idx].desc : "";
         }
         scrollIndicatorEl.style.height = `${(s.labelIndex / 6) * 100}%`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

   const labels = [
    { title: "Idle State", desc: "System awaiting ignition sequence." },
    { title: "Air Intake", desc: "Vortex generation pulls ambient air into the chamber." },
    { title: "Electrothermal Heating", desc: "Regenerative coil pre-heats air, building thermal energy." },
    { title: "Pressure Build-Up", desc: "Chamber reaches optimal resonant bounds via closed-loop control." },
    { title: "Pulsed Release", desc: "High-speed solenoid discharges compressed gas in 1ms." },
    { title: "De Laval Acceleration", desc: "Convergent-divergent geometry forces exhaust past Mach 1." },
    { title: "Thrust Generation", desc: "Ion-wind acceleration adds final specific impulse boost." }
  ];

  return (
    <section ref={sectionRef} id="concept" className="relative h-screen bg-brand-space w-full overflow-hidden flex items-center justify-center">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-violet/5 via-transparent to-black pointer-events-none" />

      {/* Title */}
      <div className="absolute top-12 left-0 right-0 text-center z-20">
         <h2 className="text-sm font-mono text-brand-blue tracking-widest uppercase mb-2">
            Engineering Visualization
         </h2>
         <h3 className="text-3xl md:text-5xl font-display font-bold text-white">
            How it Works
         </h3>
      </div>

      {/* Physics Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-10"
      />

      {/* Dynamic Label Overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg text-center pointer-events-none">
        <div className="glass-dark p-6 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300">
           <p id="stage-index" className="text-xs font-mono text-brand-orange uppercase tracking-widest mb-1">
             Stage 01
           </p>
           <h4 id="stage-title" className="text-2xl font-bold text-white mb-2 font-display">
             Idle State
           </h4>
           <p id="stage-desc" className="text-white/60 font-light text-sm">
             System awaiting ignition sequence.
           </p>
        </div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute inset-y-0 right-8 flex items-center z-20">
         <div className="w-1 h-32 bg-white/10 rounded-full relative overflow-hidden">
            <div 
              id="scroll-indicator"
              className="absolute top-0 w-full bg-brand-blue transition-all duration-100 ease-linear"
              style={{ height: "0%" }}
            />
         </div>
      </div>
    </section>
  );
}
