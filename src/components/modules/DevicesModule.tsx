import React from 'react';
import type { SupportedLanguage } from '../../services/healthService';
import { getTranslation } from '../../i18n';
import { Radio, Watch, Activity, BatteryCharging, Wifi } from 'lucide-react';

interface DevicesModuleProps {
  language: SupportedLanguage;
  onOpenLiveMonitoring?: () => void;
}

export const DevicesModule: React.FC<DevicesModuleProps> = ({
  language,
  onOpenLiveMonitoring,
}) => {
  const t = getTranslation(language);
  const d = t.modules.devices;

  const devices = [
    {
      name: d.cgm,
      icon: Radio,
      model: 'FreeStyle Libre 3',
      status: d.streaming,
      battery: '94%',
      liveValue: '119 mg/dL',
    },
    {
      name: d.watch,
      icon: Watch,
      model: 'CareLoop Watch',
      status: d.syncing,
      battery: '88%',
      liveValue: '72 bpm',
    },
    {
      name: d.bpMonitor,
      icon: Activity,
      model: 'Omron Evolv',
      status: d.standby,
      battery: '91%',
      liveValue: 'Auto-Sync',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] p-5 shadow-subtle flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 border-b border-[#E4E2DC]/70 pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
            {d.title}
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#0F5C54] bg-[#E8F1EF] px-2 py-0.5 rounded border border-[#0F5C54]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54] animate-pulse" />
          <span>3 Connected</span>
        </span>
      </div>

      <div className="space-y-2">
        {devices.map((device, idx) => {
          const Icon = device.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC]/60 text-xs"
            >
              <div className="flex items-center gap-2 text-[#14211F]">
                <Icon className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
                <div>
                  <div className="font-medium text-[#14211F]">{device.name}</div>
                  <div className="text-[10px] text-[#5C6966]">{device.model} • {device.liveValue}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-[#0F5C54] bg-white px-2 py-0.5 rounded border border-[#E4E2DC]">
                  {device.status}
                </span>
                <span className="text-[10px] text-[#5C6966] flex items-center gap-0.5">
                  <BatteryCharging className="w-3 h-3 text-[#0F5C54]" strokeWidth={1.5} />
                  <span>{device.battery}</span>
                </span>
              </div>
            </div>
          );
        })}

        <div className="mt-2 flex items-center justify-between text-[11px] text-[#5C6966] pt-1">
          <div className="flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
            <span className="text-[10px] truncate max-w-[190px]">{d.note}</span>
          </div>
          {onOpenLiveMonitoring && (
            <button
              type="button"
              onClick={onOpenLiveMonitoring}
              className="text-[10px] font-medium text-[#0F5C54] hover:underline shrink-0"
            >
              Live Telemetry &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
