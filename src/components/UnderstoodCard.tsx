import React from 'react';
import type { HealthReading, SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { Check, Edit3, Activity, Heart, Volume2 } from 'lucide-react';

interface UnderstoodCardProps {
  reading: HealthReading;
  language: SupportedLanguage;
  onConfirm: () => void;
  onModify: () => void;
  isLoading?: boolean;
  isSpeaking?: boolean;
  onReplayVoice?: () => void;
}

export const UnderstoodCard: React.FC<UnderstoodCardProps> = ({
  reading,
  language,
  onConfirm,
  onModify,
  isLoading = false,
  isSpeaking = false,
  onReplayVoice,
}) => {
  const t = getTranslation(language);
  const isGlucose = reading.type === 'glucose';

  return (
    <div className="w-full bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle text-left transition-all">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-[#E4E2DC]/70 pb-3 mb-4">
        <div className="flex items-center gap-2">
          {isGlucose ? (
            <Activity className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          ) : (
            <Heart className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          )}
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0F5C54]">
              {isGlucose ? 'Blood Glucose' : 'Blood Pressure'}
            </span>
            <span className="text-xs text-[#5C6966] ml-1.5 font-normal">
              / {isGlucose
                ? (language === 'kn' ? 'ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ' : language === 'mr' ? 'रक्तातील साखर' : language === 'hi' ? 'रक्त शर्करा' : 'Blood Sugar')
                : (language === 'kn' ? 'ರಕ್ತದೊತ್ತಡ' : language === 'mr' ? 'रक्तदाब' : language === 'hi' ? 'रक्तचाप' : 'Blood Pressure')}
            </span>
          </div>
        </div>
        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
          {reading.displayDate} • {reading.displayTime}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="my-2">
        {isGlucose ? (
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-semibold tabular-nums tracking-tight text-[#14211F]">
              {reading.value}
            </span>
            <span className="text-base text-[#5C6966] font-medium">
              {reading.unit}
            </span>
            <div className="ml-auto text-right">
              <span className="inline-block text-xs font-medium px-2.5 py-1 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20">
                {reading.context || 'Post-Prandial'}
              </span>
              <div className="text-[11px] text-[#5C6966] mt-0.5">
                {reading.context === 'Post-Prandial'
                  ? (language === 'kn' ? 'ಊಟದ ನಂತರ' : language === 'mr' ? 'जेवणानंतर' : language === 'hi' ? 'भोजन के बाद' : 'After meal')
                  : reading.context}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums tracking-tight text-[#14211F]">
                {reading.systolic}
                <span className="text-2xl text-[#5C6966] font-light mx-1">/</span>
                {reading.diastolic}
              </span>
              <span className="text-base text-[#5C6966] font-medium">
                {reading.unit}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-[#5C6966] font-mono">
              <div>
                Systolic: <span className="font-semibold tabular-nums text-[#14211F]">{reading.systolic}</span>
              </div>
              <div>
                Diastolic: <span className="font-semibold tabular-nums text-[#14211F]">{reading.diastolic}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spoken Voice Confirmation Notice & Replay Button */}
      <div className="mt-4 pt-3 border-t border-[#E4E2DC]/70">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-[#0F5C54] animate-ping' : 'bg-[#0F5C54]'}`} />
            <span className="text-xs font-medium text-[#0F5C54] flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              {isSpeaking ? (t.voice.speakingNotice || 'CareLoop is speaking in voice...') : 'Spoken Voice Confirmation'}
            </span>
          </div>

          {onReplayVoice && (
            <button
              type="button"
              onClick={onReplayVoice}
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#0F5C54] border border-[#E4E2DC] transition-colors"
              title="Hear voice confirmation again"
            >
              <Volume2 className="w-3 h-3" />
              <span>{t.voice.replayVoice || 'Replay voice'}</span>
            </button>
          )}
        </div>

        <p className="text-sm font-medium text-[#14211F] leading-relaxed">
          {isGlucose ? t.voice.glucoseConfirmSentence : t.voice.bpConfirmSentence}
        </p>
        {isGlucose && (
          <p className="text-xs text-[#5C6966] mt-1">
            {t.voice.glucoseSaveQuestion}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-5">
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0F5C54]/40 disabled:opacity-50"
        >
          <Check className="w-4 h-4" strokeWidth={1.5} />
          <span>{t.voice.saveConfirmBtn}</span>
        </button>
        <button
          type="button"
          onClick={onModify}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#14211F] text-sm font-medium border border-[#E4E2DC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F5C54]/20 disabled:opacity-50"
        >
          <Edit3 className="w-4 h-4 text-[#5C6966]" strokeWidth={1.5} />
          <span>{t.voice.modifyBtn}</span>
        </button>
      </div>
    </div>
  );
};