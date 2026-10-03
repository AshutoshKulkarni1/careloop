import React from 'react';
import type { HealthReading, SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { Activity, Heart, Clock } from 'lucide-react';

interface TodayCardsProps {
  todayGlucose?: HealthReading;
  todayBp?: HealthReading;
  language: SupportedLanguage;
  onQuickLogGlucose: () => void;
  onQuickLogBp: () => void;
}

export const TodayCards: React.FC<TodayCardsProps> = ({
  todayGlucose,
  todayBp,
  language,
  onQuickLogGlucose,
  onQuickLogBp,
}) => {
  const t = getTranslation(language);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Glucose Card */}
      <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#E8F1EF] text-[#0F5C54]">
              <Activity className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
                {t.today.glucoseLabel}
              </h4>
              <p className="text-[11px] text-[#5C6966]">{t.today.glucoseSub}</p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
            {t.today.todayTag}
          </span>
        </div>

        <div className="my-2">
          {todayGlucose ? (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums text-[#14211F]">
                  {todayGlucose.value}
                </span>
                <span className="text-sm font-medium text-[#5C6966]">
                  {todayGlucose.unit}
                </span>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20">
                  {todayGlucose.context}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#5C6966]">
                <Clock className="w-3 h-3 text-[#5C6966]" strokeWidth={1.5} />
                <span>{t.today.recordedAt} {todayGlucose.displayTime}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-[#5C6966]">
                  {t.today.noReading}
                </p>
                <p className="text-[11px] text-[#5C6966]/80 mt-0.5">
                  {language === 'kn' ? 'ಧ್ವನಿಯ ಮೂಲಕ ದಾಖಲಿಸಿ' : language === 'mr' ? 'आवाजाद्वारे नोंदवा' : language === 'hi' ? 'आवाज से दर्ज करें' : 'Log with voice'}
                </p>
              </div>
              <button
                type="button"
                onClick={onQuickLogGlucose}
                className="text-xs font-medium text-[#0F5C54] hover:underline px-2.5 py-1 rounded bg-[#E8F1EF] hover:bg-[#D9EAE7] transition-colors"
              >
                Log now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Blood Pressure Card */}
      <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#8A6F3E]">
              <Heart className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
                {t.today.bpLabel}
              </h4>
              <p className="text-[11px] text-[#5C6966]">{t.today.bpSub}</p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
            {t.today.todayTag}
          </span>
        </div>

        <div className="my-2">
          {todayBp ? (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums text-[#14211F]">
                  {todayBp.systolic}
                  <span className="text-xl text-[#5C6966] font-light mx-1">/</span>
                  {todayBp.diastolic}
                </span>
                <span className="text-sm font-medium text-[#5C6966]">
                  {todayBp.unit}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#5C6966]">
                <Clock className="w-3 h-3 text-[#5C6966]" strokeWidth={1.5} />
                <span>{t.today.recordedAt} {todayBp.displayTime}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-[#5C6966]">
                  {t.today.noReading}
                </p>
                <p className="text-[11px] text-[#5C6966]/80 mt-0.5">
                  {language === 'kn' ? 'ಧ್ವನಿಯ ಮೂಲಕ ದಾಖಲಿಸಿ' : language === 'mr' ? 'आवाजाद्वारे नोंदवा' : language === 'hi' ? 'आवाज से दर्ज करें' : 'Log with voice'}
                </p>
              </div>
              <button
                type="button"
                onClick={onQuickLogBp}
                className="text-xs font-medium text-[#8A6F3E] hover:underline px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#F2EADB] transition-colors"
              >
                Log now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
