import React from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { Pill, Check, Clock, AlertCircle } from 'lucide-react';

interface MedicationsModuleProps {
  language: SupportedLanguage;
  isEveningTaken?: boolean;
  onMarkEveningTaken?: () => void;
  isPostMealReadingLogged?: boolean;
}

export const MedicationsModule: React.FC<MedicationsModuleProps> = ({
  language,
  isEveningTaken = false,
  onMarkEveningTaken,
  isPostMealReadingLogged = false,
}) => {
  const t = getTranslation(language);
  const m = t.modules.medications;

  const schedules = [
    { time: m.morning, name: m.med1, status: 'taken', timeStr: '08:00 AM' },
    { time: m.afternoon, name: m.med2, status: 'taken', timeStr: '01:30 PM' },
    {
      time: m.evening,
      name: m.med3,
      status: isEveningTaken ? 'taken' : 'pending',
      timeStr: isEveningTaken ? 'Just now' : '08:00 PM',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <Pill className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {m.title}
          </h4>
        </div>
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded ${
            isEveningTaken
              ? 'bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20'
              : 'text-[#5C6966]'
          }`}
        >
          {isEveningTaken ? '3/3 taken' : '2/3 taken'}
        </span>
      </div>

      <div className="space-y-2.5">
        {schedules.map((med, idx) => {
          const isTaken = med.status === 'taken';
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC]/60 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isTaken
                      ? 'bg-[#0F5C54] text-white'
                      : 'bg-[#E4E2DC] text-[#5C6966]'
                  }`}
                >
                  {isTaken ? (
                    <Check className="w-3 h-3" strokeWidth={2} />
                  ) : (
                    <Clock className="w-3 h-3" strokeWidth={2} />
                  )}
                </span>
                <div>
                  <div className="font-medium text-[#14211F]">{med.name}</div>
                  <div className="text-[10px] text-[#5C6966]">{med.time} • {med.timeStr}</div>
                </div>
              </div>

              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                  isTaken
                    ? 'bg-[#E8F1EF] text-[#0F5C54]'
                    : 'bg-[#FAF7F2] text-[#8A6F3E]'
                }`}
              >
                {isTaken ? m.taken : m.pending}
              </span>
            </div>
          );
        })}
      </div>

      {/* Medication Adherence Check: Post-meal Reading Alert */}
      {!isEveningTaken && isPostMealReadingLogged && (
        <div className="mt-3 p-2.5 rounded-lg bg-[#FAF7F2] border border-[#8A6F3E]/30 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#8A6F3E] font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{m.adherenceAlertTitle}</span>
            </div>
            {onMarkEveningTaken && (
              <button
                type="button"
                onClick={onMarkEveningTaken}
                className="px-2 py-0.5 rounded bg-[#0F5C54] hover:bg-[#0B4640] text-white text-[10px] font-medium transition-colors"
              >
                {m.markTakenBtn}
              </button>
            )}
          </div>
          <p className="text-[11px] text-[#5C6966] mt-1 leading-snug">
            {m.adherenceAlertDesc}
          </p>
        </div>
      )}

      {isEveningTaken && (
        <div className="mt-3 p-2 rounded-lg bg-[#E8F1EF] border border-[#0F5C54]/20 text-xs text-[#0F5C54] flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" strokeWidth={2} />
          <span>{m.allTaken}</span>
        </div>
      )}
    </div>
  );
};
