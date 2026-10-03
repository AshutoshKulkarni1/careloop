import { useState, useEffect } from 'react';
import { demoHealthService } from './services/demoHealthService';
import { useVoiceFlow } from './state/useVoiceFlow';
import { Sidebar, type NavTabId } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HeroPanel } from './components/HeroPanel';
import { TodayCards } from './components/TodayCards';
import { GlucoseChart } from './components/GlucoseChart';
import { BpChart } from './components/BpChart';
import { Timeline } from './components/Timeline';
import { ChatPanel } from './components/ChatPanel';
import { VoiceOverlay } from './components/VoiceOverlay';
import { FooterBanner } from './components/FooterBanner';
import { PlaceholderPage } from './components/PlaceholderPage';
import { LiveMonitoringSection } from './components/LiveMonitoringSection';
import { WeeklyHealthLog } from './components/WeeklyHealthLog';

// Secondary modules
import { MedicationsModule } from './components/modules/MedicationsModule';
import { FollowUpModule } from './components/modules/FollowUpModule';
import { SideEffectsModule } from './components/modules/SideEffectsModule';
import { LifestyleModule } from './components/modules/LifestyleModule';
import { HealthSummaryModule } from './components/modules/HealthSummaryModule';
import { DevicesModule } from './components/modules/DevicesModule';

import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [localToast, setLocalToast] = useState<string | null>(null);

  const {
    state,
    isOverlayOpen,
    scenario,
    setScenario,
    language,
    changeLanguage,
    listeningSecondsLeft,
    isSpeakingVoice,
    isMutedVoice,
    transcribedText,
    detectedLangName,
    autoTimerCountdown,
    candidateReading,
    glucoseReadings,
    bpReadings,
    todayGlucose,
    todayBp,
    isEveningMedTaken,
    markEveningMedTaken,
    highlightedPointId,
    chatMessages,
    toastMessage,
    startVoiceFlow,
    handleDoneSpeaking,
    replayMealQuestion,
    replayConfirmation,
    handleSelectFollowUp,
    handleModify,
    handleConfirmSave,
    closeOverlay,
    resetDemo,
    toggleMuteVoice,
  } = useVoiceFlow(demoHealthService);

  // Sync document lang attribute for typography
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const activeToast = toastMessage || localToast;

  const showLocalToast = (msg: string) => {
    setLocalToast(msg);
    setTimeout(() => setLocalToast(null), 3500);
  };

  return (
    <div className={`min-h-screen flex bg-[#F7F6F3] text-[#14211F] font-sans lang-${language}`}>
      {/* Toast Notification */}
      {activeToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#14211F] text-white text-xs font-medium rounded-xl shadow-modal border border-[#14211F]/20 animate-fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-[#0F5C54] shrink-0" strokeWidth={2} />
          <span>{activeToast}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top bar */}
        <TopBar
          language={language}
          onSelectLanguage={changeLanguage}
          onResetDemo={resetDemo}
          isMutedVoice={isMutedVoice}
          onToggleMuteVoice={toggleMuteVoice}
        />

        {/* Dynamic page content */}
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' ? (
            <>
              {/* Top Row: Hero Panel & Live Transcript Chat */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 flex">
                  <HeroPanel
                    scenario={scenario}
                    language={language}
                    onSelectScenario={setScenario}
                    onStartVoice={() => startVoiceFlow(scenario)}
                    isListening={isOverlayOpen && state === 'LISTENING'}
                  />
                </div>
                <div className="lg:col-span-4 flex">
                  <ChatPanel
                    messages={chatMessages}
                    language={language}
                    onConfirmFromChat={handleConfirmSave}
                    isConfirmationActive={state === 'CONFIRMATION'}
                  />
                </div>
              </div>

              {/* 2. Live Connected Monitoring Stream */}
              <section id="live-monitoring-console" aria-label="Live Telemetry & Device Monitoring">
                <LiveMonitoringSection
                  language={language}
                  onNavigateToLogs={() => setActiveTab('healthLogs')}
                />
              </section>

              {/* 3. Today Summary Cards */}
              <section aria-label="Today's Health Metrics">
                <TodayCards
                  todayGlucose={todayGlucose}
                  todayBp={todayBp}
                  language={language}
                  onQuickLogGlucose={() => {
                    setScenario('glucose');
                    startVoiceFlow('glucose');
                  }}
                  onQuickLogBp={() => {
                    setScenario('blood_pressure');
                    startVoiceFlow('blood_pressure');
                  }}
                />
              </section>

              {/* 4. Charts Side-by-Side */}
              <section aria-label="Health Trend Charts" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlucoseChart
                  readings={glucoseReadings}
                  highlightedPointId={highlightedPointId}
                  language={language}
                />
                <BpChart
                  readings={bpReadings}
                  highlightedPointId={highlightedPointId}
                  language={language}
                />
              </section>

              {/* 5. Recent Activity and Timeline */}
              <section aria-label="Recent Activity Timeline">
                <Timeline
                  glucoseReadings={glucoseReadings}
                  bpReadings={bpReadings}
                  language={language}
                />
              </section>

              {/* 6. Compact Secondary Modules in a Grid */}
              <section aria-label="Secondary Modules" className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#5C6966] px-1">
                  Health System Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MedicationsModule
                    language={language}
                    isEveningTaken={isEveningMedTaken}
                    onMarkEveningTaken={markEveningMedTaken}
                    isPostMealReadingLogged={Boolean(todayGlucose || todayBp)}
                  />
                  <FollowUpModule language={language} />
                  <SideEffectsModule language={language} onToast={showLocalToast} />
                  <LifestyleModule language={language} />
                  <HealthSummaryModule language={language} />
                  <DevicesModule
                    language={language}
                    onOpenLiveMonitoring={() => {
                      const el = document.getElementById('live-monitoring-console');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </div>
              </section>
            </>
          ) : activeTab === 'healthLogs' ? (
            <WeeklyHealthLog
              language={language}
              onBackToDashboard={() => setActiveTab('dashboard')}
              onToast={showLocalToast}
            />
          ) : (
            <PlaceholderPage
              tabId={activeTab}
              language={language}
              onBackToDashboard={() => setActiveTab('dashboard')}
            />
          )}
        </main>

        {/* Footer disclaimer */}
        <FooterBanner language={language} />
      </div>

      {/* Voice Flow Modal Overlay */}
      <VoiceOverlay
        isOpen={isOverlayOpen}
        state={state}
        scenario={scenario}
        language={language}
        listeningSecondsLeft={listeningSecondsLeft}
        isSpeakingVoice={isSpeakingVoice}
        transcribedText={transcribedText}
        detectedLangName={detectedLangName}
        autoTimerCountdown={autoTimerCountdown}
        candidateReading={candidateReading}
        isEveningMedTaken={isEveningMedTaken}
        onMarkEveningMedTaken={markEveningMedTaken}
        onSelectFollowUp={handleSelectFollowUp}
        onConfirmSave={handleConfirmSave}
        onModify={handleModify}
        onClose={closeOverlay}
        onDoneSpeaking={handleDoneSpeaking}
        onReplayMealQuestion={replayMealQuestion}
        onReplayConfirmation={replayConfirmation}
        isMutedVoice={isMutedVoice}
        onToggleMuteVoice={toggleMuteVoice}
      />
    </div>
  );
}

export default App;
