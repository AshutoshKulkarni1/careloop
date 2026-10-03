import type { HealthReading, SupportedLanguage } from '../services/healthService';

// Format helper for display time
export function formatCurrentTime(): { displayTime: string; displayDate: string; iso: string } {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
  
  return {
    displayTime: `${displayHours}:${minutes} ${ampm}`,
    displayDate: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    iso: now.toISOString(),
  };
}

export function getTimeGreetingKey(): 'morning' | 'afternoon' | 'evening' {
  const hours = new Date().getHours();
  if (hours < 12) return 'morning';
  if (hours < 17) return 'afternoon';
  return 'evening';
}

// 7 seeded past points over ~7 days (realistic variation, e.g. 112 to 146)
export const initialGlucoseReadings: HealthReading[] = [
  {
    id: 'gluc-1',
    type: 'glucose',
    timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
    displayDate: '6 days ago',
    displayTime: '08:30 AM',
    value: 114,
    unit: 'mg/dL',
    context: 'Fasting',
    mealConsumed: false,
    language: 'kn-IN',
    originalText: 'ಬೆಳಗ್ಗೆ ಉಪವಾಸದ ಸಕ್ಕರೆ 114',
  },
  {
    id: 'gluc-2',
    type: 'glucose',
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    displayDate: '5 days ago',
    displayTime: '01:45 PM',
    value: 136,
    unit: 'mg/dL',
    context: 'Post-Prandial',
    mealConsumed: true,
    language: 'kn-IN',
    originalText: 'ಮಧ್ಯಾಹ್ನದ ಊಟದ ನಂತರ 136',
  },
  {
    id: 'gluc-3',
    type: 'glucose',
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
    displayDate: '4 days ago',
    displayTime: '08:15 AM',
    value: 122,
    unit: 'mg/dL',
    context: 'Fasting',
    mealConsumed: false,
    language: 'kn-IN',
    originalText: 'ಬೆಳಗ್ಗೆ 122 ಇತ್ತು',
  },
  {
    id: 'gluc-4',
    type: 'glucose',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    displayDate: '3 days ago',
    displayTime: '02:10 PM',
    value: 144,
    unit: 'mg/dL',
    context: 'Post-Prandial',
    mealConsumed: true,
    language: 'kn-IN',
    originalText: 'ಊಟದ ನಂತರ ಸಕ್ಕರೆ 144',
  },
  {
    id: 'gluc-5',
    type: 'glucose',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    displayDate: '2 days ago',
    displayTime: '08:40 AM',
    value: 118,
    unit: 'mg/dL',
    context: 'Fasting',
    mealConsumed: false,
    language: 'kn-IN',
    originalText: 'ಖಾಲಿ ಹೊಟ್ಟೆಯಲ್ಲಿ 118',
  },
  {
    id: 'gluc-6',
    type: 'glucose',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    displayDate: 'Yesterday',
    displayTime: '02:00 PM',
    value: 142,
    unit: 'mg/dL',
    context: 'Post-Prandial',
    mealConsumed: true,
    language: 'kn-IN',
    originalText: 'ನಿನ್ನೆ ಮಧ್ಯಾಹ್ನ 142 ಇತ್ತು',
  },
  {
    id: 'gluc-7',
    type: 'glucose',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
    displayDate: 'Yesterday evening',
    displayTime: '08:30 PM',
    value: 130,
    unit: 'mg/dL',
    context: 'Post-Prandial',
    mealConsumed: true,
    language: 'kn-IN',
    originalText: 'ರಾತ್ರಿ ಊಟದ ನಂತರ 130',
  }
];

// 7 seeded past points for Blood Pressure
export const initialBpReadings: HealthReading[] = [
  {
    id: 'bp-1',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 6 * 86400000).toISOString(),
    displayDate: '6 days ago',
    displayTime: '09:00 AM',
    systolic: 122,
    diastolic: 78,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಬಿಪಿ 122 ಮೇಲೆ 78 ಇತ್ತು',
  },
  {
    id: 'bp-2',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    displayDate: '5 days ago',
    displayTime: '09:15 AM',
    systolic: 126,
    diastolic: 80,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಬಿಪಿ 126 ಮತ್ತು 80',
  },
  {
    id: 'bp-3',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
    displayDate: '4 days ago',
    displayTime: '09:10 AM',
    systolic: 120,
    diastolic: 82,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಬೆಳಗ್ಗೆ 120 ಮೇಲೆ 82',
  },
  {
    id: 'bp-4',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    displayDate: '3 days ago',
    displayTime: '09:30 AM',
    systolic: 130,
    diastolic: 84,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಬಿಪಿ 130 ಮೇಲೆ 84',
  },
  {
    id: 'bp-5',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    displayDate: '2 days ago',
    displayTime: '09:00 AM',
    systolic: 124,
    diastolic: 79,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಬಿಪಿ 124 ಮೇಲೆ 79',
  },
  {
    id: 'bp-6',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    displayDate: 'Yesterday',
    displayTime: '09:20 AM',
    systolic: 128,
    diastolic: 82,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ನಿನ್ನೆ ಬಿಪಿ 128 ಮೇಲೆ 82',
  },
  {
    id: 'bp-7',
    type: 'blood_pressure',
    timestamp: new Date(Date.now() - 14 * 3600000).toISOString(),
    displayDate: 'Yesterday evening',
    displayTime: '07:30 PM',
    systolic: 125,
    diastolic: 81,
    unit: 'mmHg',
    language: 'kn-IN',
    originalText: 'ಸಂಜೆ ಬಿಪಿ 125 ಮೇಲೆ 81',
  }
];

// Utterance mapping per language and scenario
export const scenarioUtterances: Record<
  SupportedLanguage,
  {
    glucose: { originalText: string; languageName: string; locale: string };
    blood_pressure: { originalText: string; languageName: string; locale: string };
  }
> = {
  kn: {
    glucose: {
      originalText: 'ಇವತ್ತು ನನ್ನ ಶುಗರ್ 158 ಇತ್ತು',
      languageName: 'ಕನ್ನಡ',
      locale: 'kn-IN',
    },
    blood_pressure: {
      originalText: 'ಇವತ್ತು ನನ್ನ ಬಿಪಿ 154 ಮೇಲೆ 90 ಇತ್ತು',
      languageName: 'ಕನ್ನಡ',
      locale: 'kn-IN',
    },
  },
  en: {
    glucose: {
      originalText: 'My sugar was 158 today',
      languageName: 'English',
      locale: 'en-US',
    },
    blood_pressure: {
      originalText: 'My BP was 154 over 90 today',
      languageName: 'English',
      locale: 'en-US',
    },
  },
  hi: {
    glucose: {
      originalText: 'आज मेरी शुगर 158 थी',
      languageName: 'हिन्दी',
      locale: 'hi-IN',
    },
    blood_pressure: {
      originalText: 'आज मेरा बीपी 154 बटा 90 था',
      languageName: 'हिन्दी',
      locale: 'hi-IN',
    },
  },
  mr: {
    glucose: {
      originalText: 'आज माझी शुगर 158 होती',
      languageName: 'मराठी',
      locale: 'mr-IN',
    },
    blood_pressure: {
      originalText: 'आज माझा बीपी 154 वर 90 होता',
      languageName: 'मराठी',
      locale: 'mr-IN',
    },
  },
};
