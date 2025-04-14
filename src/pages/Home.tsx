import React from 'react';
import { BarChart3, PiggyBank, Target, TrendingUp, Shield, Clock, LineChart, Lock, Facebook, Twitter, Linkedin, Instagram, Wallet, HandHelping as HandWaving } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Take Control of Your Money{' '}
                <span className="flex items-center gap-2 text-blue-600">
                  Save Smart, Spend Wisely <HandWaving className="h-8 w-8" />
                </span>
              </h1>
              <p className="mt-6 text-xl italic text-gray-600">
                "Do not save what is left after spending, but spend what is left after saving."
              </p>
              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  Get Started Free
                </button>
                <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-lg font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md">
                  Learn How It Works
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
                alt="Financial Dashboard"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: 'Track Income & Expenses',
                description: 'Log all income and expenses quickly with easy-to-use tools.'
              },
              {
                icon: <PiggyBank className="h-8 w-8 text-blue-600" />,
                title: 'Smart Budgeting',
                description: 'Set personalized budgets and get real-time feedback.'
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                title: 'Instant Financial Insights',
                description: 'View reports that make sense and show where you can save.'
              },
              {
                icon: <Target className="h-8 w-8 text-blue-600" />,
                title: 'Goal Tracking',
                description: 'Set and track your financial goals — save for what matters.'
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: 'Sign Up in Seconds',
                description: 'Create an account in less than a minute. No hidden fees, no hidden charges.'
              },
              {
                icon: <LineChart className="h-8 w-8 text-blue-600" />,
                title: 'Add Your Income & Expenses',
                description: 'Easily log your transactions using our simple forms or connect your bank account.'
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                title: 'View Your Financial Health',
                description: 'Get instant feedback on your spending habits, budget progress, and savings goals.'
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">What Our Users Say</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              {
                quote: "FinLiterate made budgeting easy for me — I finally saved enough to buy my laptop.",
                author: "Sarah K.",
                role: "User",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
              },
              {
                quote: "I've tried so many apps, but this one is the only one that helped me stick to my budget.",
                author: "James M.",
                role: "User",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
              }
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-lg text-gray-600">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <Shield className="h-16 w-16 text-blue-600" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Your data is safe with us</h2>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              We follow the highest security protocols to protect your personal information with end-to-end encryption for all your financial data.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Lock className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Bank-grade encryption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Take control of your finances today with FinLiterate
          </h2>
          <p className="mt-4 text-xl text-blue-100">Save smart, spend wisely</p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Wallet className="h-6 w-6" /> FinLiterate
              </h3>
              <p className="mt-4 text-sm text-gray-400">
                Take control of your finances and achieve your financial goals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {['About', 'Privacy Policy', 'Terms of Service', 'Help Center', 'Blog'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <p className="mt-4 text-sm text-gray-400">
                support@finliterate.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                {[
                  { icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
                  { icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
                  { icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                  { icon: <Instagram className="h-5 w-5" />, label: 'Instagram' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="text-gray-400 hover:text-white"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} FinLiterate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home