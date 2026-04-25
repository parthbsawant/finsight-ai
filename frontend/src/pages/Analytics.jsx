import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { PieChart, TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [analyticsData, trendsData] = await Promise.all([
        api.getAnalytics(),
        api.getTrends()
      ]);
      setData(analyticsData);
      setTrends(trendsData);
    } catch (err) {
      setError('Failed to fetch analytics data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><Loader message="Loading platform analytics..." /></div>;
  if (error) return <div className="p-8"><Error message={error} retry={fetchData} /></div>;
  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-8 border-b border-light-border pb-6">
        <h1 className="text-3xl font-black text-light-textMain tracking-tight">Platform Analytics</h1>
        <p className="text-light-textMuted mt-1 font-medium">Overview of AI model performance and prediction statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-row items-center space-x-5 shadow-sm p-5 border-l-4 border-l-brand-blue">
          <div className="p-4 bg-blue-50 text-brand-blue rounded-xl">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-light-textMuted uppercase tracking-wider">Total Predictions</p>
            <p className="text-3xl font-black text-light-textMain mt-1">{data.total_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-5 shadow-sm p-5 border-l-4 border-l-brand-green">
          <div className="p-4 bg-emerald-50 text-brand-green rounded-xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-light-textMuted uppercase tracking-wider">UP Signals</p>
            <p className="text-3xl font-black text-brand-green mt-1">{data.up_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-5 shadow-sm p-5 border-l-4 border-l-brand-red">
          <div className="p-4 bg-red-50 text-brand-red rounded-xl">
            <TrendingDown size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-light-textMuted uppercase tracking-wider">DOWN Signals</p>
            <p className="text-3xl font-black text-brand-red mt-1">{data.down_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-5 shadow-sm p-5 border-l-4 border-l-purple-500">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
            <Target size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-light-textMuted uppercase tracking-wider">Avg Confidence</p>
            <p className="text-3xl font-black text-light-textMain mt-1">{data.avg_confidence ? data.avg_confidence.toFixed(1) : 0}%</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
         <Card title="Prediction Distribution" className="min-h-[350px] shadow-sm">
           <div className="flex-1 flex flex-col items-center justify-center space-y-10 py-6">
              <div className="w-56 h-56 rounded-full relative flex items-center justify-center shadow-inner" 
                   style={{
                     background: `conic-gradient(#10b981 0% ${(data.up_predictions/data.total_predictions)*100}%, #ef4444 ${(data.up_predictions/data.total_predictions)*100}% 100%)`
                   }}>
                <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center z-10 absolute shadow-sm border border-light-border">
                  <PieChart size={32} className="text-brand-blue mb-2" />
                  <span className="font-bold text-xl text-light-textMain">Distribution</span>
                </div>
              </div>
              <div className="flex space-x-12 bg-slate-50 px-8 py-4 rounded-xl border border-light-border">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-brand-green shadow-sm"></div>
                  <span className="text-light-textMain font-bold">UP ({((data.up_predictions/data.total_predictions)*100).toFixed(1)}%)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-brand-red shadow-sm"></div>
                  <span className="text-light-textMain font-bold">DOWN ({((data.down_predictions/data.total_predictions)*100).toFixed(1)}%)</span>
                </div>
              </div>
           </div>
         </Card>

         <Card title="Recent Prediction Trends" className="min-h-[350px] shadow-sm">
            {trends && Object.keys(trends).length > 0 ? (
               <div className="space-y-6 pt-4">
                 {Object.entries(trends).map(([date, counts]) => {
                   const total = counts.UP + counts.DOWN;
                   const upPercent = total > 0 ? (counts.UP / total) * 100 : 0;
                   return (
                     <div key={date} className="flex items-center space-x-4">
                       <span className="text-sm font-semibold text-light-textMuted w-24 bg-slate-100 px-2 py-1 rounded text-center">{date}</span>
                       <div className="flex-1 h-4 flex rounded-full overflow-hidden shadow-inner bg-slate-200">
                         <div className="bg-brand-green h-full transition-all" style={{ width: `${upPercent}%` }}></div>
                         <div className="bg-brand-red h-full transition-all" style={{ width: `${100 - upPercent}%` }}></div>
                       </div>
                       <span className="text-sm font-bold w-12 text-right bg-slate-50 border border-light-border px-2 py-1 rounded">{total}</span>
                     </div>
                   );
                 })}
                 <div className="pt-6 mt-6 border-t border-light-border flex justify-between items-center text-xs font-semibold text-light-textMuted uppercase tracking-wider">
                   <span>Daily Volume Trend</span>
                   <div className="flex space-x-6">
                      <span className="flex items-center text-brand-green"><span className="w-3 h-3 bg-brand-green rounded mr-2"></span> UP</span>
                      <span className="flex items-center text-brand-red"><span className="w-3 h-3 bg-brand-red rounded mr-2"></span> DOWN</span>
                   </div>
                 </div>
               </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-light-textMuted text-sm font-medium p-12 bg-slate-50 rounded-xl border border-dashed border-light-border">
                No trend data available yet.
              </div>
            )}
         </Card>
      </div>
    </div>
  );
};

export default Analytics;
