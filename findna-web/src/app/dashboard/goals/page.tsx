"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function GoalsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Financial Goals</h1>
          <p className="text-sm text-gray-400 font-medium">Set and track your savings goals to achieve your financial dreams.</p>
        </div>
        <button className="bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-[0_0_15px_rgba(76,201,240,0.3)] self-start">
          + New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between">
           <div>
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-brand-purple">◎</span> Active Goals</h3>
             <p className="text-3xl font-bold text-white">0</p>
           </div>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between">
           <div>
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-brand-teal">$</span> Total Target</h3>
             <p className="text-3xl font-bold text-white">₹0</p>
           </div>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between">
           <div>
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-emerald-400">📈</span> Completed</h3>
             <p className="text-3xl font-bold text-emerald-400">0</p>
           </div>
         </div>
      </div>

      {/* Empty State */}
      <div className="glass-card bg-white/5 rounded-2xl border border-white/10 p-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
         
         <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 relative z-10">
           <Target size={32} className="text-gray-500" strokeWidth={1.5} />
         </div>
         <p className="text-white font-bold mb-4 relative z-10">No financial goals yet</p>
         <button className="bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm relative z-10">
           + Create Your First Goal
         </button>
      </div>
    </motion.div>
  );
}
