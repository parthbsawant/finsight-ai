import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { CardSkeleton, ChartSkeleton } from '../components/Skeleton';
import CandlestickChart from '../charts/CandlestickChart';
import VolumeChart from '../charts/VolumeChart';
import { parseCSV } from '../utils/csvParser';
import { api } from '../api/api';

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const csvData = await parseCSV(`/data/${symbol}.csv`);
        if (!csvData || csvData.length === 0) {
          throw new Error('No data found for this symbol');
        }
        
        const validData = csvData.filter(row => row.date && row.close);
        setData(validData);

        try {
          const stats = await api.getStockAnalytics(symbol);
          setAnalytics(stats);
        } catch (apiErr) {
          console.error("Could not fetch analytics:", apiErr);
        }
      } catch (err) {
        console.error(err);
        setError(`Failed to load historical data for ${symbol}. Please ensure data/${symbol}.csv exists.`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  const latestData = data.length > 0 ? data[data.length - 1] : null;
  const previousData = data.length > 1 ? data[data.length - 2] : null;
  
  const priceChange = latestData && previousData ? latestData.close - previousData.close : 0;
  const priceChangePercent = latestData && previousData ? (priceChange / previousData.close) * 100 : 0;
  const isPositive = priceChange >= 0;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-4 mb-8">
           <div className="w-8 h-8 bg-slate-200 rounded animate-pulse"></div>
           <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-3 space-y-4">
              <ChartSkeleton />
           </div>
           <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
           </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8"><Error message={error} retry={() => window.location.reload()} /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-light-border pb-6 gap-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white border border-light-border hover:bg-slate-50 rounded-lg transition-colors text-light-textMuted hover:text-light-textMain shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-light-textMain tracking-tight">{symbol}</h1>
            <p className="text-light-textMuted text-sm font-medium">Market Data & Technicals</p>
          </div>
        </div>

        <div className="flex items-end justify-between sm:justify-end sm:space-x-8 w-full sm:w-auto bg-white p-4 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent border sm:border-transparent border-light-border shadow-sm sm:shadow-none">
          <div>
            <p className="text-3xl font-bold text-light-textMain flex items-center space-x-3">
              <span>${latestData?.close?.toFixed(2)}</span>
            </p>
          </div>
          <div className="text-right">
             <span className={`text-lg font-bold flex items-center justify-end ${isPositive ? 'text-brand-green' : 'text-brand-red'}`}>
                {isPositive ? <TrendingUp size={20} className="mr-1" /> : <TrendingDown size={20} className="mr-1" />}
                {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
              </span>
             <p className="text-xs text-light-textMuted mt-1">As of {latestData?.date}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-4 shadow-sm border-t-4 border-t-brand-blue">
            <div className="flex flex-wrap space-x-6 text-sm mb-4 px-2 pb-4 border-b border-light-border bg-slate-50 p-3 rounded-lg">
              <div className="flex flex-col"><span className="text-light-textMuted text-xs font-semibold uppercase">Open</span><span className="text-light-textMain font-bold">${latestData?.open?.toFixed(2)}</span></div>
              <div className="flex flex-col"><span className="text-light-textMuted text-xs font-semibold uppercase">High</span><span className="text-light-textMain font-bold">${latestData?.high?.toFixed(2)}</span></div>
              <div className="flex flex-col"><span className="text-light-textMuted text-xs font-semibold uppercase">Low</span><span className="text-light-textMain font-bold">${latestData?.low?.toFixed(2)}</span></div>
            </div>

            <div className="border border-light-border rounded-lg overflow-hidden bg-white mb-4">
              <CandlestickChart data={data} />
            </div>
            
            <div className="border border-light-border rounded-lg overflow-hidden bg-white">
              <VolumeChart data={data} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Technical Indicators" className="shadow-sm">
            <div className="space-y-0 divide-y divide-light-border">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-2 text-light-textMuted">
                  <Activity size={18} />
                  <span className="font-medium">RSI (14)</span>
                </div>
                <span className={`font-bold ${latestData?.rsi > 70 ? 'text-brand-red' : latestData?.rsi < 30 ? 'text-brand-green' : 'text-light-textMain'}`}>
                  {latestData?.rsi ? latestData.rsi.toFixed(2) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-2 text-light-textMuted">
                  <BarChart2 size={18} />
                  <span className="font-medium">Volume</span>
                </div>
                <span className="font-bold text-light-textMain">
                  {latestData?.volume ? (latestData.volume / 1000000).toFixed(2) + 'M' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-light-textMuted font-medium">Volatility</span>
                <span className="font-bold text-light-textMain bg-slate-100 px-2 py-1 rounded">
                  {latestData?.volatility ? latestData.volatility.toFixed(4) : 'N/A'}
                </span>
              </div>
            </div>
          </Card>

          {analytics && (
             <Card title="AI Accuracy" subtitle="Historical prediction performance" className="shadow-sm">
               <div className="space-y-5 mt-2">
                 <div className="flex justify-between items-end border-b border-light-border pb-3">
                    <span className="text-light-textMuted font-medium">Total Signals</span>
                    <span className="text-2xl font-black text-brand-blue">{analytics.total_predictions}</span>
                 </div>
                 
                 <div>
                   <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-brand-green">{analytics.up_predictions} UP</span>
                      <span className="text-brand-red">{analytics.down_predictions} DOWN</span>
                   </div>
                   <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden flex">
                      <div className="bg-brand-green h-full" style={{ width: `${(analytics.up_predictions / analytics.total_predictions) * 100}%` }}></div>
                      <div className="bg-brand-red h-full" style={{ width: `${(analytics.down_predictions / analytics.total_predictions) * 100}%` }}></div>
                   </div>
                 </div>
               </div>
             </Card>
          )}
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white hover:bg-slate-50 border-2 border-brand-blue text-brand-blue font-bold rounded-xl transition-all shadow-sm active:scale-[0.98]"
          >
            Run AI Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
