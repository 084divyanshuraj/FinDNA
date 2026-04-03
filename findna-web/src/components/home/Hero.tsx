"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const phrases = [
    "Financial DNA",
    "Spending Habits",
    "Wealth Potential",
    "Economic Behavior"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden">
      <div className="z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-3 border-brand-teal/30">
            <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-sm font-medium text-brand-teal">FinDNA AI Engine 2.0 is Live</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Understand Your <br className="hidden md:block" />
            <span className="relative inline-block w-full h-[1.3em] mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={currentPhrase}
                  initial={{ y: 40, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -40, opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-gradient absolute left-0 right-0 w-full"
                  style={{ transformOrigin: "50% 50% -20px" }}
                >
                  {phrases[currentPhrase]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered analysis that predicts financial personality using behavioral data.
            Unlock insights into your spending habits, risk tolerance, and wealth-building potential.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-teal to-brand-purple text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center group shadow-lg shadow-brand-teal/20"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="#analysis"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-white font-semibold text-lg hover:bg-white/5 transition-colors flex items-center justify-center"
            >
              See How It Works
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero specific animated elements */}
      <div className="absolute top-1/2 left-10 md:left-20 transform -translate-y-1/2">
        <motion.div
          className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center border border-white/5 shadow-2xl"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-12 h-12 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-10 md:right-20 transform -translate-y-1/2">
        <motion.div
          className="w-20 h-20 rounded-full glass-card flex items-center justify-center border border-white/5 shadow-2xl"
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg className="w-10 h-10 text-brand-purple drop-shadow-[0_0_10px_rgba(58,12,163,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
