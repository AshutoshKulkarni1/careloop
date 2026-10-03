import React from 'react';
import type { HealthReading, SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { Activity, Heart, Clock, MessageSquareQuote } from 'lucide-react';

interface TimelineProps {
  glucoseReadings: HealthReading[];
  bpReadings: HealthReading[];
  language: SupportedLanguage;
}

export const Timeline: React.FC<TimelineProps> = ({
  glucoseReadings,
  bpReadings,
  language,
}) => {
  const t = getTranslation(language);

  // Combine and sort newest first
  const allReadings = [...glucoseReadings, ...bpReadings].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 sm:p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4 border-b border-[#E4E2DC]/70 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#14211F] tracking-tight">
            {t.timeline.title}
          </h3>
          <p className="text-xs text-[#5C6966] mt-0.5">
            {t.timeline.subtitle}
          </p>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
          {allReadings.length} entries
        </span>
      </div>

      {allReadings.length === 0 ? (
        <div className="text-center py-8 text-xs text-[#5C6966]">
          {t.timeline.empty}
        </div>
      ) : (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-[#E4E2DC]">
          {allReadings.slice(0, 8).map((item) => {
            const isGlucose = item.type === 'glucose';
            return (
              <div key={item.id} className="relative group">
                {/* Node icon on line */}
                <div
                  className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-all ${
                    item.isNewEntry
                      ? 'border-[#0F5C54] text-[#0F5C54] ring-4 ring-[#E8F1EF]'
                      : 'border-[#5C6966]/40 text-[#5C6966]'
                  }`}
                >
                  {isGlucose ? (
                    <Activity className="w-2.5 h-2.5" strokeWidth={2} />
                  ) : (
                    <Heart className="w-2.5 h-2.5" strokeWidth={2} />
                  )}
                </div>

                {/* Entry Card */}
                <div
                  className={`p-3.5 rounded-lg border transition-all ${
                    item.isNewEntry
                      ? 'bg-[#F2F7F6] border-[#0F5C54]/30 shadow-sm'
                      : 'bg-[#F7F6F3]/50 hover:bg-[#F7F6F3] border-[#E4E2DC]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#14211F]">
                        {isGlucose ? 'Blood Glucose' : 'Blood Pressure'}
                      </span>
                      {item.isNewEntry && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#0F5C54] text-white">
                          {t.timeline.newBadge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#5C6966]">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      <span>{item.displayDate} • {item.displayTime}</span>
                    </div>
                  </div>

                  {/* Metric Value */}
                  <div className="mt-1.5 flex items-baseline gap-2">
                    {isGlucose ? (
                      <>
                        <span className="text-lg font-semibold tabular-nums text-[#14211F]">
                          {item.value}
                        </span>
                        <span className="text-xs text-[#5C6966] font-medium">
                          {item.unit}
                        </span>
                        {item.context && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-white text-[#0F5C54] border border-[#E4E2DC] ml-2">
                            {item.context}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="text-lg font-semibold tabular-nums text-[#14211F]">
                          {item.systolic}/{item.diastolic}
                        </span>
                        <span className="text-xs text-[#5C6966] font-medium">
                          {item.unit}
                        </span>
                        <span className="text-[11px] text-[#5C6966] ml-2">
                          (Sys: {item.systolic} / Dia: {item.diastolic})
                        </span>
                      </>
                    )}
                  </div>

                  {/* Transcribed speech quote */}
                  {item.originalText && (
                    <div className="mt-2 pt-2 border-t border-[#E4E2DC]/60 flex items-start gap-1.5 text-xs text-[#5C6966] italic">
                      <MessageSquareQuote className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#0F5C54]/70" strokeWidth={1.5} />
                      <span className="line-clamp-1">"{item.originalText}"</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
