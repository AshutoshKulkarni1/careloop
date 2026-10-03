export type ScenarioType = 'glucose' | 'blood_pressure';
export type SupportedLanguage = 'kn' | 'en' | 'hi' | 'mr';

export type VoiceState =
  | 'IDLE'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'FOLLOW_UP'
  | 'PROCESSING'
  | 'CONFIRMATION'
  | 'SAVED'
  | 'GRAPH_UPDATED';

export interface HealthReading {
  id: string;
  type: ScenarioType;
  timestamp: string; // ISO string
  displayDate: string;
  displayTime: string;
  language: string;
  originalText: string;
  
  // Glucose specific
  value?: number;
  unit: string;
  mealConsumed?: boolean;
  context?: string; // e.g. "Post-Prandial" or "Fasting"

  // Blood Pressure specific
  systolic?: number;
  diastolic?: number;

  isNewEntry?: boolean;
}

export interface FollowUpConfig {
  question: string;
  options: { label: string; value: string }[];
  autoSelectValue: string;
  autoTimeoutMs: number;
}

export interface HealthService {
  getInitialReadings(): Promise<{
    glucose: HealthReading[];
    bloodPressure: HealthReading[];
  }>;
  startListening(
    scenario: ScenarioType,
    lang: SupportedLanguage,
    signal?: AbortSignal
  ): Promise<void>;
  transcribe(scenario: ScenarioType, lang: SupportedLanguage): Promise<{
    text: string;
    detectedLanguage: string;
    languageCode: string;
  }>;
  getFollowUp(scenario: ScenarioType, lang: SupportedLanguage): Promise<FollowUpConfig | null>;
  structure(
    scenario: ScenarioType,
    lang: SupportedLanguage,
    followUpAnswer?: string
  ): Promise<HealthReading>;
  save(reading: HealthReading): Promise<HealthReading>;
  getReadings(): Promise<{
    glucose: HealthReading[];
    bloodPressure: HealthReading[];
  }>;
}