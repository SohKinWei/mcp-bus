import React from 'react';

interface MrtBadgeProps {
  stationCode: string; // e.g. "NE4", "DT19", "EW14", "NS24", "TE14", "CC1"
  lineCode?: 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
  stationName?: string;
}

export const MRT_LINE_COLORS: Record<string, { bg: string; text: string; name: string }> = {
  NEL: { bg: '#7B1FA2', text: '#FFFFFF', name: 'North East Line' },
  DTL: { bg: '#005BAA', text: '#FFFFFF', name: 'Downtown Line' },
  EWL: { bg: '#009640', text: '#FFFFFF', name: 'East West Line' },
  NSL: { bg: '#D42E12', text: '#FFFFFF', name: 'North South Line' },
  TEL: { bg: '#9D5B25', text: '#FFFFFF', name: 'Thomson-East Coast Line' },
  CCL: { bg: '#FF9E1B', text: '#FFFFFF', name: 'Circle Line' }
};

export function inferLineCode(code: string): 'NEL' | 'DTL' | 'EWL' | 'NSL' | 'TEL' | 'CCL' {
  if (code.startsWith('NE')) return 'NEL';
  if (code.startsWith('DT')) return 'DTL';
  if (code.startsWith('EW')) return 'EWL';
  if (code.startsWith('NS')) return 'NSL';
  if (code.startsWith('TE')) return 'TEL';
  if (code.startsWith('CC') || code.startsWith('CE')) return 'CCL';
  return 'NEL';
}

export const MrtBadge: React.FC<MrtBadgeProps> = ({
  stationCode,
  lineCode,
  className = '',
  size = 'sm',
  showName = false,
  stationName
}) => {
  const resolvedLine = lineCode || inferLineCode(stationCode);
  const config = MRT_LINE_COLORS[resolvedLine] || { bg: '#192A48', text: '#FFFFFF', name: 'MRT' };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] min-w-[32px] h-[18px]',
    sm: 'px-2 py-0.5 text-xs min-w-[38px] h-[22px]',
    md: 'px-2.5 py-1 text-xs min-w-[44px] h-[26px]',
    lg: 'px-3 py-1.5 text-sm min-w-[52px] h-[32px]'
  }[size];

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        style={{ backgroundColor: config.bg, color: config.text }}
        className={`inline-flex items-center justify-center rounded-full font-display font-bold tracking-tight select-none tabular-nums shadow-2xs ${sizeStyles}`}
        title={`${config.name} - ${stationCode}${stationName ? ` (${stationName})` : ''}`}
      >
        {stationCode}
      </span>
      {showName && stationName && (
        <span className="text-xs font-semibold text-[#131c27]">{stationName}</span>
      )}
    </div>
  );
};
