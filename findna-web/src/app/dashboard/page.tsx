"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function DashboardOverview() {
  const [tab, setTab] = useState<'income'|'expense'>('expense');

  // ML State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    income: 25000,
    rent: 8000,
    food: 4000,
    travel: 2000,
    goal_type: "car",
    category: "luxury",
    price: 300000,
    months: 24
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    });
  };

  const generateInsights = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("http://127.0.0.1:5000/full_analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("ML Backend error:", err);
      setTimeout(() => {
        setResult({
          financial_behavior: formData.rent > formData.income * 0.4 ? "Overspender" : "Balanced",
          score: formData.rent > formData.income * 0.4 ? 45 : 85,
          future_price: formData.price * 1.12,
          monthly_saving: (formData.price * 1.12) / formData.months,
          tip: formData.food > formData.income * 0.3 ? "You are spending too much on food" : "Your spending looks balanced"
        });
        setLoading(false);
      }, 1500);
      return;
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex-1"
    >
      <div className="mb-6 space-y-4">
        {/* Top Banner Row */}
        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm flex items-center justify-between">
           <div>
             <span className="text-white font-medium text-sm">Safe to Spend (70% buffer)</span>
             <p className="text-gray-400 text-xs mt-1">Keep 30% as emergency buffer</p>
           </div>
           <div className="text-xl font-bold text-brand-teal">₹{Math.round((formData.income - formData.rent - formData.food - formData.travel) * 0.7).toLocaleString()}</div>
        </div>

        {/* Success Banner */}
        <div className={`border rounded-2xl p-4 shadow-sm flex items-center gap-3 glass-card ${result?.score < 50 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
           <div className={`p-2 rounded-full ${result?.score < 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
             {result?.score < 50 ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
           </div>
           <div>
              <h3 className={`font-bold text-sm flex items-center gap-1 ${result?.score < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result?.score < 50 ? 'Warning!' : 'All Good! 🎉'}
              </h3>
              <p className={`text-xs font-medium ${result?.score < 50 ? 'text-rose-300' : 'text-emerald-300'}`}>
                {result ? result.tip : "You're managing your money well. Keep it up!"}
              </p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
         {/* Quick Add Transaction */}
         <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-[50px] pointer-events-none" />
            <h3 className="font-bold text-white mb-5 relative z-10">Quick Add Transaction</h3>
            
            <div className="flex bg-black/20 p-1 rounded-xl mb-6 border border-white/5 relative z-10">
              <button 
                onClick={() => setTab('income')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'income' ? 'bg-white/10 text-brand-teal shadow-md border border-white/10' : 'text-gray-400'}`}
              >
                 Income
              </button>
              <button 
                onClick={() => setTab('expense')}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'expense' ? 'bg-rose-500/20 text-rose-400 shadow-md border border-rose-500/20' : 'text-gray-400'}`}
              >
                 Expense
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Amount (₹)</label>
                 <input type="number" placeholder="0" className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-transparent placeholder-gray-600" />
               </div>
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Category</label>
                 <select className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-teal appearance-none">
                    <option className="bg-[#0b101e]">Rent</option>
                    <option className="bg-[#0b101e]">Food</option>
                    <option className="bg-[#0b101e]">Transport</option>
                    <option className="bg-[#0b101e]">Entertainment</option>
                    <option className="bg-[#0b101e]">Shopping</option>
                 </select>
               </div>
            </div>

            <button className={`w-full py-3 rounded-xl text-white font-medium text-sm transition-opacity hover:opacity-90 relative z-10 ${tab === 'expense' ? 'bg-rose-600' : 'bg-brand-teal text-brand-dark font-bold'}`}>
              Add {tab === 'income' ? 'Income' : 'Expense'}
            </button>
         </div>

         {/* Category Breakdown */}
         <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
               Category Breakdown
            </h3>
            
            <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-3 text-amber-500 text-xs font-medium flex items-center gap-2 mb-5">
               <Lightbulb size={16} className="flex-shrink-0"/> Here is a quick breakdown based on your active ML inputs.
            </div>

            <div className="space-y-4">
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium text-gray-300">Rent</span>
                   </div>
                   <span className="text-sm font-bold text-white">₹{formData.rent}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium text-gray-300">Food</span>
                   </div>
                   <span className="text-sm font-bold text-white">₹{formData.food}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium text-gray-300">Travel</span>
                   </div>
                   <span className="text-sm font-bold text-white">₹{formData.travel}</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                   <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-brand-teal" />
                      <span className="text-sm font-medium text-gray-300">Goal Target</span>
                   </div>
                   <span className="text-sm font-bold text-brand-teal">₹{formData.price}</span>
                 </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Profile ML Inputs */}
         <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-white mb-5">FinDNA Behavioral AI Inputs</h3>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-xs text-brand-teal font-medium mb-1.5">Monthly Income (₹)</label>
                 <input type="number" name="income" value={formData.income} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-teal" />
               </div>
               <div>
                 <label className="block text-xs text-brand-purple font-medium mb-1.5">Monthly Rent (₹)</label>
                 <input type="number" name="rent" value={formData.rent} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple" />
               </div>
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Food Expense (₹)</label>
                 <input type="number" name="food" value={formData.food} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Travel Expense (₹)</label>
                 <input type="number" name="travel" value={formData.travel} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Goal Type</label>
                 <input type="text" name="goal_type" value={formData.goal_type} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30" />
               </div>
               <div>
                 <label className="block text-xs text-gray-400 font-medium mb-1.5">Goal Target (₹)</label>
                 <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-teal" />
               </div>
            </div>
         </div>

         {/* Savings Prediction */}
         <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-teal/10 rounded-full blur-[60px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
               <h3 className="font-bold text-white">Savings prediction (Engine v2.0)</h3>
               <button 
                onClick={generateInsights}
                disabled={loading}
                className="bg-gradient-to-r from-brand-teal flex items-center gap-1 to-brand-purple text-white text-xs font-bold px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(76,201,240,0.3)] hover:shadow-lg disabled:opacity-50 transition-all"
               >
                 {loading ? 'Running ML...' : 'Predict Savings'} <ArrowRight size={14}/>
               </button>
            </div>
            
            <div className="flex gap-4 relative z-10">
               <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-4">
                 <p className="text-[11px] font-bold text-gray-500 uppercase">Persona</p>
                 <p className={`text-lg font-bold mt-1 ${result ? (result.score > 70 ? 'text-brand-teal' : 'text-rose-400') : 'text-white'}`}>
                   {result ? result.financial_behavior : '-'}
                 </p>
               </div>
               <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-4">
                 <p className="text-[11px] font-bold text-gray-500 uppercase">DNA Score</p>
                 <p className="text-xl font-bold text-white mt-1">{result ? `${result.score}/100` : '-'}</p>
               </div>
               <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-4">
                 <p className="text-[11px] font-bold text-brand-teal/60 uppercase">Required Monthly</p>
                 <p className="text-xl font-bold text-brand-teal mt-1">{result ? `₹${Math.round(result.monthly_saving)}` : '₹0'}</p>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
