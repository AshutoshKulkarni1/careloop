import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import type { NavTabId } from './Sidebar';
import { RotateCcw, Globe, Volume2, VolumeX, Stethoscope, User } from 'lucide-react';

interface TopBarProps {
  language: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  onResetDemo: () => void;
  isMutedVoice?: boolean;
  onToggleMuteVoice?: () => void;
  activeTab?: NavTabId;
  onSelectTab?: (tab: NavTabId) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  language,
  onSelectLanguage,
  onResetDemo,
  isMutedVoice = false,
  onToggleMuteVoice,
  activeTab = 'dashboard',
  onSelectTab,
}) => {
  const t = getTranslation(language);

  const languages: { id: SupportedLanguage; label: string }[] = [
    { id: 'kn', label: 'ಕನ್ನಡ' },
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'mr', label: 'मराठी' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#E4E2DC] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Wordmark (mobile shows icon + title, desktop shows full title) */}
      <div className="flex items-center gap-3">
        <div className="md:hidden w-7 h-7 rounded-lg bg-[#0F5C54] text-white flex items-center justify-center font-serif font-bold text-sm">
          C
        </div>
        <div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#14211F]">
            CareLoop
          </span>
          <span className="hidden sm:inline-block ml-3 text-xs text-[#5C6966] font-normal border-l border-[#E4E2DC] pl-3">
            {t.tagline}
          </span>
        </div>
      </div>

      {/* Right controls: Language Switcher, Demo Mode Pill, Reset Demo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher */}
        <div className="flex items-center bg-white border border-[#E4E2DC] rounded-lg p-0.5 shadow-subtle">
          <Globe className="w-3.5 h-3.5 text-[#5C6966] ml-2 mr-1 hidden sm:inline" strokeWidth={1.5} />
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelectLanguage(l.id)}
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-medium min-h-[32px] ${
                language === l.id
                  ? 'bg-[#0F5C54] text-white font-semibold'
                  : 'text-[#5C6966] hover:text-[#14211F]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Voice Audio Toggle Button */}
        {onToggleMuteVoice && (
          <button
            type="button"
            onClick={onToggleMuteVoice}
            title={isMutedVoice ? "Unmute Voice Audio" : "Voice Audio Active"}
            className={`inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-xs font-medium transition-colors shadow-subtle ${
              isMutedVoice
                ? 'bg-[#F7F6F3] text-[#5C6966] border-[#E4E2DC]'
                : 'bg-[#E8F1EF] text-[#0F5C54] border-[#0F5C54]/30'
            }`}
          >
            {isMutedVoice ? (
              <VolumeX className="w-3.5 h-3.5 text-[#5C6966]" strokeWidth={1.5} />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            )}
            <span className="hidden sm:inline">
              {isMutedVoice ? 'Voice Off' : 'Voice On'}
            </span>
          </button>
        )}

        {/* Clinician Portal / Patient View Switcher */}
        {onSelectTab && (
          <button
            type="button"
            onClick={() => onSelectTab(activeTab === 'doctorPortal' ? 'dashboard' : 'doctorPortal')}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-semibold transition-all shadow-subtle ${
              activeTab === 'doctorPortal'
                ? 'bg-[#0F5C54] text-white border-[#0F5C54] hover:bg-[#0B4640]'
                : 'bg-white text-[#0F5C54] border-[#0F5C54]/30 hover:bg-[#E8F1EF]'
            }`}
          >
            {activeTab === 'doctorPortal' ? (
              <>
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.doctor.rolePatient}</span>
              </>
            ) : (
              <>
                <Stethoscope className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.doctor.roleDoctor}</span>
              </>
            )}
          </button>
        )}

        {/* Demo Mode Pill */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F1EF] text-[#0F5C54] text-xs font-medium border border-[#0F5C54]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
          <span>{t.demoModePill}</span>
        </span>

        {/* Reset Demo Button */}
        <button
          type="button"
          onClick={onResetDemo}
          title={t.resetDemo}
          aria-label={t.resetDemo}
          className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-white border border-[#E4E2DC] text-[#5C6966] hover:text-[#14211F] hover:bg-[#F7F6F3] text-xs font-medium transition-colors shadow-subtle focus:outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden md:inline">{t.resetDemo}</span>
        </button>
      </div>
    </header>
  );
};
