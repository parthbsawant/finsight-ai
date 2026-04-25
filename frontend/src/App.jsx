import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StockDetail from './pages/StockDetail';
import Analytics from './pages/Analytics';
import History from './pages/History';

const App = () => {
  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden text-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-dark-bg p-4 md:p-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
