"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ReceiptText } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
          <p className="text-gray-400">Monitor your daily spending habits.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(76,201,240,0.3)]">
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2"><ReceiptText size={18} className="text-brand-purple" /> Recent Transactions</h3>
        </div>
        <div className="p-8 text-center bg-black/20">
          <p className="text-gray-500 mb-2">No expenses added yet.</p>
          <p className="text-sm text-gray-600">Click the button above to start tracking.</p>
        </div>
      </div>
    </motion.div>
  );
}
