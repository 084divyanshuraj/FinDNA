"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Receipt,
  Wallet, 
  Target, 
  Lightbulb, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Expense Tracker', href: '/dashboard/expenses', icon: Receipt },
    { name: 'Budget Manager', href: '/dashboard/budgets', icon: Wallet },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Smart Insights', href: '/dashboard/insights', icon: Lightbulb },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-brand-dark/95 backdrop-blur-xl border-r border-white/5">
      <div className="p-6 flex items-center justify-between mt-2">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="FinDNA" className="h-12 md:h-16 w-auto object-contain scale-[1.15]" />
        </Link>
        <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-brand-teal/20 to-brand-purple/20 text-brand-teal border border-brand-teal/30 shadow-[0_0_15px_rgba(76,201,240,0.1)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-brand-teal' : 'text-gray-400'} />
              <span className="font-medium text-sm md:text-base">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-400/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm md:text-base">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-brand-dark text-white overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 h-full z-20 shadow-2xl relative bg-[#060a14]">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brand-teal/20 to-transparent"></div>
        <SidebarContent />
      </aside>

      {/* Mobile Header & Sidebar overlay */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 z-30 flex items-center justify-between px-6">
        <img src="/logo.png" alt="FinDNA" className="h-8 w-auto scale-125 origin-left" />
        <button onClick={() => setMobileOpen(true)} className="text-white p-2 border border-white/10 rounded-lg hover:bg-white/5">
          <Menu size={20} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)}>
           <div className="w-4/5 max-w-sm h-full absolute right-0 shadow-2xl" onClick={(e) => e.stopPropagation()}>
             <SidebarContent />
           </div>
        </div>
      )}

      {/* Main Content Base */}
      <main className="flex-1 h-full overflow-y-auto relative bg-[#090d18] pt-16 md:pt-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 outline-none rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/5 outline-none rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="p-4 md:p-8 lg:p-10 relative z-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
