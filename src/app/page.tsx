"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Tilt from 'react-parallax-tilt';
import { Terminal, Dices, Rocket, Server, Cloud, Cpu, Box, ArrowDown } from 'lucide-react';
import "./globals.css";

// Experience Data
const experiences = [
  {
    id: 0,
    role: "Architect",
    company: "European Commission",
    date: "Mar 2024 - Present",
    stack: ["AWS", "EKS", "Terraform", "ArgoCD"],
    desc: "Designing internal platform services for artifact management and container delivery. Driving cost optimization through shared, auto-scaling infrastructure replacing individual managed instances. Enforcing strict security control layers."
  },
  {
    id: 1,
    role: "Architect - ML/AI Data",
    company: "Roche",
    date: "Oct 2022 - May 2024",
    stack: ["Python", "AWS Bedrock", "Airflow", "Redshift"],
    desc: "Redesigned entire AWS data pipeline architecture to serverless. Led a team using LLMs to validate CRM data quality, replacing a manual human review process with automated inference at scale."
  },
  {
    id: 2,
    role: "DevOps Tech Lead",
    company: "Cisco",
    date: "Mar 2021 - Mar 2024",
    stack: ["AWS CDK", "Kubernetes", "ArgoCD", "Python"],
    desc: "Led 10+ engineers across two teams. Enforced GitOps/DevOps practices, optimized existing infrastructure, and built Microservice Architecture driven applications from the ground up."
  },
  {
    id: 3,
    role: "DevOps Engineer",
    company: "Samsung",
    date: "Jan 2022 - Jun 2022",
    stack: ["OpenShift", "Ansible", "Bash", "C++"],
    desc: "Set up and managed OpenShift Kubernetes clusters. Maintained and deployed high-performance L7 load-balancers tailored specifically for the 5G Core Network infrastructure."
  }
];

const jobTitles = [
  "Solutions Architect",
  "Data Engineer",
  "DevOps Tech Lead",
  "ML Systems Engineer",
  "Cloud Consultant"
];

export default function Page() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [expIndex, setExpIndex] = useState(0);

  const rollDice = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * jobTitles.length);
    } while (nextIndex === titleIndex);
    setTitleIndex(nextIndex);
  };

  return (
    // DARK MINIMALIST VIBE: Deep Violet background, stark contrast
    <div className="relative bg-[#110022] text-white font-sans w-full min-h-[100svh] overflow-x-hidden selection:bg-[#EAFF00] selection:text-black">

      {/* SUBTLE BACKGROUND TEXTURE */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

      {/* NAVBAR - CLEAN & MINIMAL */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="font-mono text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 text-white">
          <Terminal size={24} />
          SZYMON_PISKORZ
        </div>
        <a href="mailto:sim.piskorz@gmail.com" className="font-mono font-bold uppercase text-sm hover:text-[#EAFF00] transition-colors hidden md:block">
          Init_Contact()
        </a>
      </nav>

      {/* HERO SECTION - MINIMALIST INITIAL LOAD */}
      <section className="relative z-10 h-[100svh] flex flex-col justify-center items-center px-6 text-center">
        <div className="container mx-auto flex flex-col items-center">
          
          <h1 className="text-[12vw] md:text-[8vw] font-black leading-none uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] mb-6">
            Szymon Piskorz
          </h1>
          
          {/* INTERACTIVE DICE TITLE */}
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={rollDice}
              className="bg-transparent text-white border-2 border-white p-2 hover:bg-[#EAFF00] hover:text-black hover:border-[#EAFF00] transition-all flex items-center group rounded-none"
              aria-label="Roll new job title"
            >
              <Dices size={24} className="group-hover:animate-spin" />
            </button>
            <div className="text-[#00FA9A] font-mono font-black uppercase text-xl md:text-3xl tracking-wide min-w-[280px] text-left">
              {jobTitles[titleIndex]}
            </div>
          </div>

          {/* DEVOUCH LINK */}
          <a href="https://devouch.com" target="_blank" rel="noreferrer" className="inline-block bg-white text-black font-black uppercase px-6 py-2 text-sm border-[3px] border-transparent hover:border-[#EAFF00] hover:bg-black hover:text-[#EAFF00] transition-all shadow-[6px_6px_0px_#EAFF00]">
            Co-Founder @ DEVOUCH_
          </a>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-white/50 font-mono text-xs uppercase tracking-widest"
        >
          <span>Scroll to Decrypt</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* ABOUT / PHILOSOPHY - REVEALED ON SCROLL */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        className="py-32 relative z-20 container mx-auto px-6 md:px-12"
      >
        <div className="max-w-4xl border-l-[8px] border-[#FF0055] pl-8 md:pl-12">
          <h2 className="text-[#EAFF00] font-mono font-black uppercase text-xl mb-6 tracking-widest">// System Documentation</h2>
          <p className="text-3xl md:text-5xl font-black leading-tight mb-8">
            I build systems that work reliably at scale. No ivory tower architecture.
          </p>
          <div className="font-mono text-lg md:text-xl text-gray-300 space-y-6">
            <p>
              Started as Software, evolved to Operations, then DevOps, Platform, Monitoring, Kubernetes, Cloud, Lead, Architect, and now ML Systems Engineer. 
            </p>
            <p className="bg-[#FF0055] text-white p-4 font-bold text-black shadow-[8px_8px_0px_#EAFF00] inline-block">
              "I learn by building. I prototype quickly, validate assumptions, and iterate toward production."
            </p>
            <p>
              Currently fascinated by how ML/AI tooling is changing how we build and operate systems. Whether it's automating workflows or designing cloud architecture, I focus on practical solutions that teams can actually maintain.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CLEAN TICKER (NO EMOJIS) */}
      <div className="bg-[#EAFF00] py-6 z-30 relative -rotate-1 border-y-[6px] border-black">
        <Marquee speed={100} autoFill>
          <div className="flex items-center text-black font-black text-4xl md:text-5xl uppercase tracking-tighter">
            <span className="mx-12">EUROPEAN COMMISSION</span>
            <span className="mx-12">•</span>
            <span className="mx-12">ROCHE</span>
            <span className="mx-12">•</span>
            <span className="mx-12">CISCO</span>
            <span className="mx-12">•</span>
            <span className="mx-12">SAMSUNG</span>
            <span className="mx-12">•</span>
          </div>
        </Marquee>
      </div>

      {/* INTERACTIVE DRAGGABLE ROCKET TIMELINE */}
      <section className="py-32 relative z-20 container mx-auto px-4 md:px-12">
        <div className="mb-16">
          <h2 className="text-[#00FA9A] font-mono font-black uppercase text-xl mb-4 tracking-widest">// Career Trajectory</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_#000]">
            Experience <span className="text-[#FF0055]">Timeline</span>
          </h3>
          <p className="font-mono text-gray-400 mt-4 text-lg">Drag the rocket across the timeline to explore past deployments.</p>
        </div>

        <div className="bg-[#1a0033] border-[6px] border-[#4e00c3] p-8 md:p-12 shadow-[15px_15px_0px_#000]">
          
          {/* THE DRAGGABLE ROCKET SLIDER */}
          <div className="relative mb-20 pt-10 pb-10 w-full">
             
             {/* Visual Track Line */}
             <div className="absolute top-1/2 left-0 w-full h-[6px] bg-[#4e00c3] -translate-y-1/2 z-0" />
             
             {/* Visual Nodes */}
             <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-10 flex justify-between pointer-events-none px-[20px]">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative flex flex-col items-center">
                     <div className={`w-4 h-4 rounded-full border-[3px] border-[#1a0033] transition-colors duration-300 ${expIndex >= index ? 'bg-[#EAFF00]' : 'bg-[#4e00c3]'}`} />
                     {/* Year Label */}
                     <div className={`absolute top-6 font-mono font-bold text-sm whitespace-nowrap transition-opacity ${expIndex === index ? 'text-[#EAFF00] opacity-100' : 'text-gray-500 opacity-50'}`}>
                       {exp.date.split('-')[0].trim()}
                     </div>
                  </div>
                ))}
             </div>

             {/* The Rocket (Tied to the range input) */}
             <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-20 pointer-events-none px-[20px]">
                <motion.div 
                  className="relative w-full h-full"
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 -ml-[24px]"
                    animate={{ left: `${(expIndex / (experiences.length - 1)) * 100}%` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <div className="bg-[#FF0055] border-[3px] border-black p-2 shadow-[4px_4px_0px_#000]">
                        <Rocket size={28} className="text-white rotate-90" />
                    </div>
                  </motion.div>
                </motion.div>
             </div>

             {/* INVISIBLE RANGE INPUT FOR NATIVE DRAGGING */}
             <input 
                type="range" 
                min="0" 
                max={experiences.length - 1} 
                step="1"
                value={expIndex}
                onChange={(e) => setExpIndex(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0"
                aria-label="Experience Timeline Slider"
             />
          </div>

          {/* ACTIVE EXPERIENCE CARD */}
          <div className="relative min-h-[250px]">
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: expIndex === index ? 1 : 0, 
                  x: expIndex === index ? 0 : 20,
                  pointerEvents: expIndex === index ? 'auto' : 'none',
                  zIndex: expIndex === index ? 10 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full bg-black border-[4px] border-[#EAFF00] p-6 md:p-10"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{exp.company}</h3>
                    <p className="text-xl font-mono text-[#00FA9A] uppercase mt-2 font-bold">{exp.role}</p>
                  </div>
                  <div className="bg-transparent text-[#EAFF00] font-mono text-sm border-2 border-[#EAFF00] px-4 py-2 uppercase tracking-widest">
                    {exp.date}
                  </div>
                </div>
                
                <p className="font-mono text-gray-300 text-lg leading-relaxed mb-8 max-w-4xl">
                  {exp.desc}
                </p>

                <div className="flex flex-wrap gap-3">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="bg-[#4e00c3] text-white font-black font-mono text-xs px-3 py-1 uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARSENAL GRID */}
      <section className="py-24 relative z-20 bg-black border-t-[8px] border-[#FF0055]">
        <div className="container mx-auto px-4 md:px-12">
          <div className="mb-16">
            <h2 className="text-[#EAFF00] font-mono font-black uppercase text-xl mb-4 tracking-widest">// Technical Stack</h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Core <span className="text-[#00FA9A]">Arsenal</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div className="bg-[#110022] border-[4px] border-[#4e00c3] p-8 h-full flex flex-col justify-between hover:border-[#EAFF00] transition-colors group">
                <div>
                  <Cloud className="w-12 h-12 text-[#EAFF00] mb-6 group-hover:-translate-y-2 transition-transform" />
                  <h3 className="text-2xl font-black mb-4 text-white uppercase">Cloud & Orchestration</h3>
                  <p className="font-mono text-gray-400 text-base mb-6">Migrating monolithic workloads to serverless. Architecting resilient EKS, Fargate, OpenShift, and Lambda infrastructures.</p>
                </div>
                <div className="flex gap-2 font-mono font-bold text-xs text-black flex-wrap">
                  <span className="bg-[#EAFF00] px-2 py-1">AWS</span>
                  <span className="bg-[#EAFF00] px-2 py-1">KUBERNETES</span>
                </div>
              </div>
            </Tilt>

            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div className="bg-[#110022] border-[4px] border-[#4e00c3] p-8 h-full flex flex-col justify-between hover:border-[#FF0055] transition-colors group">
                <div>
                  <Box className="w-12 h-12 text-[#FF0055] mb-6 group-hover:-translate-y-2 transition-transform" />
                  <h3 className="text-2xl font-black mb-4 text-white uppercase">IaC & CI/CD</h3>
                  <p className="font-mono text-gray-400 text-base mb-6">Enforcing automated code quality, GitOps principles, and reproducible infrastructure deployment across enterprise teams.</p>
                </div>
                <div className="flex gap-2 font-mono font-bold text-xs text-black flex-wrap">
                  <span className="bg-[#FF0055] text-white px-2 py-1">TERRAFORM</span>
                  <span className="bg-[#FF0055] text-white px-2 py-1">ARGOCD</span>
                  <span className="bg-[#FF0055] text-white px-2 py-1">AWS CDK</span>
                </div>
              </div>
            </Tilt>

            <Tilt perspective={1000} scale={1.02} className="h-full">
              <div className="bg-[#110022] border-[4px] border-[#4e00c3] p-8 h-full flex flex-col justify-between hover:border-[#00FA9A] transition-colors group">
                <div>
                  <Cpu className="w-12 h-12 text-[#00FA9A] mb-6 group-hover:-translate-y-2 transition-transform" />
                  <h3 className="text-2xl font-black mb-4 text-white uppercase">ML / AI Ops</h3>
                  <p className="font-mono text-gray-400 text-base mb-6">Engineering near-zero downtime data pipelines. Facilitating LLM inference via Bedrock and complex Airflow orchestration.</p>
                </div>
                <div className="flex gap-2 font-mono font-bold text-xs text-black flex-wrap">
                  <span className="bg-[#00FA9A] px-2 py-1">PYTHON</span>
                  <span className="bg-[#00FA9A] px-2 py-1">SAGEMAKER</span>
                  <span className="bg-[#00FA9A] px-2 py-1">AIRFLOW</span>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 relative z-30 bg-[#4e00c3] border-t-[8px] border-[#EAFF00] text-white flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <h2 className="text-5xl md:text-[5vw] font-black uppercase mb-12 tracking-tighter leading-tight drop-shadow-[4px_4px_0px_#000]">
          Let's architect <br/> <span className="text-[#EAFF00]">the future.</span>
        </h2>
        
        <Tilt perspective={800} scale={1.1} className="relative z-20">
          <a href="mailto:sim.piskorz@gmail.com" className="bg-black text-white border-[6px] border-[#00FA9A] px-10 md:px-16 py-5 md:py-6 text-2xl md:text-4xl font-black uppercase shadow-[12px_12px_0px_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-[4px_4px_0px_#000] transition-all flex items-center gap-4">
            <Server size={32} className="hidden md:block text-[#00FA9A]" />
            INITIATE_CONTACT
          </a>
        </Tilt>
      </section>

    </div>
  );
}