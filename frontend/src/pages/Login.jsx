import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Error from '../components/Error';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      auth.login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 text-brand-green">
            <TrendingUp size={32} />
            <span className="text-2xl font-bold text-light-textMain">FinSight AI</span>
          </div>
        </div>
        
        <Card title="Welcome back" subtitle="Login to access your predictions">
          {error && <div className="mb-4"><Error message={error} /></div>}
          
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-light-textMuted mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-light-border rounded-lg px-4 py-2 text-light-textMain focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light-textMuted mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-light-border rounded-lg px-4 py-2 text-light-textMain focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-brand-green hover:bg-emerald-600 text-white font-medium rounded-lg shadow-sm transition-all active:scale-[0.98]"
            >
              Login
            </button>
          </form>
          
          <p className="mt-6 text-center text-sm text-light-textMuted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-green hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
