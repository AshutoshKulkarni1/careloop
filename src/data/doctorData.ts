export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  phone: string;
  photoInitial: string;
  primaryCondition: string;
  secondaryCondition?: string;
  riskLevel: 'critical' | 'moderate' | 'stable';

  // Live monitoring telemetry
  isMonitoringLive: boolean;
  liveDeviceName: string;
  deviceType: 'CGM' | 'Smart Watch' | 'BP Monitor' | 'Multi-Sensor';
  bleSignal: number;
  batteryPct: number;
  lastSyncTime: string;

  // Real-time telemetry metrics
  currentGlucose?: number; // mg/dL
  glucoseTrend?: 'rising' | 'steady' | 'falling';
  currentSystolic?: number;
  currentDiastolic?: number;
  currentHeartRate: number; // bpm
  currentSpO2: number; // %

  // Medication adherence audit
  medicationsTakenCount: number;
  medicationsTotalCount: number;
  pendingMedicationName?: string;
  allMedications: {
    time: string;
    name: string;
    status: 'taken' | 'pending';
    timeStr: string;
  }[];

  // Daily report details
  hasDailyReportToday: boolean;
  reportSubmissionTime: string;
  isReportSignedByDoctor: boolean;

  // Voice transcript & clinical notes
  patientSpokenTranscript: {
    kn: string;
    mr: string;
    hi: string;
    en: string;
  };
  clinicalSummary: {
    kn: string;
    mr: string;
    hi: string;
    en: string;
  };

  // Structured readings log today
  todayReadings: {
    time: string;
    type: string;
    value: string;
    context: string;
    status: 'normal' | 'elevated' | 'optimal';
  }[];

  doctorNotes?: string[];
}

export const initialPatients: PatientRecord[] = [
  {
    id: 'CL-88204',
    name: 'Ramesh Hegde',
    age: 64,
    gender: 'M',
    phone: '+91 98452 11029',
    photoInitial: 'RH',
    primaryCondition: 'Type 2 Diabetes Mellitus',
    secondaryCondition: 'Essential Hypertension',
    riskLevel: 'moderate',
    isMonitoringLive: true,
    liveDeviceName: 'FreeStyle Libre 3 + Apple Watch',
    deviceType: 'CGM',
    bleSignal: 98,
    batteryPct: 94,
    lastSyncTime: 'Just now (Live stream)',
    currentGlucose: 119,
    glucoseTrend: 'steady',
    currentSystolic: 138,
    currentDiastolic: 86,
    currentHeartRate: 72,
    currentSpO2: 98,
    medicationsTakenCount: 2,
    medicationsTotalCount: 3,
    pendingMedicationName: 'Atorvastatin 10mg (Evening)',
    allMedications: [
      { time: 'Morning', name: 'Metformin 500mg', status: 'taken', timeStr: '08:00 AM' },
      { time: 'Afternoon', name: 'Telmisartan 40mg', status: 'taken', timeStr: '01:30 PM' },
      { time: 'Evening', name: 'Atorvastatin 10mg', status: 'pending', timeStr: '08:00 PM' },
    ],
    hasDailyReportToday: true,
    reportSubmissionTime: 'Today • 08:21 PM',
    isReportSignedByDoctor: false,
    patientSpokenTranscript: {
      kn: 'ಇವತ್ತು ನನ್ನ ಶುಗರ್ 158 ಇತ್ತು, ಊಟದ ನಂತರ ಅಳೆದಿದ್ದೆ.',
      mr: 'आज माझी शुगर 158 होती, जेवणानंतर तपासली.',
      hi: 'आज मेरी शुगर 158 थी, खाने के बाद नापी थी।',
      en: 'My sugar was 158 today, measured after lunch.',
    },
    clinicalSummary: {
      kn: 'ರೋಗಿಯು 158 mg/dL ಊಟದ ನಂತರದ ಸಕ್ಕರೆ ಮಟ್ಟವನ್ನು ದಾಖಲಿಸಿದ್ದಾರೆ. ರಕ್ತದೊತ್ತಡ ನಿಯಂತ್ರಣದಲ್ಲಿದೆ. ಸಂಜೆಯ ಕೊಲೆಸ್ಟ್ರಾಲ್ ಮಾತ್ರೆ ಬಾಕಿ ಇದೆ.',
      mr: 'रुग्णाने जेवणानंतर 158 mg/dL शुगर नोंदवली. रक्तदाब नियंत्रित आहे. संध्याकाळची Atorvastatin गोळी अजून बाकी आहे.',
      hi: 'मरीज ने भोजन के बाद 158 mg/dL शुगर दर्ज की है। रक्तचाप सामान्य सीमा में है। शाम की दवा लंबित है।',
      en: 'Post-prandial glycemic excursion noted at 158 mg/dL. Blood pressure in target range. Evening statin pending.',
    },
    todayReadings: [
      { time: '08:00 AM', type: 'Fasting Glucose', value: '112 mg/dL', context: 'Before breakfast', status: 'optimal' },
      { time: '01:45 PM', type: 'Blood Pressure', value: '138/86 mmHg', context: 'Resting sitting', status: 'normal' },
      { time: '08:21 PM', type: 'Post-Prandial Glucose', value: '158 mg/dL', context: 'Voice logged (After meal)', status: 'elevated' },
    ],
    doctorNotes: ['Patient alerted regarding evening Atorvastatin adherence.', 'Glycemic control stable overall.'],
  },
  {
    id: 'CL-91420',
    name: 'Sunita Deshmukh',
    age: 58,
    gender: 'F',
    phone: '+91 97631 44582',
    photoInitial: 'SD',
    primaryCondition: 'Essential Hypertension',
    secondaryCondition: 'Hyperlipidemia',
    riskLevel: 'stable',
    isMonitoringLive: true,
    liveDeviceName: 'Omron Evolv BLE Cuff + Garmin Venu',
    deviceType: 'BP Monitor',
    bleSignal: 95,
    batteryPct: 88,
    lastSyncTime: '3s ago (Live stream)',
    currentSystolic: 126,
    currentDiastolic: 82,
    currentHeartRate: 68,
    currentSpO2: 99,
    medicationsTakenCount: 3,
    medicationsTotalCount: 3,
    allMedications: [
      { time: 'Morning', name: 'Amlodipine 5mg', status: 'taken', timeStr: '07:30 AM' },
      { time: 'Morning', name: 'Aspirin 75mg', status: 'taken', timeStr: '07:30 AM' },
      { time: 'Evening', name: 'Atorvastatin 20mg', status: 'taken', timeStr: '08:30 PM' },
    ],
    hasDailyReportToday: true,
    reportSubmissionTime: 'Today • 02:15 PM',
    isReportSignedByDoctor: true,
    patientSpokenTranscript: {
      kn: 'ಬೆಳಿಗ್ಗೆ ಬಿಪಿ ಚೆಕ್ ಮಾಡಿದೆ, 126 ಮೇಲೆ 82 ಇತ್ತು. ಯಾವುದೇ ತಲೆತಿರುಗುವಿಕೆ ಇಲ್ಲ.',
      mr: 'सकाळी बीपी तपासला, 126 वर 82 होता. चक्कर किंवा त्रास काही नाही.',
      hi: 'सुबह बीपी नापा, 126 बटा 82 था। कोई चक्कर या समस्या नहीं है।',
      en: 'Checked BP this morning, it was 126/82. No dizziness or headaches.',
    },
    clinicalSummary: {
      kn: 'ರಕ್ತದೊತ್ತಡ ಅತ್ಯುತ್ತಮ ಮಟ್ಟದಲ್ಲಿದೆ (126/82 mmHg). ಔಷಧ ಸೇವನೆ 100% ಪೂರ್ಣವಾಗಿದೆ.',
      mr: 'रक्तदाब आदर्श मर्यादेत आहे (126/82 mmHg). सर्व औषधे वेळेवर घेतली आहेत.',
      hi: 'रक्तचाप पूरी तरह नियंत्रित है (126/82 mmHg)। दवा अनुपालन 100% है।',
      en: 'Blood pressure well-controlled on Amlodipine regimen. Complete medication compliance.',
    },
    todayReadings: [
      { time: '07:45 AM', type: 'Blood Pressure', value: '126/82 mmHg', context: 'Morning sitting', status: 'optimal' },
      { time: '02:00 PM', type: 'Heart Rate', value: '68 bpm', context: 'Resting pulse', status: 'optimal' },
    ],
    doctorNotes: ['Signed off report. Continue existing therapy.'],
  },
  {
    id: 'CL-77312',
    name: 'Basavaraj Patil',
    age: 71,
    gender: 'M',
    phone: '+91 94481 92834',
    photoInitial: 'BP',
    primaryCondition: 'Post-CABG (2023)',
    secondaryCondition: 'Mild Congestive Heart Failure',
    riskLevel: 'critical',
    isMonitoringLive: false,
    liveDeviceName: 'Withings ScanWatch 2',
    deviceType: 'Smart Watch',
    bleSignal: 74,
    batteryPct: 42,
    lastSyncTime: '38 minutes ago (Standby)',
    currentSystolic: 148,
    currentDiastolic: 92,
    currentHeartRate: 84,
    currentSpO2: 95,
    medicationsTakenCount: 1,
    medicationsTotalCount: 3,
    pendingMedicationName: 'Torsemide 10mg (Diuretic)',
    allMedications: [
      { time: 'Morning', name: 'Carvedilol 6.25mg', status: 'taken', timeStr: '08:30 AM' },
      { time: 'Morning', name: 'Torsemide 10mg', status: 'pending', timeStr: '09:00 AM' },
      { time: 'Night', name: 'Rosuvastatin 10mg', status: 'pending', timeStr: '09:00 PM' },
    ],
    hasDailyReportToday: true,
    reportSubmissionTime: 'Today • 11:40 AM',
    isReportSignedByDoctor: false,
    patientSpokenTranscript: {
      kn: 'ಇವತ್ತು ಕಾಲುಗಳಲ್ಲಿ ಸ್ವಲ್ಪ ಊತ ಅನಿಸುತ್ತಿದೆ, ಬೆಳಗ್ಗಿನ ಮೂತ್ರವರ್ಧಕ ಮಾತ್ರೆ ತಡವಾಯಿತು.',
      mr: 'आज पायांवर थोडी सूज वाटतेय, सकाळची लघवीची गोळी घ्यायला उशीर झाला.',
      hi: 'आज पैरों में थोड़ी सूजन लग रही है, सुबह वाली पेशाब की दवा छूट गई थी।',
      en: 'Mild ankle swelling noted today; delayed taking morning diuretic.',
    },
    clinicalSummary: {
      kn: 'ಮೂತ್ರವರ್ಧಕ ಔಷಧ ತಡವಾಗಿದ್ದರಿಂದ ಸೌಮ್ಯ ಕಾಲುಗಳ ಊತ ಕಾಣಿಸಿಕೊಂಡಿದೆ. ಬಿಪಿ 148/92 ಗೆ ಏರಿದೆ. ತಕ್ಷಣದ ಗಮನ ಅಗತ್ಯ.',
      mr: 'लघवीचे औषध उशिरा घेतल्याने पायावर सौम्य सूज. बीपी 148/92 पर्यंत वाढला आहे. वैद्यकीय लक्ष आवश्यक.',
      hi: 'डाययूरेटिक दवा में देरी से पैरों में सूजन। बीपी 148/92 पहुंच गया। तत्काल समीक्षा आवश्यक।',
      en: 'Mild bilateral pedal edema with elevated BP (148/92 mmHg) secondary to missed Torsemide dose. Urgent clinician review.',
    },
    todayReadings: [
      { time: '09:15 AM', type: 'Blood Pressure', value: '148/92 mmHg', context: 'Morning resting', status: 'elevated' },
      { time: '11:30 AM', type: 'SpO2', value: '95%', context: 'Room air', status: 'normal' },
    ],
    doctorNotes: ['Flagged for review. Advised immediate diuretic intake and fluid limit (1.5L/day).'],
  },
  {
    id: 'CL-65489',
    name: 'Kavita Kulkarni',
    age: 49,
    gender: 'F',
    phone: '+91 99014 55320',
    photoInitial: 'KK',
    primaryCondition: 'Type 2 Diabetes (New Onset)',
    secondaryCondition: 'Mild Hypertriglyceridemia',
    riskLevel: 'stable',
    isMonitoringLive: true,
    liveDeviceName: 'FreeStyle Libre 3 Continuous Sensor',
    deviceType: 'CGM',
    bleSignal: 94,
    batteryPct: 82,
    lastSyncTime: 'Live BLE Stream (2s ago)',
    currentGlucose: 104,
    glucoseTrend: 'steady',
    currentSystolic: 122,
    currentDiastolic: 78,
    currentHeartRate: 74,
    currentSpO2: 98,
    medicationsTakenCount: 2,
    medicationsTotalCount: 2,
    allMedications: [
      { time: 'Morning', name: 'Metformin 500mg SR', status: 'taken', timeStr: '08:00 AM' },
      { time: 'Dinner', name: 'Metformin 500mg SR', status: 'taken', timeStr: '08:15 PM' },
    ],
    hasDailyReportToday: true,
    reportSubmissionTime: 'Today • 04:30 PM',
    isReportSignedByDoctor: true,
    patientSpokenTranscript: {
      kn: 'ಇವತ್ತು ಬೆಳಗಿನ ವಾಕಿಂಗ್ 40 ನಿಮಿಷ ಮುಗಿಸಿದೆ, ಶುಗರ್ 104 ಇತ್ತು.',
      mr: 'आज सकाळचे चालणे 40 मिनिटे पूर्ण केले, साखर 104 होती.',
      hi: 'आज सुबह 40 मिनट वॉक किया, शुगर 104 थी।',
      en: 'Completed 40 minutes brisk walk this morning, sensor glucose was 104.',
    },
    clinicalSummary: {
      kn: 'ಉತ್ತಮ ಗ್ಲೈಸೆಮಿಕ್ ನಿಯಂತ್ರಣ (104 mg/dL). ನಿತ್ಯದ ವ್ಯಾಯಾಮ ಮತ್ತು ಔಷಧಿಗಳು ಸರಿಯಾಗಿವೆ.',
      mr: 'उत्कृष्ट ग्लुकोज नियंत्रण (104 mg/dL). दैनंदिन व्यायाम आणि औषधे नियमित.',
      hi: 'उत्कृष्ट शुगर नियंत्रण (104 mg/dL)। व्यायाम और दवाएं समय पर।',
      en: 'Excellent glycemic control. Time in range 94%. Active lifestyle adherence.',
    },
    todayReadings: [
      { time: '07:30 AM', type: 'Fasting CGM', value: '104 mg/dL', context: 'Sensor reading', status: 'optimal' },
      { time: '01:30 PM', type: 'Post-Lunch CGM', value: '128 mg/dL', context: 'Sensor reading', status: 'optimal' },
    ],
    doctorNotes: ['Diet and exercise adherence exemplary. Signed.'],
  },
  {
    id: 'CL-53218',
    name: 'Mohammed Arif',
    age: 62,
    gender: 'M',
    phone: '+91 98860 77123',
    photoInitial: 'MA',
    primaryCondition: 'Diabetic Nephropathy',
    secondaryCondition: 'Chronic Kidney Disease (Stage 2)',
    riskLevel: 'moderate',
    isMonitoringLive: false,
    liveDeviceName: 'Accu-Chek Instant + Omron BLE',
    deviceType: 'Multi-Sensor',
    bleSignal: 0,
    batteryPct: 0,
    lastSyncTime: '5 hours ago (Offline)',
    currentSystolic: 142,
    currentDiastolic: 88,
    currentHeartRate: 70,
    currentSpO2: 97,
    medicationsTakenCount: 3,
    medicationsTotalCount: 4,
    pendingMedicationName: 'Sodium Bicarbonate 500mg',
    allMedications: [
      { time: 'Morning', name: 'Linagliptin 5mg', status: 'taken', timeStr: '08:00 AM' },
      { time: 'Morning', name: 'Telmisartan 40mg', status: 'taken', timeStr: '08:00 AM' },
      { time: 'Afternoon', name: 'Sodium Bicarbonate 500mg', status: 'taken', timeStr: '02:00 PM' },
      { time: 'Night', name: 'Sodium Bicarbonate 500mg', status: 'pending', timeStr: '09:00 PM' },
    ],
    hasDailyReportToday: false,
    reportSubmissionTime: 'Yesterday • 06:15 PM',
    isReportSignedByDoctor: false,
    patientSpokenTranscript: {
      kn: 'ನಿನ್ನೆ ಸಂಜೆ ಬಿಪಿ 142 ಮೇಲೆ 88 ಇತ್ತು, ಇವತ್ತು ಬೆಳಗ್ಗೆ ಇನ್ನೂ ಪರೀಕ್ಷಿಸಿಲ್ಲ.',
      mr: 'काल संध्याकाळी बीपी 142 वर 88 होता, आज सकाळी अजून तपासलेला नाही.',
      hi: 'कल शाम बीपी 142 बटा 88 था, आज सुबह अभी नहीं नापा।',
      en: 'Yesterday evening BP was 142/88, pending morning reading upload.',
    },
    clinicalSummary: {
      kn: 'ಇಂದಿನ ದೈನಂದಿನ ವರದಿ ಇನ್ನೂ ಸಲ್ಲಿಕೆಯಾಗಿಲ್ಲ. ಸಾಧನ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದೆ. ನೆನಪಿಸುವ ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ.',
      mr: 'आजचा दैनिक अहवाल अजून प्राप्त झालेला नाही. उपकरण ऑफलाइन आहे. आठवण मेसेज पाठवला.',
      hi: 'आज का दैनिक विवरण अभी जमा नहीं हुआ। डिवाइस ऑफलाइन है। स्मरण संदेश भेजा गया।',
      en: 'Awaiting today\'s daily voice log. Telemetry device currently offline.',
    },
    todayReadings: [
      { time: 'Yesterday', type: 'Blood Pressure', value: '142/88 mmHg', context: 'Evening log', status: 'normal' },
    ],
    doctorNotes: ['Tele-nurse scheduled automated SMS reminder.'],
  },
];
