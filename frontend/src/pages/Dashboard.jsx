import React, { useState } from 'react';
import { api } from '../api/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await api.predictStock(symbol.toUpperCase());
      setResult(data);
    } catch (err) {
      setError('Failed to fetch prediction. Please check the symbol and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 tracking-tight">AI Stock Predictor</h1>
          <p className="text-gray-400 mt-1">Get real-time AI-powered predictions for your favorite stocks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-t-4 border-t-brand-blue">
          <form onSubmit={handlePredict} className="flex flex-col h-full justify-between">
            <div>
              <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 mb-2">
                Stock Symbol
              </label>
              <div className="relative">
                <input
                  id="symbol"
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="e.g. AAPL, TSLA, GOOG"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all uppercase"
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Enter a valid US stock ticker to get an AI prediction.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading || !symbol.trim()}
              className="mt-6 w-full py-3 px-4 bg-brand-blue hover:bg-brand-blue/90 disabled:bg-brand-blue/50 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-lg shadow-brand-blue/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <span>Get Prediction</span>
                  <Zap size={18} />
                </>
              )}
            </button>
          </form>
        </Card>

        <div className="lg:col-span-2">
          {loading ? (
            <Card className="h-full flex items-center justify-center min-h-[300px]">
              <Loader message="Running ML models..." />
            </Card>
          ) : error ? (
            <Error message={error} retry={() => handlePredict({ preventDefault: () => {} })} />
          ) : result ? (
            <Card className="h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-100 flex items-center space-x-2">
                    <span>{result.symbol}</span>
                    <span className="text-sm font-normal text-gray-400 px-2 py-1 bg-dark-bg rounded-md border border-dark-border">
                      Prediction Result
                    </span>
                  </h2>
                </div>
                <button
                  onClick={() => navigate(`/stock/${result.symbol}`)}
                  className="flex items-center text-sm text-brand-blue hover:text-brand-blue/80 transition-colors"
                >
                  View Chart <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={`p-4 rounded-xl border ${result.prediction === 'UP' ? 'bg-brand-green/10 border-brand-green/20' : 'bg-brand-red/10 border-brand-red/20'} flex flex-col items-center justify-center`}>
                  <p className="text-sm text-gray-400 mb-1">Signal</p>
                  <div className={`flex items-center space-x-2 ${result.prediction === 'UP' ? 'text-brand-green' : 'text-brand-red'}`}>
                    {result.prediction === 'UP' ? <ArrowUpRight size={28} /> : <ArrowDownRight size={28} />}
                    <span className="text-3xl font-bold">{result.prediction}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-dark-bg border-dark-border flex flex-col items-center justify-center">
                  <p className="text-sm text-gray-400 mb-1">Confidence</p>
                  <div className="flex items-center space-x-2 text-brand-blue">
                    <Shield size={24} />
                    <span className="text-3xl font-bold">{result.confidence}%</span>
                  </div>
                </div>
              </div>

              {result.explanation && result.explanation.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                    <Activity size={16} className="text-brand-blue" />
                    <span>Key Factors</span>
                  </h3>
                  <ul className="space-y-2">
                    {result.explanation.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-400">
                        <span className="text-brand-blue mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ) : (
            <Card className="h-full flex flex-col items-center justify-center min-h-[300px] text-center p-8 border-dashed border-2 border-dark-border bg-transparent">
              <div className="w-16 h-16 rounded-full bg-dark-surface flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Ready to Analyze</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Enter a stock symbol to generate an AI-powered prediction based on technical indicators and market trends.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

// Simple search icon for the input
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default Dashboard;
