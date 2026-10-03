import { useState, useEffect, useRef, useCallback } from 'react';
import type {
  HealthReading,
  HealthService,
  ScenarioType,
  SupportedLanguage,
  VoiceState,
} from '../services/healthService';
import { ttsService, type TTSState } from '../services/ttsService';
import { getTranslation } from '../i18n';
import { formatCurrentTime } from '../data/demoData';

export interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  subtext?: string;
  timestamp: string;
  type?: 'text' | 'card' | 'action' | 'pharmacyAction';
  readingData?: HealthReading;
}

export function useVoiceFlow(healthService: HealthService) {
  const [state, setState] = useState<VoiceState>('IDLE');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [scenario, setScenario] = useState<ScenarioType>('glucose');
  const [language, setLanguage] = useState<SupportedLanguage>('kn');

  // 15 seconds listening countdown state
  const [listeningSecondsLeft, setListeningSecondsLeft] = useState<number>(15);
  const listeningIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const listeningAbortControllerRef = useRef<AbortController | null>(null);

  // Transcribed state
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [detectedLangName, setDetectedLangName] = useState<string>('');

  // Follow-up state
  const [followUpAnswer, setFollowUpAnswer] = useState<string | null>(null);
  const [autoTimerCountdown, setAutoTimerCountdown] = useState<number>(10);
  const autoSelectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // TTS State
  const [ttsState, setTtsState] = useState<TTSState>({
    isSpeaking: false,
    activeText: '',
    isMuted: false,
    activeLanguage: 'kn',
  });

  // Subscribe to TTS changes
  useEffect(() => {
    return ttsService.subscribe((s) => {
      setTtsState(s);
    });
  }, []);

  // Structured reading candidate
  const [candidateReading, setCandidateReading] = useState<HealthReading | null>(null);

  // Medication adherence check state
  const [isEveningMedTaken, setIsEveningMedTaken] = useState<boolean>(false);

  // Saved readings in memory
  const [glucoseReadings, setGlucoseReadings] = useState<HealthReading[]>([]);
  const [bpReadings, setBpReadings] = useState<HealthReading[]>([]);

  // Highlight state for chart animation
  const [highlightedPointId, setHighlightedPointId] = useState<string | null>(null);

  // Chat transcript
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial load
  const loadInitialData = useCallback(async () => {
    const data = await healthService.getInitialReadings();
    setGlucoseReadings(data.glucose);
    setBpReadings(data.bloodPressure);

    // Initial greeting in chat
    const t = getTranslation(language);
    const { displayTime } = formatCurrentTime();
    setChatMessages([
      {
        id: 'msg-greeting',
        sender: 'assistant',
        text: t.chat.greeting,
        timestamp: displayTime,
        type: 'text',
      },
    ]);
  }, [healthService, language]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Update greeting text if language changes while IDLE
  useEffect(() => {
    const t = getTranslation(language);
    setChatMessages((prev) => {
      if (prev.length <= 1) {
        const { displayTime } = formatCurrentTime();
        return [
          {
            id: 'msg-greeting',
            sender: 'assistant',
            text: t.chat.greeting,
            timestamp: displayTime,
            type: 'text',
          },
        ];
      }
      return prev;
    });
  }, [language]);

  // Clean timers helper
  const clearFollowUpTimers = useCallback(() => {
    if (autoSelectTimeoutRef.current) {
      clearTimeout(autoSelectTimeoutRef.current);
      autoSelectTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const clearListeningTimers = useCallback(() => {
    if (listeningIntervalRef.current) {
      clearInterval(listeningIntervalRef.current);
      listeningIntervalRef.current = null;
    }
    if (listeningAbortControllerRef.current) {
      listeningAbortControllerRef.current.abort();
      listeningAbortControllerRef.current = null;
    }
  }, []);

  // Show temporary toast
  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  // PROCEED TO PROCESSING & STRUCTURING
  const proceedToProcessing = useCallback(
    async (activeScenario: ScenarioType, answer?: string) => {
      setState('PROCESSING');

      const structured = await healthService.structure(activeScenario, language, answer);
      setCandidateReading(structured);
      setState('CONFIRMATION');

      const t = getTranslation(language);
      const { displayTime } = formatCurrentTime();

      // Confirmation sentence for chat
      const confirmSentence =
        activeScenario === 'glucose'
          ? t.voice.glucoseConfirmSentence
          : t.voice.bpConfirmSentence;

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-confirm-${Date.now()}`,
          sender: 'assistant',
          text: confirmSentence,
          subtext: activeScenario === 'glucose' ? t.voice.glucoseSaveQuestion : undefined,
          timestamp: displayTime,
          type: 'action',
          readingData: structured,
        },
      ]);

      // Spoken confirmation in voice by the website
      ttsService.speakConfirmation(structured, language);
    },
    [healthService, language]
  );

  // HANDLE USER SELECTING FOLLOW-UP OPTION
  const handleSelectFollowUp = useCallback(
    (answerValue: string, overrideScenario?: ScenarioType) => {
      clearFollowUpTimers();
      ttsService.stop();
      const activeScenario = overrideScenario || scenario;
      setFollowUpAnswer(answerValue);

      const t = getTranslation(language);
      const { displayTime } = formatCurrentTime();
      const answerLabel = answerValue === 'yes' ? t.voice.yes : t.voice.no;

      // Add patient's response to chat
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-ans-${Date.now()}`,
          sender: 'user',
          text: answerLabel,
          timestamp: displayTime,
          type: 'text',
        },
      ]);

      proceedToProcessing(activeScenario, answerValue);
    },
    [clearFollowUpTimers, language, proceedToProcessing, scenario]
  );

  // USER CLICKS DONE SPEAKING (early completion of 15s)
  const handleDoneSpeaking = useCallback(() => {
    if (listeningAbortControllerRef.current) {
      listeningAbortControllerRef.current.abort();
    }
  }, []);

  // REPLAY AUDIO PROMPTS
  const replayMealQuestion = useCallback(() => {
    ttsService.speakMealQuestion(language);
  }, [language]);

  const replayConfirmation = useCallback(() => {
    if (candidateReading) {
      ttsService.speakConfirmation(candidateReading, language);
    }
  }, [candidateReading, language]);

  // START VOICE FLOW
  const startVoiceFlow = useCallback(
    async (selectedScenario?: ScenarioType) => {
      const activeScenario = selectedScenario || scenario;
      if (selectedScenario) {
        setScenario(selectedScenario);
      }

      ttsService.stop();
      clearFollowUpTimers();
      clearListeningTimers();

      setFollowUpAnswer(null);
      setCandidateReading(null);
      setTranscribedText('');
      setDetectedLangName('');
      setListeningSecondsLeft(15);
      setState('LISTENING');
      setIsOverlayOpen(true);

      const t = getTranslation(language);
      const { displayTime } = formatCurrentTime();

      // Play soft start chime
      ttsService.playChime('listen-start');

      // Setup 15-second countdown timer interval
      const abortController = new AbortController();
      listeningAbortControllerRef.current = abortController;

      listeningIntervalRef.current = setInterval(() => {
        setListeningSecondsLeft((prev) => {
          if (prev <= 1) {
            if (listeningIntervalRef.current) {
              clearInterval(listeningIntervalRef.current);
              listeningIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Voice flow step 1: LISTENING for 15 seconds
      await healthService.startListening(activeScenario, language, abortController.signal);

      // Listening completed (or finished early by user)
      if (listeningIntervalRef.current) {
        clearInterval(listeningIntervalRef.current);
        listeningIntervalRef.current = null;
      }
      setListeningSecondsLeft(0);
      ttsService.playChime('listen-end');

      // Voice flow step 2: TRANSCRIBING (~1.5s)
      setState('TRANSCRIBING');
      const transcription = await healthService.transcribe(activeScenario, language);
      setTranscribedText(transcription.text);
      setDetectedLangName(transcription.detectedLanguage);

      // Add user utterance to chat transcript
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${Date.now()}`,
          sender: 'user',
          text: transcription.text,
          subtext: `${t.voice.languageDetected.replace('ಕನ್ನಡ', transcription.detectedLanguage).replace('English', transcription.detectedLanguage).replace('हिन्दी', transcription.detectedLanguage)}`,
          timestamp: displayTime,
          type: 'text',
        },
      ]);

      // Speak patient utterance aloud in chosen language
      await ttsService.speakPatientUtterance(activeScenario, language);

      // Step 3: Check follow-up requirement
      const followUpConfig = await healthService.getFollowUp(activeScenario, language);

      if (followUpConfig) {
        // Glucose scenario requires follow-up asking about meal
        setState('FOLLOW_UP');

        // Add assistant follow-up question to chat
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg-followup-${Date.now()}`,
            sender: 'assistant',
            text: followUpConfig.question,
            timestamp: displayTime,
            type: 'text',
          },
        ]);

        // Speak meal question in voice by the website
        ttsService.speakMealQuestion(language);

        // Setup 10s auto-select timer so user has ample time to hear voice
        setAutoTimerCountdown(10);
        countdownIntervalRef.current = setInterval(() => {
          setAutoTimerCountdown((prev) => {
            if (prev <= 1) {
              if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        autoSelectTimeoutRef.current = setTimeout(() => {
          handleSelectFollowUp(followUpConfig.autoSelectValue, activeScenario);
        }, 10000);
      } else {
        // BP scenario skips follow-up directly to structuring
        proceedToProcessing(activeScenario, undefined);
      }
    },
    [
      scenario,
      clearFollowUpTimers,
      clearListeningTimers,
      language,
      healthService,
      handleSelectFollowUp,
      proceedToProcessing,
    ]
  );

  // USER CLICKS MODIFY (ಬದಲಾಯಿಸಿ)
  const handleModify = useCallback(() => {
    ttsService.stop();
    if (scenario === 'glucose') {
      setState('FOLLOW_UP');
      setAutoTimerCountdown(10);
      ttsService.speakMealQuestion(language);
      autoSelectTimeoutRef.current = setTimeout(() => {
        handleSelectFollowUp('yes', 'glucose');
      }, 10000);
    } else {
      // Return to listening or re-run
      startVoiceFlow(scenario);
    }
  }, [handleSelectFollowUp, language, scenario, startVoiceFlow]);

  // USER CLICKS SAVE (ಹೌದು, ಉಳಿಸಿ)
  const handleConfirmSave = useCallback(async () => {
    if (!candidateReading) return;

    ttsService.stop();
    setState('SAVED');
    const saved = await healthService.save(candidateReading);

    const t = getTranslation(language);
    const { displayTime } = formatCurrentTime();

    const saveText =
      candidateReading.type === 'glucose'
        ? t.voice.glucoseSavedMessage
        : t.voice.bpSavedMessage;

    // Toast
    triggerToast(saveText);

    // Speak saved acknowledgment
    ttsService.speakSaveComplete(saved, language);

    // Update chat transcript
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-saved-${Date.now()}`,
        sender: 'assistant',
        text: saveText,
        timestamp: displayTime,
        type: 'card',
        readingData: saved,
      },
    ]);

    // Update in-memory chart readings
    if (saved.type === 'glucose') {
      setGlucoseReadings((prev) => [
        ...prev.filter((r) => !r.isNewEntry),
        saved,
      ]);
    } else {
      setBpReadings((prev) => [
        ...prev.filter((r) => !r.isNewEntry),
        saved,
      ]);
    }

    // Move to GRAPH_UPDATED after brief delay
    setTimeout(() => {
      setState('GRAPH_UPDATED');
      setIsOverlayOpen(false);
      setHighlightedPointId(saved.id);

      // Scroll chart into view smoothly
      const chartElementId =
        saved.type === 'glucose' ? 'glucose-chart-container' : 'bp-chart-container';
      const el = document.getElementById(chartElementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Check if patient has taken evening tablets based on recorded readings
      if (!isEveningMedTaken) {
        setTimeout(() => {
          const tNow = getTranslation(language);
          const { displayTime: medTime } = formatCurrentTime();
          setChatMessages((prevChat) => [
            ...prevChat,
            {
              id: `msg-med-reminder-${Date.now()}`,
              sender: 'assistant',
              text: tNow.voice.medicationAdherenceNotice,
              timestamp: medTime,
              type: 'action',
            },
          ]);
          ttsService.speakMedicationReminder(language);
        }, 1200);
      }

      // Highlight point for ~2s then clear
      setTimeout(() => {
        setHighlightedPointId(null);
        setState('IDLE');
      }, 2500);
    }, 1500);
  }, [candidateReading, healthService, isEveningMedTaken, language, triggerToast]);

  // MARK MEDICATION AS TAKEN
  const markEveningMedTaken = useCallback(() => {
    setIsEveningMedTaken(true);
    const t = getTranslation(language);
    triggerToast(t.voice.tabletsTakenSuccess);

    const { displayTime } = formatCurrentTime();
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-med-taken-${Date.now()}`,
        sender: 'assistant',
        text: t.voice.tabletsTakenSuccess,
        timestamp: displayTime,
        type: 'text',
      },
    ]);
  }, [language, triggerToast]);

  // CLOSE OVERLAY MANUALLY
  const closeOverlay = useCallback(() => {
    clearFollowUpTimers();
    clearListeningTimers();
    ttsService.stop();
    setIsOverlayOpen(false);
    if (state !== 'GRAPH_UPDATED') {
      setState('IDLE');
    }
  }, [clearFollowUpTimers, clearListeningTimers, state]);

  // RESET DEMO CONTROL
  const resetDemo = useCallback(() => {
    clearFollowUpTimers();
    clearListeningTimers();
    ttsService.stop();
    setIsOverlayOpen(false);
    setState('IDLE');
    setCandidateReading(null);
    setHighlightedPointId(null);
    setTranscribedText('');
    setFollowUpAnswer(null);
    setListeningSecondsLeft(15);
    setIsEveningMedTaken(false);

    // Call service reset
    if ('reset' in healthService && typeof (healthService as any).reset === 'function') {
      (healthService as any).reset();
    }

    loadInitialData();
    triggerToast('Demo reset to initial state');
  }, [clearFollowUpTimers, clearListeningTimers, healthService, loadInitialData, triggerToast]);

  const changeLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguage(newLang);
    ttsService.announceLanguageSwitch(newLang);
  }, []);

  const toggleMuteVoice = useCallback(() => {
    return ttsService.toggleMute();
  }, []);

  // Helper for Today summary cards
  const todayGlucose = glucoseReadings.find((r) => r.isNewEntry);
  const todayBp = bpReadings.find((r) => r.isNewEntry);

  return {
    state,
    isOverlayOpen,
    scenario,
    setScenario,
    language,
    setLanguage,
    changeLanguage,
    listeningSecondsLeft,
    isSpeakingVoice: ttsState.isSpeaking,
    isMutedVoice: ttsState.isMuted,
    ttsActiveText: ttsState.activeText,
    transcribedText,
    detectedLangName,
    followUpAnswer,
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
  };
}