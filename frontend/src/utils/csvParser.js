import Papa from 'papaparse';

export const parseCSV = (csvUrl) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      dynamicTyping: false, // We will manually parse numbers to ensure safety
      skipEmptyLines: true,
      complete: (results) => {
        try {
          // Clean and transform data
          const cleanedData = results.data
            .filter(row => row.date && row.close !== undefined && row.close !== '')
            .map(row => ({
              date: String(row.date).trim(),
              open: Number(row.open) || 0,
              high: Number(row.high) || 0,
              low: Number(row.low) || 0,
              close: Number(row.close) || 0,
              volume: Number(row.volume) || 0,
              rsi: Number(row.rsi) || 0,
              volatility: Number(row.volatility) || 0
            }))
            .filter(row => !isNaN(new Date(row.date).getTime())); // Ensure valid dates

          // Sort by date ascending to prevent Lightweight Charts crash
          cleanedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

          resolve(cleanedData);
        } catch (err) {
          reject(err);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
