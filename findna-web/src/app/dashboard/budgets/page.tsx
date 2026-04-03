"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export default function BudgetsPage() {
  const budgets = [
    { name: "Rent & Housing", spent: 1500, limit: 1600, color: "bg-brand-teal" },
    { name: "Food & Dining", spent: 450, limit: 600, color: "bg-brand-purple" },
    { name: "Travel & Commute", spent: 200, limit: 300, color: "bg-emerald-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Budget Manager</h1>
        <p className="text-gray-400">Set limits and stick to them.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5">
           <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
             <Wallet size={20} className="text-brand-teal" />
             Monthly Budgets
           </h3>
           
           <div className="space-y-6">
             {budgets.map((b, i) => (
               <div key={i}>
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-gray-300">{b.name}</span>
                   <span className="text-gray-400">${b.spent} / ${b.limit}</span>
                 </div>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className={`h-full rounded-full ${b.color}`} style={{ width: `${(b.spent/b.limit)*100}%` }}></div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-h-[300px]">
           <p className="text-gray-500 mb-4">Budget Insights AI</p>
           <button className="px-6 py-2 rounded-lg border border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 transition-colors">
             Analyze Spending
           </button>
        </div>
      </div>
    </motion.div>
  );
}
