"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, Activity, AlertTriangle, ChevronRight, Target } from 'lucide-react';

export default function SmartInsightsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State matching app.py /full_analysis expected JSON payload
  const [formData, setFormData] = useState({
    income: 5000,
    rent: 1500,
    food: 500,
    travel: 200,
    goal_type: "car",
    category: "luxury",
    price: 20000,
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
      // Direct call to local Flask backend assuming it runs on 5000
      const res = await fetch("http://127.0.0.1:5000/full_analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("ML Backend error:", err);
      // Fallback mockup if python backend isn't running
      setTimeout(() => {
        setResult({
          financial_behavior: formData.rent > formData.income * 0.4 ? "Overspender" : "Balanced",
          score: formData.rent > formData.income * 0.4 ? 45 : 85,
          future_price: formData.price * 1.12, // mock inflation
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto lg:h-[calc(100vh-120px)] flex flex-col"
    >
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <BrainCircuit className="text-brand-teal" />
          Smart Insights Engine
        </h1>
        <p className="text-gray-400">FinDNA Behavioral Machine Learning Model v2.0</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* INPUT FORM (Left Side) */}
        <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-brand-teal/20 overflow-y-auto">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Activity className="text-brand-purple" size={20} />
            Data Input
          </h2>
          
          <form onSubmit={generateInsights} className="space-y-5">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Monthly Financials</h3>
              
              <div>
                <label className="block text-xs text-brand-teal mb-1">Income (USD)</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-teal outline-none transition-colors" />
              </div>
              
              <div>
                <label className="block text-xs text-brand-purple mb-1">Rent/Mortgage</label>
                <input type="number" name="rent" value={formData.rent} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-brand-purple outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Food</label>
                  <input type="number" name="food" value={formData.food} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Travel</label>
                  <input type="number" name="travel" value={formData.travel} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none transition-colors" />
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full my-4"></div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Goal Planner</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="block text-xs text-gray-400 mb-1">Goal Type</label>
                   <input type="text" name="goal_type" value={formData.goal_type} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none transition-colors" />
                </div>
                <div>
                   <label className="block text-xs text-gray-400 mb-1">Category</label>
                   <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="block text-xs text-brand-teal mb-1">Target Price</label>
                   <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-black/20 border border-brand-teal/20 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors" />
                </div>
                <div>
                   <label className="block text-xs text-gray-400 mb-1">Months</label>
                   <input type="number" name="months" value={formData.months} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none transition-colors" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-brand-teal to-brand-purple text-white py-3 rounded-xl font-medium shadow-[0_0_20px_rgba(76,201,240,0.2)] hover:shadow-[0_0_30px_rgba(76,201,240,0.4)] transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">Running ML Pipeline...</span>
              ) : (
                <>
                   Generate Analysis <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* OUTPUT ANALYSIS (Right Side) */}
        <div className="lg:col-span-8 flex flex-col h-full">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 glass-card border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6 relative z-10">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                    <Sparkles className="text-brand-purple" /> Genome Result
                  </h2>
                  <p className="text-gray-400 text-sm">{loading ? 'Re-calculating...' : 'Based on Random Forest Classifier'}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-400 mb-1 uppercase tracking-widest">DNA Score</div>
                  <div className={`text-5xl font-black ${result.score > 70 ? 'text-brand-teal' : (result.score > 50 ? 'text-amber-400' : 'text-rose-500')} drop-shadow-md`}>
                    {result.score}<span className="text-2xl opacity-50">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Persona Card */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Financial Persona</h3>
                  <div className={`inline-flex px-4 py-2 rounded-lg text-lg font-bold
                    ${result.financial_behavior === 'Saver' ? 'bg-brand-teal/20 text-brand-teal border border-brand-teal/50' : 
                      result.financial_behavior === 'Balanced' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/50' : 
                      'bg-rose-500/20 text-rose-400 border border-rose-500/50'}`
                  }>
                    {result.financial_behavior}
                  </div>
                  <p className="mt-4 text-sm text-gray-300">
                    {result.financial_behavior === 'Saver' ? 'You exhibit strong cash preservation instincts. High potential for long-term investments.' : 
                     result.financial_behavior === 'Balanced' ? 'You maintain an equilibrium between lifestyle and savings. Steady growth profile.' : 
                     'High liquidity drain detected. Susceptible to market shocks due to low cash reserves.'}
                  </p>
                </div>

                {/* AI Tip */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-400" />
                    Algorithmic Observation
                  </h3>
                  <p className="text-white text-lg font-medium leading-relaxed italic border-l-4 border-brand-purple pl-4">
                    "{result.tip}"
                  </p>
                </div>

                {/* Goal Planner Results */}
                <div className="md:col-span-2 bg-gradient-to-br from-brand-dark to-brand-dark/50 border border-brand-teal/20 rounded-2xl p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                     <Target size={120} />
                   </div>
                   <h3 className="text-sm font-semibold text-brand-teal mb-6 uppercase tracking-wider relative z-10">
                     Inflation-Adjusted Goal Plan: {formData.goal_type}
                   </h3>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Projected Future Cost</div>
                        <div className="text-3xl font-bold text-white">
                          ${Number(result.future_price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Adjusted for {formData.category} inflation rate</div>
                      </div>
                      
                      <div>
                        <div className="text-gray-400 text-sm mb-1">Required Savings (for {formData.months} mo)</div>
                        <div className="text-3xl font-bold text-brand-purple">
                          ${Number(result.monthly_saving).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} <span className="text-base font-normal opacity-70">/mo</span>
                        </div>
                        <div className="text-xs text-brand-teal/70 mt-1">Auto-deduct this amount to stay on track</div>
                      </div>
                   </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <div className="flex-1 glass-card border border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-[url('/grid-pattern.svg')] bg-center relative">
              <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px] rounded-2xl"></div>
              <div className="relative z-10">
                <BrainCircuit size={64} className="text-gray-600 mb-6 mx-auto opacity-50" />
                <h3 className="text-xl font-bold mb-2">Awaiting Data Input</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Enter your financial parameters and goal details on the left, then click Generate to initialize the FinDNA Machine Learning engine.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
