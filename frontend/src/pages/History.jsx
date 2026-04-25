import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../api/api';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, ArrowDownRight, Clock, ArrowUpDown } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getHistory();
      setHistory(data.data);
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHistory = useMemo(() => {
    let sortableItems = [...history];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [history, sortConfig]);

  if (loading) return <div className="p-8 flex justify-center"><Loader message="Loading prediction history..." /></div>;
  if (error) return <div className="p-8"><Error message={error} retry={fetchHistory} /></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      <div className="mb-8 border-b border-light-border pb-6">
        <h1 className="text-3xl font-black text-light-textMain tracking-tight">Prediction History</h1>
        <p className="text-light-textMuted mt-1 font-medium">Review past AI predictions, sorted by time or confidence scores.</p>
      </div>

      <Card className="overflow-hidden p-0 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-light-border text-xs uppercase tracking-wider text-light-textMuted font-bold">
                <th className="p-4 px-6 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('symbol')}>
                  <div className="flex items-center">Symbol <ArrowUpDown size={14} className="ml-1 opacity-50" /></div>
                </th>
                <th className="p-4 px-6 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('prediction')}>
                  <div className="flex items-center">Prediction <ArrowUpDown size={14} className="ml-1 opacity-50" /></div>
                </th>
                <th className="p-4 px-6 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('confidence')}>
                  <div className="flex items-center">Confidence <ArrowUpDown size={14} className="ml-1 opacity-50" /></div>
                </th>
                <th className="p-4 px-6 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => handleSort('timestamp')}>
                  <div className="flex items-center">Date & Time <ArrowUpDown size={14} className="ml-1 opacity-50" /></div>
                </th>
                <th className="p-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border text-sm">
              {sortedHistory.length > 0 ? (
                sortedHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 px-6 font-bold text-light-textMain">{item.symbol}</td>
                    <td className="p-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${item.prediction === 'UP'
                        ? 'bg-emerald-50 text-brand-green border-emerald-100'
                        : 'bg-red-50 text-brand-red border-red-100'
                        }`}>
                        {item.prediction === 'UP' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                        {item.prediction}
                      </span>
                    </td>
                    <td className="p-4 px-6 text-light-textMain">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold w-12">{(item.confidence || 0).toFixed(1)}%</span>
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`h-full ${item.confidence > 80 ? 'bg-brand-green' : item.confidence > 60 ? 'bg-yellow-500' : 'bg-brand-red'}`}
                            style={{ width: `${item.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 px-6 text-light-textMuted font-medium flex items-center space-x-2">
                      <Clock size={16} className="text-slate-400" />
                      <span>{new Date(item.timestamp).toLocaleString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}</span>
                    </td>
                    <td className="p-4 px-6 text-right">
                      <button
                        onClick={() => navigate(`/stock/${item.symbol}`)}
                        className="p-2 text-slate-400 hover:text-brand-blue hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all rounded-lg inline-flex items-center justify-center opacity-0 group-hover:opacity-100"
                        title="View Chart"
                      >
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-light-textMuted font-medium bg-slate-50">
                    No prediction history found. Run a prediction from the Dashboard to see it here.
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
