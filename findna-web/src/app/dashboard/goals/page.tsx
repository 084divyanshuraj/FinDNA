"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowRight } from 'lucide-react';

export default function GoalsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Goal Planner</h1>
        <p className="text-gray-400">Save precisely for what matters most.</p>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-dark/50 border border-white/10 mb-6 text-brand-teal">
            <Target size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Set a New Financial Goal</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Tell our ML engine what you want to achieve, how much it costs, and your timeline. FinDNA will calculate the exact monthly savings required based on your financial personality and projected inflation.
          </p>

          <button className="flex items-center gap-2 bg-gradient-to-r from-brand-teal to-brand-purple text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
            Start Goal Planner
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
