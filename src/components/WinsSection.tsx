import React from 'react';
import { motion } from 'framer-motion';
import { Target, Utensils, Rocket, Flame } from 'lucide-react';
import { Win } from '../data/mockData';

interface WinsSectionProps {
  wins: Win[];
}

const WinsSection: React.FC<WinsSectionProps> = ({ wins }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case '<Target />':
        return <Target className="h-6 w-6" />;
      case '<Utensils />':
        return <Utensils className="h-6 w-6" />;
      case '<Rocket />':
        return <Rocket className="h-6 w-6" />;
      case '<Flame />':
        return <Flame className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {wins.map((win, index) => (
        <motion.div
          key={win.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/60 to-white/30 p-6 shadow-lg backdrop-blur-md transition-all hover:shadow-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="relative z-10">
            <div className="mb-2 text-blue-600">{getIcon(win.icon)}</div>
            <h3 className="mb-1 text-lg font-semibold text-gray-900">{win.title}</h3>
            <p className="text-sm text-gray-600">{win.description}</p>
            {win.impact && (
              <span
                className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${
                  win.type === 'savings' || win.type === 'goal'
                    ? 'bg-green-100 text-green-700'
                    : win.type === 'spending'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {win.impact}
              </span>
            )}
          </div>
          <div
            className="absolute inset-0 z-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backdropFilter: 'blur(4px)' }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default WinsSection;