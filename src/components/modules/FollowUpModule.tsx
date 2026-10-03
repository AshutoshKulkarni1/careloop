import React from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { Calendar, UserCheck, MapPin } from 'lucide-react';

interface FollowUpModuleProps {
  language: SupportedLanguage;
}

export const FollowUpModule: React.FC<FollowUpModuleProps> = ({ language }) => {
  const t = getTranslation(language);
  const f = t.modules.followUp;

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {f.title}
          </h4>
        </div>
        <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#8A6F3E] border border-[#E4E2DC]">
          Confirmed
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E8F1EF] text-[#0F5C54] flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#14211F]">{f.doctor}</div>
            <div className="text-xs text-[#5C6966]">{f.specialty}</div>
          </div>
        </div>

        <div className="bg-[#F7F6F3] p-2.5 rounded-lg border border-[#E4E2DC]/60 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-[#14211F] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            <span>{f.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#5C6966] text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#5C6966]" strokeWidth={1.5} />
            <span>{f.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
