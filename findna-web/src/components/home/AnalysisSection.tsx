"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Target } from 'lucide-react';

export default function AnalysisSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-brand-teal" />,
      title: "Behavioral Processing",
      description: "Our neural networks process your transaction history to build a multidimensional behavioral profile."
    },
    {
      icon: <Activity className="w-8 h-8 text-brand-purple" />,
      title: "Pattern Recognition",
      description: "Identifies subtle spending patterns, emotional triggers, and seasonal fluctuations in your financial lifecycle."
    },
    {
      icon: <Target className="w-8 h-8 text-brand-accent" />,
      title: "Predictive Modeling",
      description: "Forecasts future financial trajectories based on your unique DNA archetype with up to 94% accuracy."
    }
  ];

  return (
    <section id="analysis" className="py-24 relative z-10 w-[90%] max-w-[1800px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Deep <span className="text-gradient">AI Financial Analysis</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We don&apos;t just categorize your spending. We decode the psychology behind your financial decisions using advanced machine learning models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex gap-6 p-6 rounded-2xl glass-card hover:bg-white/5 transition-colors border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-brand-dark flex items-center justify-center border border-white/10 shadow-inner">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center">
            {/* Abstract AI core illustration */}
            <div className="absolute inset-0 bg-brand-teal/20 rounded-full blur-[80px]"></div>
            <div className="absolute inset-4 border border-brand-teal/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-8 border border-brand-purple/30 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <div className="relative z-10 w-48 h-48 rounded-full glass-card flex items-center justify-center overflow-hidden border border-brand-teal/50">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-brand-purple/20"></div>
              <Activity className="w-20 h-20 text-white opacity-80" />
            </div>
            
            {/* Connecting nodes */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#4CC9F0]"
                style={{
                  top: `${(50 + 40 * Math.sin(i * Math.PI / 3)).toFixed(2)}%`,
                  left: `${(50 + 40 * Math.cos(i * Math.PI / 3)).toFixed(2)}%`,
                }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
