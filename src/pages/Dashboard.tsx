import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PiggyBank, ArrowRight, Plus, Sparkles, Target, Rocket, Flame, Utensils, HandHelping as HandWaving } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import WinsSection from '../components/WinsSection';
import DemoToast from '../components/DemoToast';
import {
  mockUser,
  mockAccountOverview,
  mockTransactions,
  mockSpendingCategories,
  mockSavingsGoals,
  mockTips,
  mockWins
} from '../data/mockData';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <DemoToast />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="p-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                  Welcome back, {mockUser.name}! <HandWaving className="h-8 w-8" />
                </h1>
                <p className="mt-2 text-blue-100">
                  Let's check out your financial progress
                </p>
              </div>
              <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-300" />
                  <span className="font-medium text-white">
                    {mockUser.streak} day streak!
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wins Section */}
          <WinsSection wins={mockWins} />

          {/* Account Overview */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Total Balance',
                amount: mockAccountOverview.totalBalance,
                icon: <Wallet className="h-6 w-6" />,
                color: 'from-blue-500 to-blue-600',
                textColor: 'text-blue-600'
              },
              {
                title: 'Monthly Income',
                amount: mockAccountOverview.monthlyIncome,
                icon: <TrendingUp className="h-6 w-6" />,
                color: 'from-green-500 to-green-600',
                textColor: 'text-green-600'
              },
              {
                title: 'Monthly Expenses',
                amount: mockAccountOverview.monthlyExpenses,
                icon: <TrendingDown className="h-6 w-6" />,
                color: 'from-red-500 to-red-600',
                textColor: 'text-red-600'
              },
              {
                title: 'Monthly Savings',
                amount: mockAccountOverview.monthlySavings,
                icon: <PiggyBank className="h-6 w-6" />,
                color: 'from-purple-500 to-purple-600',
                textColor: 'text-purple-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="relative z-10">
                  <div className={`rounded-full bg-gradient-to-r ${item.color} p-3 text-white`}>
                    {item.icon}
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-600">{item.title}</p>
                  <p className={`mt-1 text-2xl font-bold ${item.textColor}`}>
                    {formatCurrency(item.amount)}
                  </p>
                </div>
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-br from-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backdropFilter: 'blur(4px)' }}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">
              {/* Savings Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-6 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Savings Goals</h2>
                  <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                    <Plus className="h-4 w-4" />
                    Add Goal
                  </button>
                </div>
                <div className="space-y-4">
                  {mockSavingsGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{goal.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(goal.current)} of {formatCurrency(goal.target)}
                        </p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${getProgressColor(goal.current, goal.target)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Transactions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-6 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-600">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {mockTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full p-2 ${
                            transaction.type === 'income'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.type === 'income'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}{' '}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Tips & Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-6 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <h2 className="mb-6 text-xl font-bold text-gray-900">Tips & Insights</h2>
                <div className="space-y-4">
                  {mockTips.map((tip, index) => (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`rounded-lg p-4 ${
                        tip.type === 'success'
                          ? 'bg-green-50 text-green-700'
                          : tip.type === 'info'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-yellow-50 text-yellow-700'
                      }`}
                    >
                      <p className="text-sm font-medium">{tip.message}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Spending Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white p-6 shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <h2 className="mb-6 text-xl font-bold text-gray-900">Spending Categories</h2>
                <div className="space-y-4">
                  {mockSpendingCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(category.amount)}
                        </p>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (category.amount / mockAccountOverview.monthlyExpenses) *
                              100
                            }%`
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full"
                          style={{ backgroundColor: category.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard