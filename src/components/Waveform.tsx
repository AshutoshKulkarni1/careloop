import React from 'react';

interface WaveformProps {
  isActive?: boolean;
  barCount?: number;
  height?: number;
  className?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  isActive = true,
  barCount = 18,
  height = 36,
  className = '',
}) => {
  // Balanced baseline heights for a calm clinical waveform
  const baseHeights = [
    20, 35, 60, 45, 80, 55, 90, 75, 100, 70, 85, 50, 65, 40, 55, 30, 20, 15,
  ];

  return (
    <div
      className={`flex items-center justify-center gap-[3px] h-[${height}px] ${className}`}
      aria-hidden="true"
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const heightPct = baseHeights[i % baseHeights.length];
        const animationDelay = `${(i * 0.08).toFixed(2)}s`;
        const animationDuration = `${(0.8 + (i % 5) * 0.15).toFixed(2)}s`;

        return (
          <div
            key={i}
            className={`w-[2.5px] rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-[#0F5C54] animate-wave-bar'
                : 'bg-[#0F5C54]/30 h-[4px]'
            }`}
            style={{
              height: isActive ? `${heightPct}%` : '4px',
              animationDelay: isActive ? animationDelay : undefined,
              animationDuration: isActive ? animationDuration : undefined,
            }}
          />
        );
      })}
    </div>
  );
};
