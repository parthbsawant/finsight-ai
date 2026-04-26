import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

const VolumeChart = ({ data }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [chartError, setChartError] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0) return;
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
        height: 150,
        layout: {
          background: { type: 'solid', color: 'transparent' },
          textColor: '#64748b',
        },
        grid: {
          vertLines: { color: '#f1f5f9' },
          horzLines: { color: '#f1f5f9' },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          borderColor: '#e2e8f0',
        },
        rightPriceScale: {
          borderColor: '#e2e8f0',
        }
      });

      const volumeSeries = chart.addHistogramSeries({
        color: '#38bdf8',
        priceFormat: { type: 'volume' },
        priceScaleId: '',
      });

      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.1, 
          bottom: 0,
        },
      });

      const formattedData = data.map(item => ({
        time: Math.floor(new Date(item.date).getTime() / 1000),
        value: Number(item.volume) || 0,
        color: Number(item.close) > Number(item.open) ? '#10b981' : '#ef4444' // Avoid 8-digit hex just in case
      })).filter(d => !isNaN(d.time)).sort((a, b) => a.time - b.time);

      const uniqueData = formattedData.filter((v, i, a) => a.findIndex(t => (t.time === v.time)) === i);

      if (uniqueData.length > 0) {
        volumeSeries.setData(uniqueData);
        chart.timeScale().fitContent();
      }
      
      chartRef.current = chart;
      window.addEventListener('resize', handleResize);

    } catch (err) {
      console.error("Volume Chart Error:", err);
      setChartError(err.message);
    }

    return () => {
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (chart) chart.remove();
    };
  }, [data]);

  if (chartError) {
    return (
      <div className="w-full h-[150px] flex items-center justify-center bg-red-50 text-red-500 border border-red-200 rounded-lg p-4 text-center">
        Chart Error: {chartError}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="w-full h-[150px] flex items-center justify-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">Loading volume data...</div>;
  }

  return <div ref={chartContainerRef} className="w-full h-[150px]" />;
};

export default VolumeChart;
