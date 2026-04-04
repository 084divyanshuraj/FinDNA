"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

export default function ExpensesPage() {
  const [tab, setTab] = useState<'income'|'expense'>('expense');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl w-full"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Transaction Manager</h1>
        <p className="text-sm text-gray-400 font-medium">Log your income and expenses to track your money flow and get AI-powered insights.</p>
      </div>

      <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm mb-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px]" />
         <h3 className="font-bold text-white text-sm mb-5 relative z-10">Add Transaction</h3>
         
         <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/5 mb-6 w-full gap-2 relative z-10">
            <button 
              onClick={() => setTab('income')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${tab === 'income' ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-gray-500 hover:text-gray-300'}`}
            >
               📄 Income
            </button>
            <button 
              onClick={() => setTab('expense')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${tab === 'expense' ? 'bg-rose-500/20 text-rose-400 shadow-md border border-rose-500/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
               📋 Expense
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
            <div>
              <label className="block text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Category</label>
              <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal text-white appearance-none">
                 <option className="bg-[#0b101e]">Food</option>
                 <option className="bg-[#0b101e]">Rent</option>
                 <option className="bg-[#0b101e]">Entertainment</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Amount (₹)</label>
              <input type="number" placeholder="0" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal text-white placeholder-gray-600" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Date</label>
              <input type="date" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal text-white [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">Description (Optional)</label>
              <input type="text" placeholder="e.g., Salary, Groceries" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal text-white placeholder-gray-600" />
            </div>
         </div>

         <button className={`w-full py-4 rounded-xl text-white font-bold text-sm transition-opacity hover:opacity-90 shadow-sm relative z-10 ${tab === 'expense' ? 'bg-rose-600' : 'bg-brand-teal text-brand-dark'}`}>
           Add {tab === 'income' ? 'Income' : 'Expense'}
         </button>
      </div>

      <div className="glass-card bg-white/5 rounded-2xl border border-white/10 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-white/5">
           <h3 className="font-bold text-white text-sm">All transactions</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-black/20 border-b border-white/5">
                     <th className="px-6 py-4 text-xs font-bold text-gray-400">Date</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-400">Type</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-400">Category</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-400">Description</th>
                     <th className="px-6 py-4 text-xs font-bold text-gray-400 text-right">Amount (₹)</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                     <td className="px-6 py-4 font-medium text-gray-300">Apr 03, 26</td>
                     <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/20">
                           <ShoppingCart size={12} /> Expense
                        </span>
                     </td>
                     <td className="px-6 py-4 font-medium text-gray-400">Rent</td>
                     <td className="px-6 py-4 text-gray-600">-</td>
                     <td className="px-6 py-4 text-right font-bold text-rose-400">-₹25,000</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
    </motion.div>
  );
}
