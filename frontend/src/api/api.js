import axios from 'axios';

const BASE_URL = 'https://web-production-5d0e0.up.railway.app';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  predictStock: async (symbol) => {
    const response = await apiClient.get(`/predict/${symbol}`);
    return response.data;
  },
  getHistory: async () => {
    const response = await apiClient.get('/history');
    return response.data;
  },
  getAnalytics: async () => {
    const response = await apiClient.get('/analytics');
    return response.data;
  },
  getStockAnalytics: async (symbol) => {
    const response = await apiClient.get(`/analytics/stock/${symbol}`);
    return response.data;
  },
  getTrends: async () => {
    const response = await apiClient.get('/analytics/trends');
    return response.data;
  },
  getRecentAnalytics: async () => {
    const response = await apiClient.get('/analytics/recent');
    return response.data;
  }
};
