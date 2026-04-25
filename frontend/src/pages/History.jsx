import React, { useState, useEffect } from 'react';
import { api } from '../api/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHistory();
      setHistory(data);
    } catch (err) {
      setError('Failed to fetch prediction history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><Loader message="Loading prediction history..." /></div>;
  if (error) return <div className="p-8"><Error message={error} retry={fetchHistory} /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Prediction History</h1>
        <p className="text-gray-400 mt-1">Review past AI predictions and confidence scores.</p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-dark-bg/50 border-b border-dark-border text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 font-medium">Symbol</th>
                <th className="p-4 font-medium">Prediction</th>
                <th className="p-4 font-medium">Confidence</th>
                <th className="p-4 font-medium">Date & Time</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border text-sm">
              {history.length > 0 ? (
                history.map((item, index) => (
                  <tr key={index} className="hover:bg-dark-surface/50 transition-colors">
                    <td className="p-4 font-medium text-gray-200">{item.symbol}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                        item.prediction === 'UP' 
                          ? 'bg-brand-green/10 text-brand-green border-brand-green/20' 
                          : 'bg-brand-red/10 text-brand-red border-brand-red/20'
                      }`}>
                        {item.prediction === 'UP' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {item.prediction}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-dark-bg rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.confidence > 80 ? 'bg-brand-green' : item.confidence > 60 ? 'bg-yellow-500' : 'bg-brand-red'}`} 
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                        <span>{item.confidence.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400 flex items-center space-x-2">
                      <Clock size={14} />
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => navigate(`/stock/${item.symbol}`)}
                        className="p-2 text-gray-400 hover:text-brand-blue transition-colors rounded-lg hover:bg-brand-blue/10 inline-flex items-center justify-center"
                        title="View Chart"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No prediction history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default History;
