import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#2e2e2e' },
        horzLines: { color: '#2e2e2e' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00b852',
      downColor: '#ff4a4a',
      borderVisible: false,
      wickUpColor: '#00b852',
      wickDownColor: '#ff4a4a',
    });

    // Format data: lightweight-charts expects { time, open, high, low, close }
    const formattedData = data.map(item => ({
      time: new Date(item.date).getTime() / 1000,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    })).sort((a, b) => a.time - b.time);

    candlestickSeries.setData(formattedData);
    chartRef.current = chart;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[400px]" />;
};

export default CandlestickChart;
