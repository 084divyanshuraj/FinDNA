"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BarChart2, Building2, User } from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      title: "Education",
      icon: <GraduationCap className="w-6 h-6" />,
      description: "Student loan management, predictive tuition planning, and early credit building."
    },
    {
      title: "Stock Market",
      icon: <BarChart2 className="w-6 h-6" />,
      description: "Behavior-adjusted portfolio balancing and emotional trading safeguards."
    },
    {
      title: "Companies",
      icon: <Building2 className="w-6 h-6" />,
      description: "Cash flow modeling and predictive runway insights for modern startups."
    },
    {
      title: "Personal Finance",
      icon: <User className="w-6 h-6" />,
      description: "Day-to-day smart budgeting that adapts dynamically to your lifestyle."
    }
  ];

  return (
    <section className="py-24 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-brand-dark/30 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 px-4">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cross-Sector <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-gray-400">
            Our AI models adapt their insights based on the context of your goals, applying your financial DNA across multiple verticals.
          </p>
        </div>
        <button className="mt-8 md:mt-0 px-6 py-3 rounded-xl border border-brand-purple text-white hover:bg-brand-purple/10 transition-colors">
          Explore Solutions
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {industries.map((item, index) => (
          <motion.div
            key={index}
            className="group relative p-1 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm rounded-2xl"></div>
            
            <div className="relative h-full p-6 glass-card rounded-2xl flex flex-col items-center text-center hover:bg-brand-dark/80 transition-colors border border-white/10 group-hover:border-transparent">
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-brand-teal mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
