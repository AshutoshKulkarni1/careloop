import React, { useEffect, useState } from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { getNearbyPharmacies, type Pharmacy } from '../services/pharmacyService';
import { MapPin, X, ExternalLink, Clock } from 'lucide-react';

interface PharmacyFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  selectedMedication?: string;
}

export const PharmacyFinderModal: React.FC<PharmacyFinderModalProps> = ({
  isOpen,
  onClose,
  language,
  selectedMedication = 'Metformin',
}) => {
  const t = getTranslation(language);
  const pf = t.pharmacyFinder;
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getNearbyPharmacies(selectedMedication).then((data) => {
        setPharmacies(data);
        setIsLoading(false);
      });
    }
  }, [isOpen, selectedMedication]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#14211F]/40 backdrop-blur-[2px] transition-opacity duration-300 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pharmacy-finder-title"
    >
      {/* Modal Container / Bottom Sheet on Mobile */}
      <div className="relative w-full max-h-[92vh] sm:max-w-xl bg-[#F7F6F3] rounded-t-2xl sm:rounded-2xl border border-[#E4E2DC] shadow-modal overflow-hidden flex flex-col transition-all">
        {/* Top Header */}
        <div className="p-5 border-b border-[#E4E2DC] bg-white flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E8F1EF] text-[#0F5C54] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
            </span>
            <div>
              <h2
                id="pharmacy-finder-title"
                className="text-base sm:text-lg font-serif font-bold text-[#14211F] leading-tight"
              >
                {pf.title}
              </h2>
              <p className="text-xs text-[#5C6966] mt-0.5">
                {pf.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#5C6966] hover:text-[#14211F] hover:bg-[#F7F6F3] transition-colors focus:outline-none"
            aria-label={pf.close}
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Location Row & Demo Tag */}
          <div className="flex items-center justify-between text-xs text-[#5C6966] bg-white p-3 rounded-xl border border-[#E4E2DC]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#0F5C54] shrink-0" strokeWidth={1.5} />
              <span className="font-medium text-[#14211F]">
                {pf.usingDemoLocation}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] text-[#8A6F3E] border border-[#E4E2DC] font-medium shrink-0">
              {pf.demoDataTag}
            </span>
          </div>

          {/* Context Line */}
          <div className="px-1 space-y-0.5">
            <div className="text-xs text-[#14211F]">
              <span>{pf.medicationNeeded}: </span>
              <span className="font-semibold text-[#0F5C54]">{selectedMedication}</span>
            </div>
            <p className="text-[11px] text-[#5C6966]">
              {pf.choosePharmacy}
            </p>
          </div>

          {/* Exactly 2 Pharmacy Cards: Stacked on Mobile, Side-by-Side on Desktop */}
          {isLoading ? (
            <div className="py-8 text-center text-xs text-[#5C6966]">
              Loading nearby pharmacies...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="bg-white rounded-xl border border-[#E4E2DC] p-4 shadow-subtle flex flex-col justify-between hover:border-[#0F5C54]/40 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm text-[#14211F] leading-snug">
                        {pharmacy.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold tabular-nums text-[#14211F]">
                        {pharmacy.distance}
                      </span>
                      <span className="text-[#5C6966]">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#0F5C54] font-medium">
                        <Clock className="w-3 h-3 text-[#0F5C54]" strokeWidth={1.5} />
                        <span>{pharmacy.status || pf.openNow}</span>
                      </span>
                    </div>
                  </div>

                  {/* View on Google Maps Anchor Button (Minimum 44px tall, full width on mobile) */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacy.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 min-h-[44px] w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-xs font-semibold shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F5C54]/30"
                  >
                    <span>{pf.viewOnGoogleMaps}</span>
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Simulation Disclaimer Note */}
          <p className="text-[11px] text-[#5C6966] text-center pt-2">
            {pf.simulatedNote}
          </p>
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-[#E4E2DC] bg-white text-center text-[11px] text-[#5C6966]">
          {t.footerDisclaimer}
        </div>
      </div>
    </div>
  );
};
