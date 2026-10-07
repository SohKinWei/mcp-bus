import React from 'react';

interface BusServiceBadgeProps {
  serviceNo: string;
  category?: 'Normal' | 'Express' | 'Direct' | 'Night';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BusServiceBadge: React.FC<BusServiceBadgeProps> = ({
  serviceNo,
  category = 'Normal',
  className = '',
  size = 'md'
}) => {
  const isExpress = category === 'Express';
  const isDirect = category === 'Direct';

  // Dimension guidelines from design specs:
  // Base: min-width 54px, height 38px, border-radius 8px, solid #6B1D6D background, white Space Grotesk bold
  // Express / Direct: high-contrast inverse borders / accents
  const sizeClasses = {
    sm: 'min-w-[42px] h-[30px] text-xs px-2',
    md: 'min-w-[54px] h-[38px] text-base px-2.5',
    lg: 'min-w-[68px] h-[46px] text-xl px-3'
  }[size];

  // Colors:
  // Normal: bg-[#6B1D6D] text-white
  // Express: bg-[#4f0053] text-white border-2 border-[#FE6B27]
  // Direct: bg-[#192A48] text-white border-2 border-[#FFAAF9]
  let badgeStyle = 'bg-[#6B1D6D] text-white border border-purple-800/40 shadow-xs';
  if (isExpress) {
    badgeStyle = 'bg-[#4f0053] text-white border-2 border-[#FE6B27] shadow-sm';
  } else if (isDirect) {
    badgeStyle = 'bg-[#192A48] text-white border-2 border-[#FFAAF9] shadow-sm';
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-[8px] font-display font-bold tracking-tight select-none ${badgeStyle} ${sizeClasses} ${className}`}
      title={`${serviceNo} (${category} Service)`}
    >
      <span className="leading-none text-center">{serviceNo}</span>
    </div>
  );
};
