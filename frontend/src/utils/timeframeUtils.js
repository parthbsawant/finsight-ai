export const aggregateData = (data, timeframe) => {
  if (timeframe === '1D') return data;
  if (!data || data.length === 0) return [];

  const groupSize = timeframe === '1W' ? 5 : timeframe === '1M' ? 20 : 1;
  const result = [];

  for (let i = 0; i < data.length; i += groupSize) {
    const chunk = data.slice(i, i + groupSize);
    
    if (chunk.length === 0) continue;

    const first = chunk[0];
    const last = chunk[chunk.length - 1];

    let maxHigh = first.high;
    let minLow = first.low;
    let sumVolume = 0;

    for (const row of chunk) {
      if (row.high > maxHigh) maxHigh = row.high;
      if (row.low < minLow) minLow = row.low;
      sumVolume += row.volume;
    }

    result.push({
      date: last.date, // Use the last date of the chunk as the period's date
      open: first.open,
      high: maxHigh,
      low: minLow,
      close: last.close,
      volume: sumVolume,
      rsi: last.rsi, // For indicators, we'll just take the last value of the period
      volatility: last.volatility
    });
  }

  return result;
};
