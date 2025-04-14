import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Utensils,
  Home,
  Bus,
  ShoppingBag,
  Briefcase,
  Gamepad2,
  Wifi,
  CreditCard,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: Omit<Budget, 'id' | 'spent'>) => void;
}

const mockBudgets: Budget[] = [
  {
    id: '1',
    category: 'Food',
    limit: 15000,
    spent: 12000,
    color: '#10B981'
  },
  {
    id: '2',
    category: 'Transport',
    limit: 8000,
    spent: 7500,
    color: '#3B82F6'
  },
  {
    id: '3',
    category: 'Rent',
    limit: 25000,
    spent: 25000,
    color: '#6366F1'
  },
  {
    id: '4',
    category: 'Entertainment',
    limit: 5000,
    spent: 6200,
    color: '#8B5CF6'
  },
  {
    id: '5',
    category: 'Shopping',
    limit: 10000,
    spent: 8500,
    color: '#EC4899'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return <Utensils className="h-5 w-5" />;
    case 'rent':
      return <Home className="h-5 w-5" />;
    case 'transport':
      return <Bus className="h-5 w-5" />;
    case 'shopping':
      return <ShoppingBag className="h-5 w-5" />;
    case 'entertainment':
      return <Gamepad2 className="h-5 w-5" />;
    case 'utilities':
      return <Wifi className="h-5 w-5" />;
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount);
};

const getProgressColor = (spent: number, limit: number) => {
  const percentage = (spent / limit) * 100;
  if (percentage > 100) return 'bg-red-500';
  if (percentage > 80) return 'bg-yellow-500';
  return 'bg-green-500';
};

const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
    color: '#3B82F6'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      category: formData.category,
      limit: parseFloat(formData.limit),
      color: formData.color
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Budget</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Utilities">Utilities</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Limit (KES)</label>
            <input
              type="number"
              value={formData.limit}
              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="mt-1 h-10 w-full rounded-lg border border-gray-300"
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add Budget
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const BudgetPlanner = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);

  const totalBudget = useMemo(() => budgets.reduce((sum, budget) => sum + budget.limit, 0), [budgets]);
  const totalSpent = useMemo(() => budgets.reduce((sum, budget) => sum + budget.spent, 0), [budgets]);

  const handleAddBudget = (newBudget: Omit<Budget, 'id' | 'spent'>) => {
    const budget: Budget = {
      ...newBudget,
      id: Date.now().toString(),
      spent: 0
    };
    setBudgets([...budgets, budget]);
  };

  const months = useMemo(() => {
    const now = new Date();
    const result = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      result.push({ value, label });
    }
    return result;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-8">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Budget Planner</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Track and manage your monthly budgets
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  Add Budget
                </button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-medium text-gray-600">Total Budget</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatCurrency(totalBudget)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-medium text-gray-600">Total Spent</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatCurrency(totalSpent)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-medium text-gray-600">Remaining</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {formatCurrency(totalBudget - totalSpent)}
                </p>
              </div>
            </div>

            {/* Budget List */}
            <div className="space-y-4">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;
                const isNearLimit = percentage > 80 && percentage <= 100;

                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="rounded-full p-2"
                          style={{ backgroundColor: `${budget.color}20` }}
                        >
                          {getCategoryIcon(budget.category)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{budget.category}</h3>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isOverBudget && (
                          <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                            <AlertCircle className="h-4 w-4" />
                            Over Budget
                          </div>
                        )}
                        {isNearLimit && (
                          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                            <AlertCircle className="h-4 w-4" />
                            Near Limit
                          </div>
                        )}
                        {!isOverBudget && !isNearLimit && (
                          <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            On Track
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute left-0 top-0 h-full ${getProgressColor(
                          budget.spent,
                          budget.limit
                        )}`}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <p className="text-gray-600">
                        {percentage.toFixed(1)}% used
                      </p>
                      <p className="text-gray-600">
                        {formatCurrency(budget.limit - budget.spent)} remaining
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <BudgetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddBudget}
          />
        </div>
      </main>
    </div>
  );
};

export default BudgetPlanner;