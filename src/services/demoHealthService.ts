import type {
  HealthReading,
  HealthService,
  ScenarioType,
  SupportedLanguage,
  FollowUpConfig,
} from './healthService';
import {
  initialGlucoseReadings,
  initialBpReadings,
  scenarioUtterances,
  formatCurrentTime,
} from '../data/demoData';
import { getTranslation } from '../i18n';

class DemoHealthService implements HealthService {
  private glucoseReadings: HealthReading[] = [...initialGlucoseReadings];
  private bpReadings: HealthReading[] = [...initialBpReadings];

  async getInitialReadings(): Promise<{
    glucose: HealthReading[];
    bloodPressure: HealthReading[];
  }> {
    return {
      glucose: [...this.glucoseReadings],
      bloodPressure: [...this.bpReadings],
    };
  }

  async getReadings(): Promise<{
    glucose: HealthReading[];
    bloodPressure: HealthReading[];
  }> {
    return {
      glucose: [...this.glucoseReadings],
      bloodPressure: [...this.bpReadings],
    };
  }

  async startListening(
    _scenario: ScenarioType,
    _lang: SupportedLanguage,
    signal?: AbortSignal
  ): Promise<void> {
    // 15 seconds listening duration before processing values
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, 15000);
      if (signal) {
        if (signal.aborted) {
          clearTimeout(timer);
          resolve();
          return;
        }
        signal.addEventListener(
          'abort',
          () => {
            clearTimeout(timer);
            resolve();
          },
          { once: true }
        );
      }
    });
  }

  async transcribe(
    scenario: ScenarioType,
    lang: SupportedLanguage
  ): Promise<{ text: string; detectedLanguage: string; languageCode: string }> {
    // Simulated ASR / Speech-to-text processing (~1.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const config = scenarioUtterances[lang][scenario];
    return {
      text: config.originalText,
      detectedLanguage: config.languageName,
      languageCode: config.locale,
    };
  }

  async getFollowUp(
    scenario: ScenarioType,
    lang: SupportedLanguage
  ): Promise<FollowUpConfig | null> {
    if (scenario === 'blood_pressure') {
      // Blood pressure has NO follow-up question per specification
      return null;
    }

    const t = getTranslation(lang);
    return {
      question: t.voice.glucoseFollowUp,
      options: [
        { label: t.voice.yes, value: 'yes' },
        { label: t.voice.no, value: 'no' },
      ],
      autoSelectValue: 'yes',
      autoTimeoutMs: 10000, // 10s gives user plenty of time to hear voice asking about meal
    };
  }

  async structure(
    scenario: ScenarioType,
    lang: SupportedLanguage,
    _followUpAnswer?: string
  ): Promise<HealthReading> {
    // Short structuring animation (~1.2s)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const { displayTime, iso } = formatCurrentTime();
    const config = scenarioUtterances[lang][scenario];

    if (scenario === 'glucose') {
      return {
        id: `gluc-demo-${Date.now()}`,
        type: 'glucose',
        timestamp: iso,
        displayDate: 'Today',
        displayTime: displayTime,
        value: 158,
        unit: 'mg/dL',
        mealConsumed: true,
        context: 'Post-Prandial',
        language: config.locale,
        originalText: config.originalText,
        isNewEntry: true,
      };
    } else {
      return {
        id: `bp-demo-${Date.now()}`,
        type: 'blood_pressure',
        timestamp: iso,
        displayDate: 'Today',
        displayTime: displayTime,
        systolic: 154,
        diastolic: 90,
        unit: 'mmHg',
        language: config.locale,
        originalText: config.originalText,
        isNewEntry: true,
      };
    }
  }

  async save(reading: HealthReading): Promise<HealthReading> {
    // Brief save animation (~800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (reading.type === 'glucose') {
      this.glucoseReadings = [
        ...this.glucoseReadings.filter((r) => !r.isNewEntry),
        reading,
      ];
    } else {
      this.bpReadings = [
        ...this.bpReadings.filter((r) => !r.isNewEntry),
        reading,
      ];
    }

    return reading;
  }

  reset(): void {
    this.glucoseReadings = [...initialGlucoseReadings];
    this.bpReadings = [...initialBpReadings];
  }
}

export const demoHealthService = new DemoHealthService();