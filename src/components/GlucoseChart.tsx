import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { HealthReading, SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { Activity } from 'lucide-react';

interface GlucoseChartProps {
  readings: HealthReading[];
  highlightedPointId: string | null;
  language: SupportedLanguage;
}

export const GlucoseChart: React.FC<GlucoseChartProps> = ({
  readings,
  highlightedPointId,
  language,
}) => {
  const t = getTranslation(language);

  // Transform readings for Recharts
  const chartData = readings.map((r, index) => ({
    id: r.id,
    dayLabel: r.displayDate === 'Today' ? 'Today' : `D${index + 1}`,
    fullDate: r.displayDate,
    time: r.displayTime,
    value: r.value,
    unit: r.unit,
    context: r.context || 'Standard',
    isNew: r.isNewEntry,
    isHighlighted: highlightedPointId === r.id,
  }));

  // Custom Neutral Clinical Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[#E4E2DC] p-3 rounded-lg shadow-subtle text-xs text-[#14211F] space-y-1">
          <div className="font-semibold tabular-nums text-sm text-[#0F5C54]">
            {data.value} {data.unit}
          </div>
          <div className="text-[#5C6966]">
            {data.context} • {data.fullDate} {data.time}
          </div>
          {data.isNew && (
            <div className="text-[10px] font-medium text-[#0F5C54] bg-[#E8F1EF] px-1.5 py-0.5 rounded inline-block">
              Demo entry
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom dot renderer to animate/highlight new point
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isTarget = payload.isHighlighted;
    const isNew = payload.isNew;

    return (
      <g key={payload.id}>
        {isTarget && (
          <circle
            cx={cx}
            cy={cy}
            r={10}
            fill="#0F5C54"
            opacity={0.25}
            className="animate-ping"
          />
        )}
        <circle
          cx={cx}
          cy={cy}
          r={isTarget ? 6 : isNew ? 5 : 3.5}
          fill={isNew ? '#0F5C54' : '#FFFFFF'}
          stroke="#0F5C54"
          strokeWidth={isNew ? 2.5 : 1.5}
          className={isTarget ? 'animate-point-pulse' : ''}
        />
      </g>
    );
  };

  return (
    <div
      id="glucose-chart-container"
      className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between transition-all"
    >
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#14211F] tracking-tight">
              {t.charts.glucoseTitle}
            </h3>
          </div>
          <p className="text-xs text-[#5C6966] mt-0.5">
            {t.charts.glucoseSubtitle}
          </p>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
          {t.charts.demoDataTag}
        </span>
      </div>

      {/* Chart Container */}
      <div className="w-full h-56 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#EFECE6"
              vertical={false}
            />
            <XAxis
              dataKey="dayLabel"
              stroke="#5C6966"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E4E2DC' }}
            />
            <YAxis
              stroke="#5C6966"
              fontSize={11}
              domain={[90, 180]}
              tickLine={false}
              axisLine={{ stroke: '#E4E2DC' }}
              tickFormatter={(v) => `${v}`}
              className="tabular-nums"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0F5C54"
              strokeWidth={2}
              dot={renderDot}
              activeDot={{ r: 5, fill: '#0F5C54' }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Info */}
      <div className="mt-3 pt-3 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] text-[#5C6966]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C54] inline-block" />
          <span>Post-Prandial & Fasting readings (mg/dL)</span>
        </div>
        <span className="tabular-nums">
          Latest: <strong className="text-[#14211F]">{chartData[chartData.length - 1]?.value} mg/dL</strong>
        </span>
      </div>
    </div>
  );
};
