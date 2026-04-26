import React from 'react';
import { Play, Pause, FastForward, Rewind, RotateCcw } from 'lucide-react';

const SimulationControls = ({
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  timeframe,
  setTimeframe,
  onRestart,
  onBackward,
  onForward
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-light-border p-4 rounded-xl shadow-sm gap-4 mb-4">
      {/* Timeframes & Live Status */}
      <div className="flex items-center space-x-4">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['1D', '1W', '1M'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm font-bold rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-white text-brand-blue shadow-sm'
                  : 'text-light-textMuted hover:text-light-textMain'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        {isPlaying && (
          <div className="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded border border-green-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
            </span>
            <span className="text-xs font-bold text-brand-green tracking-wide">LIVE</span>
          </div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onRestart}
          className="p-2 text-light-textMuted hover:text-brand-blue hover:bg-slate-50 rounded-full transition-colors"
          title="Restart Simulation"
        >
          <RotateCcw size={18} />
        </button>
        <button
          onClick={onBackward}
          className="p-2 text-light-textMuted hover:text-brand-blue hover:bg-slate-50 rounded-full transition-colors"
          title="Backward 10 Candles"
        >
          <Rewind size={18} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`p-3 rounded-full text-white shadow-sm transition-transform active:scale-95 ${
            isPlaying ? 'bg-brand-red hover:bg-red-600' : 'bg-brand-blue hover:bg-blue-700'
          }`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        <button
          onClick={onForward}
          className="p-2 text-light-textMuted hover:text-brand-blue hover:bg-slate-50 rounded-full transition-colors"
          title="Forward 10 Candles"
        >
          <FastForward size={18} />
        </button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
        <span className="text-xs font-semibold text-light-textMuted px-2">SPEED:</span>
        <div className="flex space-x-1">
          {[
            { label: 'Slow', value: 2000 },
            { label: 'Normal', value: 1000 },
            { label: 'Fast', value: 300 }
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setSpeed(s.value)}
              className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                speed === s.value
                  ? 'bg-white text-brand-blue shadow-sm border border-slate-200'
                  : 'text-light-textMuted hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
