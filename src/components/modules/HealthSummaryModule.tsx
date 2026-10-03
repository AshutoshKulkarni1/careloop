import React, { useState } from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { FileText, Sparkles, Check } from 'lucide-react';

interface HealthSummaryModuleProps {
  language: SupportedLanguage;
}

export const HealthSummaryModule: React.FC<HealthSummaryModuleProps> = ({ language }) => {
  const t = getTranslation(language);
  const s = t.modules.summary;
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {s.title}
          </h4>
        </div>
        <span className="text-[11px] text-[#5C6966]">Neutral digest</span>
      </div>

      <div className="space-y-3">
        {isGenerated ? (
          <div className="p-3 bg-[#F7F6F3] rounded-lg border border-[#E4E2DC] text-xs text-[#14211F] leading-relaxed">
            <div className="flex items-center gap-1.5 text-[11px] text-[#0F5C54] font-medium mb-1.5">
              <Check className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Current Record Summary</span>
            </div>
            {s.staticText}
          </div>
        ) : (
          <div className="py-2 text-center">
            <p className="text-xs text-[#5C6966] mb-3">
              Generate a clinical-grade summary of today's health entries.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-8 text-xs font-medium rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] border border-[#E4E2DC] text-[#14211F] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#0F5C54]" strokeWidth={1.5} />
              <span>{isGenerating ? s.generating : s.btnLabel}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
