import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Wallet,
  BarChart2,
  Brain,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { mockUser } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Receipt size={20} />, label: 'Transactions', path: '/transactions' },
    { icon: <PieChart size={20} />, label: 'Budget Planner', path: '/budget' },
    { icon: <Target size={20} />, label: 'Goals', path: '/goals' },
    { icon: <Wallet size={20} />, label: 'Accounts', path: '/accounts' },
    { icon: <BarChart2 size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Brain size={20} />, label: 'Financial Tips', path: '/tips' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <div
      className={`fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } border-r border-gray-200`}
    >
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-b border-gray-200 p-4">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="h-10 w-10 rounded-full"
          />
          {isOpen && (
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-sm font-semibold text-gray-900">
                {mockUser.name}
              </h4>
              <p className="truncate text-xs text-gray-500">{mockUser.email}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-2">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
            <LogOut size={20} />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;