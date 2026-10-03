import React from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { Footprints, Dumbbell, Droplets } from 'lucide-react';

interface LifestyleModuleProps {
  language: SupportedLanguage;
}

export const LifestyleModule: React.FC<LifestyleModuleProps> = ({ language }) => {
  const t = getTranslation(language);
  const l = t.modules.lifestyle;

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <Footprints className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {l.title}
          </h4>
        </div>
        <span className="text-[11px] text-[#5C6966]">Daily metrics</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        {/* Steps */}
        <div className="p-2 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC]/60">
          <Footprints className="w-4 h-4 text-[#0F5C54] mx-auto mb-1" strokeWidth={1.5} />
          <div className="text-base font-semibold tabular-nums text-[#14211F]">
            {l.stepsVal}
          </div>
          <div className="text-[10px] text-[#5C6966]">{l.steps}</div>
        </div>

        {/* Exercise */}
        <div className="p-2 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC]/60">
          <Dumbbell className="w-4 h-4 text-[#8A6F3E] mx-auto mb-1" strokeWidth={1.5} />
          <div className="text-base font-semibold tabular-nums text-[#14211F]">
            {l.exerciseVal}
          </div>
          <div className="text-[10px] text-[#5C6966]">{l.exercise}</div>
        </div>

        {/* Water */}
        <div className="p-2 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC]/60">
          <Droplets className="w-4 h-4 text-[#0F5C54] mx-auto mb-1" strokeWidth={1.5} />
          <div className="text-base font-semibold tabular-nums text-[#14211F]">
            {l.waterVal}
          </div>
          <div className="text-[10px] text-[#5C6966]">{l.water}</div>
        </div>
      </div>
    </div>
  );
};
