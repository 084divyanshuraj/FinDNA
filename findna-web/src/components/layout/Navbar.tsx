"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    window.location.reload();
  };

  const industries = [
    { name: 'Education', href: '#' },
    { name: 'Stock Market', href: '#' },
    { name: 'Companies', href: '#' },
    { name: 'Personal Finance', href: '#' },
    { name: 'Business', href: '#' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="FinDNA Logo" 
              className="h-10 md:h-12 w-auto object-contain scale-[1.15] md:scale-[1.3] origin-left transform group-hover:scale-[1.2] md:group-hover:scale-[1.35] group-active:scale-[1.25] md:group-active:scale-[1.45] transition-transform duration-200 drop-shadow-[0_0_8px_rgba(76,201,240,0.5)] relative z-10" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-teal transition-all group-hover:w-full"></span>
            </Link>
            
            {/* Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
                onMouseEnter={() => setIndustriesOpen(true)}
                onMouseLeave={() => setIndustriesOpen(false)}
              >
                Industries <ChevronDown size={14} className={`transition-transform ${industriesOpen ? 'rotate-180 text-brand-teal' : ''}`} />
              </button>
              
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-0 w-48 rounded-xl glass-card border border-white/10 overflow-hidden"
                    onMouseEnter={() => setIndustriesOpen(true)}
                    onMouseLeave={() => setIndustriesOpen(false)}
                  >
                    <div className="py-2">
                      {industries.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Dropdown */}
            <div className="relative group/lang">
              <button className="text-gray-300 hover:text-white py-2 text-sm font-medium transition-colors flex items-center gap-1">
                <Globe className="w-4 h-4 mr-1" />
                Language
                <ChevronDown className="w-4 h-4 group-hover/lang:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-40 opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-200 pt-2 z-50">
                <div className="bg-brand-dark/95 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl py-1">
                  <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">English (EN)</button>
                  <button onClick={() => changeLanguage('hi')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Hindi (HI)</button>
                  <button onClick={() => changeLanguage('te')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Telugu (TE)</button>
                  <button onClick={() => changeLanguage('es')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">Spanish (ES)</button>
                  <button onClick={() => changeLanguage('fr')} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">French (FR)</button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 ml-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link href="/signup" className="relative group overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-to-r from-brand-teal to-brand-purple rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"></span>
                <div className="relative bg-brand-dark px-5 py-2 rounded-full transition-all duration-300 group-hover:bg-opacity-0">
                  <span className="relative z-10 text-sm font-medium text-white group-hover:text-brand-dark">Sign Up</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <Link href="/about" className="text-base font-medium text-gray-300 hover:text-white p-2">
                About
              </Link>
              
              <div className="space-y-2">
                <div className="text-base font-medium text-gray-400 p-2">Industries</div>
                <div className="pl-4 space-y-2 flex flex-col border-l border-white/10 ml-2">
                  {industries.map((item) => (
                    <Link key={item.name} href={item.href} className="text-sm text-gray-300 hover:text-white py-1">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/login" className="w-full text-center py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">
                  Sign In
                </Link>
                <Link href="/signup" className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-teal to-brand-purple text-white font-medium hover:opacity-90 transition-opacity">
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
