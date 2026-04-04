"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, X, Rocket, Car, Bike, Smartphone, Coins, Calendar, IndianRupee, TrendingUp, CheckCircle2, Loader2 } from 'lucide-react';
import { addGoal, getGoals } from '@/app/actions/goals';
import { supabase } from '@/lib/supabase';

const CATEGORIES = [
  { id: 'car', name: 'Car', icon: Car, color: '#38bdf8', rate: 0.06 },
  { id: 'bike', name: 'Bike', icon: Bike, color: '#fb923c', rate: 0.05 },
  { id: 'electronics', name: 'Electronics', icon: Smartphone, color: '#c084fc', rate: -0.05 },
  { id: 'gold', name: 'Gold', icon: Coins, color: '#fbbf24', rate: 0.08 },
  { id: 'other', name: 'Other', icon: Target, color: '#94a3b8', rate: 0.05 }
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Form State
  const [goalName, setGoalName] = useState('');
  const [goalType, setGoalType] = useState('buy'); // 'buy' or 'save'
  const [category, setCategory] = useState('car');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState(12);
  const [isSaving, setIsSaving] = useState(false);

  // ML Estimations (Local logic mirrored from backend)
  const [estimation, setEstimation] = useState({ futurePrice: 0, monthlySaving: 0 });

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const result = await getGoals(user.id);
        if (result.success) setGoals(result.goals || []);
      }
      setLoading(false);
    }
    init();
  }, []);

  // Update estimations in real-time
  useEffect(() => {
    const price = Number(amount) || 0;
    if (price <= 0) return;

    if (goalType === 'save') {
      setEstimation({ futurePrice: price, monthlySaving: price / months });
    } else {
      const selectedCat = CATEGORIES.find(c => c.id === category) || CATEGORIES[4];
      const years = months / 12;
      const futurePrice = price * Math.pow((1 + selectedCat.rate), years);
      setEstimation({ futurePrice: Math.round(futurePrice), monthlySaving: Math.round(futurePrice / months) });
    }
  }, [amount, months, category, goalType]);

  const handleCreateGoal = async () => {
    if (!user || !goalName || !amount) return;
    setIsSaving(true);
    
    const result = await addGoal({
      userId: user.id,
      userEmail: user.email,
      name: goalName,
      type: goalType,
      category: category,
      targetAmount: Number(amount),
      months: months
    });

    if (result.success) {
      setGoals([result.goal, ...goals]);
      setIsModalOpen(false);
      resetForm();
    }
    setIsSaving(false);
  };

  const resetForm = () => {
    setGoalName('');
    setAmount('');
    setMonths(12);
    setGoalType('buy');
    setCategory('car');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Financial Goals</h1>
          <p className="text-sm text-gray-400 font-medium">Set and track your savings goals to achieve your financial dreams.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-[0_0_15px_rgba(76,201,240,0.3)] flex items-center gap-2"
        >
          <Plus size={18} /> New Goal
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="animate-spin text-brand-teal" size={32} />
        </div>
      ) : goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const cat = CATEGORIES.find(c => c.id === goal.category) || CATEGORIES[4];
            const progress = (goal.savedAmount / goal.targetAmount) * 100;
            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card bg-white/5 p-6 rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-opacity-20`} style={{ backgroundColor: `${cat.color}33` }}>
                    <cat.icon size={24} style={{ color: cat.color }} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{goal.type}ING</span>
                    <p className="text-lg font-bold text-white">₹{goal.targetAmount.toLocaleString()}</p>
                  </div>
                </div>
                
                <h3 className="text-white font-bold mb-1 truncate">{goal.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{goal.months} Months Plan</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(progress, 5)}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}66` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 pt-1">
                    <span>₹{goal.savedAmount.toLocaleString()}</span>
                    <span>Target: {new Date(new Date(goal.createdAt).setMonth(new Date(goal.createdAt).getMonth() + goal.months)).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card bg-white/5 rounded-2xl border border-white/10 p-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] pointer-events-none" />
           <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 relative z-10">
             <Target size={32} className="text-gray-500" strokeWidth={1.5} />
           </div>
           <p className="text-white font-bold mb-4 relative z-10">No financial goals yet</p>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="bg-brand-teal hover:bg-brand-teal/90 text-brand-dark px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm relative z-10"
           >
             + Create Your First Goal
           </button>
        </div>
      )}

      {/* New Goal Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#131c2e] border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Rocket className="text-brand-teal" /> Create New Goal
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Goal Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. My New Bike"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-teal transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Type</label>
                    <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                      <button 
                        onClick={() => setGoalType('buy')}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${goalType === 'buy' ? 'bg-brand-teal text-brand-dark' : 'text-gray-400'}`}
                      >
                        Buy Item
                      </button>
                      <button 
                         onClick={() => setGoalType('save')}
                         className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${goalType === 'save' ? 'bg-brand-teal text-brand-dark' : 'text-gray-400'}`}
                      >
                        Just Save
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Target Date (Months)</label>
                    <input 
                      type="number" 
                      value={months}
                      onChange={(e) => setMonths(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-teal"
                    />
                  </div>
                </div>

                {goalType === 'buy' && (
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Category</label>
                    <div className="grid grid-cols-5 gap-3">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${category === cat.id ? 'border-brand-teal bg-brand-teal/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                        >
                          <cat.icon size={18} style={{ color: category === cat.id ? '#4cf0af' : '#64748b' }} />
                          <span className="text-[9px] font-bold text-gray-500 uppercase">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Price / Target Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="50,000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold text-xl focus:outline-none focus:border-brand-teal"
                  />
                </div>

                {/* ML Smart Insights Drawer */}
                {Number(amount) > 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-brand-teal/5 border border-brand-teal/20 rounded-2xl p-5"
                  >
                    <h4 className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3 flex items-center gap-2">
                       <TrendingUp size={12}/> FinDNA Smart Estimation
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                       <div>
                         <p className="text-[10px] text-gray-500 uppercase">Estimated Future Price</p>
                         <p className="text-lg font-bold text-white">₹{estimation.futurePrice.toLocaleString()}</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-gray-500 uppercase">Monthly Savings Goal</p>
                         <p className="text-lg font-bold text-brand-teal">₹{estimation.monthlySaving.toLocaleString()} / mo</p>
                       </div>
                    </div>
                  </motion.div>
                )}

                <button 
                  onClick={handleCreateGoal}
                  disabled={isSaving || !goalName || !amount}
                  className="w-full bg-brand-teal hover:bg-brand-teal/90 text-brand-dark font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
                  {isSaving ? 'Creating...' : 'Set Financial Goal'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
