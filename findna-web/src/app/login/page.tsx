"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Login successful!");
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid login credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative pt-10 pb-20">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-teal/20 rounded-full blur-[60px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-purple/20 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-teal to-brand-purple mb-4 shadow-lg shadow-brand-teal/20">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm">Enter your credentials to access your financial DNA</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all outline-none text-white placeholder-gray-500"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-white/5 border-white/10 rounded text-brand-teal focus:ring-brand-teal focus:ring-offset-0"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-brand-teal hover:text-brand-teal/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/50 rounded-xl text-rose-400 text-sm text-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-teal to-brand-purple hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal focus:ring-offset-brand-dark transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-white hover:text-brand-teal transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
