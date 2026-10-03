# CareLoop — Healthcare That Understands How You Speak

> A multilingual, voice-first health logging and monitoring platform for chronic care management.

CareLoop bridges the gap between natural speech in regional languages and clinical-grade structured health records. Patients speak naturally in **Kannada**, **Marathi**, **Hindi**, or **English**, and CareLoop transcribes, clarifies context, structures data into medical parameters, prompts for medication adherence, and streams live telemetry into continuous trend charts.

---

## Key Features

### 1. Multilingual Voice-First Logging
- **Languages Supported**:
  - **ಕನ್ನಡ (Kannada)** (`kn-IN`)
  - **मराठी (Marathi)** (`mr-IN`)
  - **हिन्दी (Hindi)** (`hi-IN`)
  - **English** (`en-US` / `en-IN`)
- **Speech Pipeline**:
  1. **Listen**: High-fidelity 15-second recording window with real-time waveform and early completion option.
  2. **Understand**: Automatic speech transcription and regional dialect detection.
  3. **Clarify**: Contextual follow-up question spoken aloud by the voice engine (e.g., verifying if glucose was measured after a meal).
  4. **Confirm**: Spoken voice summary with an interactive Understood Card.
  5. **Save**: Automatic chart plotting, timeline sync, and animated highlight.
- **Audio Engine**: Full Web Speech API synthesis with regional Indian locale voices and clinical-grade audio pacing.

### 2. Medication Adherence Check
- When readings (such as post-prandial glucose or blood pressure) are logged, CareLoop inspects the patient's daily medication schedule.
- If pending doses (e.g. evening *Atorvastatin 10mg*) are detected:
  - An **amber adherence alert** is presented during confirmation and in the dashboard medications module.
  - The voice assistant reminds the patient aloud to take their medication after their meal.
  - Allows one-click verification (`[Mark as Taken]`), updating the regimen to **3/3 taken**.

### 3. Live Monitoring Console
- Real-time continuous streaming telemetry simulating connected medical sensors:
  - **Continuous Glucose Monitor (CGM)**: FreeStyle Libre 3 BLE stream with live trend arrows and telemetry badges.
  - **Optical PPG Heart Rate Sensor**: Real-time pulsing sinusoidal PPG rhythm graph and BPM indicator.
  - **Pulse Oximetry (SpO2)**: Blood oxygen perfusion tracking.
- Interactive controls: Pause / resume data stream.

### 4. 7-Day Weekly Health Log
- Full tabular audit trail of the past 7 days across Glucose, Blood Pressure, and Vitals.
- Search filter by query and categories (All, Glucose, Blood Pressure, Vitals).
- CSV report export functionality for clinical consultations.

### 5. Clinical Aesthetics & Design
- **Palette**: Calm, warm hospital aesthetic with off-white (`#F7F6F3`), pure white cards, crisp hairline borders (`#E4E2DC`), clinical primary teal (`#0F5C54`), and warm amber (`#8A6F3E`).
- **Typography**: Tabular numerals and typography optimized for Kannada, Devanagari, and Latin scripts.
- **Strict Clinical Tone**: No emojis; 1.5px consistent stroke icons powered by `lucide-react`.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Charts & Telemetry**: Recharts + SVG waveform synthesis
- **Icons**: Lucide React
- **Voice Synthesis**: Web Speech API (`SpeechSynthesisUtterance`) + Web Audio API synthesizer
- **Tooling**: Vite

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/AshutoshKulkarni1/careloop.git

# Navigate to the project directory
cd careloop

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production
```bash
npm run build
npm run preview
```

---

## License
MIT
