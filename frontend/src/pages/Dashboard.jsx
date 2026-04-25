import React, { useState } from 'react';
import { api } from '../api/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Shield, ChevronRight, Search } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col items-center justify-center text-center py-8">
        <h1 className="text-4xl font-bold text-light-textMain tracking-tight mb-3">AI Stock Predictor</h1>
        <p className="text-light-textMuted max-w-xl text-lg">Get real-time AI-powered predictions for your favorite stocks using advanced technical indicators.</p>
        
        <form onSubmit={handlePredict} className="mt-8 w-full max-w-2xl flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <input
              id="symbol"
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Enter symbol (e.g., AAPL, TSLA)"
              className="w-full bg-white border border-light-border rounded-xl pl-12 pr-4 py-4 text-lg text-light-textMain placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all uppercase shadow-sm"
              autoComplete="off"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || !symbol.trim()}
            className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center space-x-2 whitespace-nowrap"
          >
            {loading ? (
              <span>Analyzing...</span>
            ) : (
              <>
                <Zap size={20} />
                <span>Predict</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <Card className="h-full flex items-center justify-center min-h-[300px]">
            <Loader message="Running ML models and analyzing trends..." />
          </Card>
        ) : error ? (
          <Error message={error} retry={() => handlePredict({ preventDefault: () => {} })} />
        ) : result ? (
          <Card className="relative overflow-hidden border-t-4 border-t-brand-blue p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-light-border pb-6">
              <div>
                <h2 className="text-3xl font-bold text-light-textMain flex items-center space-x-3">
                  <span>{result.symbol}</span>
                  <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wide">
                    Prediction
                  </span>
                </h2>
              </div>
              <button
                onClick={() => navigate(`/stock/${result.symbol}`)}
                className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-slate-50 hover:bg-slate-100 text-sm font-medium text-light-textMain border border-light-border rounded-lg transition-colors"
              >
                View Full Chart <ChevronRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center ${
                  result.prediction === 'UP' 
                  ? 'bg-emerald-50 border-emerald-100 text-brand-green' 
                  : 'bg-red-50 border-red-100 text-brand-red'
              }`}>
                <p className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-2">AI Signal</p>
                <div className="flex items-center space-x-3">
                  {result.prediction === 'UP' ? <ArrowUpRight size={40} /> : <ArrowDownRight size={40} />}
                  <span className="text-5xl font-black">{result.prediction}</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border bg-slate-50 border-light-border flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Model Confidence</p>
                <div className="flex items-center space-x-3 text-light-textMain">
                  <Shield size={32} className="text-brand-blue" />
                  <span className="text-5xl font-black">{Number(result.confidence).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {result.explanation && result.explanation.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6 border border-light-border">
                <h3 className="text-base font-semibold text-light-textMain mb-4 flex items-center space-x-2">
                  <Activity size={18} className="text-brand-blue" />
                  <span>Key Technical Factors</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.explanation.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-light-textMuted bg-white p-3 rounded-lg border border-light-border">
                      <span className="text-brand-blue mt-0.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ) : (
          <div className="hidden">
            {/* Empty state is handled by the main hero section */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
