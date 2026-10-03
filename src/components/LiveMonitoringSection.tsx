import React, { useState, useEffect } from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import {
  Radio,
  Heart,
  Activity,
  Wifi,
  BatteryCharging,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck,
  Watch,
} from 'lucide-react';

interface LiveMonitoringSectionProps {
  language: SupportedLanguage;
  onNavigateToLogs?: () => void;
}

export const LiveMonitoringSection: React.FC<LiveMonitoringSectionProps> = ({
  language,
  onNavigateToLogs,
}) => {
  const t = getTranslation(language);
  const m = t.liveMonitoring;

  const [isStreaming, setIsStreaming] = useState(true);
  const [liveGlucose, setLiveGlucose] = useState(119);
  const [liveHeartRate, setLiveHeartRate] = useState(72);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(1);

  // Live telemetry ticker
  useEffect(() => {
    if (!isStreaming) return;

    const telemetryInterval = setInterval(() => {
      // Subtle clinical oscillation (e.g. 118 to 121 mg/dL)
      setLiveGlucose((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 116 && next <= 122 ? next : 119;
      });

      // Subtle resting heart rate variation (70 to 74 bpm)
      setLiveHeartRate((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 69 && next <= 75 ? next : 72;
      });

      setLastUpdatedSec(1);
    }, 2800);

    const secondCounter = setInterval(() => {
      setLastUpdatedSec((prev) => (prev < 10 ? prev + 1 : 1));
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 1000);

    return () => {
      clearInterval(telemetryInterval);
      clearInterval(secondCounter);
    };
  }, [isStreaming]);

  return (
    <div className="w-full bg-white rounded-2xl border border-[#E4E2DC] p-5 sm:p-7 shadow-subtle transition-all">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E2DC]/70 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              {isStreaming && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F5C54] opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F5C54]" />
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-[#14211F] tracking-tight">
              {m.title}
            </h3>
            <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20 uppercase">
              {m.liveBadge}
            </span>
          </div>
          <p className="text-xs text-[#5C6966] mt-0.5">
            {m.subtitle}
          </p>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStreaming((prev) => !prev)}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#F7F6F3] hover:bg-[#EFECE6] border border-[#E4E2DC] text-[#14211F] text-xs font-medium transition-colors"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#5C6966]" strokeWidth={1.5} />
                <span>{m.pauseStream}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#0F5C54]" strokeWidth={1.5} />
                <span>{m.resumeStream}</span>
              </>
            )}
          </button>

          {onNavigateToLogs && (
            <button
              type="button"
              onClick={onNavigateToLogs}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-xs font-medium transition-colors shadow-subtle"
            >
              <span>{m.viewAllLogs}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {/* Main 3 Live Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        {/* 1. CGM Live Glucose */}
        <div className="bg-[#FAF9F7] rounded-xl border border-[#E4E2DC] p-4.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#E8F1EF] text-[#0F5C54]">
                <Radio className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#14211F] uppercase tracking-wider">
                  {m.cgmTitle}
                </div>
                <div className="text-[10px] text-[#5C6966]">{m.cgmSensor}</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#0F5C54] bg-[#E8F1EF] px-2 py-0.5 rounded">
              <Wifi className="w-3 h-3" strokeWidth={1.5} />
              <span>Live</span>
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums text-[#14211F]">
                {liveGlucose}
              </span>
              <span className="text-sm font-medium text-[#5C6966]">mg/dL</span>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-white text-[#0F5C54] border border-[#E4E2DC]">
                {m.stableTrend}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] text-[#5C6966]">
            <span>{m.sensorLife}</span>
            <span className="tabular-nums">{lastUpdatedSec}s ago</span>
          </div>
        </div>

        {/* 2. Live Heart Rate */}
        <div className="bg-[#FAF9F7] rounded-xl border border-[#E4E2DC] p-4.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#8A6F3E]">
                <Heart className={`w-4 h-4 text-[#8A6F3E] ${isStreaming ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#14211F] uppercase tracking-wider">
                  {m.heartRateTitle}
                </div>
                <div className="text-[10px] text-[#5C6966]">{m.heartRateSensor}</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#8A6F3E] bg-[#FAF7F2] px-2 py-0.5 rounded">
              <Watch className="w-3 h-3" strokeWidth={1.5} />
              <span>Syncing</span>
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums text-[#14211F]">
                {liveHeartRate}
              </span>
              <span className="text-sm font-medium text-[#5C6966]">bpm</span>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-white text-[#5C6966] border border-[#E4E2DC]">
                Resting
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] text-[#5C6966]">
            <span>{m.normalSinus}</span>
            <span className="tabular-nums">64 - 88 range</span>
          </div>
        </div>

        {/* 3. Blood Oxygen (SpO2) */}
        <div className="bg-[#FAF9F7] rounded-xl border border-[#E4E2DC] p-4.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#E8F1EF] text-[#0F5C54]">
                <Activity className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
              </span>
              <div>
                <div className="text-xs font-semibold text-[#14211F] uppercase tracking-wider">
                  {m.spo2Title}
                </div>
                <div className="text-[10px] text-[#5C6966]">{m.spo2Sensor}</div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-medium text-[#0F5C54] bg-[#E8F1EF] px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
              <span>Normal</span>
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums text-[#14211F]">
                98
              </span>
              <span className="text-sm font-medium text-[#5C6966]">%</span>
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-white text-[#0F5C54] border border-[#E4E2DC]">
                PI 4.2%
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] text-[#5C6966]">
            <span>{m.ambientPerfusion}</span>
            <span>Stable O2</span>
          </div>
        </div>
      </div>

      {/* Real-time PPG / Rhythm Waveform Strip */}
      <div className="bg-[#FAF9F7] rounded-xl border border-[#E4E2DC] p-4">
        <div className="flex items-center justify-between text-xs text-[#5C6966] mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F5C54]" />
            <span className="font-semibold text-[#14211F]">{m.waveformTitle}</span>
            <span className="text-[11px] hidden sm:inline">• Lead II simulation</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>25 mm/s • 10 mm/mV</span>
            <span className="font-medium text-[#0F5C54]">{m.signalLabel}</span>
          </div>
        </div>

        {/* Animated SVG Pulse Line */}
        <div className="w-full h-16 overflow-hidden relative bg-white rounded-lg border border-[#E4E2DC]/70 flex items-center">
          {/* Subtle grid lines background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(to right, #0F5C54 1px, transparent 1px), linear-gradient(to bottom, #0F5C54 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          <svg
            className="w-full h-full"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 L100,30 L120,28 L130,30 L140,30 L150,15 L160,50 L170,10 L180,36 L190,30 L220,30 L240,24 L260,30 L350,30 L370,28 L380,30 L390,30 L400,15 L410,50 L420,10 L430,36 L440,30 L470,30 L490,24 L510,30 L600,30 L620,28 L630,30 L640,30 L650,15 L660,50 L670,10 L680,36 L690,30 L720,30 L740,24 L760,30 L850,30 L870,28 L880,30 L890,30 L900,15 L910,50 L920,10 L930,36 L940,30 L970,30 L990,24 L1000,30"
              fill="none"
              stroke="#0F5C54"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Sweep bar */}
          {isStreaming && (
            <div
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-[#0F5C54]/15 to-transparent pointer-events-none transition-all duration-300"
              style={{ left: `${(pulsePhase * 10) % 95}%` }}
            />
          )}
        </div>

        {/* Connected devices telemetry status footer */}
        <div className="mt-3 pt-3 border-t border-[#E4E2DC]/60 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#5C6966]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
            <span>FreeStyle Libre 3 CGM:</span>
            <span className="font-semibold text-[#14211F]">Connected</span>
            <span className="flex items-center gap-0.5 ml-auto text-[10px] text-[#0F5C54]">
              <BatteryCharging className="w-3 h-3" strokeWidth={1.5} /> 94%
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
            <span>CareLoop Watch:</span>
            <span className="font-semibold text-[#14211F]">Streaming</span>
            <span className="flex items-center gap-0.5 ml-auto text-[10px] text-[#0F5C54]">
              <BatteryCharging className="w-3 h-3" strokeWidth={1.5} /> 88%
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
            <span>Omron Evolv BP:</span>
            <span className="font-semibold text-[#14211F]">Standby</span>
            <span className="flex items-center gap-0.5 ml-auto text-[10px] text-[#0F5C54]">
              <BatteryCharging className="w-3 h-3" strokeWidth={1.5} /> 91%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
