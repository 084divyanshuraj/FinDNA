"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Scale, Zap } from 'lucide-react';

export default function PredictionsSection() {
  const predictions = [
    {
      title: "The Saver",
      icon: <Wallet className="w-8 h-8 text-emerald-400" />,
      description: "Optimized for capital preservation. Your AI predicts a 99% probability of maintaining high liquidity and steady incremental growth.",
      color: "from-emerald-900/40 to-emerald-800/10",
      borderColor: "border-emerald-500/20"
    },
    {
      title: "The Risk Taker",
      icon: <TrendingUp className="w-8 h-8 text-rose-400" />,
      description: "High variance trajectory. Your behavioral data correlates strongly with aggressive growth strategies and volatile market participation.",
      color: "from-rose-900/40 to-rose-800/10",
      borderColor: "border-rose-500/20"
    },
    {
      title: "The Balanced",
      icon: <Scale className="w-8 h-8 text-blue-400" />,
      description: "Perfect equilibrium. The model shows synchronized asset allocation with moderate growth and acceptable risk margins.",
      color: "from-blue-900/40 to-blue-800/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "The Impulsive Buyer",
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      description: "Warning flags detected. Real-time predictive alerts highlight potential liquid crunches triggered by emotionally driven transactions.",
      color: "from-amber-900/40 to-amber-800/10",
      borderColor: "border-amber-500/20"
    }
  ];

  return (
    <section className="py-24 relative z-10 w-[90%] max-w-[1800px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="text-gradient">Smart Predictions</span> Architecture
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Discover which of the four core archetypes your financial DNA maps to, and let our AI chart your optimal path forward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictions.map((arch, index) => (
          <motion.div
            key={index}
            className={`p-8 rounded-3xl glass-card flex flex-col justify-between h-full bg-gradient-to-b border ${arch.borderColor} ${arch.color} hover:bg-white/5 transition-colors group`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-dark/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                {arch.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{arch.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{arch.description}</p>
            </div>
            
            <button className="text-brand-teal text-sm font-medium flex items-center hover:text-white transition-colors">
              View Profile Archetype
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
