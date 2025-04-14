export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  streak: number;
  avatar: string;
}

export interface Win {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'savings' | 'spending' | 'streak' | 'goal';
  impact?: string;
}

export const mockWins: Win[] = [
  {
    id: '1',
    title: 'Savings Champion!',
    description: 'You saved KES 3,200 more than last month',
    icon: '<Target />',
    type: 'savings',
    impact: '+16%'
  },
  {
    id: '2',
    title: 'Smart Spender',
    description: 'Reduced dining expenses by 18% this week',
    icon: '<Utensils />',
    type: 'spending',
    impact: '-18%'
  },
  {
    id: '3',
    title: 'Goal Crusher',
    description: 'Emergency Fund goal 2 weeks ahead of schedule',
    icon: '<Rocket />',
    type: 'goal'
  },
  {
    id: '4',
    title: 'Consistency King',
    description: '5 day streak of logging transactions',
    icon: '<Flame />',
    type: 'streak'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'Denis',
  email: 'demo@finliterate.com',
  streak: 5,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
};

export const mockAccountOverview = {
  totalBalance: 45000,
  monthlyIncome: 25000,
  monthlyExpenses: 15000,
  monthlySavings: 10000
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 25000,
    category: 'Salary',
    description: 'Monthly Salary',
    date: '2024-03-15'
  },
  {
    id: '2',
    type: 'expense',
    amount: 2000,
    category: 'Food',
    description: 'Grocery Shopping',
    date: '2024-03-14'
  },
  {
    id: '3',
    type: 'expense',
    amount: 5000,
    category: 'Rent',
    description: 'Monthly Rent',
    date: '2024-03-13'
  },
  {
    id: '4',
    type: 'expense',
    amount: 1000,
    category: 'Transport',
    description: 'Uber Ride',
    date: '2024-03-12'
  },
  {
    id: '5',
    type: 'income',
    amount: 5000,
    category: 'Freelance',
    description: 'Web Design Project',
    date: '2024-03-11'
  }
];

export const mockSpendingCategories: SpendingCategory[] = [
  { id: '1', name: 'Food', amount: 8000, color: '#10B981' },
  { id: '2', name: 'Transport', amount: 5000, color: '#3B82F6' },
  { id: '3', name: 'Rent', amount: 15000, color: '#6366F1' },
  { id: '4', name: 'Entertainment', amount: 3000, color: '#8B5CF6' },
  { id: '5', name: 'Shopping', amount: 4000, color: '#EC4899' }
];

export const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Oct', income: 22000, expenses: 18000 },
  { month: 'Nov', income: 23000, expenses: 17000 },
  { month: 'Dec', income: 25000, expenses: 19000 },
  { month: 'Jan', income: 24000, expenses: 16000 },
  { month: 'Feb', income: 26000, expenses: 15000 },
  { month: 'Mar', income: 25000, expenses: 15000 }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    target: 20000,
    current: 12000,
    deadline: '2024-06-30'
  },
  {
    id: '2',
    name: 'New Laptop',
    target: 15000,
    current: 9000,
    deadline: '2024-08-31'
  }
];

export const mockTips = [
  {
    id: '1',
    message: 'You spent 10% less on eating out this week 👏',
    type: 'success'
  },
  {
    id: '2',
    message: 'You\'re KES 1,000 away from your January goal!',
    type: 'info'
  },
  {
    id: '3',
    message: 'Consider setting up automatic savings transfers',
    type: 'tip'
  }
];