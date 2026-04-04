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
          Custom Budget
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/10 rounded-full blur-[30px]" />
           <div className="relative z-10">
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-brand-purple">📊</span> Total Monthly Budget</h3>
             <p className="text-3xl font-bold text-white">₹30,000</p>
           </div>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-[30px]" />
           <div className="relative z-10">
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-rose-400">🔥</span> Total Spent</h3>
             <p className="text-3xl font-bold text-white">₹14,000</p>
           </div>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-sm relative overflow-hidden">
           <div className="absolute -bottom-10 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]" />
           <div className="relative z-10">
             <h3 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><span className="text-emerald-400">💎</span> Remaining</h3>
             <p className="text-3xl font-bold text-emerald-400">₹16,000</p>
           </div>
         </div>
      </div>

      <div className="glass-card bg-white/5 rounded-2xl border border-white/10 p-6 relative overflow-hidden shadow-sm">
        <h3 className="font-bold text-white mb-6">FinDNA AI Default Allocations (Engine v2.0)</h3>
        
        <div className="space-y-6">
           {/* Budget Item 1 */}
           <div>
             <div className="flex justify-between items-end mb-2">
                <div>
                   <h4 className="text-sm font-bold text-gray-300">Housing & Rent</h4>
                   <p className="text-xs text-gray-500">₹8,000 / ₹10,000</p>
                </div>
                <span className="text-xs font-bold text-amber-400">80%</span>
             </div>
             <div className="w-full bg-black/40 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" style={{ width: '80%' }}></div>
             </div>
           </div>

           {/* Budget Item 2 */}
           <div>
             <div className="flex justify-between items-end mb-2">
                <div>
                   <h4 className="text-sm font-bold text-gray-300">Food & Dining</h4>
                   <p className="text-xs text-gray-500">₹4,000 / ₹8,000</p>
                </div>
                <span className="text-xs font-bold text-brand-teal">50%</span>
             </div>
             <div className="w-full bg-black/40 rounded-full h-2">
                <div className="bg-brand-teal h-2 rounded-full shadow-[0_0_8px_rgba(76,201,240,0.6)]" style={{ width: '50%' }}></div>
             </div>
           </div>

           {/* Budget Item 3 */}
           <div>
             <div className="flex justify-between items-end mb-2">
                <div>
                   <h4 className="text-sm font-bold text-gray-300">Travel & Commute</h4>
                   <p className="text-xs text-gray-500">₹2,000 / ₹2,000</p>
                </div>
                <span className="text-xs font-bold text-rose-500">100% Exceeded!</span>
             </div>
             <div className="w-full bg-black/40 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]" style={{ width: '100%' }}></div>
             </div>
           </div>

           {/* Budget Item 4 */}
           <div>
             <div className="flex justify-between items-end mb-2">
                <div>
                   <h4 className="text-sm font-bold text-gray-300">Goal Targets (Savings)</h4>
                   <p className="text-xs text-gray-500">₹0 / ₹10,000</p>
                </div>
                <span className="text-xs font-bold text-gray-400">0%</span>
             </div>
             <div className="w-full bg-black/40 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '0%' }}></div>
             </div>
           </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
           <p className="text-xs text-gray-500 max-w-sm font-medium">
             FinDNA intelligently categorizes your transaction flow and generates live safety envelopes around spending items based on your machine learning Persona.
           </p>
           <button className="text-xs font-bold text-brand-teal hover:text-brand-purple transition-colors">&rarr; Edit Auto-Buckets</button>
        </div>
      </div>
      
    </motion.div>
  );
}
