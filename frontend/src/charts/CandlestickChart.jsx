import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries, CrosshairMode } from 'lightweight-charts';

const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [chartError, setChartError] = useState(null);

  // Initialize chart only once
  useEffect(() => {
    if (!chartContainerRef.current) return;

    let chart;
    let handleResize;

    try {
      handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { type: 'solid', color: '#ffffff' },
          textColor: '#334155',
        },
        grid: {
          vertLines: { color: '#f1f5f9', style: 1 },
          horzLines: { color: '#f1f5f9', style: 1 },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            width: 1,
            color: '#94a3b8',
            style: 3,
            labelBackgroundColor: '#334155',
          },
          horzLine: {
            width: 1,
            color: '#94a3b8',
            style: 3,
            labelBackgroundColor: '#334155',
          },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          borderColor: '#e2e8f0',
          rightOffset: 10,
          barSpacing: 12,
          fixLeftEdge: true,
        },
        rightPriceScale: {
          borderColor: '#e2e8f0',
          autoScale: true,
        }
      });

      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });

      chartRef.current = chart;
      seriesRef.current = candlestickSeries;
      window.addEventListener('resize', handleResize);

    } catch (err) {
      console.error("Candlestick Chart Init Error:", err);
      setChartError(err.message);
    }

    return () => {
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, []);

  // Update data smoothly
  useEffect(() => {
    if (!seriesRef.current || !chartRef.current || !data || data.length === 0) return;

    try {
      const formattedData = data.map(item => ({
        time: Math.floor(new Date(item.date).getTime() / 1000),
        open: Number(item.open) || 0,
        high: Number(item.high) || 0,
        low: Number(item.low) || 0,
        close: Number(item.close) || 0,
      })).filter(d => !isNaN(d.time)).sort((a, b) => a.time - b.time);

      const uniqueData = formattedData.filter((v, i, a) => a.findIndex(t => (t.time === v.time)) === i);

      if (uniqueData.length > 0) {
        seriesRef.current.setData(uniqueData);
        // Force scroll to latest candle for real-time tracking
        chartRef.current.timeScale().scrollToRealTime();
      }
    } catch (err) {
      console.error("Candlestick Chart Update Error:", err);
      setChartError(err.message);
    }
  }, [data]);

  if (chartError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-red-50 text-red-500 border border-red-200 rounded-lg p-4 text-center">
        Chart Error: {chartError}
      </div>
    );
  }

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};

export default CandlestickChart;
