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
import { Heart } from 'lucide-react';

interface BpChartProps {
  readings: HealthReading[];
  highlightedPointId: string | null;
  language: SupportedLanguage;
}

export const BpChart: React.FC<BpChartProps> = ({
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
    systolic: r.systolic,
    diastolic: r.diastolic,
    unit: r.unit,
    isNew: r.isNewEntry,
    isHighlighted: highlightedPointId === r.id,
  }));

  // Custom Neutral Clinical Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length >= 2) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-[#E4E2DC] p-3 rounded-lg shadow-subtle text-xs text-[#14211F] space-y-1.5">
          <div className="font-semibold tabular-nums text-sm text-[#14211F]">
            {data.systolic} / {data.diastolic} <span className="text-xs font-normal text-[#5C6966]">{data.unit}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#5C6966]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0F5C54]" />
              Systolic: <strong className="text-[#14211F] tabular-nums">{data.systolic}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#8A6F3E]" />
              Diastolic: <strong className="text-[#14211F] tabular-nums">{data.diastolic}</strong>
            </span>
          </div>
          <div className="text-[#5C6966] text-[10px]">
            {data.fullDate} • {data.time}
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

  // Render dot for Systolic
  const renderSystolicDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isTarget = payload.isHighlighted;
    const isNew = payload.isNew;

    return (
      <g key={`sys-${payload.id}`}>
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

  // Render dot for Diastolic
  const renderDiastolicDot = (props: any) => {
    const { cx, cy, payload } = props;
    const isTarget = payload.isHighlighted;
    const isNew = payload.isNew;

    return (
      <g key={`dia-${payload.id}`}>
        {isTarget && (
          <circle
            cx={cx}
            cy={cy}
            r={10}
            fill="#8A6F3E"
            opacity={0.25}
            className="animate-ping"
          />
        )}
        <circle
          cx={cx}
          cy={cy}
          r={isTarget ? 6 : isNew ? 5 : 3.5}
          fill={isNew ? '#8A6F3E' : '#FFFFFF'}
          stroke="#8A6F3E"
          strokeWidth={isNew ? 2.5 : 1.5}
          className={isTarget ? 'animate-point-pulse' : ''}
        />
      </g>
    );
  };

  return (
    <div
      id="bp-chart-container"
      className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between transition-all"
    >
      {/* Chart Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold text-[#14211F] tracking-tight">
              {t.charts.bpTitle}
            </h3>
          </div>
          <p className="text-xs text-[#5C6966] mt-0.5">
            {t.charts.bpSubtitle}
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
              domain={[60, 170]}
              tickLine={false}
              axisLine={{ stroke: '#E4E2DC' }}
              tickFormatter={(v) => `${v}`}
              className="tabular-nums"
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Systolic Line */}
            <Line
              type="monotone"
              dataKey="systolic"
              name="Systolic"
              stroke="#0F5C54"
              strokeWidth={2}
              dot={renderSystolicDot}
              activeDot={{ r: 5, fill: '#0F5C54' }}
              isAnimationActive={true}
              animationDuration={800}
            />
            {/* Diastolic Line */}
            <Line
              type="monotone"
              dataKey="diastolic"
              name="Diastolic"
              stroke="#8A6F3E"
              strokeWidth={2}
              dot={renderDiastolicDot}
              activeDot={{ r: 5, fill: '#8A6F3E' }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Legend & Latest reading */}
      <div className="mt-3 pt-3 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] text-[#5C6966]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C54] inline-block" />
            <span>Systolic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A6F3E] inline-block" />
            <span>Diastolic</span>
          </div>
        </div>
        <span className="tabular-nums">
          Latest: <strong className="text-[#14211F]">{chartData[chartData.length - 1]?.systolic}/{chartData[chartData.length - 1]?.diastolic} mmHg</strong>
        </span>
      </div>
    </div>
  );
};
