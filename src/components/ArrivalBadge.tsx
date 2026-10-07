import React from 'react';
import { Accessibility } from 'lucide-react';
import { NextBus, LoadCapacity } from '../types/transit';

interface ArrivalBadgeProps {
  bus?: NextBus;
  isPrimary?: boolean;
  className?: string;
  showDetails?: boolean;
}

export const ArrivalBadge: React.FC<ArrivalBadgeProps> = ({
  bus,
  isPrimary = false,
  className = '',
  showDetails = true
}) => {
  if (!bus) {
    return (
      <div className={`inline-flex flex-col items-center justify-center rounded-full px-3 py-1.5 bg-[#f4f6f9] border border-[#e5e9f0] text-slate-400 text-xs font-semibold ${className}`}>
        <span>--</span>
      </div>
    );
  }

  const seconds = bus.estimatedArrivalSeconds;
  let timeDisplay = '';
  if (seconds <= 45) {
    timeDisplay = 'Arr';
  } else {
    const mins = Math.ceil(seconds / 60);
    timeDisplay = `${mins} min`;
  }

  // Load styling as per specifications:
  // Green (#137333 on #E6F4EA light tint): Seats Available (SEA)
  // Amber (#D97706 on #FEF3C7 light tint): Standing Available (SDA)
  // Red (#C5221F on #FCE8E6 light tint): Limited Standing (LSD)
  const loadConfig: Record<LoadCapacity, { bg: string; text: string; label: string; border: string }> = {
    SEA: {
      bg: '#E6F4EA',
      text: '#137333',
      label: 'Seats Avail',
      border: '#CEEAD6'
    },
    SDA: {
      bg: '#FEF3C7',
      text: '#D97706',
      label: 'Standing Avail',
      border: '#FDE68A'
    },
    LSD: {
      bg: '#FCE8E6',
      text: '#C5221F',
      label: 'Limited Standing',
      border: '#FAD2CF'
    }
  };

  const currentLoad = loadConfig[bus.load] || loadConfig.SEA;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      {/* Arrival Pill Badge */}
      <div
        style={{
          backgroundColor: currentLoad.bg,
          color: currentLoad.text,
          borderColor: currentLoad.border
        }}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 select-none font-display font-bold tabular-nums shadow-2xs transition-all ${
          isPrimary ? 'text-base font-extrabold px-3.5 py-1.5 scale-102' : 'text-xs'
        }`}
        title={`Arriving in ${timeDisplay} • ${currentLoad.label} • ${bus.type === 'DD' ? 'Double Decker' : bus.type === 'BD' ? 'Bendy' : 'Single Deck'}`}
      >
        <span>{timeDisplay}</span>
        {bus.feature === 'WAB' && (
          <Accessibility
            size={isPrimary ? 14 : 12}
            className="stroke-[2.5] opacity-90"
            aria-label="Wheelchair Accessible"
          />
        )}
      </div>

      {/* Micro bus metadata */}
      {showDetails && (
        <div className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-slate-500">
          <span className="bg-slate-100 text-slate-700 px-1 py-0.2 rounded font-mono">
            {bus.type}
          </span>
          <span className="truncate max-w-[70px] text-[9px] text-slate-500">
            {bus.load === 'SEA' ? 'Seats' : bus.load === 'SDA' ? 'Standing' : 'Crowded'}
          </span>
        </div>
      )}
    </div>
  );
};
