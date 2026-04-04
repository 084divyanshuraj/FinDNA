"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { IndianRupee, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Home, Utensils, Plane, PiggyBank, Target } from 'lucide-react';

export default function SmartBudgetManager() {
  // Form State
  const [income, setIncome] = useState(25000); 
  
  // Expenses (Budgeted)
  const [rent, setRent] = useState(8000);
  const [food, setFood] = useState(4000);
  const [travel, setTravel] = useState(2000);
  const [lifestyle, setLifestyle] = useState(3000);
  const [investments, setInvestments] = useState(5000);

  const totalExpense = rent + food + travel + lifestyle + investments;
  const remaining = income - totalExpense;
  const savingsRate = income > 0 ? ((income - totalExpense + investments) / income) * 100 : 0;

  // Pie Chart Data
  const data = [
    { name: 'Housing', value: rent, color: '#38bdf8' }, 
    { name: 'Food & Dining', value: food, color: '#4ade80' }, 
    { name: 'Travel', value: travel, color: '#c084fc' }, 
    { name: 'Lifestyle', value: lifestyle, color: '#fb923c' }, 
    { name: 'Investments', value: investments, color: '#10b981' }, 
  ].filter(item => item.value > 0);

  if (remaining > 0) {
    data.push({ name: 'Unallocated Cash', value: remaining, color: '#64748b' });
  }

  // Modern input field component
  const BudgetSlider = ({ label, value, setter, color, icon: Icon }: any) => (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2 font-montserrat">
          <Icon size={14} style={{ color }} /> {label}
        </label>
        <div className="flex items-center">
          <span className="text-gray-500 mr-1 text-sm">₹</span>
          <input
            type="number"
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="bg-transparent text-right text-white font-bold text-lg w-24 focus:outline-none transition-all"
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={income}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        className="w-full h-1.5 appearance-none rounded-full cursor-pointer transition-all"
        style={{
          background: `linear-gradient(to right, ${color} ${(value / income) * 100}%, rgba(255,255,255,0.05) ${(value / income) * 100}%)`
        }}
      />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex-1"
    >
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Smart Budget Manager</h1>
        <p className="text-sm text-gray-400 font-medium">Fine-tune your monthly allocations with AI-guided constraints.</p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/10 rounded-full blur-[30px] group-hover:bg-brand-teal/20 transition-all" />
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unallocated</h3>
            <div className="p-1.5 bg-brand-teal/20 rounded-lg"><Wallet size={16} className="text-brand-teal" /></div>
          </div>
          <p className="text-2xl font-bold text-white relative z-10 mb-1">₹{remaining.toLocaleString()}</p>
          <div className="w-full bg-white/5 rounded-full h-1 mt-2">
            <div className="bg-brand-teal h-1 rounded-full" style={{ width: `${(remaining/income)*100}%` }}></div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[30px] group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Income</h3>
            <div className="p-1.5 bg-emerald-500/20 rounded-lg"><TrendingUp size={16} className="text-emerald-400" /></div>
          </div>
          <div className="flex items-center text-2xl font-bold text-white relative z-10 mb-1">
             <span className="text-gray-500 mr-1 text-xl font-light">₹</span>
             <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="bg-transparent border-none focus:outline-none w-full" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-[30px] group-hover:bg-rose-500/20 transition-all" />
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Outflow</h3>
            <div className="p-1.5 bg-rose-500/20 rounded-lg"><TrendingDown size={16} className="text-rose-400" /></div>
          </div>
          <p className="text-2xl font-bold text-white relative z-10 mb-1">₹{(totalExpense).toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 font-bold uppercase">{((totalExpense/income)*100).toFixed(0)}% of income</p>
        </div>

        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-[30px] group-hover:bg-brand-purple/20 transition-all" />
          <div className="flex justify-between items-start mb-3 relative z-10">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Savings Rate</h3>
            <div className="p-1.5 bg-brand-purple/20 rounded-lg"><PiggyBank size={16} className="text-brand-purple" /></div>
          </div>
          <p className="text-2xl font-bold text-white relative z-10 mb-1">{savingsRate.toFixed(1)}%</p>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i < (savingsRate/20) ? 'bg-brand-purple' : 'bg-white/5'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
<<<<<<< HEAD
        
        {/* Left Column: Line Chart equivalent / Budget Controls */}
        <motion.div variants={itemVariants} className="lg:col-span-8 bg-[#131c2e]/90 border border-white/[0.03] rounded-3xl p-8 relative overflow-hidden shadow-xl">
           <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
           <div className="flex justify-between items-center mb-8 relative z-10">
             <div>
               <h2 className="text-lg font-bold text-white tracking-wide">Budget Allocator</h2>
               <p className="text-xs text-gray-500 font-medium mt-1">Adjust sliders to shape your financial DNA</p>
             </div>
             <div className="bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
               <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1">
                 <ArrowUpRight size={14}/> Dynamic Tuning
               </span>
             </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 relative z-10 mt-6">
              <BudgetSlider label="Housing/Rent" value={rent} setter={setRent} color="#38bdf8" icon={Home} />
              <BudgetSlider label="Food & Dining" value={food} setter={setFood} color="#4ade80" icon={Utensils} />
              <BudgetSlider label="Travel/Commute" value={travel} setter={setTravel} color="#c084fc" icon={Plane} />
              <BudgetSlider label="Lifestyle/Misc" value={lifestyle} setter={setLifestyle} color="#fb923c" icon={DollarSign} />
              <BudgetSlider label="Investments" value={investments} setter={setInvestments} color="#10b981" icon={TrendingUp} />
           </div>

           {/* Remaining Alert Bar */}
           <div className="mt-10 pt-8 border-t border-white/[0.05] relative z-10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">Unallocated Cash</p>
                <p className={`text-xl font-bold ${remaining < 0 ? 'text-rose-500' : 'text-white'}`}>
                  ${remaining.toLocaleString()}
                </p>
              </div>
              <button 
                className={`px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${remaining < 0 ? 'bg-rose-500 text-white cursor-not-allowed opacity-50' : 'bg-white text-black hover:bg-gray-200 hover:shadow-white/20'}`}
                disabled={remaining < 0}
              >
                Apply Allocations
              </button>
           </div>
        </motion.div>

        {/* Right Column: Asset Allocation Pie Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-4 bg-[#131c2e]/90 border border-white/[0.03] rounded-3xl p-8 shadow-xl flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-[#0a0f18]/50 pointer-events-none rounded-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-lg font-bold text-white tracking-wide">Expense Allocation</h2>
            <p className="text-xs text-gray-500 font-medium mt-1">Total Expected Outflow</p>
          </div>

          <div className="flex-1 min-h-[250px] relative z-10 flex items-center justify-center my-4">
             {/* Center Label for Donut */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Outflow</span>
               <span className="text-2xl font-bold text-white">${totalExpense.toLocaleString()}</span>
             </div>
             
             <ResponsiveContainer width="100%" height={280}>
               <PieChart>
                 <Pie
                   data={data}
                   cx="50%"
                   cy="50%"
                   innerRadius={85}
                   outerRadius={115}
                   paddingAngle={2}
                   dataKey="value"
                   stroke="none"
                   cornerRadius={4}
                 >
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <RechartsTooltip 
                   formatter={(value: any) => [`₹${value?.toLocaleString() ?? 0}`, 'Amount']}
                   contentStyle={{ backgroundColor: '#131c2e', borderColor: '#ffffff10', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                   itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                 />
               </PieChart>
             </ResponsiveContainer>
          </div>

          {/* Allocation Legends */}
          <div className="space-y-3 relative z-10">
            {data.map((item, i) => (
               <div key={i} className="flex items-center justify-between group">
                 <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}40` }}></div>
                   <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="text-xs text-gray-500">${item.value.toLocaleString()}</span>
                   <span className="text-sm font-bold text-white w-10 text-right">{Math.round((item.value / income) * 100) || 0}%</span>
                 </div>
=======
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-8 relative overflow-hidden shadow-sm">
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
             <div className="flex justify-between items-center mb-10 relative z-10">
               <div>
                 <h2 className="text-lg font-bold text-white">Dynamic Asset Allocator</h2>
                 <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-widest">Adjust to reshape DNA</p>
>>>>>>> 54345e80f9464ed8838ccd524216e24619a2c91c
               </div>
               <div className="p-2 bg-brand-teal/10 rounded-xl border border-brand-teal/20">
                 <Target size={20} className="text-brand-teal" />
               </div>
             </div>

             <div className="space-y-2 relative z-10">
                <BudgetSlider label="Rent/Housing" value={rent} setter={setRent} color="#38bdf8" icon={Home} />
                <BudgetSlider label="Food & Dining" value={food} setter={setFood} color="#4ade80" icon={Utensils} />
                <BudgetSlider label="Travel/Commute" value={travel} setter={setTravel} color="#c084fc" icon={Plane} />
                <BudgetSlider label="Lifestyle/Misc" value={lifestyle} setter={setLifestyle} color="#fb923c" icon={IndianRupee} />
                <BudgetSlider label="Investments" value={investments} setter={setInvestments} color="#10b981" icon={TrendingUp} />
             </div>

             <div className="mt-10 pt-8 border-t border-white/5 relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Final Budget Approval</p>
                  <p className={`text-xl font-bold ${remaining < 0 ? 'text-rose-500' : 'text-white'}`}>
                    ₹{totalExpense.toLocaleString()} Total
                  </p>
                </div>
                <button 
                  disabled={remaining < 0}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 ${remaining < 0 ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' : 'bg-brand-teal text-brand-dark hover:opacity-90 shadow-brand-teal/20'}`}
                >
                  Save Budget Plan
                </button>
             </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative min-h-[400px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-[50px] pointer-events-none" />
            
            <div className="text-center mb-8 w-full">
              <h2 className="text-lg font-bold text-white">Expense Distribution</h2>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest mt-1">AI Safety Envelope</p>
            </div>

            <div className="w-full aspect-square max-w-[280px] relative flex items-center justify-center">
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Total outflow</span>
                 <span className="text-2xl font-bold text-white">₹{totalExpense.toLocaleString()}</span>
               </div>
               
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={data}
                     cx="50%"
                     cy="50%"
                     innerRadius={80}
                     outerRadius={110}
                     paddingAngle={4}
                     dataKey="value"
                     stroke="none"
                     cornerRadius={6}
                   >
                     {data.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <RechartsTooltip 
                     formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                     contentStyle={{ backgroundColor: '#0b101e', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full mt-8 border-t border-white/5 pt-6">
              {data.map((item, i) => (
                 <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                     <span className="text-[10px] font-bold text-gray-400 uppercase truncate max-w-[80px]">{item.name}</span>
                   </div>
                   <span className="text-[11px] font-bold text-white">{Math.round((item.value / income) * 100)}%</span>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
