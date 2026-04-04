"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Home, Utensils, Plane, PiggyBank } from 'lucide-react';

export default function SmartBudgetManager() {
  // Form State
  const [income, setIncome] = useState(68400); // Set high default to match reference vibe
  
  // Expenses
  const [rent, setRent] = useState(15000);
  const [food, setFood] = useState(8000);
  const [travel, setTravel] = useState(4000);
  const [lifestyle, setLifestyle] = useState(6000);
  const [investments, setInvestments] = useState(20000);

  const totalExpense = rent + food + travel + lifestyle + investments;
  const remaining = income - totalExpense;
  const savingsRate = income > 0 ? ((income - totalExpense + investments) / income) * 100 : 0;

  // Pie Chart Data
  const data = [
    { name: 'Housing', value: rent, color: '#38bdf8' }, // Sky Blue
    { name: 'Food & Dining', value: food, color: '#4ade80' }, // Green
    { name: 'Travel', value: travel, color: '#c084fc' }, // Purple
    { name: 'Lifestyle', value: lifestyle, color: '#fb923c' }, // Orange
    { name: 'Investments', value: investments, color: '#10b981' }, // Emerald
  ].filter(item => item.value > 0);

  // If there's unallocated cash, show it as Cash
  if (remaining > 0) {
    data.push({ name: 'Unallocated Cash', value: remaining, color: '#64748b' }); // Slate
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  // Modern input field component
  const BudgetSlider = ({ label, value, setter, color, icon: Icon }: any) => (
    <div className="mb-6 group">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Icon size={14} style={{ color }} /> {label}
        </label>
        <div className="flex items-center">
          <span className="text-gray-500 mr-1 text-sm">$</span>
          <input
            type="number"
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="bg-transparent text-right text-white font-bold text-lg w-24 focus:outline-none focus:border-b focus:border-gray-500 transition-all"
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
          background: `linear-gradient(to right, ${color} ${(value / income) * 100}%, #1e293b ${(value / income) * 100}%)`
        }}
      />
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-full bg-[#0a0f18] text-white p-2 sm:p-6 lg:p-8 -mx-3 -mt-6 lg:-mx-10 rounded-3xl"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            Hello, User <span className="text-2xl animate-waving-hand">👋</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium">Saturday, April 4, 2026 - Here's your financial overview</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex gap-3 mt-4 md:mt-0">
          <button className="flex flex-col items-center justify-center bg-[#131c2e] hover:bg-[#1a263d] border border-white/5 rounded-xl p-3 w-20 transition-all duration-300">
            <ArrowUpRight size={18} className="text-white mb-1.5" />
            <span className="text-[10px] font-medium text-gray-300 uppercase">Transfer</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-[#131c2e] hover:bg-[#1a263d] border border-white/5 rounded-xl p-3 w-20 transition-all duration-300">
            <TrendingUp size={18} className="text-white mb-1.5" />
            <span className="text-[10px] font-medium text-gray-300 uppercase">Invest</span>
          </button>
          <button className="flex flex-col items-center justify-center bg-[#131c2e] hover:bg-[#1a263d] border border-white/5 rounded-xl p-3 w-20 transition-all duration-300">
            <CreditCard size={18} className="text-white mb-1.5" />
            <span className="text-[10px] font-medium text-gray-300 uppercase">Pay Bills</span>
          </button>
        </motion.div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={itemVariants} className="bg-[#131c2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.03] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-all" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Available</h3>
            <div className="p-1.5 bg-blue-500/20 rounded-lg"><Wallet size={16} className="text-blue-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white relative z-10 mb-2">${remaining.toLocaleString()}</p>
          <p className="text-xs font-semibold text-emerald-400 flex items-center relative z-10"><ArrowUpRight size={14} className="mr-1"/> +3.8% vs last month</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#131c2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.03] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-all" />
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Monthly Income</h3>
            <div className="p-1.5 bg-emerald-500/20 rounded-lg"><TrendingUp size={16} className="text-emerald-400" /></div>
          </div>
          <div className="flex items-center text-3xl font-bold text-white relative z-10 mb-2 group-hover:scale-105 transition-transform origin-left">
             <span className="text-gray-500 mr-1 text-2xl font-light">$</span>
             <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="bg-transparent border-none focus:outline-none w-full appearance-none m-0 p-0" />
          </div>
          <p className="text-xs font-semibold text-emerald-400 flex items-center relative z-10"><ArrowUpRight size={14} className="mr-1"/> +8.2% vs last month</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#131c2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.03] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] group-hover:bg-rose-500/20 transition-all" />
          <div className="absolute top-0 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Monthly Expense</h3>
            <div className="p-1.5 bg-rose-500/20 rounded-lg"><TrendingDown size={16} className="text-rose-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white relative z-10 mb-2">${(totalExpense - investments).toLocaleString()}</p>
          <p className="text-xs font-semibold text-rose-400 flex items-center relative z-10"><ArrowDownRight size={14} className="mr-1"/> -2.1% vs last month</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-[#131c2e]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/[0.03] shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-all" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Savings Rate</h3>
            <div className="p-1.5 bg-purple-500/20 rounded-lg"><PiggyBank size={16} className="text-purple-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white relative z-10 mb-2">{savingsRate.toFixed(1)}%</p>
          <p className="text-xs font-semibold text-emerald-400 flex items-center relative z-10"><ArrowUpRight size={14} className="mr-1"/> +5.3pp vs last month</p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
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
               </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
