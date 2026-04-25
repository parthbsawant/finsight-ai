import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Activity, BarChart2, Shield, ArrowRight, Zap, PlayCircle } from 'lucide-react';
import Card from '../components/Card';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-light-bg text-light-textMain overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-light-border z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-green">
            <TrendingUp size={32} />
            <span className="text-2xl font-black tracking-tight text-light-textMain">FinSight AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-light-textMuted hover:text-light-textMain transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm font-bold bg-brand-green hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-brand-green px-4 py-2 rounded-full text-sm font-bold border border-emerald-100">
            <Zap size={16} />
            <span>Powered by Advanced Machine Learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-light-textMain leading-tight">
            Smarter Stock Decisions <br/>
            <span className="text-brand-blue">with AI</span>
          </h1>
          <p className="text-xl text-light-textMuted max-w-2xl mx-auto leading-relaxed">
            Predict market trends using machine learning insights. FinSight AI analyzes millions of data points to give you the edge you need in the stock market.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-light-textMain font-bold border border-light-border rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2">
              <PlayCircle size={20} className="text-light-textMuted" />
              <span>Login to Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Preview Section */}
      <section className="py-20 px-6 bg-slate-50 border-y border-light-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-black text-light-textMain mb-4">Real-Time Insights Preview</h2>
             <p className="text-light-textMuted max-w-xl mx-auto">See how our AI processes technical indicators to provide actionable signals before you invest.</p>
          </div>
          
          <Card className="max-w-3xl mx-auto p-8 border-t-4 border-t-brand-blue relative overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-50 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-light-border">
              <div>
                <h3 className="text-3xl font-black flex items-center space-x-3">
                  <span>AAPL</span>
                  <span className="text-xs font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase">
                    Prediction Match
                  </span>
                </h3>
                <p className="text-light-textMuted font-medium mt-1">Apple Inc.</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                 <p className="text-sm font-bold text-light-textMuted uppercase tracking-wider mb-1">Model Confidence</p>
                 <div className="flex items-center justify-end space-x-2 text-brand-blue">
                   <Shield size={24} />
                   <span className="text-4xl font-black">89.4%</span>
                 </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/3 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
                 <p className="text-sm font-bold text-brand-green uppercase tracking-wider mb-2">Signal</p>
                 <div className="flex items-center space-x-2 text-brand-green">
                    <TrendingUp size={40} />
                    <span className="text-5xl font-black">UP</span>
                 </div>
              </div>
              <div className="w-full md:w-2/3 space-y-3">
                 <div className="p-3 rounded-lg border border-light-border bg-slate-50 flex items-start space-x-3">
                   <Activity size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
                   <p className="text-sm text-light-textMuted font-medium">RSI indicates strong momentum breaking through the 60 threshold.</p>
                 </div>
                 <div className="p-3 rounded-lg border border-light-border bg-slate-50 flex items-start space-x-3">
                   <BarChart2 size={20} className="text-brand-blue flex-shrink-0 mt-0.5" />
                   <p className="text-sm text-light-textMuted font-medium">Volume profile shows aggressive institutional accumulation over 3 days.</p>
                 </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-light-textMain mb-4">Everything you need to trade smarter</h2>
            <p className="text-lg text-light-textMuted max-w-2xl mx-auto">Our platform provides institutional-grade tools packaged in a beautifully simple interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Predictions</h3>
              <p className="text-light-textMuted font-medium leading-relaxed">Get directional bias (UP/DOWN) powered by advanced deep learning models trained on historical price action.</p>
            </Card>
            
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center mb-6">
                <BarChart2 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Market Analytics</h3>
              <p className="text-light-textMuted font-medium leading-relaxed">Track overall platform accuracy, signal distribution, and model confidence trends in real-time.</p>
            </Card>
            
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Historical Tracking</h3>
              <p className="text-light-textMuted font-medium leading-relaxed">Keep a detailed log of all past AI signals to backtest strategies and verify model performance.</p>
            </Card>
            
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Insights</h3>
              <p className="text-light-textMuted font-medium leading-relaxed">Understand exactly WHY a prediction was made with plain-English breakdowns of technical indicators.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-6 bg-slate-50 border-y border-light-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-light-textMain mb-16">How FinSight AI Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-brand-blue mb-6 shadow-sm">1</div>
               <h3 className="text-xl font-bold mb-3">Enter Symbol</h3>
               <p className="text-light-textMuted font-medium">Type any valid stock ticker into our dashboard search.</p>
             </div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-brand-blue mb-6 shadow-sm">2</div>
               <h3 className="text-xl font-bold mb-3">AI Processing</h3>
               <p className="text-light-textMuted font-medium">Our model instantly calculates RSI, volatility, and volume profiles.</p>
             </div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-24 h-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-brand-green mb-6 shadow-sm">3</div>
               <h3 className="text-xl font-bold mb-3">Get Prediction</h3>
               <p className="text-light-textMuted font-medium">Receive a clear directional signal with an exact confidence score.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-brand-blue rounded-3xl p-12 shadow-float text-white">
          <h2 className="text-4xl md:text-5xl font-black">Start your AI-powered investing journey</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Join thousands of modern investors leveraging machine learning for an edge in the markets.
          </p>
          <div className="pt-4">
            <Link to="/signup" className="inline-block px-10 py-4 bg-white text-brand-blue font-black rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-light-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 text-brand-green mb-4 md:mb-0">
            <TrendingUp size={24} />
            <span className="text-xl font-black text-light-textMain">FinSight AI</span>
          </div>
          <p className="text-light-textMuted font-medium text-sm">
            © {new Date().getFullYear()} FinSight AI Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
