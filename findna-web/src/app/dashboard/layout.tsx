"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Receipt, Calculator, Target, LineChart, LogOut, Menu, X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Expense Tracker', href: '/dashboard/expenses', icon: Receipt },
    { name: 'Budget Manager', href: '/dashboard/budgets', icon: Calculator },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Smart Insights', href: '/dashboard/insights', icon: LineChart },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black/20 backdrop-blur-xl border-r border-white/5 relative shadow-2xl">
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-brand-teal/20 to-transparent"></div>

      <div className="px-4 md:px-6 pt-3 pb-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="FinDNA Logo"
            className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_8px_rgba(76,201,240,0.5)] transform hover:scale-[1.05] transition-transform duration-200"
          />
        </Link>
        <button className="md:hidden text-gray-400 hover:bg-white/5 p-2 rounded-lg" onClick={() => setMobileOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 mt-2 overflow-y-auto z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                ? 'bg-gradient-to-r from-brand-teal/20 to-brand-purple/20 text-brand-teal font-medium border border-brand-teal/30 shadow-[0_0_15px_rgba(76,201,240,0.1)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium border border-transparent'
                }`}
            >
              <Icon size={18} className={isActive ? 'text-brand-teal' : 'text-gray-400'} />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 mb-4 z-10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors font-medium border border-transparent"
        >
          <LogOut size={18} className="text-gray-400" />
          <span className="text-[15px]">Logout</span>
        </button>

        {/* User Card */}
        <div className="mt-4 bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-teal to-brand-purple flex items-center justify-center text-white text-sm font-bold shadow-sm">U</div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white uppercase truncate">Active User</p>
            <p className="text-[10px] text-gray-400 truncate">Logged in</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex bg-transparent text-white overflow-hidden font-sans z-10">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black/40 backdrop-blur-xl border-b border-white/10 z-30 flex items-center justify-between px-4 shadow-sm">
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="FinDNA Logo" className="h-10 w-auto object-contain" />
        </Link>
        <button onClick={() => setMobileOpen(true)} className="text-gray-400 p-2 hover:bg-white/5 rounded-lg border border-white/10">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="w-[80vw] max-w-sm h-full absolute left-0 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Base */}
      <main className="flex-1 h-full overflow-y-auto relative pt-16 md:pt-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 outline-none rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/5 outline-none rounded-full blur-[150px] pointer-events-none"></div>
        <div className="p-3 pt-6 md:p-6 md:pt-8 lg:px-10 lg:pt-8 lg:pb-10 min-h-full max-w-[1600px] mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
