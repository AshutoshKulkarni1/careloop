import React from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import type { NavTabId } from './Sidebar';
import { Compass, ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  tabId: NavTabId;
  language: SupportedLanguage;
  onBackToDashboard: () => void;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  tabId,
  language,
  onBackToDashboard,
}) => {
  const t = getTranslation(language);
  const tabName = t.nav[tabId] || tabId;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto py-20">
      <div className="w-14 h-14 rounded-2xl bg-[#E8F1EF] border border-[#0F5C54]/20 flex items-center justify-center text-[#0F5C54] mb-4">
        <Compass className="w-7 h-7" strokeWidth={1.5} />
      </div>

      <h2 className="text-xl font-serif font-semibold text-[#14211F]">
        {tabName} — {t.placeholder.title}
      </h2>

      <p className="text-sm text-[#5C6966] mt-2 leading-relaxed">
        {t.placeholder.desc}
      </p>

      <button
        type="button"
        onClick={onBackToDashboard}
        className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-xs font-medium transition-colors shadow-subtle"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        <span>{t.placeholder.backToDashboard}</span>
      </button>
    </div>
  );
};
