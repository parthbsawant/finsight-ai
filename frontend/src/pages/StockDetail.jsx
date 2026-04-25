import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Activity, BarChart2 } from 'lucide-react';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
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
        // Fetch CSV data from public folder
        const csvData = await parseCSV(`/data/${symbol}.csv`);
        if (!csvData || csvData.length === 0) {
          throw new Error('No data found for this symbol');
        }
        
        // Filter out empty rows
        const validData = csvData.filter(row => row.date && row.close);
        setData(validData);

        // Fetch AI prediction analytics for this stock
        try {
          const stats = await api.getStockAnalytics(symbol);
          setAnalytics(stats);
        } catch (apiErr) {
          console.error("Could not fetch analytics:", apiErr);
          // Don't fail the whole page if analytics fails
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
    return <div className="p-8 flex justify-center"><Loader message={`Loading market data for ${symbol}...`} /></div>;
  }

  if (error) {
    return <div className="p-8"><Error message={error} retry={() => window.location.reload()} /></div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-dark-surface rounded-lg transition-colors text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-100">{symbol}</h1>
          <p className="text-gray-400">Market Data & Technicals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 space-y-4 border-t-4 border-t-brand-blue">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-4xl font-bold text-gray-100 flex items-center space-x-2">
                <span>${latestData?.close?.toFixed(2)}</span>
                <span className={`text-lg flex items-center ${isPositive ? 'text-brand-green' : 'text-brand-red'}`}>
                  {isPositive ? <TrendingUp size={20} className="mr-1" /> : <TrendingDown size={20} className="mr-1" />}
                  {Math.abs(priceChange).toFixed(2)} ({Math.abs(priceChangePercent).toFixed(2)}%)
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Latest close on {latestData?.date}</p>
            </div>
            
            <div className="flex space-x-4 text-sm">
              <div>
                <span className="text-gray-500">O: </span>
                <span className="text-gray-300 font-medium">${latestData?.open?.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">H: </span>
                <span className="text-gray-300 font-medium">${latestData?.high?.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">L: </span>
                <span className="text-gray-300 font-medium">${latestData?.low?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border border-dark-border rounded-lg overflow-hidden bg-dark-bg p-2">
            <CandlestickChart data={data} />
          </div>
          
          <div className="border border-dark-border rounded-lg overflow-hidden bg-dark-bg p-2">
            <VolumeChart data={data} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Technical Indicators">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-dark-border">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Activity size={16} />
                  <span>RSI (14)</span>
                </div>
                <span className={`font-semibold ${latestData?.rsi > 70 ? 'text-brand-red' : latestData?.rsi < 30 ? 'text-brand-green' : 'text-gray-200'}`}>
                  {latestData?.rsi ? latestData.rsi.toFixed(2) : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dark-border">
                <div className="flex items-center space-x-2 text-gray-400">
                  <BarChart2 size={16} />
                  <span>Volume</span>
                </div>
                <span className="font-semibold text-gray-200">
                  {latestData?.volume ? (latestData.volume / 1000000).toFixed(2) + 'M' : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dark-border">
                <span className="text-gray-400">Volatility</span>
                <span className="font-semibold text-gray-200">
                  {latestData?.volatility ? latestData.volatility.toFixed(4) : 'N/A'}
                </span>
              </div>
            </div>
          </Card>

          {analytics && (
             <Card title="AI Insights" subtitle="Recent prediction performance">
               <div className="space-y-4 mt-2">
                 <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total Predictions</span>
                    <span className="font-semibold text-brand-blue">{analytics.total_predictions}</span>
                 </div>
                 <div className="w-full bg-dark-bg rounded-full h-2.5 mt-2">
                    <div className="bg-brand-green h-2.5 rounded-full" style={{ width: `${(analytics.up_predictions / analytics.total_predictions) * 100}%` }}></div>
                 </div>
                 <div className="flex justify-between text-xs text-gray-500">
                    <span className="text-brand-green">{analytics.up_predictions} UP</span>
                    <span className="text-brand-red">{analytics.down_predictions} DOWN</span>
                 </div>
               </div>
             </Card>
          )}
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-3 bg-dark-surface hover:bg-dark-border border border-dark-border text-gray-200 rounded-lg transition-colors shadow-sm"
          >
            Run New Prediction
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
