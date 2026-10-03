export const kn = {
  appName: "CareLoop",
  tagline: "Healthcare that understands how you speak",
  demoMode: "ಡೆಮೊ ಮೋಡ್",
  demoModePill: "Demo Mode",
  resetDemo: "ರೀಸೆಟ್ ಡೆಮೊ",
  footerDisclaimer: "Demo Mode. Health values shown are simulated for demonstration purposes and are not medical advice.",
  
  // Navigation
  nav: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    healthLogs: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    insights: "ಒಳನೋಟಗಳು",
    medications: "ಔಷಧಿಗಳು",
    appointments: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು",
    reports: "ವರದಿಗಳು",
    profile: "ಪ್ರೊಫೈಲ್",
  },

  // Hero
  hero: {
    headline: "Healthcare that understands how you speak",
    prompt: "ಇಂದು ನೀವು ಹೇಗಿದ್ದೀರಿ?",
    talkButton: "ಕೇರ್‌ಲೂಪ್ ಜೊತೆ ಮಾತನಾಡಿ",
    helperText: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ",
    scenarioLabel: "ಪರೀಕ್ಷಾ ಸನ್ನಿವೇಶ ಆಯ್ಕೆಮಾಡಿ:",
    scenarios: {
      glucose: "ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ (Blood Glucose)",
      bloodPressure: "ರಕ್ತದೊತ್ತಡ (Blood Pressure)",
    }
  },

  // Today cards
  today: {
    title: "ಇಂದಿನ ಸ್ಥಿತಿ",
    noReading: "ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆ ಇಲ್ಲ",
    glucoseLabel: "Blood Glucose",
    glucoseSub: "ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ",
    bpLabel: "Blood Pressure",
    bpSub: "ರಕ್ತದೊತ್ತಡ",
    recordedAt: "ದಾಖಲಾದ ಸಮಯ",
    todayTag: "ಇಂದು",
  },

  // Voice Flow & Overlay
  voice: {
    steps: {
      listen: "ಕೇಳಿ (Listen)",
      understand: "ಅರ್ಥ (Understand)",
      clarify: "ಸ್ಪಷ್ಟತೆ (Clarify)",
      confirm: "ದೃಢೀಕರಣ (Confirm)",
      save: "ಉಳಿಸಿ (Save)",
    },
    listening: "ನಿಮ್ಮ ಮಾತನ್ನು ಕೇಳುತ್ತಿದ್ದೇನೆ...",
    youSaid: "ನೀವು ಹೇಳಿದ್ದು",
    languageDetected: "Language detected: ಕನ್ನಡ",
    processingSpeech: "ನಿಮ್ಮ ಮಾತನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    structuring: "ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
    understoodHeader: "ಅರ್ಥವಾದ ವಿವರಗಳು (Understood)",
    
    // Glucose specific
    glucoseSaid: "ಇವತ್ತು ನನ್ನ ಶುಗರ್ 158 ಇತ್ತು",
    glucoseFollowUp: "ಈ ಶುಗರ್ ಅನ್ನು ನೀವು ಊಟದ ನಂತರ ಅಳೆದಿದ್ದೀರಾ?",
    yes: "ಹೌದು",
    no: "ಇಲ್ಲ",
    glucoseConfirmSentence: "ನೀವು ಊಟದ ನಂತರ 158 mg/dL ರಕ್ತದ ಸಕ್ಕರೆ ಅಳೆದಿದ್ದೀರಿ.",
    glucoseSaveQuestion: "ಈ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಬೇಕೇ?",
    glucoseSavedMessage: "ಸರಿ. ನಿಮ್ಮ ಊಟದ ನಂತರದ ಸಕ್ಕರೆ ಮಟ್ಟ 158 mg/dL ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.",
    
    // BP specific
    bpSaid: "ಇವತ್ತು ನನ್ನ ಬಿಪಿ 154 ಮೇಲೆ 90 ಇತ್ತು",
    bpConfirmSentence: "ನಿಮ್ಮ ರಕ್ತದೊತ್ತಡ 154/90 mmHg ಎಂದು ದಾಖಲಿಸಬೇಕೇ?",
    bpSavedMessage: "ಸರಿ. ನಿಮ್ಮ ರಕ್ತದೊತ್ತಡ 154/90 mmHg ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.",

    // Action buttons
    saveConfirmBtn: "ಹೌದು, ಉಳಿಸಿ",
    modifyBtn: "ಬದಲಾಯಿಸಿ",
    closeOverlay: "ಮುಚ್ಚಿ",
    autoAdvanceNote: "10 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಸ್ವಯಂ ಆಯ್ಕೆ",
    listeningCountdownDesc: "15 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಆಲಿಸಲಾಗುತ್ತಿದೆ",
    listeningSecondsRemaining: "ಸೆಕೆಂಡುಗಳು",
    doneSpeaking: "ಮಾತು ಮುಗಿಯಿತು",
    speakingNotice: "ಕೇರ್‌ಲೂಪ್ ಧ್ವನಿಯಲ್ಲಿ ಮಾತನಾಡುತ್ತಿದೆ...",
    replayVoice: "ಧ್ವನಿಯನ್ನು ಮತ್ತೆ ಕೇಳಿ",

    // Medication adherence prompt
    medicationAdherenceNotice: "ಗಮನಿಸಿ: ನಿಮ್ಮ ಸಂಜೆಯ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 10mg ಮಾತ್ರೆ ಬಾಕಿ ಇದೆ. ದಯವಿಟ್ಟು ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.",
    markTabletsTaken: "ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡಿದ್ದೇನೆ (Mark as Taken)",
    tabletsTakenSuccess: "ಸಂಜೆಯ ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡಿರುವುದಾಗಿ ದಾಖಲಾಗಿದೆ.",
  },

  // Charts
  charts: {
    demoDataTag: "Demo data",
    glucoseTitle: "Blood Glucose / ರಕ್ತದಲ್ಲಿನ ಸಕ್ಕರೆ",
    glucoseSubtitle: "ಕಳೆದ 7 ದಿನಗಳ ಅಂಕಿ-ಅಂಶಗಳು ಮತ್ತು ಇಂದಿನ ದಾಖಲೆ",
    bpTitle: "Blood Pressure / ರಕ್ತದೊತ್ತಡ",
    bpSubtitle: "ಸಿಸ್ಟೊಲಿಕ್ ಮತ್ತು ಡಯಾಸ್ಟೊಲಿಕ್ ಇತಿಹಾಸ",
    systolic: "Systolic",
    diastolic: "Diastolic",
    postPrandial: "Post-Prandial",
    unitGlucose: "mg/dL",
    unitBp: "mmHg",
    tooltipReading: "ದಾಖಲೆ",
    tooltipType: "ಸ್ಥಿತಿ",
  },

  // Timeline
  timeline: {
    title: "ಇತ್ತೀಚಿನ ದಾಖಲೆಗಳು ಮತ್ತು ಚಟುವಟಿಕೆ",
    subtitle: "ಹೊಸದಾಗಿ ದಾಖಲಾದ ಮಾಹಿತಿಗಳು ತಕ್ಷಣ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತವೆ",
    empty: "ಇತ್ತೀಚಿನ ಯಾವುದೇ ಚಟುವಟಿಕೆ ಇಲ್ಲ",
    newBadge: "ಹೊಸ ದಾಖಲೆ",
  },

  // Chat panel
  chat: {
    title: "ಸಂಭಾಷಣೆಯ ದಾಖಲೆ",
    subtitle: "ವಾಯ್ಸ್ ಸಂವಾದದ ಲಿಖಿತ ಪ್ರತಿ",
    greeting: "ನಮಸ್ಕಾರ! ಇಂದು ನಿಮ್ಮ ಆರೋಗ್ಯದ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.",
    placeholder: "ವಾಯ್ಸ್ ಸಂವಾದ ಪ್ರಾರಂಭಿಸಲು ಮೇಲಿನ ಮೈಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ...",
  },

  // Secondary modules
  modules: {
    medications: {
      title: "ಔಷಧಿಗಳು (Medications)",
      morning: "ಬೆಳಗ್ಗೆ",
      afternoon: "ಮಧ್ಯಾಹ್ನ",
      evening: "ಸಂಜೆ",
      taken: "ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ",
      pending: "ಬಾಕಿ ಇದೆ",
      med1: "ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg",
      med2: "ಟೆಲ್ಮಿಸಾರ್ಟನ್ 40mg",
      med3: "ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 10mg",
      adherenceAlertTitle: "ಔಷಧೋಪಚಾರ ಎಚ್ಚರಿಕೆ (Medication Due)",
      adherenceAlertDesc: "ಊಟದ ನಂತರದ ಸಕ್ಕರೆ ದಾಖಲಾಗಿದೆ, ಆದರೆ ಸಂಜೆಯ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 10mg ಬಾಕಿ ಇದೆ.",
      markTakenBtn: "ಮಾತ್ರೆ ತೆಗೆದುಕೊಂಡಿದ್ದೇನೆ",
      allTaken: "ಇಂದಿನ ಎಲ್ಲಾ ಔಷಧಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ (3/3)",
    },
    followUp: {
      title: "ಮುಂದಿನ ಭೇಟಿ (Next Follow-up)",
      doctor: "ಡಾ. ಡೆಮೊ ವೈದ್ಯರು (Dr. Demo Doctor)",
      specialty: "ಜನರಲ್ ಮೆಡಿಸಿನ್",
      time: "ನಾಳೆ ಬೆಳಗ್ಗೆ 10:30",
      location: "ಕ್ಲಿನಿಕ್ ಕೊಠಡಿ 4B",
    },
    sideEffects: {
      title: "ಅಡ್ಡಪರಿಣಾಮ ತಿಳಿಸಿ (Report Side Effect)",
      inputPlaceholder: "ಏನಾದರೂ ತೊಂದರೆ ಅನ್ನಿಸುತ್ತಿದೆಯೇ? ವಿವರ ಬರೆಯಿರಿ...",
      chips: ["ವಾಕರಿಕೆ (Nausea)", "ತಲೆತಿರುಗುವಿಕೆ (Dizziness)", "ತಲೆನೋವು (Headache)", "ದಣಿವು (Fatigue)", "ಇತರೆ (Other)"],
      submitBtn: "ದಾಖಲಿಸಿ",
      toastSuccess: "ಅಡ್ಡಪರಿಣಾಮದ ಮಾಹಿತಿ ದಾಖಲಾಗಿದೆ.",
    },
    lifestyle: {
      title: "ದೈನಂದಿನ ಚಟುವಟಿಕೆ (Lifestyle)",
      steps: "ಹೆಜ್ಜೆಗಳು",
      stepsVal: "6,240",
      exercise: "ವ್ಯಾಯಾಮ",
      exerciseVal: "32 ನಿಮಿಷ",
      water: "ನೀರು",
      waterVal: "1.8 ಲೀಟರ್",
    },
    summary: {
      title: "ಆರೋಗ್ಯ ಸಾರಾಂಶ (Health Summary)",
      btnLabel: "ಸಾರಾಂಶ ರಚಿಸಿ (Generate summary)",
      generating: "ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
      staticText: "ರೋಗಿಯ ಇತ್ತೀಚಿನ ರಕ್ತದ ಸಕ್ಕರೆ ಹಾಗೂ ರಕ್ತದೊತ್ತಡದ ದಾಖಲಾತಿಗಳನ್ನು ಸಿಸ್ಟಮ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ. ದಿನದ ನಿಗದಿತ ಔಷಧೋಪಚಾರಗಳಲ್ಲಿ ಬೆಳಗ್ಗೆ ಹಾಗೂ ಮಧ್ಯಾಹ್ನದ ಡೋಸ್‌ಗಳನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದ್ದು, ಸಂಜೆಯ ಡೋಸ್ ಬಾಕಿ ಇರುತ್ತದೆ. ದಿನನಿತ್ಯದ ಚಟುವಟಿಕೆಗಳಾದ ನಡಿಗೆ ಮತ್ತು ನೀರಿನ ಸೇವನೆ ಸಾಮಾನ್ಯ ಮಿತಿಯಲ್ಲಿವೆ.",
    },
    devices: {
      title: "ಸಂಪರ್ಕಿತ ಸಾಧನಗಳು (Connected Devices)",
      cgm: "ನಿರಂತರ ಸಕ್ಕರೆ ಮಾನಿಟರ್ (CGM)",
      watch: "ಸ್ಮಾರ್ಟ್ ವಾಚ್ (Smart Watch)",
      bpMonitor: "ಬಿಪಿ ಮಾನಿಟರ್ (BP Monitor)",
      connected: "ಸಂಪರ್ಕಗೊಂಡಿದೆ",
      streaming: "ಲೈವ್ ಸ್ಟ್ರೀಮ್",
      syncing: "ಸಿಂಕ್ ಆಗುತ್ತಿದೆ",
      standby: "ಸ್ಟ್ಯಾಂಡ್‌ಬೈ",
      notConnected: "ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲ",
      note: "ಎಲ್ಲಾ ವೈದ್ಯಕೀಯ ಸಾಧನಗಳು ಸಕ್ರಿಯವಾಗಿ ಸಂಪರ್ಕಗೊಂಡಿವೆ (All devices live & streaming)",
    }
  },

  // Live Monitoring
  liveMonitoring: {
    title: "ಲೈವ್ ಮಾನಿಟರಿಂಗ್ ಕನ್ಸೋಲ್ (Live Monitoring)",
    subtitle: "ನೈಜ ಸಮಯದಲ್ಲಿ ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ಸೆನ್ಸರ್ ಡೇಟಾ ಸ್ಟ್ರೀಮ್",
    liveBadge: "LIVE STREAM",
    cgmTitle: "CGM Live Glucose",
    cgmSensor: "FreeStyle Libre 3 Sensor",
    heartRateTitle: "Live Heart Rate",
    heartRateSensor: "Optical PPG Sensor",
    spo2Title: "Blood Oxygen (SpO2)",
    spo2Sensor: "Pulse Oximetry",
    stableTrend: "→ ಸ್ಥಿರ (Steady)",
    normalSinus: "ಸಾಮಾನ್ಯ ಹೃದಯ ಬಡಿತ (Normal Sinus)",
    ambientPerfusion: "ಉತ್ತಮ ರಕ್ತ ಪರಿಚಲನೆ (Optimal Perfusion)",
    waveformTitle: "ನೈಜ ಸಮಯದ ಪಲ್ಸ್ ವೇವ್‌ಫಾರ್ಮ್ (Real-time PPG Rhythm)",
    signalLabel: "ಸಿಗ್ನಲ್ ಬಲ: 98% (BLE 5.3)",
    sensorLife: "ಸೆನ್ಸರ್ ಅವಧಿ: 9 ದಿನಗಳು ಬಾಕಿ",
    battery: "ಬ್ಯಾಟರಿ",
    pauseStream: "ಸ್ಟ್ರೀಮ್ ನಿಲ್ಲಿಸಿ",
    resumeStream: "ಸ್ಟ್ರೀಮ್ ಮುಂದುವರಿಸಿ",
    viewAllLogs: "ಸಂಪೂರ್ಣ ವಾರದ ಲಾಗ್ ವೀಕ್ಷಿಸಿ",
  },

  // Weekly Health Logs
  weekLogs: {
    title: "ವಾರದ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು (Weekly Health Log)",
    subtitle: "ಕಳೆದ 7 ದಿನಗಳಲ್ಲಿ ದಾಖಲಾದ ಎಲ್ಲಾ ಮಾಪನಗಳು ಮತ್ತು ಲೈವ್ ಡೇಟಾ",
    totalEntries: "ಒಟ್ಟು ದಾಖಲೆಗಳು",
    avgGlucose: "ಸರಾಸರಿ ಸಕ್ಕರೆ ಮಟ್ಟ",
    meanBp: "ಸರಾಸರಿ ರಕ್ತದೊತ್ತಡ",
    restingHr: "ವಿಶ್ರಾಂತಿ ಹೃದಯ ಬಡಿತ",
    filterAll: "ಎಲ್ಲಾ ದಾಖಲೆಗಳು",
    filterGlucose: "Blood Glucose",
    filterBp: "Blood Pressure",
    filterVitals: "ಹೃದಯ & SpO2",
    searchPlaceholder: "ದಿನಾಂಕ, ಸಂದರ್ಭ ಅಥವಾ ಮೂಲ ಹುಡುಕಿ...",
    colDate: "ದಿನಾಂಕ & ಸಮಯ",
    colMetric: "ಪರೀಕ್ಷೆ",
    colValue: "ಮೌಲ್ಯ",
    colContext: "ಸಂದರ್ಭ",
    colSource: "ಮೂಲ / ವಿಧಾನ",
    colStatus: "ಸ್ಥಿತಿ",
    verified: "ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    streamingTag: "ಲೈವ್ ಸ್ಟ್ರೀಮ್",
  },

  // Greetings
  greetings: {
    morning: "ಶುಭೋದಯ",
    afternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    evening: "ಶುಭ ಸಂಜೆ",
  },

  // Placeholder page
  placeholder: {
    title: "ಪ್ರಸ್ತುತ ಡೆಮೊದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ",
    desc: "ಕೇರ್‌ಲೂಪ್ ಡೆಮೊದಲ್ಲಿ ವಾಯ್ಸ್-ಆಧಾರಿತ ಲಾಗಿಂಗ್ ಮತ್ತು ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಗೆ ಮಾತ್ರ ಆದ್ಯತೆ ನೀಡಲಾಗಿದೆ.",
    backToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
  }
};
