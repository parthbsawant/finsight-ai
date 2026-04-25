import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LineChart, History, Activity, LogOut } from 'lucide-react';
import { cn } from './Card';
import { auth } from '../utils/auth';

const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <Activity size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Markets', path: '/stock/AAPL', icon: <LineChart size={20} /> },
  ];

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-light-border hidden md:flex flex-col shadow-sm z-10">
      <div className="h-16 flex items-center px-6 border-b border-light-border">
        <h1 className="text-xl font-bold text-brand-green tracking-tight">FinSight AI</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-emerald-50 text-brand-green'
                  : 'text-light-textMuted hover:bg-slate-50 hover:text-light-textMain'
              )
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-light-border">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-light-textMuted hover:bg-red-50 hover:text-brand-red transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
