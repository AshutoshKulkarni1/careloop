import React, { useState } from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { initialWeekLogs } from '../data/weekLogsData';
import {
  Activity,
  Heart,
  Radio,
  Search,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface WeeklyHealthLogProps {
  language: SupportedLanguage;
  onBackToDashboard: () => void;
  onToast?: (msg: string) => void;
}

export const WeeklyHealthLog: React.FC<WeeklyHealthLogProps> = ({
  language,
  onBackToDashboard,
  onToast,
}) => {
  const t = getTranslation(language);
  const w = t.weekLogs;

  const [activeFilter, setActiveFilter] = useState<'all' | 'glucose' | 'bp' | 'vitals'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter entries
  const filteredLogs = initialWeekLogs.filter((entry) => {
    // Type filter
    if (activeFilter === 'glucose' && entry.type !== 'glucose') return false;
    if (activeFilter === 'bp' && entry.type !== 'blood_pressure') return false;
    if (activeFilter === 'vitals' && entry.type !== 'heart_rate' && entry.type !== 'spo2')
      return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        entry.metricLabel.toLowerCase().includes(q) ||
        entry.context.toLowerCase().includes(q) ||
        entry.source.toLowerCase().includes(q) ||
        entry.displayDate.toLowerCase().includes(q) ||
        entry.valueDisplay.includes(q)
      );
    }
    return true;
  });

  const handleExport = () => {
    if (onToast) {
      onToast('7-Day Clinical Log exported to demo CSV file.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#E4E2DC] shadow-subtle">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="w-9 h-9 rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] border border-[#E4E2DC] flex items-center justify-center text-[#14211F] transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
              <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#14211F]">
                {w.title}
              </h2>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20">
                7 Days Complete
              </span>
            </div>
            <p className="text-xs text-[#5C6966] mt-0.5">
              {w.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] border border-[#E4E2DC] text-[#14211F] text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#5C6966]" strokeWidth={1.5} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-xs font-medium transition-colors shadow-subtle"
          >
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* Summary Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-[#E4E2DC] shadow-subtle">
          <div className="flex items-center gap-1.5 text-xs text-[#5C6966] mb-1">
            <Layers className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            <span>{w.totalEntries}</span>
          </div>
          <div className="text-2xl font-semibold tabular-nums text-[#14211F]">
            18
          </div>
          <div className="text-[10px] text-[#5C6966] mt-0.5">Across 4 vitals</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E2DC] shadow-subtle">
          <div className="flex items-center gap-1.5 text-xs text-[#5C6966] mb-1">
            <Activity className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            <span>{w.avgGlucose}</span>
          </div>
          <div className="text-2xl font-semibold tabular-nums text-[#14211F]">
            128 <span className="text-xs font-normal text-[#5C6966]">mg/dL</span>
          </div>
          <div className="text-[10px] text-[#5C6966] mt-0.5">7-day weighted avg</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E2DC] shadow-subtle">
          <div className="flex items-center gap-1.5 text-xs text-[#5C6966] mb-1">
            <Heart className="w-3.5 h-3.5 text-[#8A6F3E]" strokeWidth={1.5} />
            <span>{w.meanBp}</span>
          </div>
          <div className="text-2xl font-semibold tabular-nums text-[#14211F]">
            124/81 <span className="text-xs font-normal text-[#5C6966]">mmHg</span>
          </div>
          <div className="text-[10px] text-[#5C6966] mt-0.5">7 seated readings</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E2DC] shadow-subtle">
          <div className="flex items-center gap-1.5 text-xs text-[#5C6966] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            <span>{w.restingHr}</span>
          </div>
          <div className="text-2xl font-semibold tabular-nums text-[#14211F]">
            72 <span className="text-xs font-normal text-[#5C6966]">bpm</span>
          </div>
          <div className="text-[10px] text-[#5C6966] mt-0.5">Continuous telemetry</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E4E2DC] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#0F5C54] text-white shadow-subtle'
                : 'bg-[#F7F6F3] text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            {w.filterAll} (18)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('glucose')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeFilter === 'glucose'
                ? 'bg-[#0F5C54] text-white shadow-subtle'
                : 'bg-[#F7F6F3] text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            {w.filterGlucose}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('bp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeFilter === 'bp'
                ? 'bg-[#0F5C54] text-white shadow-subtle'
                : 'bg-[#F7F6F3] text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            {w.filterBp}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('vitals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              activeFilter === 'vitals'
                ? 'bg-[#0F5C54] text-white shadow-subtle'
                : 'bg-[#F7F6F3] text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            {w.filterVitals}
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#5C6966]" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={w.searchPlaceholder}
            className="w-full text-xs pl-8 pr-3 py-1.5 bg-[#F7F6F3] border border-[#E4E2DC] rounded-lg text-[#14211F] placeholder:text-[#5C6966]/60 focus:outline-none focus:ring-1 focus:ring-[#0F5C54]"
          />
        </div>
      </div>

      {/* Clinical Logs Table */}
      <div className="bg-white rounded-xl border border-[#E4E2DC] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F7] border-b border-[#E4E2DC] text-[11px] font-semibold text-[#5C6966] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">{w.colDate}</th>
                <th className="py-3 px-4">{w.colMetric}</th>
                <th className="py-3 px-4">{w.colValue}</th>
                <th className="py-3 px-4">{w.colContext}</th>
                <th className="py-3 px-4">{w.colSource}</th>
                <th className="py-3 px-4 text-right">{w.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DC]/60">
              {filteredLogs.map((entry) => {
                const isGlucose = entry.type === 'glucose';
                const isBp = entry.type === 'blood_pressure';
                const isHr = entry.type === 'heart_rate';

                return (
                  <tr
                    key={entry.id}
                    className="hover:bg-[#F7F6F3]/50 transition-colors"
                  >
                    {/* Date & Time */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-[#14211F]">
                        {entry.displayDate}
                      </div>
                      <div className="text-[11px] text-[#5C6966] flex items-center gap-1">
                        <Clock className="w-3 h-3" strokeWidth={1.5} />
                        <span>{entry.displayTime} ({entry.dayOfWeek})</span>
                      </div>
                    </td>

                    {/* Metric */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isGlucose && (
                          <Activity className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
                        )}
                        {isBp && (
                          <Heart className="w-3.5 h-3.5 text-[#8A6F3E]" strokeWidth={1.5} />
                        )}
                        {isHr && (
                          <Radio className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
                        )}
                        <span className="font-semibold text-[#14211F]">
                          {entry.metricLabel}
                        </span>
                      </div>
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold tabular-nums text-[#14211F]">
                          {entry.valueDisplay}
                        </span>
                        <span className="text-[11px] text-[#5C6966]">
                          {entry.unit}
                        </span>
                      </div>
                    </td>

                    {/* Context */}
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#F7F6F3] text-[#14211F] border border-[#E4E2DC]">
                        {entry.context}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="py-3.5 px-4 text-[11px] text-[#5C6966]">
                      <div className="font-medium text-[#14211F]">{entry.source}</div>
                      {entry.notes && (
                        <div className="italic text-[10px] text-[#5C6966] truncate max-w-xs">
                          {entry.notes}
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {entry.status === 'Streaming' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#0F5C54] bg-[#E8F1EF] px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54] animate-pulse" />
                          <span>{w.streamingTag}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#5C6966] bg-[#F7F6F3] border border-[#E4E2DC] px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-[#0F5C54]" strokeWidth={1.5} />
                          <span>{w.verified}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
