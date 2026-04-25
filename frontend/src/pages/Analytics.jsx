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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Platform Analytics</h1>
        <p className="text-gray-400 mt-1">Overview of AI model performance and prediction statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-row items-center space-x-4">
          <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-lg">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Predictions</p>
            <p className="text-2xl font-bold text-gray-100">{data.total_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-4">
          <div className="p-3 bg-brand-green/10 text-brand-green rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">UP Signals</p>
            <p className="text-2xl font-bold text-brand-green">{data.up_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-4">
          <div className="p-3 bg-brand-red/10 text-brand-red rounded-lg">
            <TrendingDown size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">DOWN Signals</p>
            <p className="text-2xl font-bold text-brand-red">{data.down_predictions}</p>
          </div>
        </Card>

        <Card className="flex flex-row items-center space-x-4">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Avg Confidence</p>
            <p className="text-2xl font-bold text-gray-100">{data.avg_confidence ? data.avg_confidence.toFixed(1) : 0}%</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         <Card title="Prediction Distribution" className="min-h-[300px]">
           {/* Simple custom visualization for UP vs DOWN since we aren't using a complex charting library for this */}
           <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="w-48 h-48 rounded-full border-8 border-dark-surface relative flex items-center justify-center" 
                   style={{
                     background: `conic-gradient(#00b852 0% ${(data.up_predictions/data.total_predictions)*100}%, #ff4a4a ${(data.up_predictions/data.total_predictions)*100}% 100%)`
                   }}>
                <div className="w-32 h-32 bg-dark-surface rounded-full flex flex-col items-center justify-center z-10 absolute shadow-inner">
                  <PieChart size={24} className="text-gray-400 mb-2" />
                  <span className="font-bold text-lg text-gray-200">Distribution</span>
                </div>
              </div>
              <div className="flex space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  <span className="text-gray-300">UP ({((data.up_predictions/data.total_predictions)*100).toFixed(1)}%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                  <span className="text-gray-300">DOWN ({((data.down_predictions/data.total_predictions)*100).toFixed(1)}%)</span>
                </div>
              </div>
           </div>
         </Card>

         <Card title="Recent Prediction Trends" className="min-h-[300px]">
            {trends && Object.keys(trends).length > 0 ? (
               <div className="space-y-4">
                 {Object.entries(trends).map(([date, counts]) => {
                   const total = counts.UP + counts.DOWN;
                   const upPercent = total > 0 ? (counts.UP / total) * 100 : 0;
                   return (
                     <div key={date} className="flex items-center space-x-4">
                       <span className="text-sm text-gray-400 w-24">{date}</span>
                       <div className="flex-1 h-3 flex rounded-full overflow-hidden">
                         <div className="bg-brand-green h-full" style={{ width: `${upPercent}%` }}></div>
                         <div className="bg-brand-red h-full" style={{ width: `${100 - upPercent}%` }}></div>
                       </div>
                       <span className="text-sm font-medium w-12 text-right">{total}</span>
                     </div>
                   );
                 })}
                 <div className="pt-4 mt-4 border-t border-dark-border flex justify-between text-xs text-gray-500">
                   <span>Daily Volume</span>
                   <div className="flex space-x-4">
                      <span className="text-brand-green">■ UP</span>
                      <span className="text-brand-red">■ DOWN</span>
                   </div>
                 </div>
               </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                No trend data available yet.
              </div>
            )}
         </Card>
      </div>
    </div>
  );
};

export default Analytics;
