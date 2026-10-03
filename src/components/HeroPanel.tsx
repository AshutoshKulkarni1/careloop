import type { ScenarioType, SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { getTimeGreetingKey } from '../data/demoData';
import { Mic, Activity, Heart } from 'lucide-react';

interface HeroPanelProps {
  scenario: ScenarioType;
  language: SupportedLanguage;
  onSelectScenario: (scenario: ScenarioType) => void;
  onStartVoice: () => void;
  isListening?: boolean;
}

export const HeroPanel: React.FC<HeroPanelProps> = ({
  scenario,
  language,
  onSelectScenario,
  onStartVoice,
  isListening = false,
}) => {
  const t = getTranslation(language);
  const greetingKey = getTimeGreetingKey();
  const greetingText = t.greetings[greetingKey];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E4E2DC] p-6 sm:p-10 shadow-subtle text-center relative overflow-hidden transition-all">
      {/* Subtle top indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F6F3] border border-[#E4E2DC] text-xs text-[#5C6966] mb-4">
        <span className="w-2 h-2 rounded-full bg-[#0F5C54]" />
        <span>{greetingText} • CareLoop Voice Engine</span>
      </div>

      {/* Headline & Prompt */}
      <h1 className="text-2xl sm:text-4xl font-serif font-semibold text-[#14211F] tracking-tight max-w-2xl mx-auto leading-snug">
        {t.hero.headline}
      </h1>
      <p className="text-base sm:text-lg text-[#5C6966] mt-2 font-normal">
        {t.hero.prompt}
      </p>

      {/* Hero Mic Button */}
      <div className="my-8 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={onStartVoice}
          disabled={isListening}
          aria-label={t.hero.talkButton}
          className={`relative group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#0F5C54]/20 ${
            isListening
              ? 'bg-[#0F5C54] text-white'
              : 'bg-[#0F5C54] hover:bg-[#0B4640] text-white shadow-md hover:shadow-lg active:scale-95'
          }`}
        >
          {/* Subtle gentle ring */}
          <div className="absolute -inset-2 rounded-full border border-[#0F5C54]/30 pointer-events-none group-hover:scale-105 transition-transform" />
          <Mic className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
        </button>

        <div className="mt-4 space-y-1">
          <div className="text-base sm:text-lg font-medium text-[#14211F] tracking-tight">
            {t.hero.talkButton}
          </div>
          <div className="text-xs sm:text-sm text-[#5C6966]">
            {t.hero.helperText}
          </div>
        </div>
      </div>

      {/* Segmented Control for Scenario */}
      <div className="inline-flex flex-col items-center">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5C6966] mb-2">
          {t.hero.scenarioLabel}
        </span>
        <div className="inline-flex p-1 rounded-xl bg-[#F7F6F3] border border-[#E4E2DC] gap-1 shadow-inner">
          <button
            type="button"
            onClick={() => onSelectScenario('glucose')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              scenario === 'glucose'
                ? 'bg-white text-[#0F5C54] shadow-subtle border border-[#E4E2DC]/80 font-semibold'
                : 'text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            <Activity className="w-4 h-4" strokeWidth={1.5} />
            <span>Blood Glucose</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">
              ({language === 'kn' ? 'ರಕ್ತದ ಸಕ್ಕರೆ' : language === 'mr' ? 'रक्तातील साखर' : language === 'hi' ? 'रक्त शर्करा' : 'mg/dL'})
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectScenario('blood_pressure')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              scenario === 'blood_pressure'
                ? 'bg-white text-[#0F5C54] shadow-subtle border border-[#E4E2DC]/80 font-semibold'
                : 'text-[#5C6966] hover:text-[#14211F]'
            }`}
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
            <span>Blood Pressure</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">
              ({language === 'kn' ? 'ರಕ್ತದೊತ್ತಡ' : language === 'mr' ? 'रक्तदाब' : language === 'hi' ? 'रक्तचाप' : 'mmHg'})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
