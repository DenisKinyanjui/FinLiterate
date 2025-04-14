import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import BudgetPlanner from './pages/BudgetPlanner';
import Goals from './pages/Goals';

function AppContent() {
  const location = useLocation();
  const showHeader = !location.pathname.startsWith('/dashboard') && 
                    !location.pathname.startsWith('/transactions') &&
                    !location.pathname.startsWith('/budget') &&
                    !location.pathname.startsWith('/goals');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;