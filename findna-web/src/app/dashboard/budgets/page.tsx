"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function BudgetsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Budget Manager</h1>
          <p className="text-sm text-gray-400 font-medium">Create and manage your monthly budgets with AI assistance.</p>
        </div>
        <button className="bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-[0_0_15px_rgba(76,201,240,0.3)] self-start">
          Create Budget
        </button>
      </div>
      
    </motion.div>
  );
}
