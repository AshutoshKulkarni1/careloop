import React, { useState } from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { AlertCircle, Send } from 'lucide-react';

interface SideEffectsModuleProps {
  language: SupportedLanguage;
  onToast: (msg: string) => void;
}

export const SideEffectsModule: React.FC<SideEffectsModuleProps> = ({
  language,
  onToast,
}) => {
  const t = getTranslation(language);
  const s = t.modules.sideEffects;

  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChips.length === 0 && !notes.trim()) {
      return;
    }
    onToast(s.toastSuccess);
    setSelectedChips([]);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#8A6F3E]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {s.title}
          </h4>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Symptom chips */}
        <div className="flex flex-wrap gap-1.5">
          {s.chips.map((chip, idx) => {
            const isSelected = selectedChips.includes(chip);
            return (
              <button
                type="button"
                key={idx}
                onClick={() => toggleChip(chip)}
                className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-[#0F5C54] text-white border-[#0F5C54] font-medium'
                    : 'bg-[#F7F6F3] text-[#5C6966] border-[#E4E2DC] hover:border-[#5C6966]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Text field */}
        <div className="relative">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={s.inputPlaceholder}
            className="w-full text-xs px-3 py-2 bg-[#F7F6F3] border border-[#E4E2DC] rounded-lg text-[#14211F] placeholder:text-[#5C6966]/60 focus:outline-none focus:ring-1 focus:ring-[#0F5C54]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={selectedChips.length === 0 && !notes.trim()}
          className="w-full h-8 text-xs font-medium rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40"
        >
          <Send className="w-3 h-3" strokeWidth={1.5} />
          <span>{s.submitBtn}</span>
        </button>
      </form>
    </div>
  );
};
