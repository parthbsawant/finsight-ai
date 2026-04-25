import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, History, Activity } from 'lucide-react';
import { cn } from './Card';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <Activity size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Markets', path: '/stock/AAPL', icon: <LineChart size={20} /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-dark-surface border-r border-dark-border hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-dark-border">
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
                  ? 'bg-brand-green/10 text-brand-green'
                  : 'text-gray-400 hover:bg-dark-border hover:text-gray-200'
              )
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
