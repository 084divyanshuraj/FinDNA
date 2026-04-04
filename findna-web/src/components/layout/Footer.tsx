"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <footer className="border-t border-white/5 bg-brand-dark/50 backdrop-blur-md mt-auto">
      <div className="w-[90%] max-w-[1800px] mx-auto py-16">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-gradient">
              FinDNA
            </Link>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              AI-powered analysis that predicts financial personality using behavioral data.
            </p>
          </div>
          
          <div className="flex space-x-6 mt-6 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-gray-500 w-full">
          <p>
            <strong className="text-gray-400">Disclosure:</strong> FinDNA is an AI-driven behavioral platform for educational purposes only. We are not a registered investment advisor or bank. Insights and DNA scores are not financial or legal advice. FinDNA secures your data using AES-256 encryption. By using this service, you consent to our Privacy Policy and assume all risks associated with your financial decisions.
          </p>
        </div>
        
        <div className="border-t border-white/10 mt-6 pt-6 flex flex-col xl:flex-row justify-between items-center text-base md:text-lg text-gray-400 font-medium">
          <p className="mb-4 xl:mb-0 text-center xl:text-left">
            &copy; {new Date().getFullYear()} FinDNA Technologies, Inc. All rights reserved. 
            <span className="hidden md:inline mx-3">|</span>
            <span className="block md:inline mt-2 md:mt-0 text-sm md:text-base opacity-80">San Francisco, CA &bull; Global Operations</span>
          </p>
          <div className="flex space-x-6 mt-2 xl:mt-0">
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
