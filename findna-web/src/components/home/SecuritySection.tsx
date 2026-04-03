"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export default function SecuritySection() {
  return (
    <section className="py-24 relative z-10 w-[90%] max-w-[1800px] mx-auto">
      <div className="glass-card rounded-[2.5rem] border border-brand-teal/20 p-8 md:p-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 via-transparent to-brand-purple/10 pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/30 mb-8 text-emerald-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" /> Military-Grade Encryption
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
              Radically <span className="text-gradient">Secure & Private</span>
            </h2>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Your financial DNA is highly sensitive. We utilize zero-knowledge architecture, meaning even our AI models query encrypted vector spaces without ever exposing your raw personal data.
            </p>
            
            <ul className="space-y-4 text-left inline-block lg:block">
              <li className="flex items-center gap-3 text-gray-300">
                <Lock className="w-5 h-5 text-brand-teal shrink-0" />
                <span>AES-256 Bit Data Encryption at rest and in transit</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <EyeOff className="w-5 h-5 text-brand-purple shrink-0" />
                <span>Zero-Knowledge Proofs applied to all analysis</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>SOC 2 Type II Certified Infrastructure</span>
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-brand-teal/20 rounded-full blur-[80px]"></div>
              <div className="w-full h-full glass-card rounded-3xl border border-brand-teal/30 flex items-center justify-center p-8 relative z-10 shadow-[0_0_50px_rgba(76,201,240,0.2)]">
                <motion.div
                  animate={{ 
                    rotateY: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-full h-full text-brand-teal/80 flex items-center justify-center"
                >
                  <ShieldCheck className="w-40 h-40 drop-shadow-[0_0_15px_rgba(76,201,240,0.5)]" />
                </motion.div>
                
                {/* Orbital locks */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-10 h-10 glass-card rounded-full flex items-center justify-center border border-brand-purple/50"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-20px',
                      marginTop: '-20px',
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 5,
                    }}
                  >
                    <motion.div
                      style={{ transform: `translateY(-${140}px)` }}
                    >
                      <Lock className="w-4 h-4 text-brand-purple" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
