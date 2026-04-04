"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowRight } from 'lucide-react';

export default function InsightsPage() {
  const chartData = [
    { name: 'Jan', value: 1500 },
    { name: 'Feb', value: 1800 },
    { name: 'Mar', value: 1300 },
    { name: 'Apr', value: 2000 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl w-full"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Insights</h1>
        <p className="text-sm text-gray-400 font-medium">Understand your spending patterns and how they impact your savings.</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-[30px]" />
            <h3 className="text-xs font-bold text-gray-400 mb-2 relative z-10">Total spent this period</h3>
            <p className="text-3xl font-bold text-rose-400 relative z-10">₹0</p>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/10 rounded-full blur-[30px]" />
            <h3 className="text-xs font-bold text-gray-400 mb-2 relative z-10">Predicted monthly savings</h3>
            <p className="text-3xl font-bold text-brand-teal relative z-10">₹0</p>
         </div>
         <div className="glass-card bg-white/5 p-5 rounded-2xl border border-white/10 shadow-sm relative overflow-hidden">
            <h3 className="text-xs font-bold text-gray-400 mb-2 relative z-10">Top spending category</h3>
            <p className="text-3xl font-bold text-white relative z-10">N/A</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Savings Trend Chart */}
         <div className="lg:col-span-2 glass-card bg-white/5 rounded-2xl border border-white/10 shadow-sm p-6 relative">
            <h3 className="text-sm font-bold text-gray-300 mb-6 relative z-10">Savings trend</h3>
            <div className="h-64 w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <Tooltip cursor={{stroke: '#374151', strokeWidth: 1}} contentStyle={{backgroundColor: '#0b101e', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}} />
                    <Line type="monotone" dataKey="value" stroke="#4cc9f0" strokeWidth={2} dot={{r: 4, strokeWidth: 2, fill: '#0b101e', stroke: '#4cc9f0'}} activeDot={{r: 6, fill: '#4cc9f0'}} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Habits Analysis */}
         <div className="glass-card bg-white/5 rounded-2xl border border-white/10 shadow-sm p-6 relative overflow-hidden">
            <h3 className="text-sm font-bold text-gray-300 mb-4 relative z-10">Spending habits analysis</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-medium relative z-10">
              Based on your current expenses, the assistant estimates how much you can save and which categories take the biggest share of your budget. Focus on reducing non-essential categories like entertainment and shopping first.
            </p>
            {/* FinDNA Integration Plug */}
            <div className="mt-8 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl relative z-10">
               <h4 className="text-xs font-bold text-brand-purple uppercase mb-2">FinDNA Behavioral AI</h4>
               <p className="text-xs text-gray-400 mb-3">Connect your full transaction history to generate an exact persona.</p>
               <button className="w-full bg-gradient-to-r from-brand-teal to-brand-purple text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">Run Full ML Analysis <ArrowRight size={14}/></button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
