# NOVA APEX AI 🚀

> **Intelligent Self-Optimising Electrothermal Propulsion System**
> 
> *Built at Home. Powered by AI. Inspired by Rockets.*

NOVA APEX AI is a home-built electrothermal thruster that combines **seven mechanical propulsion upgrades** with a **closed-loop machine learning engine**. Driven by a Raspberry Pi  running a Gradient Descent algorithm, the thruster autonomously measures performance across five sensors and adjusts its operating parameters (pulse timing, valve duration, voltage) in real time to reach maximum thermodynamic efficiency.

This repository holds the highly interactive, scroll-driven web experience built to visually demonstrate the working principles of the thruster.

## 🌟 The Experience

Built to feel like a high-end aerospace product launch (think SpaceX or Tesla), this storytelling website walks you through the physics and engineering behind the thruster.

- 🛸 **Cinematic 3D Hero**: Procedural Three.js thruster core that pulses and ignites natively in your browser.
- ⚛️ **Physics Simulation Canvas**: A real-time `<canvas>` particle physics engine that visually simulates the 7 stages of operation (Air Intake → Heating → Pressure Peak → Pulses Release → Nozzle Acceleration → Exhaust Thrust) totally controlled by your scroll wheel.
- ⚙️ **Mechanism Walkthrough**: GSAP-powered horizontal scrolling through the 7 primary mechanical evolution stages.
- 🧠 **Live AI Telemetry**: A mock telemetry dashboard simulating the Gradient Descent algorithm pushing efficiency from ~55% to ~72% over 200 firing cycles.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP (ScrollTrigger)](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + React Three Fiber
- **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)

## 🚀 Running Locally

Want to initialize the sequence on your own machine?

```bash
# Clone the repository
git clone https://github.com/mysterious03/NOVA_APEX.git

# Navigate to the project directory
cd NOVA_APEX/thruster

# Install the required dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

## 📊 Performance Data

At peak AI-driven optimization, the physical NOVA APEX system operates at:
- **Efficiency**: 63–72%
- **Peak Thrust**: 22–48 N
- **Specific Impulse (Isp)**: 72–98 seconds

*This genuinely exceeds some commercial cold-gas satellite thrusters at a fraction of the cost.*

## 📜 The 7 Stages of Evolution

1. **Tangential Vortex Intake**: Centrifugal free density increase.
2. **Regenerative Copper Heat Coil**: Pre-heats intake air using exhaust waste heat.
3. **Capacitor-Bank Burst**: Instantaneous 1,000 W thermal energy injection.
4. **Helmholtz Resonant Pulse**: Amplifies pressure via soundwave reinforcement.
5. **De Laval Nozzle**: Convergent-divergent graphite throat pushes gas past Mach 1.
6. **Triple-Stage Ion Wind**: 5kV corona rings electrostatically accelerate exhaust further.
7. **Triple Cluster Firing**: Three synchronised units firing 120-degrees apart.

---

*Designed and developed to make home-built rocket physics terrifyingly beautiful.*
