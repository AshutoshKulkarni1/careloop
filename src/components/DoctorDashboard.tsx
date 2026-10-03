import React, { useState } from 'react';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { initialPatients, type PatientRecord } from '../data/doctorData';
import {
  Stethoscope,
  Activity,
  Pill,
  Clock,
  Radio,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Send,
  Download,
  Video,
  ArrowLeft,
  Battery,
  Wifi,
  Sparkles,
  Volume2,
} from 'lucide-react';

interface DoctorDashboardProps {
  language: SupportedLanguage;
  onBackToPatient: () => void;
  onToast: (msg: string) => void;
  // Dynamic sync from demo patient session
  currentGlucoseReading?: any;
  currentBpReading?: any;
  isEveningMedTaken?: boolean;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  language,
  onBackToPatient,
  onToast,
  currentGlucoseReading,
  currentBpReading,
  isEveningMedTaken = false,
}) => {
  const t = getTranslation(language);
  const doc = t.doctor;

  const [patients, setPatients] = useState<PatientRecord[]>(() => {
    // If the patient session has updated glucose or BP, sync it into Ramesh Hegde
    return initialPatients.map((p) => {
      if (p.id === 'CL-88204') {
        const updatedReadings = [...p.todayReadings];
        if (currentGlucoseReading && currentGlucoseReading.value) {
          // Check if post-prandial is already there
          const existingIdx = updatedReadings.findIndex((r) => r.type.includes('Post-Prandial'));
          if (existingIdx >= 0) {
            updatedReadings[existingIdx] = {
              ...updatedReadings[existingIdx],
              value: `${currentGlucoseReading.value} mg/dL`,
            };
          }
        }
        if (currentBpReading && currentBpReading.systolic) {
          const bpIdx = updatedReadings.findIndex((r) => r.type.includes('Blood Pressure'));
          if (bpIdx >= 0) {
            updatedReadings[bpIdx] = {
              ...updatedReadings[bpIdx],
              value: `${currentBpReading.systolic}/${currentBpReading.diastolic} mmHg`,
            };
          }
        }
        return {
          ...p,
          currentSystolic: currentBpReading?.systolic || p.currentSystolic,
          currentDiastolic: currentBpReading?.diastolic || p.currentDiastolic,
          medicationsTakenCount: isEveningMedTaken ? 3 : 2,
          allMedications: p.allMedications.map((m) =>
            m.time === 'Evening' ? { ...m, status: isEveningMedTaken ? 'taken' : 'pending' } : m
          ),
          todayReadings: updatedReadings,
        };
      }
      return p;
    });
  });

  const [selectedPatientId, setSelectedPatientId] = useState<string>('CL-88204');
  const [filterMode, setFilterMode] = useState<'all' | 'live' | 'alerts' | 'stable'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adviceText, setAdviceText] = useState<string>('');
  const [isSendingAdvice, setIsSendingAdvice] = useState<boolean>(false);

  // Sync state if isEveningMedTaken or readings change
  React.useEffect(() => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === 'CL-88204') {
          return {
            ...p,
            medicationsTakenCount: isEveningMedTaken ? 3 : 2,
            allMedications: p.allMedications.map((m) =>
              m.time === 'Evening' ? { ...m, status: isEveningMedTaken ? 'taken' : 'pending' } : m
            ),
          };
        }
        return p;
      })
    );
  }, [isEveningMedTaken]);

  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Filtering
  const filteredPatients = patients.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.primaryCondition.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (filterMode === 'live') return p.isMonitoringLive;
    if (filterMode === 'alerts') return p.riskLevel === 'critical' || p.medicationsTakenCount < p.medicationsTotalCount;
    if (filterMode === 'stable') return p.riskLevel === 'stable';
    return true;
  });

  // KPI metrics
  const liveCount = patients.filter((p) => p.isMonitoringLive).length;
  const alertCount = patients.filter((p) => p.riskLevel === 'critical' || p.medicationsTakenCount < p.medicationsTotalCount).length;
  const reportsCount = patients.filter((p) => p.hasDailyReportToday).length;

  // Handlers
  const handleSignReport = (patientId: string) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patientId ? { ...p, isReportSignedByDoctor: true } : p))
    );
    onToast(doc.reportSigned);
  };

  const handleSendAdvice = () => {
    if (!adviceText.trim()) return;
    setIsSendingAdvice(true);
    setTimeout(() => {
      setIsSendingAdvice(false);
      setAdviceText('');
      onToast(doc.adviceSentSuccess);
    }, 600);
  };

  const handleExportPdf = () => {
    onToast(`Generating clinical PDF report for ${selectedPatient.name}...`);
    setTimeout(() => {
      onToast(`CareLoop Daily Report #${selectedPatient.id} ready.`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* 1. Clinician Profile & Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E4E2DC] p-5 sm:p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0F5C54] text-white flex items-center justify-center shadow-sm">
            <Stethoscope className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-serif font-bold text-[#14211F]">
                {doc.physicianName}
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#E8F1EF] text-[#0F5C54] border border-[#0F5C54]/20 font-medium">
                {doc.physicianReg}
              </span>
            </div>
            <p className="text-xs text-[#5C6966]">
              {doc.physicianTitle} • Apollo & Manipal Tele-Clinic Network
            </p>
          </div>
        </div>

        {/* Back to Patient View Button */}
        <button
          type="button"
          onClick={onBackToPatient}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#0F5C54] border border-[#E4E2DC] text-xs font-semibold transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-[#0F5C54]/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{doc.switchToPatient}</span>
        </button>
      </div>

      {/* 2. KPI Summary Stat Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Assigned Patients */}
        <div className="bg-white rounded-xl border border-[#E4E2DC] p-4 shadow-subtle">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5C6966] mb-1">
            {doc.activeRoster}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#14211F]">
              {patients.length}
            </span>
            <span className="text-xs text-[#5C6966]">Active Cohort</span>
          </div>
        </div>

        {/* KPI 2: Live Monitoring Now */}
        <div className="bg-white rounded-xl border border-[#E4E2DC] p-4 shadow-subtle">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0F5C54]">
              {doc.liveMonitoringNow}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#0F5C54] animate-ping" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#0F5C54]">
              {liveCount}
            </span>
            <span className="text-xs text-[#5C6966]">BLE Connected</span>
          </div>
        </div>

        {/* KPI 3: Action Needed */}
        <div className="bg-white rounded-xl border border-[#E4E2DC] p-4 shadow-subtle">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8A6F3E]">
              {doc.criticalAlerts}
            </span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#8A6F3E]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#8A6F3E]">
              {alertCount}
            </span>
            <span className="text-xs text-[#5C6966]">Pending Dose / Excursion</span>
          </div>
        </div>

        {/* KPI 4: Reports Submitted Today */}
        <div className="bg-white rounded-xl border border-[#E4E2DC] p-4 shadow-subtle">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-[#5C6966] mb-1">
            {doc.reportsSubmitted}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold tabular-nums text-[#14211F]">
              {reportsCount}/{patients.length}
            </span>
            <span className="text-xs text-[#0F5C54] font-medium">Logged</span>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Split Roster & Clinical Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Patient Roster & Triage List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E4E2DC] p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4E2DC]/70 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
                {doc.activeRoster}
              </h2>
            </div>
            <span className="text-xs font-medium text-[#5C6966]">
              {filteredPatients.length} shown
            </span>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5C6966] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={doc.searchPatient}
              className="w-full pl-9 pr-3 py-2 bg-[#F7F6F3] rounded-lg border border-[#E4E2DC] text-xs text-[#14211F] placeholder-[#5C6966]/70 focus:outline-none focus:ring-1 focus:ring-[#0F5C54]"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              { id: 'all', label: doc.filterAll },
              { id: 'live', label: doc.filterLive },
              { id: 'alerts', label: doc.filterAlerts },
              { id: 'stable', label: doc.filterStable },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterMode(f.id as any)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  filterMode === f.id
                    ? 'bg-[#0F5C54] text-white shadow-xs'
                    : 'bg-[#F7F6F3] hover:bg-[#EFECE6] text-[#5C6966]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Patient Cards List */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatientId;
              const hasAlert = p.riskLevel === 'critical' || p.medicationsTakenCount < p.medicationsTotalCount;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#E8F1EF]/40 border-[#0F5C54] shadow-sm'
                      : 'bg-white hover:bg-[#FAF9F7] border-[#E4E2DC]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#E4E2DC] text-[#14211F] flex items-center justify-center text-xs font-semibold shrink-0">
                        {p.photoInitial}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-[#14211F] flex items-center gap-1.5">
                          <span>{p.name}</span>
                          <span className="text-[10px] text-[#5C6966] font-normal">
                            ({p.age}{p.gender})
                          </span>
                        </div>
                        <div className="text-[11px] text-[#5C6966] truncate max-w-[190px]">
                          {p.primaryCondition}
                        </div>
                      </div>
                    </div>

                    {/* Live Status Badge */}
                    <div>
                      {p.isMonitoringLive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F1EF] text-[#0F5C54] text-[10px] font-semibold border border-[#0F5C54]/20 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F5C54]" />
                          <span>LIVE</span>
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
                          Standby
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vitals & Medication summary snippet */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#E4E2DC]/60 text-[11px]">
                    <div>
                      <span className="text-[10px] text-[#5C6966] block">Glucose</span>
                      <span className="font-semibold tabular-nums text-[#14211F]">
                        {p.currentGlucose ? `${p.currentGlucose} mg/dL` : '—'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#5C6966] block">BP</span>
                      <span className="font-semibold tabular-nums text-[#14211F]">
                        {p.currentSystolic ? `${p.currentSystolic}/${p.currentDiastolic}` : '—'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#5C6966] block">Medication</span>
                      <span
                        className={`font-semibold tabular-nums ${
                          p.medicationsTakenCount === p.medicationsTotalCount
                            ? 'text-[#0F5C54]'
                            : 'text-[#8A6F3E]'
                        }`}
                      >
                        {p.medicationsTakenCount}/{p.medicationsTotalCount}
                      </span>
                    </div>
                  </div>

                  {/* Adherence Alert Banner */}
                  {hasAlert && p.pendingMedicationName && (
                    <div className="mt-2.5 px-2 py-1 rounded bg-[#FAF7F2] border border-[#8A6F3E]/20 text-[10px] text-[#8A6F3E] flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span className="truncate">Pending: {p.pendingMedicationName}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredPatients.length === 0 && (
              <div className="p-8 text-center text-xs text-[#5C6966]">
                {doc.noPatientsFound}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep-Dive Patient Telemetry & Daily Report (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* A. Live Telemetry Inspection Card */}
          <div className="bg-white rounded-2xl border border-[#E4E2DC] p-6 shadow-subtle space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E4E2DC]/70 gap-2">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#E8F1EF] text-[#0F5C54]">
                  <Radio className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
                    {doc.liveTelemetry}
                  </h3>
                  <div className="text-xs text-[#5C6966]">
                    Patient: <strong className="text-[#14211F]">{selectedPatient.name}</strong> ({selectedPatient.id})
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              {selectedPatient.isMonitoringLive ? (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EF] text-[#0F5C54] text-xs font-semibold border border-[#0F5C54]/30 shadow-subtle">
                    <span className="w-2 h-2 rounded-full bg-[#0F5C54] animate-ping" />
                    <span>{doc.liveStreamingBadge}</span>
                  </span>
                  <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#5C6966] bg-[#F7F6F3] px-2.5 py-1 rounded-md border border-[#E4E2DC]">
                    <Wifi className="w-3 h-3 text-[#0F5C54]" />
                    <span>{selectedPatient.bleSignal}%</span>
                    <Battery className="w-3 h-3 text-[#0F5C54] ml-1" />
                    <span>{selectedPatient.batteryPct}%</span>
                  </div>
                </div>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#FAF7F2] text-[#8A6F3E] text-xs font-medium border border-[#8A6F3E]/30">
                  <Clock className="w-3 h-3" />
                  <span>{doc.standbyBadge} • {selectedPatient.lastSyncTime}</span>
                </span>
              )}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* CGM Glucose */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F3] border border-[#E4E2DC]/80">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6966] block">
                  CGM Glucose
                </span>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-bold tabular-nums text-[#14211F]">
                    {selectedPatient.currentGlucose || '—'}
                  </span>
                  <span className="text-xs text-[#5C6966]">mg/dL</span>
                </div>
                <span className="text-[10px] text-[#0F5C54] font-medium bg-[#E8F1EF] px-1.5 py-0.5 rounded">
                  {selectedPatient.glucoseTrend === 'steady' ? '→ Steady (70-140)' : 'Monitoring'}
                </span>
              </div>

              {/* Heart Rate & Pulse Waveform */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F3] border border-[#E4E2DC]/80">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6966] block">
                  PPG Heart Rate
                </span>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-bold tabular-nums text-[#14211F]">
                    {selectedPatient.currentHeartRate}
                  </span>
                  <span className="text-xs text-[#5C6966]">bpm</span>
                </div>
                <span className="text-[10px] text-[#5C6966]">Normal Sinus</span>
              </div>

              {/* Blood Pressure */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F3] border border-[#E4E2DC]/80">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6966] block">
                  Blood Pressure
                </span>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-bold tabular-nums text-[#14211F]">
                    {selectedPatient.currentSystolic}/{selectedPatient.currentDiastolic}
                  </span>
                </div>
                <span className="text-[10px] text-[#5C6966]">mmHg</span>
              </div>

              {/* SpO2 */}
              <div className="p-3.5 rounded-xl bg-[#F7F6F3] border border-[#E4E2DC]/80">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5C6966] block">
                  Oxygen (SpO2)
                </span>
                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-2xl font-bold tabular-nums text-[#14211F]">
                    {selectedPatient.currentSpO2}%
                  </span>
                </div>
                <span className="text-[10px] text-[#0F5C54] font-medium bg-[#E8F1EF] px-1.5 py-0.5 rounded">
                  Optimal
                </span>
              </div>
            </div>

            {/* Connected Hardware Device info */}
            <div className="flex items-center justify-between text-xs text-[#5C6966] bg-white p-3 rounded-lg border border-[#E4E2DC]/60">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#0F5C54]" />
                <span>Connected Sensor: <strong className="text-[#14211F]">{selectedPatient.liveDeviceName}</strong></span>
              </div>
              <span className="text-[11px] text-[#0F5C54] font-medium">
                {selectedPatient.lastSyncTime}
              </span>
            </div>
          </div>

          {/* B. Daily Clinical Report Review Card */}
          <div className="bg-white rounded-2xl border border-[#E4E2DC] p-6 shadow-subtle space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E4E2DC]/70 pb-3 gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
                  {doc.dailyReport}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2.5 py-1 rounded bg-[#F7F6F3] text-[#5C6966] border border-[#E4E2DC]">
                  {selectedPatient.reportSubmissionTime}
                </span>

                {selectedPatient.isReportSignedByDoctor ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F1EF] text-[#0F5C54] text-xs font-medium border border-[#0F5C54]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{doc.reportSigned}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSignReport(selectedPatient.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] text-white text-xs font-medium transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{doc.signReportBtn}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 1. Patient Voice Spoken Quote */}
            <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#E4E2DC] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6966] flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#0F5C54]" />
                  <span>{doc.patientQuoteVoice}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#0F5C54] border border-[#E4E2DC]">
                  Audio Transcribed
                </span>
              </div>
              <blockquote className="text-sm font-serif italic text-[#14211F] pl-3 border-l-2 border-[#0F5C54]">
                "{selectedPatient.patientSpokenTranscript[language] || selectedPatient.patientSpokenTranscript.en}"
              </blockquote>
            </div>

            {/* 2. AI-Assisted Clinical Summary */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F5C54]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{doc.clinicalDigest}</span>
              </div>
              <p className="text-xs text-[#14211F] leading-relaxed bg-[#F7F6F3] p-3 rounded-lg border border-[#E4E2DC]/80">
                {selectedPatient.clinicalSummary[language] || selectedPatient.clinicalSummary.en}
              </p>
            </div>

            {/* 3. Today's Structured Readings Table */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6966] block">
                {doc.findings}
              </span>
              <div className="border border-[#E4E2DC] rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F7] border-b border-[#E4E2DC] text-[10px] uppercase font-semibold text-[#5C6966]">
                    <tr>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Test</th>
                      <th className="py-2.5 px-3">Value</th>
                      <th className="py-2.5 px-3">Context</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E2DC]/60">
                    {selectedPatient.todayReadings.map((r, idx) => (
                      <tr key={idx} className="hover:bg-[#F7F6F3]/50">
                        <td className="py-2.5 px-3 font-mono text-[#5C6966]">{r.time}</td>
                        <td className="py-2.5 px-3 font-medium text-[#14211F]">{r.type}</td>
                        <td className="py-2.5 px-3 font-semibold tabular-nums text-[#14211F]">{r.value}</td>
                        <td className="py-2.5 px-3 text-[#5C6966]">{r.context}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded ${
                              r.status === 'optimal'
                                ? 'bg-[#E8F1EF] text-[#0F5C54]'
                                : r.status === 'elevated'
                                ? 'bg-[#FAF7F2] text-[#8A6F3E]'
                                : 'bg-[#F7F6F3] text-[#5C6966]'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Medication Adherence Audit */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6966]">
                  {doc.medicationAdherence}
                </span>
                <span className="text-xs font-medium text-[#0F5C54]">
                  {selectedPatient.medicationsTakenCount}/{selectedPatient.medicationsTotalCount} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedPatient.allMedications.map((m, idx) => {
                  const isTaken = m.status === 'taken';
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#F7F6F3] border border-[#E4E2DC] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Pill className="w-3.5 h-3.5 text-[#0F5C54]" />
                        <div>
                          <div className="font-medium text-[#14211F]">{m.name}</div>
                          <div className="text-[10px] text-[#5C6966]">{m.time} • {m.timeStr}</div>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          isTaken
                            ? 'bg-[#E8F1EF] text-[#0F5C54]'
                            : 'bg-[#FAF7F2] text-[#8A6F3E]'
                        }`}
                      >
                        {isTaken ? 'Taken' : 'Pending'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Doctor Clinical Actions Suite */}
            <div className="pt-2 border-t border-[#E4E2DC]/70 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6966] block">
                Clinician Actions & Advice
              </span>

              {/* Advice Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adviceText}
                  onChange={(e) => setAdviceText(e.target.value)}
                  placeholder={`Send clinical advice to ${selectedPatient.name} (e.g. Take evening statin after dinner)...`}
                  className="flex-1 px-3 py-2 bg-[#F7F6F3] rounded-lg border border-[#E4E2DC] text-xs text-[#14211F] placeholder-[#5C6966]/70 focus:outline-none focus:ring-1 focus:ring-[#0F5C54]"
                />
                <button
                  type="button"
                  onClick={handleSendAdvice}
                  disabled={!adviceText.trim() || isSendingAdvice}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F5C54] hover:bg-[#0B4640] disabled:opacity-50 text-white text-xs font-medium transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{doc.sendAdviceBtn}</span>
                </button>
              </div>

              {/* Additional Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleExportPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F6F3] text-[#14211F] border border-[#E4E2DC] text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#5C6966]" />
                  <span>{doc.exportPdfBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToast(`Initiating secure tele-consultation with ${selectedPatient.name}...`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F7F6F3] text-[#0F5C54] border border-[#0F5C54]/30 text-xs font-medium transition-colors"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>{doc.teleconsultBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
