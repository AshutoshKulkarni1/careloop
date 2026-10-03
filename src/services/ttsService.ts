import type { SupportedLanguage, HealthReading } from './healthService';

export interface TTSState {
  isSpeaking: boolean;
  activeText: string;
  isMuted: boolean;
  activeLanguage: SupportedLanguage;
}

type TTSListener = (state: TTSState) => void;

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private audioCtx: AudioContext | null = null;
  private listeners: Set<TTSListener> = new Set();
  private currentState: TTSState = {
    isSpeaking: false,
    activeText: '',
    isMuted: false,
    activeLanguage: 'kn',
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public subscribe(listener: TTSListener): () => void {
    this.listeners.add(listener);
    listener(this.currentState);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentState));
  }

  public toggleMute(): boolean {
    this.currentState.isMuted = !this.currentState.isMuted;
    if (this.currentState.isMuted) {
      this.stop();
    }
    this.notify();
    return this.currentState.isMuted;
  }

  public get isMuted(): boolean {
    return this.currentState.isMuted;
  }

  private getAudioContext(): AudioContext | null {
    try {
      if (!this.audioCtx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }

  public playChime(
    type: 'listen-start' | 'listen-end' | 'question' | 'confirm' | 'saved'
  ) {
    if (this.currentState.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'listen-start') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'listen-end') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'question') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'confirm') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(493.88, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'saved') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch {
      // Audio fallback
    }
  }

  public stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.currentState = {
      ...this.currentState,
      isSpeaking: false,
      activeText: '',
    };
    this.notify();
  }

  // Voice selector strictly adhering to chosen language
  private pickVoice(lang: SupportedLanguage): {
    voice: SpeechSynthesisVoice | null;
    targetLocale: string;
  } {
    if (!this.voices.length && this.synth) {
      this.voices = this.synth.getVoices();
    }

    if (lang === 'kn') {
      // Look for Kannada voice first
      const knVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('kn') ||
          v.name.toLowerCase().includes('kannada')
      );
      if (knVoice) return { voice: knVoice, targetLocale: 'kn-IN' };

      // Look for any Indian locale voice (hi-IN, en-IN, etc.) which handles Indic phonetics
      const inVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().includes('-in') ||
          v.name.toLowerCase().includes('india')
      );
      return { voice: inVoice || null, targetLocale: 'kn-IN' };
    }

    if (lang === 'hi') {
      // Look for Hindi voice
      const hiVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi')
      );
      if (hiVoice) return { voice: hiVoice, targetLocale: 'hi-IN' };

      // Fallback to Indian voice
      const inVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().includes('-in') ||
          v.name.toLowerCase().includes('india')
      );
      return { voice: inVoice || null, targetLocale: 'hi-IN' };
    }

    if (lang === 'mr') {
      // Look for Marathi voice
      const mrVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('mr') ||
          v.name.toLowerCase().includes('marathi')
      );
      if (mrVoice) return { voice: mrVoice, targetLocale: 'mr-IN' };

      // Fallback to Indian voice
      const inVoice = this.voices.find(
        (v) =>
          v.lang.toLowerCase().includes('-in') ||
          v.name.toLowerCase().includes('india')
      );
      return { voice: inVoice || null, targetLocale: 'mr-IN' };
    }

    // English: prefer Indian English or US English
    const enInVoice = this.voices.find(
      (v) =>
        v.lang.toLowerCase() === 'en-in' ||
        v.name.toLowerCase().includes('india')
    );
    if (enInVoice) return { voice: enInVoice, targetLocale: 'en-IN' };

    const enVoice = this.voices.find((v) =>
      v.lang.toLowerCase().startsWith('en')
    );
    return {
      voice: enVoice || this.voices[0] || null,
      targetLocale: 'en-US',
    };
  }

  public async speak(
    text: string,
    lang: SupportedLanguage
  ): Promise<void> {
    if (this.currentState.isMuted || !this.synth) return;

    this.stop();

    const { voice, targetLocale } = this.pickVoice(lang);

    return new Promise((resolve) => {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLocale;

        if (voice) {
          utterance.voice = voice;
        }

        // Pacing for clinical clarity
        utterance.rate = lang === 'kn' ? 0.88 : lang === 'mr' ? 0.90 : lang === 'hi' ? 0.92 : 0.95;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          this.currentState = {
            ...this.currentState,
            isSpeaking: true,
            activeText: text,
            activeLanguage: lang,
          };
          this.notify();
        };

        const cleanup = () => {
          this.currentState = {
            ...this.currentState,
            isSpeaking: false,
            activeText: '',
          };
          this.notify();
          resolve();
        };

        utterance.onend = cleanup;
        utterance.onerror = cleanup;

        this.synth?.speak(utterance);
      } catch {
        resolve();
      }
    });
  }

  // 1. Spoken Follow-up: Asking about meal in the chosen language
  public async speakMealQuestion(lang: SupportedLanguage): Promise<void> {
    this.playChime('question');
    await new Promise((r) => setTimeout(r, 220));

    if (lang === 'kn') {
      await this.speak('ಈ ಶುಗರ್ ಅನ್ನು ನೀವು ಊಟದ ನಂತರ ಅಳೆದಿದ್ದೀರಾ?', 'kn');
    } else if (lang === 'mr') {
      await this.speak('तुम्ही ही शुगर जेवणानंतर तपासली आहे का?', 'mr');
    } else if (lang === 'hi') {
      await this.speak('क्या आपने यह शुगर खाने के बाद नापी थी?', 'hi');
    } else {
      await this.speak('Did you measure this blood sugar after a meal?', 'en');
    }
  }

  // 2. Spoken Confirmation: Understood reading confirmation in the chosen language
  public async speakConfirmation(
    reading: HealthReading,
    lang: SupportedLanguage
  ): Promise<void> {
    this.playChime('confirm');
    await new Promise((r) => setTimeout(r, 220));

    if (reading.type === 'glucose') {
      const val = reading.value || 158;
      if (lang === 'kn') {
        await this.speak(
          `ನೀವು ಊಟದ ನಂತರ ${val} ಮಿಲಿಗ್ರಾಂ ರಕ್ತದ ಸಕ್ಕರೆ ಅಳೆದಿದ್ದೀರಿ. ಈ ಮಾಹಿತಿಯನ್ನು ಉಳಿಸಬೇಕೇ?`,
          'kn'
        );
      } else if (lang === 'mr') {
        await this.speak(
          `तुम्ही जेवणानंतर ${val} मिलीग्राम रक्तातील साखर मोजली आहे. ही माहिती जतन करायची का?`,
          'mr'
        );
      } else if (lang === 'hi') {
        await this.speak(
          `आपने खाने के बाद ${val} मिलीग्राम प्रति डेसीलीटर रक्त शर्करा मापी है। क्या यह जानकारी सहेजना चाहते हैं?`,
          'hi'
        );
      } else {
        await this.speak(
          `You measured ${val} milligrams per deciliter blood sugar after your meal. Would you like to save this record?`,
          'en'
        );
      }
    } else {
      const sys = reading.systolic || 154;
      const dia = reading.diastolic || 90;
      if (lang === 'kn') {
        await this.speak(
          `ನಿಮ್ಮ ರಕ್ತದೊತ್ತಡ ${sys} ಮೇಲೆ ${dia} ಮಿಲಿಮೀಟರ್. ಈ ಮಾಹಿತಿಯನ್ನು ದಾಖಲಿಸಬೇಕೇ?`,
          'kn'
        );
      } else if (lang === 'mr') {
        await this.speak(
          `तुमचा रक्तदाब ${sys} वर ${dia} मिलीमीटर नोंदवायचा का?`,
          'mr'
        );
      } else if (lang === 'hi') {
        await this.speak(
          `आपका रक्तचाप ${sys} बटा ${dia} है। क्या आप इसे दर्ज करना चाहते हैं?`,
          'hi'
        );
      } else {
        await this.speak(
          `Would you like to record your blood pressure as ${sys} over ${dia} millimeters of mercury?`,
          'en'
        );
      }
    }
  }

  // 3. Spoken Save Complete in the chosen language
  public async speakSaveComplete(
    reading: HealthReading,
    lang: SupportedLanguage
  ): Promise<void> {
    this.playChime('saved');
    await new Promise((r) => setTimeout(r, 250));

    const isGlucose = reading.type === 'glucose';

    if (lang === 'kn') {
      const text = isGlucose
        ? 'ಸರಿ. ನಿಮ್ಮ ಊಟದ ನಂತರದ ಸಕ್ಕರೆ ಮಟ್ಟ 158 ಮಿಲಿಗ್ರಾಂ ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.'
        : 'ಸರಿ. ನಿಮ್ಮ ರಕ್ತದೊತ್ತಡ 154 ಮೇಲೆ 90 ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.';
      await this.speak(text, 'kn');
    } else if (lang === 'mr') {
      const text = isGlucose
        ? 'ठीक आहे. तुमची जेवणानंतरची साखर 158 मिलीग्राम नोंदवली गेली आहे.'
        : 'ठीक आहे. तुमचा रक्तदाब 154 वर 90 नोंदवला गेला आहे.';
      await this.speak(text, 'mr');
    } else if (lang === 'hi') {
      const text = isGlucose
        ? 'ठीक है। आपका भोजन के बाद का शुगर स्तर 158 मिलीग्राम दर्ज कर लिया गया है।'
        : 'ठीक है। आपका रक्तचाप 154 बटा 90 दर्ज कर लिया गया है।';
      await this.speak(text, 'hi');
    } else {
      const text = isGlucose
        ? 'Done. Your post-prandial glucose reading of 158 milligrams per deciliter has been recorded.'
        : 'Done. Your blood pressure of 154 over 90 has been recorded.';
      await this.speak(text, 'en');
    }
  }

  // 4. Spoken Patient Speech during transcription
  public async speakPatientUtterance(
    scenario: 'glucose' | 'blood_pressure',
    lang: SupportedLanguage
  ): Promise<void> {
    if (scenario === 'glucose') {
      if (lang === 'kn') {
        await this.speak('ಇವತ್ತು ನನ್ನ ಶುಗರ್ 158 ಇತ್ತು', 'kn');
      } else if (lang === 'mr') {
        await this.speak('आज माझी शुगर 158 होती', 'mr');
      } else if (lang === 'hi') {
        await this.speak('आज मेरी शुगर 158 थी', 'hi');
      } else {
        await this.speak('My sugar was 158 today', 'en');
      }
    } else {
      if (lang === 'kn') {
        await this.speak('ಇವತ್ತು ನನ್ನ ಬಿಪಿ 154 ಮೇಲೆ 90 ಇತ್ತು', 'kn');
      } else if (lang === 'mr') {
        await this.speak('आज माझा बीपी 154 वर 90 होता', 'mr');
      } else if (lang === 'hi') {
        await this.speak('आज मेरा बीपी 154 बटा 90 था', 'hi');
      } else {
        await this.speak('My BP was 154 over 90 today', 'en');
      }
    }
  }

  // 5. Language Switch announcement
  public async announceLanguageSwitch(lang: SupportedLanguage): Promise<void> {
    if (this.currentState.isMuted) return;
    this.playChime('listen-start');
    await new Promise((r) => setTimeout(r, 150));

    if (lang === 'kn') {
      await this.speak('ಕನ್ನಡ ಧ್ವನಿ ಸಕ್ರಿಯವಾಗಿದೆ', 'kn');
    } else if (lang === 'mr') {
      await this.speak('मराठी आवाज सक्रिय झाला आहे', 'mr');
    } else if (lang === 'hi') {
      await this.speak('हिन्दी आवाज सक्रिय है', 'hi');
    } else {
      await this.speak('English voice activated', 'en');
    }
  }

  // 6. Spoken Medication Reminder based on readings
  public async speakMedicationReminder(lang: SupportedLanguage): Promise<void> {
    if (this.currentState.isMuted) return;
    this.playChime('question');
    await new Promise((r) => setTimeout(r, 220));

    if (lang === 'kn') {
      await this.speak(
        'ಗಮನಿಸಿ: ನಿಮ್ಮ ಸಂಜೆಯ ಅಟೋರ್ವಾಸ್ಟಾಟಿನ್ 10mg ಮಾತ್ರೆ ಬಾಕಿ ಇದೆ. ದಯವಿಟ್ಟು ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.',
        'kn'
      );
    } else if (lang === 'mr') {
      await this.speak(
        'लक्ष द्या: तुमची संध्याकाळची Atorvastatin 10mg गोळी अजून बाकी आहे. कृपया जेवणानंतर वेळेवर औषध घ्या.',
        'mr'
      );
    } else if (lang === 'hi') {
      await this.speak(
        'कृपया ध्यान दें: आपकी शाम की Atorvastatin 10mg दवा अभी बाकी है। कृपया भोजन के बाद समय पर लें।',
        'hi'
      );
    } else {
      await this.speak(
        'Reminder: Your evening Atorvastatin 10mg tablet is pending. Please remember to take it after your meal.',
        'en'
      );
    }
  }
}

export const ttsService = new TTSService();