import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Plus,
  X,
  MoreVertical,
  Edit2,
  Trash2,
  Calendar,
  DollarSign,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Sidebar from '../components/Sidebar';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  targetDate?: string;
  emoji: string;
  status: 'ongoing' | 'completed' | 'behind';
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id' | 'status'>) => void;
  initialData?: Goal;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 50000,
    currentAmount: 35000,
    startDate: '2024-01-01',
    targetDate: '2024-06-30',
    emoji: '🏦',
    status: 'ongoing'
  },
  {
    id: '2',
    title: 'New Laptop',
    targetAmount: 120000,
    currentAmount: 80000,
    startDate: '2024-02-01',
    targetDate: '2024-08-31',
    emoji: '💻',
    status: 'ongoing'
  },
  {
    id: '3',
    title: 'Vacation Fund',
    targetAmount: 200000,
    currentAmount: 50000,
    startDate: '2024-01-15',
    targetDate: '2024-12-31',
    emoji: '✈️',
    status: 'behind'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount);
};

const getProgressColor = (currentAmount: number, targetAmount: number, status: string) => {
  if (status === 'completed') return 'bg-green-500';
  if (status === 'behind') return 'bg-red-500';
  const percentage = (currentAmount / targetAmount) * 100;
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 50) return 'bg-blue-500';
  return 'bg-yellow-500';
};

const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
    emoji: '🎯'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        targetAmount: initialData.targetAmount.toString(),
        currentAmount: initialData.currentAmount.toString(),
        startDate: initialData.startDate,
        targetDate: initialData.targetDate || '',
        emoji: initialData.emoji
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount || '0'),
      startDate: formData.startDate,
      targetDate: formData.targetDate || undefined,
      emoji: formData.emoji
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
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Goal' : 'Add New Goal'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
              placeholder="e.g., New Laptop"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Amount (KES)</label>
            <input
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Amount (KES)</label>
            <input
              type="number"
              value={formData.currentAmount}
              onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              min="0"
              step="100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Date (Optional)</label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Emoji</label>
            <select
              value={formData.emoji}
              onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="🎯">🎯 Target</option>
              <option value="💻">💻 Laptop</option>
              <option value="🏦">🏦 Savings</option>
              <option value="🏠">🏠 House</option>
              <option value="🚗">🚗 Car</option>
              <option value="✈️">✈️ Travel</option>
              <option value="📚">📚 Education</option>
              <option value="💍">💍 Wedding</option>
            </select>
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
              {initialData ? 'Update Goal' : 'Add Goal'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const Goals = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();
  const [showToast, setShowToast] = useState(false);

  const totalProgress = useMemo(() => {
    const total = goals.reduce((acc, goal) => acc + goal.targetAmount, 0);
    const current = goals.reduce((acc, goal) => acc + goal.currentAmount, 0);
    return (current / total) * 100;
  }, [goals]);

  useEffect(() => {
    // Show weekly reminder toast
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'status'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      status: 'ongoing'
    };
    setGoals([goal, ...goals]);
  };

  const handleUpdateGoal = (updatedGoal: Omit<Goal, 'id' | 'status'>) => {
    if (!selectedGoal) return;

    const newStatus = 
      updatedGoal.currentAmount >= updatedGoal.targetAmount ? 'completed' :
      updatedGoal.targetDate && new Date(updatedGoal.targetDate) < new Date() ? 'behind' :
      'ongoing';

    const goal: Goal = {
      ...updatedGoal,
      id: selectedGoal.id,
      status: newStatus
    };

    setGoals(goals.map(g => g.id === selectedGoal.id ? goal : g));

    if (newStatus === 'completed') {
      triggerConfetti();
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Track and achieve your financial goals
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedGoal(undefined);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                Add Goal
              </button>
            </div>

            {/* Motivation Meter */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
                <span className="text-sm font-medium text-gray-600">
                  {totalProgress.toFixed(1)}% Complete
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${totalProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-blue-600"
                />
              </div>
            </div>

            {/* Goals Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal) => {
                const percentage = (goal.currentAmount / goal.targetAmount) * 100;
                const timeLeft = goal.targetDate
                  ? Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  : null;

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
                  >
                    {/* Menu */}
                    <div className="absolute right-4 top-4">
                      <div className="relative">
                        <button
                          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          onClick={() => {
                            setSelectedGoal(goal);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <span className="text-3xl">{goal.emoji}</span>
                      <h3 className="mt-2 text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(goal.currentAmount)}
                        </span>
                        <span className="text-sm text-gray-500">
                          of {formatCurrency(goal.targetAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`absolute left-0 top-0 h-full ${getProgressColor(
                          goal.currentAmount,
                          goal.targetAmount,
                          goal.status
                        )}`}
                      />
                    </div>

                    {/* Status and Time */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        {goal.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Completed</span>
                          </div>
                        ) : goal.status === 'behind' ? (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Behind Schedule</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-blue-600">
                            <Clock className="h-4 w-4" />
                            <span>On Track</span>
                          </div>
                        )}
                      </div>
                      {timeLeft && timeLeft > 0 && (
                        <span className="text-gray-500">
                          {timeLeft} days left
                        </span>
                      )}
                    </div>

                    {/* Smart Suggestion */}
                    {goal.status === 'ongoing' && (
                      <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>
                            At this rate, you'll reach your goal in{' '}
                            {Math.ceil((goal.targetAmount - goal.currentAmount) / (goal.currentAmount / 30))} days
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Weekly Reminder Toast */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4 rounded-lg bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2 text-green-600">
                    <Rocket className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Keep it up! 🎉</p>
                    <p className="text-sm text-gray-600">
                      You're making great progress on your goals
                    </p>
                  </div>
                  <button
                    onClick={() => setShowToast(false)}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <GoalModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedGoal(undefined);
            }}
            onSave={selectedGoal ? handleUpdateGoal : handleAddGoal}
            initialData={selectedGoal}
          />
        </div>
      </main>
    </div>
  );
};

export default Goals;