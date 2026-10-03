import React from 'react';
import type {
  HealthReading,
  ScenarioType,
  SupportedLanguage,
  VoiceState,
} from '../services/healthService';
import { getTranslation } from '../i18n';
import { Waveform } from './Waveform';
import { UnderstoodCard } from './UnderstoodCard';
import {
  Mic,
  X,
  CheckCircle2,
  Cpu,
  Clock,
  Volume2,
  VolumeX,
  Pill,
  Check,
} from 'lucide-react';

interface VoiceOverlayProps {
  isOpen: boolean;
  state: VoiceState;
  scenario: ScenarioType;
  language: SupportedLanguage;
  listeningSecondsLeft?: number;
  isSpeakingVoice?: boolean;
  isMutedVoice?: boolean;
  onToggleMuteVoice?: () => void;
  transcribedText: string;
  detectedLangName: string;
  autoTimerCountdown: number;
  candidateReading: HealthReading | null;
  isEveningMedTaken?: boolean;
  onMarkEveningMedTaken?: () => void;
  onSelectFollowUp: (answer: string) => void;
  onConfirmSave: () => void;
  onModify: () => void;
  onClose: () => void;
  onDoneSpeaking?: () => void;
  onReplayMealQuestion?: () => void;
  onReplayConfirmation?: () => void;
}

export const VoiceOverlay: React.FC<VoiceOverlayProps> = ({
  isOpen,
  state,
  scenario,
  language,
  listeningSecondsLeft = 15,
  isSpeakingVoice = false,
  isMutedVoice = false,
  onToggleMuteVoice,
  transcribedText,
  detectedLangName,
  autoTimerCountdown,
  candidateReading,
  isEveningMedTaken = false,
  onMarkEveningMedTaken,
  onSelectFollowUp,
  onConfirmSave,
  onModify,
  onClose,
  onDoneSpeaking,
  onReplayMealQuestion,
  onReplayConfirmation,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);
  const isGlucose = scenario === 'glucose';

  // Determine active step index (0 to 4)
  const getStepIndex = () => {
    switch (state) {
      case 'LISTENING':
        return 0; // Listen
      case 'TRANSCRIBING':
        return 1; // Understand
      case 'FOLLOW_UP':
        return 2; // Clarify
      case 'PROCESSING':
        return isGlucose ? 2 : 1;
      case 'CONFIRMATION':
        return 3; // Confirm
      case 'SAVED':
      case 'GRAPH_UPDATED':
        return 4; // Save
      default:
        return 0;
    }
  };

  const currentStep = getStepIndex();
  const stepList = [
    t.voice.steps.listen,
    t.voice.steps.understand,
    t.voice.steps.clarify,
    t.voice.steps.confirm,
    t.voice.steps.save,
  ];

  // Listening progress calculation (15s total)
  const listeningProgressPct = Math.min(
    100,
    Math.max(0, ((15 - listeningSecondsLeft) / 15) * 100)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-[#14211F]/40 backdrop-blur-[2px] transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-live="polite"
    >
      {/* Modal Container: Fullscreen on mobile, centered card on desktop */}
      <div className="relative w-full h-full sm:h-auto sm:max-w-lg bg-[#F7F6F3] sm:rounded-2xl border border-[#E4E2DC] shadow-modal overflow-hidden flex flex-col justify-between transition-all">
        {/* Top bar with Pipeline Step Indicator */}
        <div className="p-4 sm:p-5 border-b border-[#E4E2DC] bg-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#E8F1EF] text-[#0F5C54]">
                <Mic className="w-3.5 h-3.5" strokeWidth={1.5} />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F5C54]">
                CareLoop Voice Engine
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#8A6F3E] border border-[#E4E2DC] font-medium hidden sm:inline">
                {language === 'kn'
                  ? 'ಧ್ವನಿ: ಕನ್ನಡ (kn-IN)'
                  : language === 'mr'
                  ? 'आवाज: मराठी (mr-IN)'
                  : language === 'hi'
                  ? 'आवाज: हिन्दी (hi-IN)'
                  : 'Voice: English (en-US)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isSpeakingVoice && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F1EF] text-[#0F5C54] text-[10px] font-medium border border-[#0F5C54]/20 animate-pulse">
                  <Volume2 className="w-3 h-3" />
                  <span>Speaking voice</span>
                </span>
              )}

              {onToggleMuteVoice && (
                <button
                  type="button"
                  onClick={onToggleMuteVoice}
                  title={isMutedVoice ? "Unmute Voice" : "Voice Active"}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C6966] hover:text-[#14211F] hover:bg-[#F7F6F3] transition-colors focus:outline-none"
                >
                  {isMutedVoice ? (
                    <VolumeX className="w-4 h-4 text-[#8A6F3E]" strokeWidth={1.5} />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C6966] hover:text-[#14211F] hover:bg-[#F7F6F3] transition-colors focus:outline-none"
                aria-label={t.voice.closeOverlay}
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Thin Pipeline Step Indicator */}
          <div className="grid grid-cols-5 gap-1.5 pt-2">
            {stepList.map((stepName, idx) => {
              const isActive = idx === currentStep;
              const isPast = idx < currentStep;

              return (
                <div key={idx} className="flex flex-col gap-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0F5C54]'
                        : isPast
                        ? 'bg-[#0F5C54]/50'
                        : 'bg-[#E4E2DC]'
                    }`}
                  />
                  <span
                    className={`text-[10px] leading-tight truncate ${
                      isActive
                        ? 'text-[#0F5C54] font-semibold'
                        : isPast
                        ? 'text-[#14211F]'
                        : 'text-[#5C6966]/60'
                    }`}
                  >
                    {stepName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic State Content */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-y-auto">
          {/* 1. LISTENING STATE (15 SECONDS DURATION) */}
          {state === 'LISTENING' && (
            <div className="flex flex-col items-center justify-center space-y-6 max-w-sm w-full">
              {/* Pulsing Mic visual with circular ring */}
              <div className="relative flex items-center justify-center w-28 h-28">
                <div className="absolute inset-0 rounded-full bg-[#0F5C54]/15 animate-mic-pulse" />
                <div className="absolute -inset-3 rounded-full border-2 border-[#0F5C54]/25 animate-ping [animation-duration:3s]" />
                <div className="relative w-20 h-20 rounded-full bg-[#0F5C54] flex items-center justify-center text-white shadow-modal">
                  <Mic className="w-9 h-9" strokeWidth={1.5} />
                </div>
              </div>

              {/* 15 Seconds Countdown Badge & Progress Bar */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#5C6966]">
                  <span className="flex items-center gap-1.5 text-[#0F5C54] font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>15s Recording Window</span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#0F5C54]">
                    {listeningSecondsLeft}s remaining
                  </span>
                </div>

                {/* Progress bar across 15 seconds */}
                <div className="w-full h-2 bg-[#E4E2DC] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#0F5C54] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${listeningProgressPct}%` }}
                  />
                </div>
              </div>

              {/* Dynamic waveform */}
              <div className="w-full">
                <Waveform isActive={true} height={40} barCount={26} className="my-1" />
              </div>

              {/* Explanatory text */}
              <div className="space-y-1">
                <p className="text-base font-semibold text-[#14211F]">
                  {t.voice.listening}
                </p>
                <p className="text-xs text-[#5C6966]">
                  {t.voice.listeningCountdownDesc || 'Listening for 15 seconds before processing'} ({listeningSecondsLeft}s)
                </p>
              </div>

              {/* Done Speaking Button (Early finish option) */}
              {onDoneSpeaking && (
                <button
                  type="button"
                  onClick={onDoneSpeaking}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#EFECE6] text-[#0F5C54] border border-[#0F5C54]/30 text-xs font-semibold shadow-subtle transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0F5C54]/30"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.voice.doneSpeaking || 'Done Speaking'}</span>
                  <span className="text-[10px] text-[#5C6966] font-normal font-mono">({listeningSecondsLeft}s)</span>
                </button>
              )}
            </div>
          )}

          {/* 2. TRANSCRIBING STATE */}
          {state === 'TRANSCRIBING' && (
            <div className="w-full max-w-md space-y-5 text-left">
              {/* Card "YOU SAID" */}
              <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#5C6966]">
                    {t.voice.youSaid}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20">
                    {t.voice.languageDetected.replace('ಕನ್ನಡ', detectedLangName || 'ಕನ್ನಡ').replace('English', detectedLangName || 'English').replace('हिन्दी', detectedLangName || 'हिन्दी')}
                  </span>
                </div>
                <blockquote className="text-lg font-serif italic text-[#14211F] my-2 pl-3 border-l-2 border-[#0F5C54]">
                  "{transcribedText}"
                </blockquote>
              </div>

              {/* Typing indicator & understanding prompt */}
              <div className="flex items-center gap-3 px-2 py-1 text-sm text-[#5C6966]">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54] animate-pulse [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54] animate-pulse [animation-delay:400ms]" />
                </div>
                <span>{t.voice.processingSpeech}</span>
              </div>
            </div>
          )}

          {/* 3. FOLLOW_UP STATE (Glucose: ASKING ABOUT MEAL IN VOICE BY WEBSITE) */}
          {state === 'FOLLOW_UP' && (
            <div className="w-full max-w-md space-y-5 text-left">
              {/* Patient quote snippet */}
              <div className="bg-white/70 rounded-lg p-3 border border-[#E4E2DC] text-xs text-[#5C6966] flex items-center justify-between">
                <span className="truncate mr-2">"{transcribedText}"</span>
                <span className="text-[10px] text-[#0F5C54] font-medium shrink-0">
                  {detectedLangName || 'Spoken'}
                </span>
              </div>

              {/* Follow-up question bubble */}
              <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4E2DC]/70 pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0F5C54]">
                    <Volume2 className={`w-4 h-4 ${isSpeakingVoice ? 'animate-bounce text-[#0F5C54]' : ''}`} strokeWidth={1.5} />
                    <span>CareLoop Follow-up / ಸ್ಪಷ್ಟನೆ</span>
                  </div>

                  {onReplayMealQuestion && (
                    <button
                      type="button"
                      onClick={onReplayMealQuestion}
                      className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#0F5C54] border border-[#E4E2DC] transition-colors"
                      title="Replay spoken question"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{t.voice.replayVoice || 'Replay voice'}</span>
                    </button>
                  )}
                </div>

                {/* Spoken voice active banner */}
                {isSpeakingVoice && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E8F1EF] border border-[#0F5C54]/20 text-xs text-[#0F5C54] font-medium animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#0F5C54] animate-ping" />
                    <span>{t.voice.speakingNotice || 'CareLoop is asking in voice...'}</span>
                  </div>
                )}

                <p className="text-base font-semibold text-[#14211F] leading-snug">
                  {t.voice.glucoseFollowUp}
                </p>

                {/* Auto select timer pill (10s window) */}
                <div className="flex items-center gap-2 text-xs text-[#5C6966] bg-[#F7F6F3] p-2 rounded border border-[#E4E2DC]">
                  <Clock className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
                  <span>{t.voice.autoAdvanceNote}: </span>
                  <span className="font-semibold tabular-nums text-[#0F5C54]">
                    {autoTimerCountdown}s
                  </span>
                </div>

                {/* Two large buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => onSelectFollowUp('yes')}
                    className="h-14 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-base font-semibold transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#0F5C54]/40"
                  >
                    <span>{t.voice.yes}</span>
                    <span className="text-xs font-normal opacity-80">(ಊಟದ ನಂತರ)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectFollowUp('no')}
                    className="h-14 rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#14211F] text-base font-medium border border-[#E4E2DC] transition-colors flex items-center justify-center focus:ring-2 focus:ring-[#0F5C54]/20"
                  >
                    <span>{t.voice.no}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. PROCESSING STATE */}
          {state === 'PROCESSING' && (
            <div className="flex flex-col items-center justify-center space-y-4 max-w-sm py-4">
              <div className="w-12 h-12 rounded-full bg-[#E8F1EF] border border-[#0F5C54]/20 flex items-center justify-center text-[#0F5C54]">
                <Cpu className="w-6 h-6 animate-pulse" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-[#14211F]">
                {t.voice.structuring}
              </p>
              <div className="w-48 h-1 bg-[#E4E2DC] rounded-full overflow-hidden">
                <div className="w-full h-full bg-[#0F5C54] rounded-full animate-pulse" />
              </div>
            </div>
          )}

          {/* 5. CONFIRMATION STATE (WITH SPOKEN VOICE CONFIRMATION) */}
          {state === 'CONFIRMATION' && candidateReading && (
            <div className="w-full max-w-md space-y-3">
              <UnderstoodCard
                reading={candidateReading}
                language={language}
                onConfirm={onConfirmSave}
                onModify={onModify}
                isSpeaking={isSpeakingVoice}
                onReplayVoice={onReplayConfirmation}
              />

              {/* Medication Adherence Check: Post-reading tablet verification */}
              {!isEveningMedTaken ? (
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#8A6F3E]/30 text-left w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A6F3E]">
                      <Pill className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>{t.modules.medications.adherenceAlertTitle}</span>
                    </div>
                    {onMarkEveningMedTaken && (
                      <button
                        type="button"
                        onClick={onMarkEveningMedTaken}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F5C54] hover:bg-[#0B4640] text-white text-[11px] font-medium transition-colors shadow-sm"
                      >
                        <Check className="w-3 h-3" />
                        <span>{t.voice.markTabletsTaken}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5C6966] leading-snug">
                    {t.voice.medicationAdherenceNotice}
                  </p>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-[#E8F1EF] border border-[#0F5C54]/20 text-left w-full flex items-center gap-2 text-xs text-[#0F5C54]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={2} />
                  <span className="font-medium">{t.voice.tabletsTakenSuccess}</span>
                </div>
              )}
            </div>
          )}

          {/* 6. SAVED STATE */}
          {(state === 'SAVED' || state === 'GRAPH_UPDATED') && (
            <div className="flex flex-col items-center justify-center space-y-4 max-w-sm py-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F1EF] border border-[#0F5C54]/30 flex items-center justify-center text-[#0F5C54] animate-point-pulse">
                <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-[#14211F]">
                {isGlucose
                  ? t.voice.glucoseSavedMessage
                  : t.voice.bpSavedMessage}
              </h3>
              <p className="text-xs text-[#5C6966]">
                {language === 'kn'
                  ? 'ದಾಖಲೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ. ಚಾರ್ಟ್ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತಿದೆ...'
                  : language === 'mr'
                  ? 'माहिती यशस्वीपणे जतन केली गेली आहे. आलेख अद्ययावत होत आहे...'
                  : language === 'hi'
                  ? 'रिकॉर्ड सफलतापूर्वक सहेजा गया। चार्ट अपडेट हो रहा है...'
                  : 'Record saved successfully. Updating charts...'}
              </p>

              {/* Medication reminder prompt after save */}
              {!isEveningMedTaken ? (
                <div className="mt-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#8A6F3E]/30 text-left w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8A6F3E]">
                      <Pill className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>{t.modules.medications.adherenceAlertTitle}</span>
                    </div>
                    {onMarkEveningMedTaken && (
                      <button
                        type="button"
                        onClick={onMarkEveningMedTaken}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0F5C54] hover:bg-[#0B4640] text-white text-[11px] font-medium transition-colors shadow-sm"
                      >
                        <Check className="w-3 h-3" />
                        <span>{t.voice.markTabletsTaken}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5C6966] leading-snug">
                    {t.voice.medicationAdherenceNotice}
                  </p>
                </div>
              ) : (
                <div className="mt-2 p-2 rounded-xl bg-[#E8F1EF] text-xs text-[#0F5C54] font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.voice.tabletsTakenSuccess}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info banner in modal */}
        <div className="px-5 py-3 border-t border-[#E4E2DC] bg-white text-center text-[11px] text-[#5C6966]">
          {t.footerDisclaimer}
        </div>
      </div>
    </div>
  );
};