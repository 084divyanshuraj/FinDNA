"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Behavioral Intelligence",
      description: "We go beyond traditional credit scores by analyzing the psychological patterns behind financial decisions."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Radical Privacy",
      description: "Zero-knowledge architecture ensures your financial DNA remains exclusively yours."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Adaptability",
      description: "Our engine evolves dynamically as your life circumstances and goals change over time."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Actionable Insights",
      description: "We don't just provide data—we deliver precise, algorithmic recommendations tailored to you."
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 overflow-hidden relative">
      {/* Background Enhancements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="w-[90%] max-w-[1400px] mx-auto relative z-10">
        
        {/* Intro Section */}
        <section className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
              Decoding the <span className="text-gradient">Future of Finance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              FinDNA is not just another budgeting app. We are building the world's most advanced behavioral economic engine. By mapping your unique financial personality, we empower you to make profoundly better financial decisions.
            </p>
          </motion.div>
        </section>

        {/* Visual Story / Split Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-1 rounded-3xl overflow-hidden glass-card shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-purple/20 pointer-events-none"></div>
              <div className="w-full h-80 flex flex-col items-center justify-center p-8 bg-brand-dark/40 backdrop-blur-md rounded-3xl border border-white/5 relative">
                 <img src="/logo.png" alt="FinDNA Logo" className="w-48 h-auto mb-8 drop-shadow-[0_0_15px_rgba(76,201,240,0.6)] animate-pulse" />
                 <div className="w-full flex justify-between items-end border-t border-white/10 pt-4">
                    <div className="w-1/4 h-8 rounded-full bg-brand-teal/30"></div>
                    <div className="w-1/4 h-16 rounded-full bg-brand-purple/40"></div>
                    <div className="w-1/4 h-12 rounded-full bg-blue-500/30"></div>
                    <div className="w-1/4 h-24 rounded-full bg-brand-teal/50"></div>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                For decades, the financial industry has treated human beings like simple spreadsheets. Traditional metrics only tell you *how much* money you have, but they completely ignore *who* you are.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                FinDNA was born from a simple realization: your relationship with money is emotional, psychological, and entirely unique. By combining deep learning with behavioral economics, we map your financial genome. We predict blind spots so you can avoid them, and highlight your strengths so you can compound them.
              </p>
              <Link href="/signup" className="inline-flex items-center text-brand-teal font-medium hover:text-white transition-colors group">
                Join the Revolution 
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </motion.div>

          </div>
        </section>

        {/* Core Values Bento Grid */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">The FinDNA <span className="text-gradient">Advantage</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl border border-white/5 hover:border-brand-teal/30 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-brand-dark/50 flex items-center justify-center text-brand-teal mb-6 shadow-black/50 shadow-inner">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed text-base">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
}
