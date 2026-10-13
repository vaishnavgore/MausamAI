import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, CloudRain } from 'lucide-react';

interface RadarPlayerProps {
  onFrameChange: (frameIndex: number) => void;
  currentFrame: number;
}

export const RADAR_FRAMES = [
  { label: '-60 min', time: '10:45 AM', intensity: 'Scattered Mist', cloudOffsetLat: 0.015, cloudOffsetLng: -0.020, scale: 0.7 },
  { label: '-45 min', time: '11:00 AM', intensity: 'Early Drizzle', cloudOffsetLat: 0.010, cloudOffsetLng: -0.012, scale: 0.85 },
  { label: '-30 min', time: '11:15 AM', intensity: 'Cell Developing', cloudOffsetLat: 0.005, cloudOffsetLng: -0.006, scale: 0.95 },
  { label: '-15 min', time: '11:30 AM', intensity: 'Heavy Convection', cloudOffsetLat: 0.000, cloudOffsetLng: 0.000, scale: 1.1 },
  { label: 'Live Now', time: '11:45 AM', intensity: 'Intense Downpour (18mm/h)', cloudOffsetLat: -0.004, cloudOffsetLng: 0.008, scale: 1.25 },
];

export const RadarPlayer: React.FC<RadarPlayerProps> = ({ onFrameChange, currentFrame }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        onFrameChange((currentFrame + 1) % RADAR_FRAMES.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentFrame, onFrameChange]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStep = () => {
    onFrameChange((currentFrame + 1) % RADAR_FRAMES.length);
  };

  const active = RADAR_FRAMES[currentFrame] || RADAR_FRAMES[RADAR_FRAMES.length - 1];

  return (
    <div className="bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
      
      {/* Player Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={togglePlay}
          className={`p-1.5 rounded-lg text-white font-semibold transition flex items-center gap-1.5 ${
            isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
          }`}
          title={isPlaying ? 'Pause Radar Loop' : 'Play Animated Doppler Loop'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          <span className="text-[11px] px-0.5">{isPlaying ? 'Pause' : 'Play Loop'}</span>
        </button>

        <button
          onClick={handleStep}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition"
          title="Step to next frame"
        >
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Frame Timeline Buttons */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/80 dark:border-slate-700/80">
        {RADAR_FRAMES.map((f, idx) => (
          <button
            key={idx}
            onClick={() => onFrameChange(idx)}
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition ${
              currentFrame === idx
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-300">
        <CloudRain className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
        <span className="font-bold text-slate-900 dark:text-white">{active.time}</span>
        <span className="text-slate-400 dark:text-slate-600">•</span>
        <span className="text-blue-700 dark:text-blue-400 font-semibold">{active.intensity}</span>
      </div>

    </div>
  );
};
