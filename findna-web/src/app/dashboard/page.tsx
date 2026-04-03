"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-400">Here's an overview of your financial DNA.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Placeholder cards */}
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Balance</h3>
          <p className="text-3xl font-bold text-white">$12,450.00</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-1">Monthly Expenses</h3>
          <p className="text-3xl font-bold text-rose-400">$2,340.00</p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/5">
          <h3 className="text-gray-400 text-sm font-medium mb-1">DNA Score</h3>
          <p className="text-3xl font-bold text-brand-teal">85/100</p>
        </div>
      </div>
      
      <div className="glass-card p-8 rounded-2xl border border-white/5 min-h-[400px] flex items-center justify-center">
         <p className="text-gray-500">Dashboard Overview Component Coming Soon</p>
      </div>
    </motion.div>
  );
}
