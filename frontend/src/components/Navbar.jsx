import React, { useState } from 'react';
import { Bell, UserCircle, Search, LogOut, Menu } from 'lucide-react';
import { auth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.getCurrentUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-light-border flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      <div className="flex items-center flex-1">
        <div className="md:hidden mr-4">
          <Menu className="text-light-textMuted" size={24} />
        </div>
        <div className="hidden md:flex relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search symbols (e.g. AAPL, TSLA)..."
            className="w-full bg-slate-50 border border-light-border rounded-lg pl-10 pr-4 py-2 text-sm text-light-textMain placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:bg-white transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-light-textMuted hover:text-light-textMain transition-colors relative hover:bg-slate-50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded-full transition-colors border border-transparent focus:border-light-border focus:outline-none"
          >
            <UserCircle size={28} className="text-slate-400" />
            <span className="text-sm font-medium hidden md:block text-light-textMain mr-1">
              {user?.name?.split(' ')[0] || 'User'}
            </span>
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-light-border py-1 z-20">
              <div className="px-4 py-2 border-b border-light-border">
                <p className="text-sm font-medium text-light-textMain truncate">{user?.name}</p>
                <p className="text-xs text-light-textMuted truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-brand-red hover:bg-red-50 flex items-center space-x-2 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
