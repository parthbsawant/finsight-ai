import React from 'react';
import { Bell, UserCircle, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-dark-surface border-b border-dark-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center flex-1">
        <div className="relative w-64 md:hidden">
           <h1 className="text-xl font-bold text-brand-green tracking-tight">FinSight AI</h1>
        </div>
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search symbols (e.g. AAPL, TSLA)..."
            className="w-full bg-dark-bg border border-dark-border rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full"></span>
        </button>
        <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-200 transition-colors">
          <UserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
