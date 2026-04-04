"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb, CheckCircle2, AlertTriangle, ArrowRight, Target,
  Home, Utensils, Car, Play, ShoppingBag, Briefcase, TrendingUp
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { addTransaction, getTransactions } from '@/app/actions/transactions';
import { getGoals } from '@/app/actions/goals';

const CATEGORY_CONFIG: any = {
  Rent: { icon: Home, color: '#f87171' },
  Food: { icon: Utensils, color: '#facc15' },
  Transport: { icon: Car, color: '#38bdf8' },
  Entertainment: { icon: Play, color: '#c084fc' },
  Shopping: { icon: ShoppingBag, color: '#fb923c' },
  Other: { icon: Briefcase, color: '#94a3b8' }
};

export default function DashboardOverview() {
  const [tab, setTab] = useState<'income' | 'expense'>('expense');

  // ML & Data State
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Quick Add State
  const [txAmount, setTxAmount] = useState<number | string>("");
  const [txCategory, setTxCategory] = useState("Rent");
  const [addingTx, setAddingTx] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    income: 25000,
    rent: 8000,
    food: 4000,
    travel: 2000,
    goal_type: "buy",
    category: "car",
    price: 300000,
    months: 24
  });

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const [goalRes, txRes] = await Promise.all([
        getGoals(user.id),
        getTransactions(user.id)
      ]);
      if (goalRes.success) setGoals(goalRes.goals?.slice(0, 2) || []);
      if (txRes.success) setTransactions(txRes.transactions || []);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Aggregate income vs expense
  const getCashFlow = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    return { totalIncome, totalExpense };
  };

  const { totalIncome, totalExpense } = getCashFlow();
  const maxVal = Math.max(totalIncome, totalExpense, 1);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    });
  };

  const generateInsights = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 15000);

      const res = await fetch("https://findna.onrender.com/full_analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(id);

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error("API_ERROR");
      }
    } catch (err: any) {
      const isTimeout = err.name === 'AbortError';

      setResult({
        financial_behavior: formData.rent > formData.income * 0.4 ? "Overspender" : "Balanced",
        score: formData.rent > formData.income * 0.4 ? 45 : 85,
        future_price: formData.price * 1.12,
        monthly_saving: (formData.price * 1.12) / formData.months,
        tip: isTimeout
          ? "Note: Render server is waking up. Using local estimates..."
          : "Note: Connection issue. Using local estimates..."
      });
    }
    setLoading(false);
  };

  const handleAddTransaction = async () => {
    if (!txAmount || Number(txAmount) <= 0) return alert("Please enter a valid amount");

    setAddingTx(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const result = await addTransaction({
        type: tab,
        amount: Number(txAmount),
        category: tab === 'expense' ? txCategory : 'Income',
        userId: user.id,
        userEmail: user.email
      });

      if (result.success) {
        setTxAmount("");
        loadData(); // Refresh list
      } else {
        alert("Failed to add transaction");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setAddingTx(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex-1"
    >
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Safe to Spend */}
        <div className="bg-white/5 border border-white/10 glass-card rounded-2xl p-5 shadow-sm flex items-center justify-between col-span-1 md:col-span-2">
          <div>
            <span className="text-white font-medium text-sm">Safe to Spend (70% buffer)</span>
            <p className="text-gray-400 text-xs mt-1">Keep 30% as emergency buffer</p>
          </div>
          <div className="text-xl font-bold text-brand-teal">₹{Math.round((formData.income - formData.rent - formData.food - formData.travel) * 0.7).toLocaleString()}</div>
        </div>

        {/* DNA Status */}
        <div className={`border rounded-2xl p-4 shadow-sm flex items-center gap-3 glass-card ${result?.score < 50 ? 'bg-rose-500/10 border-rose-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
          <div className={`p-2 rounded-full ${result?.score < 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {result?.score < 50 ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          </div>
          <div className="overflow-hidden">
            <h3 className={`font-bold text-xs ${result?.score < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {result?.score < 50 ? 'Warning!' : 'DNA: Healthy'}
            </h3>
            <p className="text-[10px] text-gray-400 truncate">
              {result ? result.tip : "Manage your DNA score"}
            </p>
          </div>
        </div>
      </div>

      {/* Goal Summary Row */}
      {goals.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal: any) => (
            <div key={goal.id} className="bg-white/5 border border-white/10 glass-card rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-[30px]" />
              <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-brand-teal">
                <Target size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-end mb-1">
                  <h4 className="text-white text-xs font-bold truncate">{goal.name}</h4>
                  <span className="text-brand-teal text-[10px] font-bold">{Math.round((goal.savedAmount / goal.targetAmount) * 100)}%</span>
                </div>
                <div className="w-full bg-black/40 h-1 rounded-full overflow-hidden">
                  <div className="bg-brand-teal h-full transition-all duration-1000" style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}></div>
                </div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Quick Add Transaction */}
        <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-[50px] pointer-events-none" />
          <h3 className="font-bold text-white mb-5 relative z-10">Quick Add Transaction</h3>

          <div className="flex bg-black/20 p-1 rounded-xl mb-6 border border-white/10 relative z-10">
            <button
              onClick={() => setTab('income')}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${tab === 'income' ? 'bg-brand-teal/10 text-brand-teal shadow-md border border-brand-teal/30' : 'text-gray-400'}`}
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
              <input
                type="number"
                placeholder="0"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-teal placeholder-gray-600"
              />
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${tab === 'income' ? 'text-gray-600' : 'text-gray-400'}`}>Category</label>
              <select
                value={txCategory}
                onChange={(e) => setTxCategory(e.target.value)}
                disabled={tab === 'income'}
                className={`w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-teal appearance-none ${tab === 'income' ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {Object.keys(CATEGORY_CONFIG).map(cat => (
                  <option key={cat} value={cat} className="bg-[#0b101e]">{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAddTransaction}
            disabled={addingTx}
            className={`w-full py-3 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] relative z-10 ${tab === 'expense' ? 'bg-rose-600' : 'bg-brand-teal text-brand-dark font-bold'} ${addingTx ? 'opacity-50 cursor-wait' : ''}`}
          >
            {addingTx ? 'Saving...' : `Add ${tab === 'income' ? 'Income' : 'Expense'}`}
          </button>
        </div>

        {/* Recent Transactions Table (Replacing Cash Flow Overview) */}
        <div className="glass-card bg-white/5 rounded-2xl p-6 border border-white/10 shadow-sm relative overflow-hidden flex flex-col h-full min-h-[400px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold text-white flex items-center gap-2">
              Recent Transactions
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400">₹{totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span className="text-[10px] font-bold text-rose-400">₹{totalExpense.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
            {transactions.length > 0 ? (
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-[10px] text-gray-500 uppercase tracking-wider">
                    <th className="pb-2 font-bold px-2">Category</th>
                    <th className="pb-2 font-bold">Date</th>
                    <th className="pb-2 font-bold text-right px-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx: any) => {
                    const isIncome = tx.type === 'income';
                    const config = CATEGORY_CONFIG[tx.category] || (isIncome ? { icon: TrendingUp, color: '#4cf0af' } : { icon: ShoppingBag, color: '#f43f5e' });
                    const Icon = config.icon;

                    return (
                      <motion.tr
                        key={tx.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <td className="py-3 px-3 rounded-l-xl">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-black/40 text-gray-400 group-hover:scale-110 transition-transform" style={{ color: config.color }}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{tx.category || (isIncome ? 'Income' : 'Other')}</p>
                              <p className="text-[10px] text-gray-500">{isIncome ? 'Credit' : 'Debit'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-[10px] text-gray-400">
                          {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </td>
                        <td className="py-3 px-3 rounded-r-xl text-right">
                          <p className={`text-xs font-bold ${isIncome ? 'text-emerald-400' : 'text-white'}`}>
                            {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString()}
                          </p>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-12">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-4">
                  <ShoppingBag size={32} className="text-gray-500" />
                </div>
                <p className="text-sm text-gray-500 font-medium whitespace-pre-wrap">No transactions yet.{"\n"}Try adding one on the left!</p>
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-gray-500">Net Flow:</span>
            <span className={`font-bold ${totalIncome - totalExpense >= 0 ? 'text-brand-teal' : 'text-rose-400'}`}>
              {totalIncome - totalExpense >= 0 ? '+' : ''}₹{(totalIncome - totalExpense).toLocaleString()}
            </span>
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
              {loading ? 'Running ML...' : 'Predict Savings'} <ArrowRight size={14} />
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
