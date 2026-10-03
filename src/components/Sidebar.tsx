import React from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import {
  LayoutDashboard,
  ClipboardList,
  LineChart,
  Pill,
  Calendar,
  FileBarChart,
  User,
} from 'lucide-react';

export type NavTabId =
  | 'dashboard'
  | 'healthLogs'
  | 'insights'
  | 'medications'
  | 'appointments'
  | 'reports'
  | 'profile';

interface SidebarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  language: SupportedLanguage;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  language,
}) => {
  const t = getTranslation(language);

  const navItems: { id: NavTabId; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'healthLogs', label: t.nav.healthLogs, icon: ClipboardList },
    { id: 'insights', label: t.nav.insights, icon: LineChart },
    { id: 'medications', label: t.nav.medications, icon: Pill },
    { id: 'appointments', label: t.nav.appointments, icon: Calendar },
    { id: 'reports', label: t.nav.reports, icon: FileBarChart },
    { id: 'profile', label: t.nav.profile, icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E4E2DC] h-screen sticky top-0 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E4E2DC]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F5C54] flex items-center justify-center text-white font-serif font-bold text-lg">
              C
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#14211F]">
                CareLoop
              </span>
              <p className="text-[10px] text-[#5C6966] -mt-0.5 tracking-wide">
                Voice Health Records
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#E8F1EF] text-[#0F5C54] font-semibold'
                    : 'text-[#5C6966] hover:bg-[#F7F6F3] hover:text-[#14211F]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#0F5C54]' : 'text-[#5C6966]'
                  }`}
                  strokeWidth={1.5}
                />
                <span className="truncate">{item.label}</span>
                {item.id === 'dashboard' && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom user status */}
        <div className="p-4 border-t border-[#E4E2DC] bg-[#FAF9F7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E4E2DC] flex items-center justify-center text-xs font-semibold text-[#14211F]">
              P1
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-[#14211F] truncate">
                Patient Demo
              </div>
              <div className="text-[10px] text-[#5C6966] truncate">
                ID: #CL-88204
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar (hidden on desktop) */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E2DC] px-2 py-1 flex items-center justify-around shadow-subtle safe-area-pb"
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-1 rounded-lg text-[10px] transition-colors ${
                isActive
                  ? 'text-[#0F5C54] font-semibold'
                  : 'text-[#5C6966]'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
              <span className="truncate max-w-[64px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
