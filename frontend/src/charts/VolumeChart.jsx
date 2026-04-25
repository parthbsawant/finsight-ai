import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const VolumeChart = ({ data }) => {
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
      height: 150,
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

    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1, // highest point of the series will be 10% away from the top
        bottom: 0,
      },
    });

    // Format data for volume chart
    const formattedData = data.map(item => ({
      time: new Date(item.date).getTime() / 1000,
      value: item.volume,
      color: item.close > item.open ? '#00b85280' : '#ff4a4a80'
    })).sort((a, b) => a.time - b.time);

    volumeSeries.setData(formattedData);
    chartRef.current = chart;

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-[150px]" />;
};

export default VolumeChart;
