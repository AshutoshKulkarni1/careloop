import React from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { Info } from 'lucide-react';

interface FooterBannerProps {
  language: SupportedLanguage;
}

export const FooterBanner: React.FC<FooterBannerProps> = ({ language }) => {
  const t = getTranslation(language);

  return (
    <footer className="w-full bg-[#F7F6F3] border-t border-[#E4E2DC] py-2.5 px-4 text-center text-xs text-[#5C6966] select-none mb-14 md:mb-0">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
        <Info className="w-3.5 h-3.5 shrink-0 text-[#0F5C54]" strokeWidth={1.5} />
        <p className="leading-snug">
          {t.footerDisclaimer}
        </p>
      </div>
    </footer>
  );
};
