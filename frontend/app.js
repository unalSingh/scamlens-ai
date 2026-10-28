/**
 * ScamLens AI 3D v3.0 — Advanced Spatial Fraud Intelligence Platform
 * Powered by Google Gemini AI, 5-Mode Three.js Interactive Threat Core,
 * 3D Spatial UI Gyro Physics, 5-Axis Threat Radar, Voice Call Transcriber,
 * QR/UPI Payment Forensics, and Formal Evidence Dossier Vault.
 */

// ============================================================================
// State & Configuration
// ============================================================================
const state = {
  selectedType: "whatsapp",
  inputMode: "text", // 'text' | 'image' | 'voice'
  selectedImageBase64: null,
  selectedImageMime: "image/png",
  recordedAudioBase64: null,
  sessionScans: 0,
  lastResult: null,
  lastMessage: "",
  activeTheme: localStorage.getItem("scamlens_theme") || "vision-pro",
  customPrimaryColor: localStorage.getItem("scamlens_custom_primary") || "#00e5ff",
  customSecondaryColor: localStorage.getItem("scamlens_custom_secondary") || "#a855f7",
  customBgColor: localStorage.getItem("scamlens_custom_bg") || "#0e142c",
  tilt3dEnabled: localStorage.getItem("scamlens_tilt3d") !== "false",
  tiltIntensity: Number(localStorage.getItem("scamlens_tilt_intensity") || 10),
  gridFloorEnabled: localStorage.getItem("scamlens_grid_floor") !== "false",
  particleStyle: localStorage.getItem("scamlens_particle_style") || "stars",
  particleDensity: Number(localStorage.getItem("scamlens_density") || 100),
  rotationSpeed: Number(localStorage.getItem("scamlens_speed") || 10) / 10,
  soundEnabled: localStorage.getItem("scamlens_sound") !== "false",
  soundPack: localStorage.getItem("scamlens_sound_pack") || "cyberpunk",
  soundVolume: Number(localStorage.getItem("scamlens_sound_volume") || 80) / 100,
  geminiKey: localStorage.getItem("scamlens_gemini_key") || "",
  geminiModel: localStorage.getItem("scamlens_gemini_model") || "gemini-2.5-flash",
  language: localStorage.getItem("scamlens_lang") || "en",
  piiMasking: localStorage.getItem("scamlens_pii") !== "false",
  vMode: "shield", // 'shield' | 'globe' | 'neural' | 'tesseract' | 'sonar'
  isExploded: false,
  isWireframe: false,
  scanlineEnabled: localStorage.getItem("scamlens_scanline") !== "false",
  isRecording: false,
  speechRecognition: null,
  copilotChatHistory: []
};

// ============================================================================
// Multi-Language Internationalization (i18n) Engine - 12 Languages
// ============================================================================
const I18N_TRANSLATIONS = {
  "en": {
    "brandTagline": "GOOGLE GEMINI 3D FRAUD DEFENSE",
    "btnHowToUse": "HOW TO USE",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "Text Scan",
    "dockVision": "Screenshot Vision",
    "dockVoice": "Voice Forensics",
    "dockUrl": "URL Scanner",
    "dockPayment": "UPI / QR Fraud",
    "dockSender": "SMS Sender ID",
    "dockHoneypot": "Honeypot Lab",
    "dockVault": "Audit Vault",
    "dockGuide": "How to Use",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "EXECUTE THREAT INVESTIGATION",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "hi": {
    "brandTagline": "गूगल जेमिनी 3D साइबर धोखाधड़ी सुरक्षा",
    "btnHowToUse": "उपयोग गाइड",
    "btnTilt3dOn": "3D टिल्ट: चालू",
    "btnTilt3dOff": "3D टिल्ट: बंद",
    "btnStudio": "स्टूडियो",
    "dockText": "टेक्स्ट स्कैन",
    "dockVision": "स्क्रीनशॉट विजन",
    "dockVoice": "आवाज विश्लेषण",
    "dockUrl": "URL स्कैनर",
    "dockPayment": "UPI / QR फ्रॉड",
    "dockSender": "SMS सेंडर ID",
    "dockHoneypot": "हनीपॉट लैब",
    "dockVault": "ऑडिट वॉल्ट",
    "dockGuide": "उपयोग गाइड",
    "heroEyebrow": "अगली पीढ़ी की 3D सुरक्षा • गूगल जेमिनी द्वारा संचालित",
    "heroTitle": "डिजिटल धोखे का पर्दाफाश करें।<br><span class=\"gradient-text\">3D स्पेस में साइबर फ्रॉड की जांच करें।</span>",
    "heroCopy": "संदिग्ध व्हाट्सएप संदेश, फर्जी पुलिस वारंट, बैंक एसएमएस, ब्लैकमेल कॉल या स्क्रीनशॉट डालें। स्कैम-लेंस एआई हमलावर के खतरनाक चक्रव्यूह को इंटरएक्टिव 3D में दिखाता है और आपको तुरंत कानूनी सुरक्षा देता है।",
    "presetLabel": "वास्तविक साइबर हमला सिमुलेशन प्रीसेट:",
    "presetArrest": "🚨 डिजिटल अरेस्ट (सीबीआई/पुलिस)",
    "presetVoiceArrest": "🎙️ सीबीआई स्काइप कॉल सिमुलेशन",
    "presetTask": "💼 टेलीग्राम दैनिक टास्क स्कैम",
    "presetBankOtp": "🏦 बैंक ब्लॉक OTP फिशिंग",
    "presetFedex": "📦 फेडेक्स पार्सल ड्रग्स स्कैम",
    "presetWeddingApk": "👰 शादी का निमंत्रण APK वायरस",
    "presetElectricity": "⚡ बिजली बिल काटने की धमकी",
    "presetSextortion": "📹 वीडियो कॉल ब्लैकमेल",
    "presetCrypto": "🪙 300% क्रिप्टो फ्रॉड",
    "presetSafeMeeting": "🛡️ सुरक्षित कंपनी मीटिंग ईमेल",
    "stepLabel1": "चरण 01 // साइबर जांच कंसोल",
    "stage1Title": "संदिग्ध संचार दर्ज करें",
    "tabText": "✍ टेक्स्ट संदेश",
    "tabImage": "📸 स्क्रीनशॉट (विजन)",
    "tabVoice": "🎙️ फोन कॉल / आवाज",
    "privacyActive": "🔒 E2EE गोपनीयता शील्ड: सक्रिय",
    "privacyRedactToggle": "व्यक्तिगत डेटा (PII) स्वतः छुपाएं",
    "textInputLabel": "मूल संदिग्ध संचार (संदेश / लिंक)",
    "textInputPlaceholder": "संदिग्ध व्हाट्सएप संदेश, एसएमएस, ईमेल, APK लिंक या जबरन वसूली की बातचीत यहां पेस्ट करें…\n\nसुझाव: त्वरित परीक्षण के लिए ऊपर दिए गए प्रीसेट पर क्लिक करें।",
    "dropTitle": "स्क्रीनशॉट यहां खींचें और छोड़ें",
    "dropSub": "व्हाट्सएप चैट, फर्जी कोर्ट वारंट, एसएमएस अलर्ट, बैंक नोटिस, क्यूआर कोड (PNG, JPEG, WebP) समर्थित",
    "browseBtn": "कंप्यूटर से चुनें",
    "dropKeyHint": "या क्लिपबोर्ड से स्क्रीनशॉट पेस्ट करने के लिए Ctrl+V दबाएं",
    "micDefault": "बोलने और आवाज विश्लेषण के लिए माइक पर क्लिक करें",
    "micRecording": "🔴 लाइव कॉल रिकॉर्डिंग जारी... रोकने के लिए क्लिक करें",
    "micOff": "✅ माइक बंद। ऑडियो सुरक्षित एवं विश्लेषण के लिए तैयार।",
    "stopRecordBtn": "⏹ रिकॉर्डिंग बंद करें",
    "simCallLabel": "या वास्तविक फोन कॉल आवाज का परीक्षण करें:",
    "simCbiCall": "🚨 सीबीआई अधिकारी धमकी कॉल",
    "simBankCall": "🏦 बैंक केवाईसी निलंबन कॉल",
    "simCustomsCall": "📦 कस्टम्स पार्सल नारकोटिक्स कॉल",
    "voiceTranscriptPlaceholder": "जैसे ही आप बोलेंगे या ऑडियो विश्लेषण चलेगा, लाइव बातचीत यहां दिखाई देगी…",
    "recaptchaLabel": "मैं मानव हूँ • गूगल रीकैप्चा v3 शील्ड सत्यापित",
    "recaptchaSub": "गूगल साइबर सुरक्षा इंजन द्वारा सुरक्षित",
    "vaultNote": "लोकल वॉल्ट: इस डिवाइस पर एन्क्रिप्टेड SQLite में सुरक्षित",
    "clearBtn": "सभी साफ करें ↗",
    "executeBtn": "साइबर जांच शुरू करें (स्कैन)",
    "scanningBtn": "3D खतरे का विश्लेषण हो रहा है…",
    "resultsEyebrow": "चरण 02 // फोरेंसिक इंटेलिजेंस डॉसियर",
    "resultsTitle": "फोरेंसिक साइबर जांच रिपोर्ट",
    "btnEvidence": "औपचारिक पुलिस FIR एविडेंस पैक बनाएं",
    "btnBriefing": "ऑडियो ब्रीफिंग सुनें",
    "btnCopyComplaint": "त्वरित शिकायत कॉपी करें",
    "btnExportJson": "JSON निर्यात करें",
    "btnPrint": "प्रिंट / PDF सहेजें",
    "acousticCardTitle": "ध्वनि कॉल एवं ऑडियो फोरेंसिक रडार",
    "acousticCardSub": "आवाज तनाव सूचकांक, एआई डीपफेक पहचान, और पृष्ठभूमि शोर विश्लेषण",
    "metricStress": "आवाज तनाव सूचकांक",
    "metricDeepfake": "डीपफेक आवाज की संभावना",
    "metricBackground": "पृष्ठभूमि स्पूफिंग / शोर",
    "metricCoercion": "जबरन वसूली गति (कैडेंस)",
    "urlTitle": "डीप लिंक इंटेलिजेंस",
    "urlDesc": "बिना लिंक खोले डोमेन स्पूफिंग, यूनिकोड होमोग्राफ और नकली ब्रांड लिंक की जांच करें।",
    "urlLabel": "जांच के लिए URL या डोमेन",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "लिंक की जांच करें",
    "urlDefault": "URL लक्ष्य की प्रतीक्षा है।",
    "paymentTitle": "QR कोड और UPI भुगतान फ्रॉड स्कैनर",
    "paymentDesc": "नकली क्यूआर कोड, रिवर्स-कलेक्ट UPI डेबिट ट्रैप और असुरक्षित गेटवे का पर्दाफाश करें।",
    "paymentLabel": "UPI लिंक, VPA, या QR स्ट्रिंग",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "भुगतान सुरक्षा जांचें",
    "paymentDefault": "भुगतान पेलोड की प्रतीक्षा है।",
    "senderTitle": "SMS हेडर और सेंडर ID निरीक्षक",
    "senderDesc": "TRAI/DLT टेलीकॉम उपसर्गों की पुष्टि करें, असली बैंकों के हेडर जांचें और फर्जी 10-अंकीय नंबर पकड़ें।",
    "senderLabel": "SMS हेडर या प्रेषक नंबर",
    "senderPlaceholder": "उदा. VK-HDFCBK, AD-SBINB, या +923001234567",
    "senderBtn": "सेंडर ID ऑडिट करें",
    "senderDefault": "सेंडर हेडर की प्रतीक्षा है।",
    "honeypotTitle": "हमलावर काउंटर-बेट हनीपॉट लैब",
    "honeypotDesc": "अपनी पहचान उजागर किए बिना स्कैमर्स के मनोवैज्ञानिक जाल और उनके अगले कदम का सुरक्षित परीक्षण करें।",
    "honeypotLabel": "धोखाधड़ी परिदृश्य चुनें",
    "honeypotRespLabel": "सामरिक रक्षा प्रतिक्रिया चुनें",
    "honeypotDefault": "हमलावर की प्रतिक्रिया का परीक्षण करने के लिए ऊपर एक विकल्प चुनें।",
    "copilotTitle": "जेमिनी सुरक्षा कोपायलट",
    "copilotDesc": "साइबर सुरक्षा से संबंधित कोई भी सवाल पूछें, बैंक फ्रीज प्रक्रिया या तुरंत उठाए जाने वाले कदमों की सलाह लें।",
    "copilotPlaceholder": "अपना सुरक्षा प्रश्न यहां लिखें… (उदा. 'मैंने लिंक पर क्लिक कर दिया है, मुझे क्या करना चाहिए?')",
    "copilotBtn": "भेजें",
    "vaultLabel": "ऑडिट ट्रेल // लोकल डेटाबेस",
    "vaultTitle": "जांच इतिहास वॉल्ट",
    "vaultDesc": "पिछले सभी स्कैन इस मशीन पर सुरक्षित एन्क्रिप्टेड SQLite डेटाबेस में संग्रहीत हैं।",
    "vaultRefreshBtn": "रीफ्रेश करें ↻",
    "vaultClearBtn": "वॉल्ट खाली करें 🗑",
    "historySearchPlaceholder": "सहेजे गए रिकॉर्ड खोजें…",
    "optAllVerdicts": "सभी निर्णय",
    "optDangerous": "केवल खतरनाक (Dangerous)",
    "optSuspicious": "केवल संदिग्ध (Suspicious)",
    "optSafe": "केवल सुरक्षित (Safe)",
    "guideTitle": "स्कैम-लेंस एआई का उपयोग कैसे करें (विजन प्रो संस्करण)",
    "guideSub": "संदिग्ध डिजिटल संदेशों का विश्लेषण करने और अपने पैसे बचाने के लिए इन 5 आसान चरणों का पालन करें।",
    "step1Title": "सबूत दर्ज करें",
    "step1Desc": "माध्यम चुनें: <strong>टेक्स्ट संदेश</strong>, <strong>स्क्रीनशॉट (विजन)</strong>, या <strong>वॉइस कॉल ऑडियो</strong>।",
    "step2Title": "E2EE गोपनीयता शील्ड",
    "step2Desc": "व्यक्तिगत विवरण जैसे फोन नंबर, बैंक खाते और ओटीपी ब्राउज़र में ही स्वतः सुरक्षित और मास्क हो जाते हैं।",
    "step3Title": "reCAPTCHA सत्यापन",
    "step3Desc": "बॉट हमलों से विश्लेषण पाइपलाइन को सुरक्षित रखने के लिए <strong>गूगल रीकैप्चा शील्ड</strong> सत्यापित करें।",
    "step4Title": "जेमिनी 3D स्कैन चलाएं",
    "step4Desc": "<strong>साइबर जांच शुरू करें</strong> पर क्लिक करें। गूगल जेमिनी खतरे का 5-अक्षीय रडार विश्लेषण तैयार करता है।",
    "step5Title": "कार्रवाई और सुरक्षा",
    "step5Desc": "पुलिस (1930 / cybercrime.gov.in) के लिए आधिकारिक <strong>FIR एविडेंस पैक</strong> डाउनलोड करें या कोपायलट से सलाह लें।",
    "testDriveHeader": "⚡ 1-क्लिक हैकाथॉन टेस्ट ड्राइव (तुरंत परीक्षण के लिए परिदृश्य चुनें):",
    "startUsingBtn": "🚀 अभी जांच शुरू करें"
  },
  "hinglish": {
    "brandTagline": "GOOGLE GEMINI 3D FRAUD DEFENSE",
    "btnHowToUse": "HOW TO USE",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "Text Scan",
    "dockVision": "Screenshot Vision",
    "dockVoice": "Voice Forensics",
    "dockUrl": "URL Scanner",
    "dockPayment": "UPI / QR Fraud",
    "dockSender": "SMS Sender ID",
    "dockHoneypot": "Honeypot Lab",
    "dockVault": "Audit Vault",
    "dockGuide": "How to Use",
    "heroEyebrow": "NEXT-GEN 3D FRAUD SHIELD • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Digital Scams Ka Parda Faash Karein.<br><span class=\"gradient-text\">Full 3D Space Mein Fraud Ki Jaanch Karein.</span>",
    "heroCopy": "Suspicious WhatsApp messages, fake CBI digital arrest warrants, bank SMS alerts ya audio calls check karein. ScamLens AI 3D visual analysis karke aapko bachaata hai.",
    "presetLabel": "REAL-WORLD ATTACK PRESETS (1-CLICK LOAD):",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task Scam",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Parcel",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff Notice",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Meeting Email",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Suspect Communication Ingest Karein",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Personal Data (PII) Auto-Redact Karein",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Suspicious message, SMS, email, APK link ya extortion call transcript yahan paste karein…\n\nTip: Upar diye presets try karein instant test ke liye.",
    "dropTitle": "Screenshot Yahan Drag & Drop Karein",
    "dropSub": "WhatsApp chat, fake court order, SMS alerts, QR codes (PNG, JPEG, WebP) supported",
    "browseBtn": "Computer Se Browse Karein",
    "dropKeyHint": "Ya Ctrl+V dabayein clipboard se screenshot paste karne ke liye",
    "micDefault": "Mic daba kar suspect call record karein",
    "micRecording": "🔴 RECORDING CHAL RAHI HAI... STOP KARNE KE LIYE CLICK KAREIN",
    "micOff": "✅ Mic OFF. Audio save ho chuka hai.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "YA REALISTIC CALL FORENSICS TEST KAREIN:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live bolne par spoken dialogue real-time mein yahan type hota rahega…",
    "recaptchaLabel": "I am human • Google reCAPTCHA Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "FRAUD INVESTIGATION SHURU KAREIN",
    "scanningBtn": "3D THREAT SCAN CHAL RAHA HAI…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Formal FIR Evidence Pack Generate Karein",
    "btnBriefing": "Audio Briefing Suniye",
    "btnCopyComplaint": "Quick Complaint Copy Karein",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF Save",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress, synthetic deepfake detection aur background noise profile",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Phishing URL, unicode spoofing aur fake brand links ko bina click kiye inspect karein.",
    "urlLabel": "SCAN KARNE KE LIYE URL YA HOSTNAME",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR Code & UPI Payment Fraud Scanner",
    "paymentDesc": "Fake QR codes, reverse-collect UPI debit traps aur fake VPAs unmask karein.",
    "paymentLabel": "UPI INTENT LINK, VPA, YA PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Telecom Sender ID",
    "senderDesc": "TRAI header format verify karein aur personal 10-digit fake banking SMS pakdein.",
    "senderLabel": "SMS HEADER YA SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Scammer ko fake reply bhej kar unke AI escalation tactic aur response ka safe test karein.",
    "honeypotLabel": "FRAUD SCENARIO CHUNIYE",
    "honeypotRespLabel": "TACTICAL DEFENSE RESPONSE CHUNIYE",
    "honeypotDefault": "Upar se response chun kar adversary psychological reaction dekhein.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Cybersecurity sawal puchein, bank account freeze ya complaint procedure confirm karein.",
    "copilotPlaceholder": "Apna safety sawal yahan type karein…",
    "copilotBtn": "Bhejein",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Saari investigation history aapke device par encrypted SQLite database mein safe hai.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Saved records search karein…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "ScamLens AI Kaise Use Karein (Vision Pro Edition)",
    "guideSub": "In 5 simple steps ko follow karein aur kisi bhi digital fraud ko seconds mein expose karein.",
    "step1Title": "Evidence Ingest Karein",
    "step1Desc": "Text message, screenshot (Vision) ya mic se live suspect audio call record karein.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Phone number, bank account aur OTP aapke browser mein hi automatic mask ho jaate hain.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Google reCAPTCHA v3 verify karke bot protection ensure karein.",
    "step4Title": "Gemini 3D Scan Run Karein",
    "step4Desc": "EXECUTE THREAT INVESTIGATION dabayein. 3D spatial radar ban kar ready ho jaayega.",
    "step5Title": "Action & Containment",
    "step5Desc": "Police 1930 ke liye formal FIR Evidence Pack download karein.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (INSTANT TEST KE LIYE SELECT KAREIN):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "es": {
    "brandTagline": "DEFENSA CONTRA FRAUDES 3D CON GOOGLE GEMINI",
    "btnHowToUse": "CÓMO USAR",
    "btnTilt3dOn": "INCLINACIÓN 3D: SÍ",
    "btnTilt3dOff": "INCLINACIÓN 3D: NO",
    "btnStudio": "ESTUDIO",
    "dockText": "Texto",
    "dockVision": "Captura Visión",
    "dockVoice": "Voz Forense",
    "dockUrl": "Escáner URL",
    "dockPayment": "Fraude Pago/QR",
    "dockSender": "ID Remitente",
    "dockHoneypot": "Honeypot Lab",
    "dockVault": "Bóveda Auditoría",
    "dockGuide": "Cómo Usar",
    "heroEyebrow": "DEFENSA ESPACIAL 3D • IMPULSADA POR GOOGLE GEMINI",
    "heroTitle": "Exponga el Engaño Digital.<br><span class=\"gradient-text\">Investigue Fraudes en Espacio 3D Completo.</span>",
    "heroCopy": "Analice mensajes sospechosos de WhatsApp, órdenes judiciales falsas, alertas bancarias por SMS, llamadas de extorsión o capturas de pantalla. ScamLens reconstruye el vector de ataque en 3D interactivo.",
    "presetLabel": "PREAJUSTES DE SIMULACIÓN DE ATAQUE:",
    "presetArrest": "🚨 Arresto Digital Falso",
    "presetVoiceArrest": "🎙️ Simulación Llamada Skype",
    "presetTask": "💼 Estafa de Tareas Telegram",
    "presetBankOtp": "🏦 Bloqueo Bancario Phishing",
    "presetFedex": "📦 Narcóticos Paquete Aduana",
    "presetWeddingApk": "👰 APK Invitación Boda Falsa",
    "presetElectricity": "⚡ Corte de Electricidad",
    "presetSextortion": "📹 Chantaje Videollamada",
    "presetCrypto": "🪙 300% Arbitraje Cripto",
    "presetSafeMeeting": "🛡️ Correo Reunión Legítimo",
    "stepLabel1": "ETAPA 01 // CONSOLA DE INVESTIGACIÓN",
    "stage1Title": "Ingresar Comunicación Sospechosa",
    "tabText": "✍ Mensaje de Texto",
    "tabImage": "📸 Captura (Visión)",
    "tabVoice": "🎙️ Llamada / Audio",
    "privacyActive": "🔒 ESCUDO PRIVACIDAD E2EE: ACTIVO",
    "privacyRedactToggle": "Ocultar Datos Personales (PII)",
    "textInputLabel": "COMUNICACIÓN SOSPECHOSA ORIGINAL",
    "textInputPlaceholder": "Pegue aquí el mensaje sospechoso, SMS, correo o enlace APK…",
    "dropTitle": "Arrastre y Suelte Captura Aquí",
    "dropSub": "Soporta chats de WhatsApp, órdenes judiciales, alertas SMS y códigos QR (PNG, JPEG, WebP)",
    "browseBtn": "Explorar Archivos",
    "dropKeyHint": "O presione Ctrl+V para pegar captura desde el portapapeles",
    "micDefault": "Haga clic en el micrófono para hablar y analizar",
    "micRecording": "🔴 GRABANDO EN VIVO... HAGA CLIC PARA DETENER",
    "micOff": "✅ Micrófono apagado. Audio listo para análisis.",
    "stopRecordBtn": "⏹ DETENER GRABACIÓN",
    "simCallLabel": "O PRUEBE FORENSE DE LLAMADAS REALISTAS:",
    "simCbiCall": "🚨 Llamada Extorsión Policial",
    "simBankCall": "🏦 Llamada Suspensión Bancaria",
    "simCustomsCall": "📦 Llamada Aduanas Paquete",
    "voiceTranscriptPlaceholder": "La transcripción en vivo aparecerá aquí mientras habla…",
    "recaptchaLabel": "Soy humano • Google reCAPTCHA Verificado",
    "recaptchaSub": "Protegido por el motor de telemetría de Google",
    "vaultNote": "Bóveda Local: Guardado en SQLite cifrado local",
    "clearBtn": "Limpiar Todo ↗",
    "executeBtn": "EJECUTAR INVESTIGACIÓN DE AMENAZA",
    "scanningBtn": "RECONSTRUYENDO TELEMETRÍA 3D…",
    "resultsEyebrow": "ETAPA 02 // DOSSIER DE INTELIGENCIA",
    "resultsTitle": "Hallazgos de Investigación Forense",
    "btnEvidence": "Generar Paquete de Evidencia Policial",
    "btnBriefing": "Escuchar Informe de Voz",
    "btnCopyComplaint": "Copiar Denuncia Rápida",
    "btnExportJson": "Exportar JSON",
    "btnPrint": "Imprimir / PDF",
    "acousticCardTitle": "Radar Forense Acústico de Voz y Audio",
    "acousticCardSub": "Estrés de voz, detección de deepfake sintético y ruido de fondo",
    "metricStress": "Índice de Estrés Vocal",
    "metricDeepfake": "Probabilidad de Deepfake",
    "metricBackground": "Suplantación de Fondo",
    "metricCoercion": "Cadencia de Coerción",
    "urlTitle": "Inteligencia de Enlaces Profundos",
    "urlDesc": "Inspeccione entropía de dominio y suplantación de marca sin abrir el enlace.",
    "urlLabel": "URL O NOMBRE DE HOST A ESCANEAR",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspeccionar URL",
    "urlDefault": "Esperando objetivo URL.",
    "paymentTitle": "Escáner de Fraude QR y Pagos",
    "paymentDesc": "Desenmascare códigos QR falsos y trampas de cobro inverso.",
    "paymentLabel": "ENLACE DE PAGO O VPA",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspeccionar Pago",
    "paymentDefault": "Esperando datos de pago.",
    "senderTitle": "Inspector de Encabezados SMS",
    "senderDesc": "Verifique prefijos institucionales y detecte números móviles de 10 dígitos suplantados.",
    "senderLabel": "ENCABEZADO SMS O NÚMERO REMITENTE",
    "senderPlaceholder": "ej. VK-HDFCBK, AD-SBINB, o +923001234567",
    "senderBtn": "Auditar ID Remitente",
    "senderDefault": "Esperando encabezado remitente.",
    "honeypotTitle": "Simulador de Contraataque Honeypot",
    "honeypotDesc": "Pruebe respuestas tácticas para observar la escalada del estafador de forma segura.",
    "honeypotLabel": "SELECCIONE ESCENARIO DE FRAUDE",
    "honeypotRespLabel": "ELIJA RESPUESTA DEFENSIVA",
    "honeypotDefault": "Seleccione una respuesta para probar la reacción psicológica adversaria.",
    "copilotTitle": "Copiloto de Seguridad Gemini",
    "copilotDesc": "Haga preguntas de ciberseguridad y obtenga orientación paso a paso para congelar cuentas.",
    "copilotPlaceholder": "Escriba su pregunta de seguridad aquí…",
    "copilotBtn": "Enviar",
    "vaultLabel": "REGISTRO DE AUDITORÍA // BASE DE DATOS LOCAL",
    "vaultTitle": "Bóveda de Historial de Investigaciones",
    "vaultDesc": "Todos los análisis pasados se guardan localmente en SQLite cifrado.",
    "vaultRefreshBtn": "Actualizar ↻",
    "vaultClearBtn": "Vaciar Bóveda 🗑",
    "historySearchPlaceholder": "Buscar registros guardados…",
    "optAllVerdicts": "Todos los Veredictos",
    "optDangerous": "Solo Peligrosos",
    "optSuspicious": "Solo Sospechosos",
    "optSafe": "Solo Seguros",
    "guideTitle": "Cómo Usar ScamLens AI (Edición Vision Pro)",
    "guideSub": "Siga estos 5 pasos para analizar comunicaciones sospechosas y proteger sus fondos.",
    "step1Title": "Ingresar Evidencia",
    "step1Desc": "Seleccione texto, captura de pantalla o llamada de audio sospechosa.",
    "step2Title": "Escudo de Privacidad E2EE",
    "step2Desc": "Los números de teléfono y cuentas bancarias se ocultan localmente en su navegador.",
    "step3Title": "Verificación reCAPTCHA",
    "step3Desc": "Valide reCAPTCHA v3 para proteger la plataforma de bots.",
    "step4Title": "Ejecutar Escaneo 3D",
    "step4Desc": "Haga clic en Ejecutar Investigación de Amenaza para generar el radar espacial 3D.",
    "step5Title": "Acción y Contención",
    "step5Desc": "Descargue el paquete de evidencia policial y consulte con el Copiloto de Seguridad.",
    "testDriveHeader": "⚡ PRUEBA DE 1-CLIC PARA JUECES (SELECCIONE UN ESCENARIO):",
    "startUsingBtn": "🚀 Iniciar Investigación Ahora"
  },
  "fr": {
    "brandTagline": "DÉFENSE ANTI-FRAUDE 3D AVEC GOOGLE GEMINI",
    "btnHowToUse": "COMMENT UTILISER",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "Texte",
    "dockVision": "Vision Capture",
    "dockVoice": "Audio Forensique",
    "dockUrl": "Scanner URL",
    "dockPayment": "Fraude Paiement",
    "dockSender": "ID Expéditeur",
    "dockHoneypot": "Honeypot Lab",
    "dockVault": "Coffre d'Audit",
    "dockGuide": "Guide d'Usage",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "LANCER L'ENQUÊTE DE SÉCURITÉ",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "de": {
    "brandTagline": "3D-BETRUGSABWEHR MIT GOOGLE GEMINI",
    "btnHowToUse": "ANLEITUNG",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "Text-Scan",
    "dockVision": "Screenshot-Vision",
    "dockVoice": "Audio-Forensik",
    "dockUrl": "URL-Scanner",
    "dockPayment": "Zahlungs-Betrug",
    "dockSender": "Absender-ID",
    "dockHoneypot": "Honeypot-Labor",
    "dockVault": "Audit-Tresor",
    "dockGuide": "Anleitung",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "SICHERHEITSUNTERSUCHUNG STARTEN",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "bn": {
    "brandTagline": "গুগল জেমিনি ৩ডি সাইবার প্রতারণা প্রতিরোধ",
    "btnHowToUse": "ব্যবহারবিধি",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "টেক্সট স্ক্যান",
    "dockVision": "স্ক্রিনশট ভিশন",
    "dockVoice": "ভয়েস বিশ্লেষণ",
    "dockUrl": "URL স্ক্যানার",
    "dockPayment": "পেমেন্ট প্রতারণা",
    "dockSender": "SMS প্রেরক আইডি",
    "dockHoneypot": "হানিপট ল্যাব",
    "dockVault": "অডিট ভল্ট",
    "dockGuide": "ব্যবহারবিধি",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "তদন্ত শুরু করুন",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "te": {
    "brandTagline": "గూగుల్ జెమిని 3D సైబర్ మోసాల రక్షణ",
    "btnHowToUse": "ఎలా ఉపయోగించాలి",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "టెక్స్ట్ స్కాన్",
    "dockVision": "స్క్రీన్‌షాట్ విజన్",
    "dockVoice": "వాయిస్ ఫోరెన్సిక్స్",
    "dockUrl": "URL స్కానర్",
    "dockPayment": "UPI/QR మోసం",
    "dockSender": "SMS సెండర్ ID",
    "dockHoneypot": "హనీపాట్ ల్యాబ్",
    "dockVault": "ఆడిట్ వాల్ట్",
    "dockGuide": "గైడ్",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "విచారణ ప్రారంభించండి",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "ta": {
    "brandTagline": "கூகிள் ஜெமினி 3D மோசடி தடுப்பு",
    "btnHowToUse": "எப்படி பயன்படுத்துவது",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "உரை ஸ்கேன்",
    "dockVision": "ஸ்கிரீன்ஷாட் பார்வை",
    "dockVoice": "குரல் ஆய்வு",
    "dockUrl": "URL ஸ்கேனர்",
    "dockPayment": "பணம் செலுத்துதல் மோசடி",
    "dockSender": "அனுப்புநர் ஐடி",
    "dockHoneypot": "ஹனிபாட் ஆய்வகம்",
    "dockVault": "தணிக்கை பெட்டகம்",
    "dockGuide": "வழிகாட்டி",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "விசாரணையைத் தொடங்கு",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "mr": {
    "brandTagline": "गुगल जेमिनी 3D सायबर फसवणूक संरक्षण",
    "btnHowToUse": "कसे वापरावे",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "मजकूर स्कॅन",
    "dockVision": "स्क्रीनशॉट व्हिजन",
    "dockVoice": "आवाज विश्लेषण",
    "dockUrl": "URL स्कॅनर",
    "dockPayment": "UPI फसवणूक",
    "dockSender": "SMS प्रेषक ID",
    "dockHoneypot": "हनीपॉट लॅब",
    "dockVault": "ऑडिट वॉल्ट",
    "dockGuide": "मार्गदर्शक",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "सायबर तपास सुरू करा",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "gu": {
    "brandTagline": "ગુગલ જેમિની 3D સાયબર ફ્રોડ સંરક્ષણ",
    "btnHowToUse": "કેવી રીતે વાપરવું",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "ટેક્સ્ટ સ્કેન",
    "dockVision": "સ્ક્રીનશોટ વિઝન",
    "dockVoice": "વોઇસ ફોરેન્સિક્સ",
    "dockUrl": "URL સ્કેનર",
    "dockPayment": "UPI છેતરપિંડી",
    "dockSender": "SMS સેન્ડર ID",
    "dockHoneypot": "હનીપોટ લેબ",
    "dockVault": "ઓડિટ વૉલ્ટ",
    "dockGuide": "માર્ગદર્શિકા",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "તપાસ શરૂ કરો",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "ar": {
    "brandTagline": "الدفاع ثلاثي الأبعاد ضد الاحتيال عبر جوجل جيميني",
    "btnHowToUse": "كيفية الاستخدام",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "فحص النص",
    "dockVision": "رؤية لقطة الشاشة",
    "dockVoice": "التحليل الصوتي",
    "dockUrl": "ماسح الروابط",
    "dockPayment": "احتيال الدفع",
    "dockSender": "معرف المرسل",
    "dockHoneypot": "مختبر المصيدة",
    "dockVault": "خزنة التدقيق",
    "dockGuide": "الدليل",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "تنفيذ التحقيق في التهديد",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "zh": {
    "brandTagline": "谷歌 GEMINI 3D 反欺诈防御引擎",
    "btnHowToUse": "使用指南",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "文本扫描",
    "dockVision": "截图识别",
    "dockVoice": "语音取证",
    "dockUrl": "URL 扫描器",
    "dockPayment": "支付欺诈",
    "dockSender": "短信发送者 ID",
    "dockHoneypot": "蜜罐实验室",
    "dockVault": "审计保险库",
    "dockGuide": "指南",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "启动威胁深度调查",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  },
  "ja": {
    "brandTagline": "Google Gemini 搭載 3D 詐欺防御システム",
    "btnHowToUse": "使用方法",
    "btnTilt3dOn": "3D TILT: ON",
    "btnTilt3dOff": "3D TILT: OFF",
    "btnStudio": "STUDIO",
    "dockText": "テキストスキャン",
    "dockVision": "スクリーンショット認識",
    "dockVoice": "音声フォレンジック",
    "dockUrl": "URL スキャナー",
    "dockPayment": "決済詐欺",
    "dockSender": "送信者 ID",
    "dockHoneypot": "ハニーポットラボ",
    "dockVault": "監査保管庫",
    "dockGuide": "ガイド",
    "heroEyebrow": "NEXT-GEN 3D SPATIAL DEFENSE • POWERED BY GOOGLE GEMINI",
    "heroTitle": "Expose Digital Deception.<br><span class=\"gradient-text\">Investigate Fraud in Full 3D Space.</span>",
    "heroCopy": "Ingest suspicious WhatsApp messages, fake police warrants, SMS alerts, extortion calls, or screenshots. ScamLens reconstructs adversary attack vectors in interactive 3D, maps cognitive manipulation, and arms you with official containment playbooks.",
    "presetLabel": "REAL-WORLD ATTACK SIMULATION PRESETS:",
    "presetArrest": "🚨 Digital Arrest (CBI/Police)",
    "presetVoiceArrest": "🎙️ CBI Skype Call Simulation",
    "presetTask": "💼 Telegram Daily Task",
    "presetBankOtp": "🏦 Bank Block OTP Phish",
    "presetFedex": "📦 FedEx Customs Narcotics",
    "presetWeddingApk": "👰 Wedding Invitation APK",
    "presetElectricity": "⚡ Electricity Cutoff",
    "presetSextortion": "📹 Video Call Blackmail",
    "presetCrypto": "🪙 300% Crypto Arbitrage",
    "presetSafeMeeting": "🛡️ Legit Team Meeting",
    "stepLabel1": "STAGE 01 // INVESTIGATION CONSOLE",
    "stage1Title": "Ingest Suspect Communication",
    "tabText": "✍ Text Message",
    "tabImage": "📸 Screenshot (Vision)",
    "tabVoice": "🎙️ Voice Call / Audio",
    "privacyActive": "🔒 E2EE PRIVACY SHIELD: ACTIVE",
    "privacyRedactToggle": "Auto-Redact Personal Info (PII)",
    "textInputLabel": "ORIGINAL SUSPECT COMMUNICATION",
    "textInputPlaceholder": "Paste suspicious message, SMS, email, APK link or extortion transcript here…\n\nTip: Try the real-world presets above for instant fraud simulations.",
    "dropTitle": "Drag & Drop Screenshot Here",
    "dropSub": "Supports WhatsApp chats, fake court notices, SMS alerts, bank warnings, QR codes (PNG, JPEG, WebP)",
    "browseBtn": "Browse Computer",
    "dropKeyHint": "Or press Ctrl+V anywhere to paste screenshot from clipboard",
    "micDefault": "Click Microphone to Speak & Analyze Acoustics",
    "micRecording": "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP",
    "micOff": "✅ Microphone OFF. Audio captured & ready.",
    "stopRecordBtn": "⏹ STOP RECORDING",
    "simCallLabel": "OR TEST REALISTIC VOICE CALL FORENSICS:",
    "simCbiCall": "🚨 CBI Officer Extortion Call",
    "simBankCall": "🏦 Bank KYC Suspension Call",
    "simCustomsCall": "📦 FedEx Narcotics Parcel Call",
    "voiceTranscriptPlaceholder": "Live audio transcript and spoken dialogue will appear here in real time as you speak or run acoustic analysis…",
    "recaptchaLabel": "I am human • Google reCAPTCHA v3 Shield Verified",
    "recaptchaSub": "Protected by Google Fraud Telemetry Engine",
    "vaultNote": "Local Vault: Stored locally in encrypted SQLite on this device",
    "clearBtn": "Clear All ↗",
    "executeBtn": "脅威の調査を実行",
    "scanningBtn": "RECONSTRUCTING THREAT TELEMETRY…",
    "resultsEyebrow": "STAGE 02 // INTELLIGENCE DOSSIER",
    "resultsTitle": "Forensic Investigation Findings",
    "btnEvidence": "Generate Formal FIR Evidence Pack",
    "btnBriefing": "Listen to Briefing",
    "btnCopyComplaint": "Copy Quick Complaint",
    "btnExportJson": "Export JSON",
    "btnPrint": "Print / PDF",
    "acousticCardTitle": "Acoustic Voice Call & Audio Forensics",
    "acousticCardSub": "Voice stress metrics, synthetic deepfake detection, and background noise profiling",
    "metricStress": "Voice Stress Index",
    "metricDeepfake": "Deepfake Probability",
    "metricBackground": "Background Spoofing",
    "metricCoercion": "Coercion Cadence",
    "urlTitle": "Deep Link Intelligence",
    "urlDesc": "Inspect domain entropy, punycode spoofing, IP literal hostnames, and deceptive brand mimics offline without opening the link.",
    "urlLabel": "URL OR HOSTNAME TO SCAN",
    "urlPlaceholder": "https://secure-bank-login.xyz/verify",
    "urlBtn": "Inspect URL",
    "urlDefault": "Awaiting URL target.",
    "paymentTitle": "QR & Payment Forensics",
    "paymentDesc": "Unmask deceptive QR codes, reverse-collect UPI debit traps (\"Receive money\" scam), crypto addresses, and insecure gateways.",
    "paymentLabel": "UPI INTENT LINK, VPA, OR PAYMENT PAYLOAD",
    "paymentPlaceholder": "upi://pay?pa=scammer@okaxis&pn=Refund&am=5000",
    "paymentBtn": "Inspect Payment",
    "paymentDefault": "Awaiting payment payload or QR string.",
    "senderTitle": "SMS Header & Sender ID",
    "senderDesc": "Decode TRAI/DLT telecom circle prefixes, verify genuine institutional banking headers, and flag personal 10-digit mobile impersonations.",
    "senderLabel": "SMS HEADER OR SENDER NUMBER",
    "senderPlaceholder": "e.g. VK-HDFCBK, AD-SBINB, or +923001234567",
    "senderBtn": "Audit Sender ID",
    "senderDefault": "Awaiting sender header target.",
    "honeypotTitle": "Adversary Counter-Bait Simulator",
    "honeypotDesc": "Test victim defense responses against scammers to observe their AI psychological retaliation tree and escalation tactics in real time.",
    "honeypotLabel": "SELECT FRAUD SCENARIO",
    "honeypotRespLabel": "CHOOSE TACTICAL VICTIM RESPONSE",
    "honeypotDefault": "Select a response above to test adversary psychological retaliation.",
    "copilotTitle": "Gemini Safety Copilot",
    "copilotDesc": "Ask conversational anti-scam containment questions. The copilot provides step-by-step guidance tailored to your investigation context.",
    "copilotPlaceholder": "Type your safety question here… (e.g. 'I clicked the link, should I format my phone?')",
    "copilotBtn": "Send",
    "vaultLabel": "AUDIT TRAIL // LOCAL DATABASE",
    "vaultTitle": "Investigation History Vault",
    "vaultDesc": "Past analyses are persisted locally on this machine inside an encrypted SQLite database. You can search, filter, export, or permanently wipe records.",
    "vaultRefreshBtn": "Refresh ↻",
    "vaultClearBtn": "Clear Vault 🗑",
    "historySearchPlaceholder": "Search saved records…",
    "optAllVerdicts": "All Verdicts",
    "optDangerous": "Dangerous Only",
    "optSuspicious": "Suspicious Only",
    "optSafe": "Safe Only",
    "guideTitle": "How to Use ScamLens AI (Vision Pro Edition)",
    "guideSub": "Follow these 5 streamlined steps to analyze suspect digital communications, expose malicious vectors, and safeguard your assets.",
    "step1Title": "Ingest Evidence",
    "step1Desc": "Select an input channel: <strong>Text Message</strong>, <strong>Screenshot (Vision)</strong>, or <strong>Voice Call Audio</strong>. You can paste text, drag-and-drop screenshots, press <kbd>Ctrl+V</kbd>, or record directly from your microphone.",
    "step2Title": "E2EE Privacy Shield",
    "step2Desc": "Ensure the <strong>E2EE Privacy Shield</strong> is toggled. Personal details such as phone numbers, bank accounts, and OTPs are automatically redacted and encrypted on your client before analysis.",
    "step3Title": "reCAPTCHA Verification",
    "step3Desc": "Verify the <strong>Google reCAPTCHA Shield</strong> checkbox to validate automated human identity and safeguard the threat analysis pipeline from bot floods.",
    "step4Title": "Execute Gemini 3D Scan",
    "step4Desc": "Click <strong>EXECUTE THREAT INVESTIGATION</strong>. Google Gemini and the 3D Telemetry Engine deconstruct psychological manipulation, compute the 5-Axis Threat Radar, and identify red flags.",
    "step5Title": "Action & Containment",
    "step5Desc": "Download the official <strong>FIR Evidence Pack</strong> for police (1930 / cybercrime.gov.in) and banks, consult the <strong>AI Security Copilot</strong>, or listen to the spoken forensic briefing.",
    "testDriveHeader": "⚡ 1-CLICK HACKATHON TEST DRIVE (SELECT A SCENARIO TO TEST INSTANTLY):",
    "startUsingBtn": "🚀 Launch Investigation Now"
  }
};

function applyLanguage(lang) {
  const dict = I18N_TRANSLATIONS[lang] || I18N_TRANSLATIONS.en;
  state.language = lang;
  localStorage.setItem("scamlens_lang", lang);

  // Sync all dropdowns
  if ($("topLangSelect")) $("topLangSelect").value = lang;
  if ($("languageSelect")) $("languageSelect").value = lang;

  // 1. Process all elements with [data-i18n]
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 2. Process all elements with [data-i18n-placeholder]
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // 3. Update dynamic elements
  const tagline = document.querySelector(".brand-tagline");
  if (tagline && dict.brandTagline) tagline.textContent = dict.brandTagline;

  if ($("analyzeLabel") && dict.executeBtn && !state.isScanning) {
    $("analyzeLabel").textContent = dict.executeBtn;
  }
  if ($("micStatusText") && !state.isRecording && dict.micDefault) {
    $("micStatusText").textContent = dict.micDefault;
  }
  if ($("tilt3dLabel")) {
    $("tilt3dLabel").textContent = state.tilt3dEnabled ? (dict.btnTilt3dOn || "3D TILT: ON") : (dict.btnTilt3dOff || "3D TILT: OFF");
  }

  // 4. Update speech recognition language
  if (state.speechRecognition) {
    const langMap = {
      hi: "hi-IN", te: "te-IN", ta: "ta-IN", bn: "bn-IN", mr: "mr-IN", gu: "gu-IN",
      es: "es-ES", fr: "fr-FR", de: "de-DE", ar: "ar-SA", zh: "zh-CN", ja: "ja-JP"
    };
    state.speechRecognition.lang = langMap[lang] || "en-US";
  }
}

const $ = (id) => document.getElementById(id);

// Real-world scenario presets
const PRESET_SCENARIOS = {
  arrest: {
    type: "arrest_police",
    text: "URGENT OFFICIAL NOTICE - CENTRAL BUREAU OF INVESTIGATION / CUSTOMS:\nAn illegal parcel containing narcotics and fake passports addressed to your Aadhaar number has been seized at Mumbai Airport. A non-bailable Digital Arrest warrant is issued against you. Connect to Skype ID 'cbi.investigation.hq' immediately for video interrogation. Do not disconnect or speak to anyone or police will raid your premises within 45 minutes."
  },
  voice_arrest: {
    type: "voice_call",
    text: "AUDIO CALL TRANSCRIPTION [CBI INTERROGATION UNIT]:\n'Officer Vikram Singh speaking from Mumbai Airport Customs Terminal. An illegal parcel containing 14 fake passports and 500 grams of MDMA addressed to your Aadhaar card has been intercepted. A Supreme Court non-bailable digital arrest warrant is issued against you. Stay on this Skype line or our armed flying squad will raid your premises within 20 minutes.'"
  },
  task: {
    type: "job_offer",
    text: "Dear candidate, you are selected for Telegram Media Review task! Earn ₹4,500 daily just by liking 5 YouTube videos. We paid your initial ₹150 trial bonus. To unlock VIP Level 2 tasks and withdraw ₹15,000, please deposit a refundable security deposit of ₹3,000 into UPI: task-recharge@okaxis today."
  },
  bank_otp: {
    type: "whatsapp",
    text: "DEAR SBI CUSTOMER: Your NetBanking access is temporarily BLOCKED due to expired KYC documents. Click https://sbi-kyc-update.top/login immediately to update your PAN and submit your One-Time Password (OTP) to prevent permanent account suspension within 30 minutes."
  },
  fedex: {
    type: "delivery",
    text: "FedEx Express: Your international shipment #FX-98214 is placed on hold at customs due to unpaid clearance duties of ₹1,499. Pay clearance fee immediately via https://fedx-customs-pay.click or parcel will be returned to sender."
  },
  wedding_apk: {
    type: "whatsapp",
    text: "Dear friend, here is our family wedding invitation card and album! Please download and open the wedding-card.apk from https://wedding-invite-album.xyz/card.apk to see wedding date and RSVP location."
  },
  electricity: {
    type: "sms",
    text: "Dear consumer, your electricity power connection will be disconnected tonight at 9:30 PM because your previous month bill was not updated. Please call our power officer immediately at 9876543210 or install QuickSupport app to update bill."
  },
  sextortion: {
    type: "whatsapp",
    text: "We have private video call recording of you. If you do not transfer ₹40,000 to our UPI ID within 2 hours, we will upload this video to your Facebook and Instagram friends list and forward it to Cyber Crime branch."
  },
  crypto: {
    type: "crypto",
    text: "Exclusive VIP Opportunity: Guaranteed 300% weekly return using our AI automated arbitrage bot on Binance. Deposit 500 USDT to our smart contract wallet and receive 1500 USDT within 48 hours. 100% risk free with insurance fund."
  },
  safe_meeting: {
    type: "email",
    text: "Hi Team, reminder that our quarterly product roadmap sync is scheduled for tomorrow at 2:00 PM via Google Meet. The draft agenda is shared in the team drive. Please review the slides beforehand. Let me know if you need any adjustments."
  }
};

// Simulated Audio Calls for Voice Mode
const SIMULATED_CALLS = {
  cbi_call: {
    speaker: "🚨 CBI Investigation Officer Vikram Singh",
    text: "AUDIO CALL TRANSCRIPTION - CBI CRIME BRANCH:\nOfficer Vikram Singh speaking from Mumbai Airport Customs Terminal. An illegal parcel containing 14 fake passports and 500 grams of MDMA addressed to your Aadhaar card has been intercepted. A Supreme Court non-bailable digital arrest warrant is issued against you. Do not disconnect this line or step out of your room or our flying squad will execute a premises raid within 20 minutes."
  },
  bank_call: {
    speaker: "🏦 State Bank KYC Deactivation Officer",
    text: "TELEPHONE CALL NOTIFICATION - STATE BANK FRAUD CELL:\nDear customer, your NetBanking access and ATM debit card are suspended due to unverified KYC PAN link. We are generating a verification OTP to your registered phone. Please dictate the 6-digit OTP code to me right now over this call to avoid permanent account freeze and ₹5,000 penalty."
  },
  customs_call: {
    speaker: "📦 FedEx Customs Clearance Agent",
    text: "FEDEX EXPRESS INTERNATIONAL CALL NOTIFICATION:\nYour overseas parcel from Thailand with tracking #FX-88214 is seized at customs due to undeclared foreign currency and contraband. Pay immediate customs clearance tax of ₹14,999 to personal UPI handle clearance.officer@okaxis or the case will be transferred to Narcotics Control Bureau."
  }
};

// ============================================================================
// Web Audio API Synthesizer (Zero External Dependencies)
// ============================================================================
class CyberSoundFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && typeof AudioContext !== "undefined") {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  blip(freq = 880, duration = 0.04) {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const pack = state.soundPack;

      osc.type = pack === "retro" ? "square" : pack === "minimal" ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08 * state.soundVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (_) {}
  }
  sonar() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = state.soundPack === "retro" ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.09 * state.soundVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (_) {}
  }
  alert() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.setValueAtTime(320, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12 * state.soundVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (_) {}
  }
  success() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = state.soundPack === "retro" ? "square" : "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.06 * state.soundVolume, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch (_) {}
  }
}
const sfx = new CyberSoundFX();

// ============================================================================
// Three.js 3D Interactive Telemetry Core (5 Modes)
// ============================================================================
class ThreatVisualizer3D {
  constructor(canvasId) {
    this.canvas = $(canvasId);
    if (!this.canvas || typeof THREE === "undefined") return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 100);
    this.camera.position.set(0, 0, 7);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.clock = new THREE.Clock();
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    // 5 Visualization Groups
    this.shieldGroup = new THREE.Group();
    this.globeGroup = new THREE.Group();
    this.neuralGroup = new THREE.Group();
    this.tesseractGroup = new THREE.Group();
    this.sonarGroup = new THREE.Group();

    this.rootGroup.add(this.shieldGroup);
    this.rootGroup.add(this.globeGroup);
    this.rootGroup.add(this.neuralGroup);
    this.rootGroup.add(this.tesseractGroup);
    this.rootGroup.add(this.sonarGroup);

    // Colors by state
    this.currentThemeColor = new THREE.Color(0x00e5ff);
    this.targetThemeColor = new THREE.Color(0x00e5ff);

    // Mouse Interaction
    this.isDragging = false;
    this.prevMouse = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.isScanning = false;
    this.hazardPulse = 0;

    this.initLights();
    this.buildShield();
    this.buildGlobe();
    this.buildNeural();
    this.buildTesseract();
    this.buildSonar();
    this.setMode(state.vMode);
    this.bindEvents();
    this.animate();
  }

  initLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambient);

    this.pointLight = new THREE.PointLight(0x00e5ff, 2.5, 20);
    this.pointLight.position.set(0, 2, 4);
    this.scene.add(this.pointLight);
  }

  buildShield() {
    // Holographic Gyro rings
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 64);
    const ringGeo2 = new THREE.TorusGeometry(1.8, 0.02, 16, 64);
    const ringGeo3 = new THREE.TorusGeometry(1.3, 0.02, 16, 64);

    this.ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.6 });
    this.ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.5 });
    this.ringMat3 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.7 });

    this.ring1 = new THREE.Mesh(ringGeo1, this.ringMat1);
    this.ring2 = new THREE.Mesh(ringGeo2, this.ringMat2);
    this.ring3 = new THREE.Mesh(ringGeo3, this.ringMat3);

    this.shieldGroup.add(this.ring1);
    this.shieldGroup.add(this.ring2);
    this.shieldGroup.add(this.ring3);

    // Central 3D Hexagonal Defense Shield
    const hexShape = new THREE.Shape();
    const sides = 6;
    const radius = 0.95;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) hexShape.moveTo(x, y);
      else hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
    const shieldGeo = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);
    shieldGeo.center();

    this.shieldCoreMat = new THREE.MeshPhongMaterial({
      color: 0x061128,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.35,
      specular: 0x00e5ff,
      shininess: 80,
      transparent: true,
      opacity: 0.9
    });
    this.shieldCore = new THREE.Mesh(shieldGeo, this.shieldCoreMat);
    this.shieldGroup.add(this.shieldCore);

    // Wireframe overlay on shield
    const wireGeo = new THREE.WireframeGeometry(shieldGeo);
    this.shieldWireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
    this.shieldWire = new THREE.LineSegments(wireGeo, this.shieldWireMat);
    this.shieldCore.add(this.shieldWire);

    // Orbiting Defense Satellites
    this.satellites = [];
    const satGeo = new THREE.SphereGeometry(0.06, 12, 12);
    for (let i = 0; i < 4; i++) {
      const satMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const sat = new THREE.Mesh(satGeo, satMat);
      this.satellites.push({ mesh: sat, angle: (i * Math.PI) / 2, dist: 2.3, speed: 0.8 + i * 0.2 });
      this.shieldGroup.add(sat);
    }
  }

  buildGlobe() {
    // 3D Cyber Wireframe Globe
    const globeGeo = new THREE.SphereGeometry(1.6, 24, 24);
    this.globeWireMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.35 });
    this.globe = new THREE.Mesh(globeGeo, this.globeWireMat);
    this.globeGroup.add(this.globe);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.4, 16, 16);
    this.globeInnerMat = new THREE.MeshBasicMaterial({ color: 0x0a1636, transparent: true, opacity: 0.75 });
    this.globeInner = new THREE.Mesh(innerGeo, this.globeInnerMat);
    this.globeGroup.add(this.globeInner);

    // Hazard epicenter blips
    this.blips = [];
    for (let i = 0; i < 5; i++) {
      const blipGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const blipMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const blip = new THREE.Mesh(blipGeo, blipMat);
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;
      blip.position.set(1.65 * Math.cos(lat) * Math.sin(lon), 1.65 * Math.sin(lat), 1.65 * Math.cos(lat) * Math.cos(lon));
      this.globeGroup.add(blip);
      this.blips.push(blip);
    }
  }

  buildNeural() {
    // 3D Synaptic Neural Network
    const icosaGeo = new THREE.IcosahedronGeometry(1.6, 1);
    this.neuralWireMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.45 });
    this.neuralMesh = new THREE.Mesh(icosaGeo, this.neuralWireMat);
    this.neuralGroup.add(this.neuralMesh);

    // Synaptic nodes at vertices
    const pos = icosaGeo.attributes.position;
    const nodeGeo = new THREE.SphereGeometry(0.07, 8, 8);
    this.neuralNodes = [];
    for (let i = 0; i < pos.count; i += 3) {
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(pos.getX(i), pos.getY(i), pos.getZ(i));
      this.neuralGroup.add(node);
      this.neuralNodes.push(node);
    }
  }

  buildTesseract() {
    // Mode 4: 4D Quantum Threat Tesseract Cube
    const boxGeo = new THREE.BoxGeometry(2.3, 2.3, 2.3);
    this.tesseractOuterMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.5 });
    this.tesseractOuter = new THREE.Mesh(boxGeo, this.tesseractOuterMat);
    this.tesseractGroup.add(this.tesseractOuter);

    // Inner rotating quantum core cube
    const innerBoxGeo = new THREE.BoxGeometry(1.25, 1.25, 1.25);
    this.tesseractInnerMat = new THREE.MeshPhongMaterial({
      color: 0x0a1c3d,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.4,
      shininess: 90,
      transparent: true,
      opacity: 0.85
    });
    this.tesseractInner = new THREE.Mesh(innerBoxGeo, this.tesseractInnerMat);
    this.tesseractGroup.add(this.tesseractInner);

    // Corner connecting lines
    const edgeGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const corners = [-1, 1];
    for (let x of corners) {
      for (let y of corners) {
        for (let z of corners) {
          linePositions.push(x * 1.15, y * 1.15, z * 1.15);
          linePositions.push(x * 0.62, y * 0.62, z * 0.62);
        }
      }
    }
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    this.tesseractEdgesMat = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.65 });
    this.tesseractEdges = new THREE.LineSegments(edgeGeo, this.tesseractEdgesMat);
    this.tesseractGroup.add(this.tesseractEdges);
  }

  buildSonar() {
    // Mode 5: 3D Volumetric Sonar Radar Scanner
    for (let r of [0.8, 1.4, 2.0, 2.6]) {
      const ringGeo = new THREE.RingGeometry(r - 0.015, r + 0.015, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      this.sonarGroup.add(ring);
    }

    // Crosshairs
    const crossGeo = new THREE.BufferGeometry();
    crossGeo.setAttribute("position", new THREE.Float32BufferAttribute([
      -2.7, 0, 0,  2.7, 0, 0,
      0, 0, -2.7,  0, 0, 2.7
    ], 3));
    const crossMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.35 });
    this.sonarCross = new THREE.LineSegments(crossGeo, crossMat);
    this.sonarGroup.add(this.sonarCross);

    // Sweeping Radar Beam Cone
    const coneGeo = new THREE.ConeGeometry(2.6, 0.4, 32, 1, true, 0, Math.PI / 3);
    this.sonarBeamMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    this.sonarBeam = new THREE.Mesh(coneGeo, this.sonarBeamMat);
    this.sonarBeam.rotation.x = -Math.PI / 2;
    this.sonarBeamGroup = new THREE.Group();
    this.sonarBeamGroup.add(this.sonarBeam);
    this.sonarGroup.add(this.sonarBeamGroup);

    // Lock-on Target Markers
    this.sonarTargets = [];
    for (let i = 0; i < 4; i++) {
      const tgtGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const tgtMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tgt = new THREE.Mesh(tgtGeo, tgtMat);
      const angle = (i * Math.PI) / 2 + 0.35;
      const dist = 1.1 + i * 0.4;
      const altitude = 0.3 + (i % 2) * 0.4;
      tgt.position.set(dist * Math.cos(angle), altitude, dist * Math.sin(angle));
      this.sonarGroup.add(tgt);
      this.sonarTargets.push(tgt);
    }
  }

  setMode(mode) {
    state.vMode = mode;
    this.shieldGroup.visible = mode === "shield";
    this.globeGroup.visible = mode === "globe";
    this.neuralGroup.visible = mode === "neural";
    this.tesseractGroup.visible = mode === "tesseract";
    this.sonarGroup.visible = mode === "sonar";

    document.querySelectorAll(".mode-chip").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.vmode === mode);
    });
    sfx.blip(1100, 0.03);
  }

  zoomIn() {
    this.camera.position.z = Math.max(3.0, this.camera.position.z - 0.7);
    sfx.blip(900, 0.02);
  }

  zoomOut() {
    this.camera.position.z = Math.min(14.0, this.camera.position.z + 0.7);
    sfx.blip(750, 0.02);
  }

  resetView() {
    this.targetRotation = { x: 0, y: 0 };
    this.camera.position.set(0, 0, 7);
    sfx.sonar();
  }

  toggleWireframe() {
    state.isWireframe = !state.isWireframe;
    this.scene.traverse((child) => {
      if (child.material && child.material.wireframe !== undefined) {
        child.material.wireframe = state.isWireframe;
      }
    });
    sfx.blip(1050, 0.03);
    showToast(`Wireframe Shading: ${state.isWireframe ? "ON" : "OFF"}`);
  }

  toggleExplode() {
    state.isExploded = !state.isExploded;
    const factor = state.isExploded ? 1.55 : 1.0;
    this.shieldGroup.scale.set(factor, factor, factor);
    this.tesseractOuter.scale.set(factor, factor, factor);
    sfx.sonar();
    showToast(`Exploded Deconstruct: ${state.isExploded ? "ON" : "OFF"}`);
  }

  setVerdict(verdict, score = 50) {
    const verdictUpper = (verdict || "INSUFFICIENT_EVIDENCE").toUpperCase();
    if (verdictUpper === "DANGEROUS") {
      this.targetThemeColor.setHex(0xef4444);
      $("hudState").textContent = "CRITICAL ALERT";
      $("hudDefense").textContent = "SPIKE BARRIER";
      this.hazardPulse = 1.0;
    } else if (verdictUpper === "SUSPICIOUS") {
      this.targetThemeColor.setHex(0xf59e0b);
      $("hudState").textContent = "SUSPICIOUS HAZARD";
      $("hudDefense").textContent = "MONITORING";
      this.hazardPulse = 0.5;
    } else if (verdictUpper === "SAFE") {
      this.targetThemeColor.setHex(0x10b981);
      $("hudState").textContent = "VERIFIED SAFE";
      $("hudDefense").textContent = "SECURE HARMONY";
      this.hazardPulse = 0.0;
    } else {
      this.targetThemeColor.setHex(0x00e5ff);
      $("hudState").textContent = "STANDBY SCAN";
      $("hudDefense").textContent = "ACTIVE";
      this.hazardPulse = 0.0;
    }
  }

  setScanning(scanning) {
    this.isScanning = scanning;
    if (scanning) {
      $("hudState").textContent = "DEEP SCAN IN PROGRESS";
    }
  }

  bindEvents() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mouseup", () => {
      this.isDragging = false;
    });
    window.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.prevMouse.x;
        const dy = e.clientY - this.prevMouse.y;
        this.targetRotation.y += dx * 0.008;
        this.targetRotation.x += dy * 0.008;
        this.prevMouse = { x: e.clientX, y: e.clientY };
      }
    });

    // Mouse wheel zoom
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY < 0) this.zoomIn();
      else this.zoomOut();
    });

    // Touch support
    this.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });
    window.addEventListener("touchend", () => {
      this.isDragging = false;
    });
    window.addEventListener("touchmove", (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - this.prevMouse.x;
        const dy = e.touches[0].clientY - this.prevMouse.y;
        this.targetRotation.y += dx * 0.008;
        this.targetRotation.x += dy * 0.008;
        this.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    this.canvas.addEventListener("dblclick", () => this.resetView());

    window.addEventListener("resize", () => {
      if (!this.canvas) return;
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.currentThemeColor.lerp(this.targetThemeColor, 0.05);

    // Apply color to active materials
    if (this.ringMat1) this.ringMat1.color.copy(this.currentThemeColor);
    if (this.shieldWireMat) this.shieldWireMat.color.copy(this.currentThemeColor);
    if (this.shieldCoreMat) this.shieldCoreMat.emissive.copy(this.currentThemeColor);
    if (this.globeWireMat) this.globeWireMat.color.copy(this.currentThemeColor);
    if (this.tesseractOuterMat) this.tesseractOuterMat.color.copy(this.currentThemeColor);
    if (this.pointLight) this.pointLight.color.copy(this.currentThemeColor);

    const speedMult = (this.isScanning ? 3.0 : 1.0) * state.rotationSpeed;
    this.targetRotation.y += 0.005 * speedMult;

    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.08;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.08;

    this.rootGroup.rotation.x = this.currentRotation.x;
    this.rootGroup.rotation.y = this.currentRotation.y;

    // Shield Rings
    if (this.ring1) {
      this.ring1.rotation.x = time * 0.4 * speedMult;
      this.ring1.rotation.y = time * 0.3 * speedMult;
    }
    if (this.ring2) {
      this.ring2.rotation.y = -time * 0.35 * speedMult;
      this.ring2.rotation.z = time * 0.25 * speedMult;
    }

    // Tesseract Counter-Rotation
    if (this.tesseractOuter && this.tesseractInner) {
      this.tesseractOuter.rotation.x = time * 0.3 * speedMult;
      this.tesseractOuter.rotation.y = time * 0.2 * speedMult;
      this.tesseractInner.rotation.x = -time * 0.5 * speedMult;
      this.tesseractInner.rotation.z = time * 0.4 * speedMult;
    }

    // Sonar Radar Sweep
    if (this.sonarBeamGroup) {
      this.sonarBeamGroup.rotation.y = time * 1.8 * speedMult;
    }

    // Defense Satellites
    if (this.satellites) {
      this.satellites.forEach(sat => {
        sat.angle += 0.02 * sat.speed * speedMult;
        sat.mesh.position.set(
          sat.dist * Math.cos(sat.angle),
          sat.dist * 0.3 * Math.sin(sat.angle * 2),
          sat.dist * Math.sin(sat.angle)
        );
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ============================================================================
// 3D Background Environment & Undulating Grid Floor
// ============================================================================
class BackgroundEnvironment3D {
  constructor(canvasId) {
    this.canvas = $(canvasId);
    if (!this.canvas || typeof THREE === "undefined") return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
    this.camera.position.z = 250;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    this.clock = new THREE.Clock();
    this.particles = null;
    this.gridFloor = null;

    this.initParticles();
    this.initGridFloor();
    this.bindEvents();
    this.animate();
  }

  initParticles() {
    if (this.particles) this.scene.remove(this.particles);

    const count = Math.floor(550 * (state.particleDensity / 100));
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color(0x00e5ff);
    const color2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 650;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 650;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 650;

      const mixed = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: state.particleStyle === "plasma" ? 4.5 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  initGridFloor() {
    if (this.gridFloor) this.scene.remove(this.gridFloor);
    if (!state.gridFloorEnabled) return;

    const planeGeo = new THREE.PlaneGeometry(800, 800, 36, 36);
    this.gridFloorMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    this.gridFloor = new THREE.Mesh(planeGeo, this.gridFloorMat);
    this.gridFloor.rotation.x = -Math.PI / 2.2;
    this.gridFloor.position.set(0, -110, -50);
    this.scene.add(this.gridFloor);
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("mousemove", (e) => {
      const mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
      const mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
      this.camera.position.x += (mouseX - this.camera.position.x) * 0.02;
      this.camera.position.y += (-mouseY - this.camera.position.y) * 0.02;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const time = this.clock.getElapsedTime();

    if (this.particles) {
      this.particles.rotation.y += 0.0006 * state.rotationSpeed;
      this.particles.rotation.x += 0.0003 * state.rotationSpeed;
    }

    // Undulating wave deformation on grid floor
    if (this.gridFloor && this.gridFloor.geometry) {
      const pos = this.gridFloor.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.025 + time * 1.5) * Math.cos(v * 0.025 + time * 1.5) * 8.0;
        pos.setZ(i, z);
      }
      this.gridFloor.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global visualizer instances
let threatCore3D = null;
let bgEnvironment3D = null;

// ============================================================================
// 3D Spatial UI & Card Tilt Physics
// ============================================================================
function setup3dCardPhysics() {
  const cards = document.querySelectorAll(".tilt-3d");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      if (!state.tilt3dEnabled || state.tiltIntensity === 0) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const mult = state.tiltIntensity / 10;

      card.style.transform = `perspective(1200px) rotateX(${-dy * 6.5 * mult}deg) rotateY(${dx * 6.5 * mult}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
}

// ============================================================================
// Core Application Logic & Event Listeners
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(state.activeTheme);
  applyLanguage(state.language);
  updateSoundIcon();

  // Initialize 3D engines
  try {
    threatCore3D = new ThreatVisualizer3D("threatCanvas3d");
    bgEnvironment3D = new BackgroundEnvironment3D("bgCanvas3d");
  } catch (e) {
    console.warn("3D initialization fallback:", e);
  }

  setup3dCardPhysics();
  setupEventListeners();
  initVoiceCallTranscriber();
  checkBackendHealth();
  loadHistory();
  initHoneypotUI();
});

function setupEventListeners() {
  // Input Mode Switching (Text vs Screenshot vs Voice)
  $("tabModeText").addEventListener("click", () => { switchInputMode("text"); updateDockPills("text"); });
  $("tabModeImage").addEventListener("click", () => { switchInputMode("image"); updateDockPills("image"); });
  $("tabModeVoice").addEventListener("click", () => { switchInputMode("voice"); updateDockPills("voice"); });

  // Vision Pro Floating Spatial Dock Navigation
  initSpatialDock();

  // Topbar Language Selector
  if ($("topLangSelect")) {
    $("topLangSelect").value = state.language;
    $("topLangSelect").addEventListener("change", (e) => {
      applyLanguage(e.target.value);
      showToast(`Language updated to ${e.target.options[e.target.selectedIndex].text}`);
      sfx.blip(1100, 0.03);
    });
  }
  if ($("languageSelect")) {
    $("languageSelect").value = state.language;
    $("languageSelect").addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });
  }

  // Step-by-Step How To Use Guide Modal
  if ($("openHowToUseBtn")) {
    $("openHowToUseBtn").addEventListener("click", () => $("howToUseDialog") && $("howToUseDialog").showModal());
  }
  if ($("closeHowToUseDialog")) {
    $("closeHowToUseDialog").addEventListener("click", () => $("howToUseDialog") && $("howToUseDialog").close());
  }
  if ($("startUsingScamLensBtn")) {
    $("startUsingScamLensBtn").addEventListener("click", () => {
      if ($("howToUseDialog")) $("howToUseDialog").close();
      $("messageInput").focus();
    });
  }

  // 1-Click Guide Presets
  document.querySelectorAll("[data-guide-preset]").forEach(btn => {
    btn.addEventListener("click", () => {
      const presetKey = btn.dataset.guidePreset;
      const data = PRESET_SCENARIOS[presetKey];
      if (!data) return;
      if ($("howToUseDialog")) $("howToUseDialog").close();
      switchInputMode(data.type === "voice_call" ? "voice" : "text");
      updateDockPills(data.type === "voice_call" ? "voice" : "text");
      state.selectedType = data.type;
      $("messageInput").value = data.text;
      if ($("voiceTranscriptArea")) $("voiceTranscriptArea").value = data.text;
      updateCharCounter();
      showToast(`Loaded "${btn.textContent.trim()}"`);
      sfx.sonar();
    });
  });

  // PII Redactor Switch
  if ($("piiMaskToggle")) {
    $("piiMaskToggle").checked = state.piiMasking;
    $("piiMaskToggle").addEventListener("change", (e) => {
      state.piiMasking = e.target.checked;
      localStorage.setItem("scamlens_pii", state.piiMasking);
      showToast(`Client E2EE PII Masking: ${state.piiMasking ? "ENABLED" : "DISABLED"}`);
      sfx.blip(1200, 0.03);
    });
  }

  // Message Type Pills
  document.querySelectorAll(".type-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedType = btn.dataset.type;
      document.querySelectorAll(".type-pill").forEach(b => b.classList.toggle("active", b === btn));
      $("messageInput").placeholder = `Paste suspect ${state.selectedType.replace("_", " ")} communication here…`;
      sfx.blip(900, 0.02);
    });
  });

  // Char Counter
  $("messageInput").addEventListener("input", updateCharCounter);

  // Clear Button
  $("clearBtn").addEventListener("click", () => {
    $("messageInput").value = "";
    $("voiceTranscriptArea").value = "";
    $("charCount").textContent = "0 / 20000";
    clearImage();
    $("messageInput").focus();
    sfx.blip(600, 0.02);
  });

  // Presets
  document.querySelectorAll(".preset-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      const presetKey = btn.dataset.preset;
      const data = PRESET_SCENARIOS[presetKey];
      if (!data) return;

      switchInputMode(data.type === "voice_call" ? "voice" : "text");
      state.selectedType = data.type;
      document.querySelectorAll(".type-pill").forEach(b => b.classList.toggle("active", b.dataset.type === data.type));
      $("messageInput").value = data.text;
      if ($("voiceTranscriptArea")) $("voiceTranscriptArea").value = data.text;
      updateCharCounter();
      sfx.sonar();
      showToast(`Loaded "${btn.textContent.trim()}" preset.`);
    });
  });

  // Visualizer 3D Mode Chips
  document.querySelectorAll(".mode-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      if (threatCore3D) threatCore3D.setMode(btn.dataset.vmode);
    });
  });

  // 3D Viewport Controls Toolbar
  $("btnZoomIn").addEventListener("click", () => threatCore3D && threatCore3D.zoomIn());
  $("btnZoomOut").addEventListener("click", () => threatCore3D && threatCore3D.zoomOut());
  $("btnResetView").addEventListener("click", () => threatCore3D && threatCore3D.resetView());
  $("btnWireframeToggle").addEventListener("click", () => threatCore3D && threatCore3D.toggleWireframe());
  $("btnExplodeToggle").addEventListener("click", () => threatCore3D && threatCore3D.toggleExplode());
  $("btnFullscreen3D").addEventListener("click", openFullscreenHoloDeck);
  $("closeHoloModal").addEventListener("click", () => $("holoModal").close());

  // 3D Spatial Tilt Toggle in Topbar
  $("tilt3dToggleBtn").addEventListener("click", () => {
    state.tilt3dEnabled = !state.tilt3dEnabled;
    localStorage.setItem("scamlens_tilt3d", state.tilt3dEnabled);
    $("tilt3dLabel").textContent = state.tilt3dEnabled ? "3D TILT: ON" : "3D TILT: OFF";
    showToast(`3D Spatial Card Tilt: ${state.tilt3dEnabled ? "ENABLED" : "DISABLED"}`);
    sfx.blip(950, 0.03);
  });

  // Image Upload / Drag & Drop
  const dropzone = $("imageDropzone");
  const fileInput = $("imageFileInput");
  $("browseImageBtn").addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("click", (e) => {
    if (e.target !== $("removeImageBtn") && !state.selectedImageBase64) fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length) handleImageFile(e.target.files[0]);
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("dragover");
  });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
  });

  // Clipboard Paste for screenshots (Ctrl+V)
  window.addEventListener("paste", (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
      if (item.type.indexOf("image") === 0) {
        const file = item.getAsFile();
        switchInputMode("image");
        handleImageFile(file);
        showToast("Pasted screenshot from clipboard.");
        break;
      }
    }
  });

  $("removeImageBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    clearImage();
  });

  // Analyze Action
  $("analyzeBtn").addEventListener("click", executeInvestigation);

  // Findings Actions
  $("downloadBtn").addEventListener("click", downloadReportJSON);
  $("printBtn").addEventListener("click", () => window.print());
  $("copyComplaintBtn").addEventListener("click", copyOfficialComplaint);
  $("speakReportBtn").addEventListener("click", toggleSpeechBriefing);
  $("openEvidencePackBtn").addEventListener("click", openEvidencePackModal);
  $("closeEvidenceDialog").addEventListener("click", () => $("evidenceDialog").close());
  $("copyEvidenceTextBtn").addEventListener("click", copyEvidencePackText);
  $("downloadEvidenceTxtBtn").addEventListener("click", downloadEvidencePackTxt);
  $("printEvidenceDocBtn").addEventListener("click", () => window.print());

  // Sound Toggle
  $("soundToggleBtn").addEventListener("click", () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem("scamlens_sound", state.soundEnabled);
    updateSoundIcon();
    if (state.soundEnabled) sfx.blip(1200, 0.05);
    showToast(`Sound FX ${state.soundEnabled ? "Enabled" : "Muted"}.`);
  });

  // Settings / Customizer Dialog
  $("openSettingsBtn").addEventListener("click", openSettingsModal);
  $("closeSettings").addEventListener("click", () => $("settingsDialog").close());
  $("saveSettingsBtn").addEventListener("click", saveSettingsModal);
  $("resetSettingsBtn").addEventListener("click", resetSettingsDefaults);
  $("testGeminiKeyBtn").addEventListener("click", testGeminiKeyInModal);

  // Theme buttons in Settings
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyTheme(btn.dataset.themeName);
      sfx.blip(950, 0.03);
    });
  });

  // Color Pickers for Custom Theme
  ["customPrimaryColor", "customSecondaryColor", "customBgColor"].forEach(id => {
    $(id).addEventListener("input", applyCustomPaletteColors);
  });

  // 3D Tuning Sliders
  $("particleDensitySlider").addEventListener("input", (e) => {
    $("particleDensityVal").textContent = `${e.target.value}%`;
    state.particleDensity = Number(e.target.value);
    if (bgEnvironment3D) bgEnvironment3D.initParticles();
  });

  $("speedSlider").addEventListener("input", (e) => {
    state.rotationSpeed = Number(e.target.value) / 10;
    $("speedVal").textContent = `${state.rotationSpeed.toFixed(1)}x`;
  });

  $("tiltIntensitySlider").addEventListener("input", (e) => {
    state.tiltIntensity = Number(e.target.value);
    $("tiltIntensityVal").textContent = state.tiltIntensity === 0 ? "Off" : state.tiltIntensity > 12 ? "Extreme 3D" : "Balanced 3D";
  });

  $("soundPackSelect").addEventListener("change", (e) => {
    state.soundPack = e.target.value;
    localStorage.setItem("scamlens_sound_pack", state.soundPack);
    sfx.sonar();
  });

  $("volumeSlider").addEventListener("input", (e) => {
    state.soundVolume = Number(e.target.value) / 100;
    $("volumeVal").textContent = `${e.target.value}%`;
    localStorage.setItem("scamlens_sound_volume", e.target.value);
  });

  // Config Backup & Migration
  $("exportProfileBtn").addEventListener("click", exportProfileConfig);
  $("importProfileBtn").addEventListener("click", () => $("importProfileFileInput").click());
  $("importProfileFileInput").addEventListener("change", importProfileConfig);

  // About Dialog
  $("aboutBtn").addEventListener("click", () => $("aboutDialog").showModal());
  $("closeAbout").addEventListener("click", () => $("aboutDialog").close());

  // Tool 02: Link Scanner
  $("urlScanBtn").addEventListener("click", executeUrlScan);

  // Tool 03: QR & Payment Forensics
  $("paymentScanBtn").addEventListener("click", executePaymentScan);

  // Tool 04: SMS Sender ID Inspector
  $("senderIdScanBtn").addEventListener("click", executeSenderIdScan);

  // Tool 05: Honeypot Simulator
  $("honeypotScenarioSelect").addEventListener("change", () => {
    renderHoneypotReplies($("honeypotScenarioSelect").value);
  });

  // Tool 06: Gemini Copilot
  $("copilotBtn").addEventListener("click", executeCopilotQuestion);
  document.querySelectorAll(".copilot-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      $("copilotQuestion").value = pill.textContent.trim();
      executeCopilotQuestion();
    });
  });

  // Vault History Controls
  $("historyFilterSelect").addEventListener("change", loadHistory);
  $("historySearchInput").addEventListener("input", filterHistoryList);
  $("refreshHistoryBtn").addEventListener("click", () => {
    loadHistory();
    sfx.blip(1000, 0.02);
  });
  $("clearAllHistoryBtn").addEventListener("click", clearEntireHistory);
}

function updateCharCounter() {
  const len = $("messageInput").value.length;
  $("charCount").textContent = `${len} / 20000`;
}

function switchInputMode(mode) {
  state.inputMode = mode;
  $("tabModeText").classList.toggle("active", mode === "text");
  $("tabModeImage").classList.toggle("active", mode === "image");
  $("tabModeVoice").classList.toggle("active", mode === "voice");

  $("textInputContainer").style.display = mode === "text" ? "block" : "none";
  $("imageInputContainer").style.display = mode === "image" ? "block" : "none";
  $("voiceInputContainer").style.display = mode === "voice" ? "block" : "none";

  updateDockPills(mode);
  sfx.blip(1000, 0.02);
}

function initSpatialDock() {
  if ($("dockPillText")) $("dockPillText").addEventListener("click", () => navigateToDock("text", "inputPanel"));
  if ($("dockPillVision")) $("dockPillVision").addEventListener("click", () => navigateToDock("image", "inputPanel"));
  if ($("dockPillVoice")) $("dockPillVoice").addEventListener("click", () => navigateToDock("voice", "inputPanel"));

  document.querySelectorAll(".dock-pill[data-nav-target]").forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = pill.dataset.navTarget;
      navigateToDock(null, targetId);
    });
  });

  if ($("dockPillGuide")) {
    $("dockPillGuide").addEventListener("click", () => {
      if ($("howToUseDialog")) $("howToUseDialog").showModal();
      sfx.blip(1200, 0.03);
    });
  }

  setupScrollSpy();
}

function navigateToDock(mode, targetId) {
  if (mode) {
    switchInputMode(mode);
  }

  // Update active pill styling immediately
  document.querySelectorAll(".dock-pill").forEach(p => p.classList.remove("active"));
  let activePill = null;
  if (mode === "text") activePill = $("dockPillText");
  else if (mode === "image") activePill = $("dockPillVision");
  else if (mode === "voice") activePill = $("dockPillVoice");
  else if (targetId) activePill = document.querySelector(`.dock-pill[data-nav-target="${targetId}"]`);
  if (activePill) activePill.classList.add("active");

  const targetEl = $(targetId);
  if (targetEl) {
    // 155px offset ensures sticky header and spatial dock never obscure the section heading
    const yOffset = -155;
    const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

    targetEl.classList.remove("section-spatial-glow");
    void targetEl.offsetWidth; // Force CSS animation restart
    targetEl.classList.add("section-spatial-glow");
    setTimeout(() => targetEl.classList.remove("section-spatial-glow"), 2200);

    // Auto-focus relevant input fields for immediate usability
    if (targetId === "urlScannerSection") setTimeout(() => $("urlInput") && $("urlInput").focus(), 450);
    else if (targetId === "paymentScannerSection") setTimeout(() => $("paymentInput") && $("paymentInput").focus(), 450);
    else if (targetId === "senderScannerSection") setTimeout(() => $("senderIdInput") && $("senderIdInput").focus(), 450);
    else if (targetId === "copilotSection") setTimeout(() => $("copilotQuestion") && $("copilotQuestion").focus(), 450);
    else if (targetId === "vaultSection") loadHistory();
  }
  sfx.blip(1000, 0.02);
}

function updateDockPills(mode) {
  document.querySelectorAll(".dock-pill").forEach(p => p.classList.remove("active"));
  if (mode === "text" && $("dockPillText")) $("dockPillText").classList.add("active");
  else if (mode === "image" && $("dockPillVision")) $("dockPillVision").classList.add("active");
  else if (mode === "voice" && $("dockPillVoice")) $("dockPillVoice").classList.add("active");
}

function setupScrollSpy() {
  const sections = [
    { el: $("inputPanel"), pill: $("dockPillText") },
    { el: $("urlScannerSection"), pill: $("dockPillUrl") },
    { el: $("paymentScannerSection"), pill: $("dockPillPayment") },
    { el: $("senderScannerSection"), pill: $("dockPillSender") },
    { el: $("honeypotSection"), pill: $("dockPillHoneypot") },
    { el: $("vaultSection"), pill: $("dockPillVault") }
  ];

  let scrollTimeout = null;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      const scrollPos = window.scrollY + 220;
      let currentSection = null;
      for (const s of sections) {
        if (!s.el) continue;
        const top = s.el.offsetTop;
        const height = s.el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = s;
          break;
        }
      }
      if (currentSection && currentSection.pill) {
        document.querySelectorAll(".dock-pill").forEach(p => p.classList.remove("active"));
        currentSection.pill.classList.add("active");
      }
    }, 100);
  }, { passive: true });
}

function handleImageFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("Please select a valid image file (PNG, JPEG, WebP).");
    return;
  }
  state.selectedImageMime = file.type;
  const reader = new FileReader();
  reader.onload = (e) => {
    state.selectedImageBase64 = e.target.result;
    $("imagePreviewImg").src = e.target.result;
    $("imageMetaText").textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    $("dropzonePrompt").style.display = "none";
    $("imagePreviewWrap").style.display = "block";
    sfx.success();
    showToast("Screenshot loaded ready for Gemini Vision analysis.");
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  state.selectedImageBase64 = null;
  $("imageFileInput").value = "";
  $("dropzonePrompt").style.display = "flex";
  $("imagePreviewWrap").style.display = "none";
}

function updateSoundIcon() {
  $("soundIcon").textContent = state.soundEnabled ? "🔊" : "🔇";
}

// ============================================================================
// Real-Time Web Audio Oscilloscope & Acoustic Voice Transcriber
// ============================================================================
let audioVizCtx = null;
let audioVizAnalyser = null;
let audioVizSource = null;
let audioVizAnimId = null;
let liveAudioStream = null;
let liveMediaRecorder = null;
let liveAudioChunks = [];
let recordingTimerInterval = null;
let recordingSeconds = 0;

function initLiveAudioVisualizer() {
  const canvas = $("liveAudioVisualizer");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function draw() {
    audioVizAnimId = requestAnimationFrame(draw);
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    if (state.isRecording && audioVizAnalyser) {
      const bufferLength = audioVizAnalyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      audioVizAnalyser.getByteTimeDomainData(dataArray);

      // Glowing oscilloscope wave
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.95)";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.beginPath();

      const sliceWidth = (w * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * h) / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }

      ctx.lineTo(w, h / 2);
      ctx.stroke();
    } else {
      // Idle ambient scanning radar beam
      const time = Date.now() * 0.002;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        const y = h / 2 + Math.sin(x * 0.04 + time) * 4 * Math.sin(time * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  draw();
}

function initVoiceCallTranscriber() {
  initLiveAudioVisualizer();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognizer = null;

  if (SpeechRecognition) {
    recognizer = new SpeechRecognition();
    recognizer.continuous = true;
    recognizer.interimResults = true;
    recognizer.lang = state.language === "hi" ? "hi-IN" : state.language === "te" ? "te-IN" : state.language === "ta" ? "ta-IN" : state.language === "es" ? "es-ES" : state.language === "fr" ? "fr-FR" : "en-US";

    recognizer.onresult = (e) => {
      let transcript = "";
      for (let i = 0; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript + " ";
      }
      $("voiceTranscriptArea").value = transcript;
      $("messageInput").value = transcript;
      updateCharCounter();
    };

    recognizer.onerror = (e) => {
      console.warn("Speech recognition event:", e.error);
    };

    recognizer.onend = () => {
      if (state.isRecording) {
        try { recognizer.start(); } catch (_) {}
      }
    };
    state.speechRecognition = recognizer;
  }

  // Handle Record Button Toggle
  $("micRecordBtn").addEventListener("click", async () => {
    if (!state.isRecording) {
      await startAudioRecording();
    } else {
      await stopAudioRecording();
    }
  });

  // Handle Dedicated Stop Recording Button
  if ($("stopRecordBtn")) {
    $("stopRecordBtn").addEventListener("click", async (e) => {
      e.stopPropagation();
      await stopAudioRecording();
    });
  }

  // Simulated Call Preset Buttons
  document.querySelectorAll(".call-sim-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const callData = SIMULATED_CALLS[btn.dataset.callPreset];
      if (!callData) return;

      $("voiceTranscriptArea").value = callData.text;
      $("messageInput").value = callData.text;
      state.selectedType = "voice_call";
      updateCharCounter();
      sfx.alert();
      showToast(`Injected simulated dialogue: ${callData.speaker}`);
    });
  });
}

async function startAudioRecording() {
  if (state.isRecording) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    liveAudioStream = stream;

    // Connect Web Audio API Analyser
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioVizCtx = new AudioContextClass();
    audioVizSource = audioVizCtx.createMediaStreamSource(stream);
    audioVizAnalyser = audioVizCtx.createAnalyser();
    audioVizAnalyser.fftSize = 256;
    audioVizSource.connect(audioVizAnalyser);

    // Setup MediaRecorder
    liveAudioChunks = [];
    liveMediaRecorder = new MediaRecorder(stream);
    liveMediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) liveAudioChunks.push(e.data);
    };
    liveMediaRecorder.start(200);

    // Setup Speech Recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      if (state.speechRecognition) {
        try {
          state.speechRecognition.onend = null;
          state.speechRecognition.onerror = null;
          state.speechRecognition.onresult = null;
          state.speechRecognition.abort();
        } catch (_) {}
      }
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = true;
      const langMap = {
        hi: "hi-IN", te: "te-IN", ta: "ta-IN", bn: "bn-IN", mr: "mr-IN", gu: "gu-IN",
        es: "es-ES", fr: "fr-FR", de: "de-DE", ar: "ar-SA", zh: "zh-CN", ja: "ja-JP"
      };
      recognizer.lang = langMap[state.language] || "en-US";
      recognizer.onresult = (e) => {
        let transcript = "";
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript + " ";
        }
        $("voiceTranscriptArea").value = transcript;
        $("messageInput").value = transcript;
        updateCharCounter();
      };
      recognizer.onerror = (e) => {
        console.warn("Speech recognition event:", e.error);
      };
      recognizer.onend = () => {
        if (state.isRecording && state.speechRecognition) {
          try { recognizer.start(); } catch (_) {}
        }
      };
      state.speechRecognition = recognizer;
      try { recognizer.start(); } catch (_) {}
    }

    state.isRecording = true;
    $("micRecordBtn").classList.add("recording");
    $("micRecordBtn").innerHTML = `<span class="mic-icon">⏹</span><div class="mic-wave-ring"></div>`;
    $("micRecordBtn").title = "Click to STOP recording";
    $("voiceWaveform").classList.add("active");
    $("micStatusText").textContent = "🔴 RECORDING LIVE CALL... SPEAK OR CLICK TO STOP";
    $("audioRecordingOverlay").style.display = "flex";
    if ($("stopRecordBtn")) $("stopRecordBtn").style.display = "inline-flex";

    recordingSeconds = 0;
    $("recordingTimer").textContent = "LIVE RECORDING • 00:00";
    clearInterval(recordingTimerInterval);
    recordingTimerInterval = setInterval(() => {
      recordingSeconds++;
      const mins = String(Math.floor(recordingSeconds / 60)).padStart(2, "0");
      const secs = String(recordingSeconds % 60).padStart(2, "0");
      $("recordingTimer").textContent = `LIVE RECORDING • ${mins}:${secs}`;
    }, 1000);

    sfx.sonar();
    showToast("Microphone ON! Speak your suspect call or message.");
  } catch (err) {
    state.isRecording = false;
    $("micStatusText").textContent = "Microphone access blocked. Click browser lock icon to allow or use presets.";
    if ($("stopRecordBtn")) $("stopRecordBtn").style.display = "none";
    showToast("Microphone permission denied or not available. Use call presets below.");
    sfx.alert();
  }
}

async function stopAudioRecording() {
  state.isRecording = false;
  clearInterval(recordingTimerInterval);
  recordingTimerInterval = null;

  // Immediate UI feedback
  $("micRecordBtn").classList.remove("recording");
  $("micRecordBtn").innerHTML = `<span class="mic-icon">🎙️</span><div class="mic-wave-ring"></div>`;
  $("micRecordBtn").title = "Click to START recording";
  $("voiceWaveform").classList.remove("active");
  $("micStatusText").textContent = "✅ Microphone OFF. Audio captured & ready.";
  $("audioRecordingOverlay").style.display = "none";
  if ($("stopRecordBtn")) $("stopRecordBtn").style.display = "none";

  // Stop & disconnect Speech Recognition completely so Chrome releases mic
  if (state.speechRecognition) {
    const rec = state.speechRecognition;
    state.speechRecognition = null; // prevents onend from restarting
    rec.onend = null;
    rec.onerror = null;
    rec.onresult = null;
    try { rec.abort(); } catch (_) {}
    try { rec.stop(); } catch (_) {}
  }

  // Stop MediaRecorder
  if (liveMediaRecorder && liveMediaRecorder.state !== "inactive") {
    try { liveMediaRecorder.stop(); } catch (_) {}
  }

  // Completely release hardware microphone tracks
  if (liveAudioStream) {
    try {
      liveAudioStream.getTracks().forEach(track => {
        try {
          track.stop();
          track.enabled = false;
        } catch (_) {}
      });
    } catch (_) {}
    liveAudioStream = null;
  }

  // Close and clean Web Audio graph so hardware microphone turns off completely
  if (audioVizSource) {
    try { audioVizSource.disconnect(); } catch (_) {}
    audioVizSource = null;
  }
  if (audioVizAnalyser) {
    try { audioVizAnalyser.disconnect(); } catch (_) {}
    audioVizAnalyser = null;
  }
  if (audioVizCtx) {
    try {
      if (audioVizCtx.state !== "closed") {
        await audioVizCtx.close();
      }
    } catch (_) {}
    audioVizCtx = null;
  }

  sfx.blip(850, 0.05);
  showToast("Microphone recording stopped successfully.");

  // Process chunks into Base64 for analysis
  setTimeout(() => {
    if (liveAudioChunks.length > 0) {
      const audioBlob = new Blob(liveAudioChunks, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => {
        state.recordedAudioBase64 = reader.result;
        $("micStatusText").textContent = "✅ Microphone OFF. Audio saved. Click 'Execute' to analyze.";
      };
      reader.readAsDataURL(audioBlob);
    }
  }, 250);
}

// Client-Side PII Masking / E2EE Redaction
function redactPII(text) {
  if (!text) return text;
  return text
    .replace(/\b(?:\+?\d{1,3}[-.\s]?)?[6-9]\d{9}\b/g, "[REDACTED_PHONE_XXXX]")
    .replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b/g, "[REDACTED_CARD_XXXX]")
    .replace(/\b\d{4}\s\d{4}\s\d{4}\b/g, "[REDACTED_AADHAAR_XXXX]")
    .replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, "[REDACTED_PAN_XXXX]")
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[REDACTED_EMAIL]")
    .replace(/\b(?<!\d)\d{4,8}(?!\d)\b(?=.*(?:otp|pin|code|password))/gi, "[REDACTED_OTP]");
}

// ============================================================================
// Execution Engine (Text vs Vision Screenshot vs Voice Call Audio)
// ============================================================================
async function executeInvestigation() {
  const isImageMode = state.inputMode === "image";
  const isVoiceMode = state.inputMode === "voice";
  let messageText = $("messageInput").value.trim();

  // Check reCAPTCHA verification
  const recaptchaCheck = $("recaptchaCheckbox");
  if (recaptchaCheck && !recaptchaCheck.checked) {
    showToast("Please verify the Google reCAPTCHA shield before scanning.");
    sfx.alert();
    return;
  }

  if (isImageMode && !state.selectedImageBase64) {
    showToast("Please upload or paste a screenshot first.");
    return;
  }

  if (isVoiceMode && !state.recordedAudioBase64 && messageText.length < 3) {
    showToast("Please record call audio with mic or select a call preset.");
    return;
  }

  if (!isImageMode && !isVoiceMode && messageText.length < 2) {
    showToast("Please enter a suspect message of at least 2 characters.");
    $("messageInput").focus();
    return;
  }

  // Client-side E2EE PII Masking if enabled
  const piiToggle = $("piiMaskToggle");
  if (piiToggle && piiToggle.checked) {
    messageText = redactPII(messageText);
  }

  setScanningUI(true);
  sfx.sonar();

  try {
    let response;
    if (isVoiceMode) {
      response = await fetch("/api/analyze-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audio_base64: state.recordedAudioBase64 || undefined,
          transcript: messageText || $("voiceTranscriptArea").value.trim(),
          language: state.language,
          api_key: state.geminiKey || undefined,
          model: state.geminiModel || undefined,
          recaptcha_token: "demo-passed"
        })
      });
    } else if (isImageMode) {
      response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: state.selectedImageBase64,
          mime_type: state.selectedImageMime,
          message_type: state.selectedType,
          language: state.language,
          api_key: state.geminiKey || undefined,
          model: state.geminiModel || undefined,
          recaptcha_token: "demo-passed"
        })
      });
    } else {
      response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          message_type: state.selectedType,
          language: state.language,
          api_key: state.geminiKey || undefined,
          model: state.geminiModel || undefined,
          recaptcha_token: "demo-passed"
        })
      });
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || "Investigation request failed.");
    }

    const data = await response.json();
    handleInvestigationSuccess(data, isImageMode ? data.extracted_text || messageText : messageText);
  } catch (error) {
    handleInvestigationError(error);
  } finally {
    setScanningUI(false);
  }
}

function setScanningUI(scanning) {
  const btn = $("analyzeBtn");
  btn.disabled = scanning;
  $("analyzeLabel").textContent = scanning ? "RECONSTRUCTING THREAT TELEMETRY…" : "EXECUTE THREAT INVESTIGATION";
  if (threatCore3D) threatCore3D.setScanning(scanning);
}

function handleInvestigationSuccess(result, sourceText) {
  state.lastResult = result;
  state.lastMessage = sourceText;
  state.sessionScans++;

  $("statScanned").textContent = String(state.sessionScans).padStart(2, "0");
  $("statFlags").textContent = String(result.red_flags ? result.red_flags.length : 0);
  $("statMode").textContent = result.engine === "gemini" ? "GEMINI" : result.engine === "acoustic_forensics" ? "ACOUSTIC" : "RULES";

  renderFindingsReport(result, sourceText);

  // Update 3D Core with threat assessment
  if (threatCore3D) {
    threatCore3D.setVerdict(result.verdict, result.risk_score);
  }

  // Audio Notification
  if (result.verdict === "DANGEROUS") sfx.alert();
  else if (result.verdict === "SAFE") sfx.success();
  else sfx.sonar();

  $("resultsSection").hidden = false;
  $("resultsSection").scrollIntoView({ behavior: "smooth" });

  loadHistory();
}

function handleInvestigationError(error) {
  showToast(`Error: ${error.message}`);
  sfx.alert();
}

// ============================================================================
// Findings Report & 5-Axis Threat Radar Rendering
// ============================================================================
function renderFindingsReport(result, message) {
  const verdict = (result.verdict || "INSUFFICIENT_EVIDENCE").toUpperCase();
  const card = $("verdictCard");

  card.className = "verdict-card glass tilt-3d";
  if (verdict === "DANGEROUS") card.classList.add("danger");
  else if (verdict === "SUSPICIOUS") card.classList.add("warning");
  else if (verdict === "SAFE") card.classList.add("safe");

  $("verdictTitle").textContent = verdict.replace("_", " ");
  $("verdictSummary").textContent = result.summary || "Investigation findings parsed.";
  $("scamTypeBadge").textContent = result.scam_type || "General Pattern";
  $("urgencyBadge").textContent = `URGENCY: ${(result.urgency_level || "medium").toUpperCase()}`;
  $("engineBadge").textContent = (result.model_name || result.engine || "SCAMLENS").toUpperCase();

  // Evidence SHA-256 Hash
  const hash = result.evidence_hash || "SHA256-PENDING";
  if ($("evidenceHashBadge")) $("evidenceHashBadge").textContent = hash;
  if ($("evidenceHashCode")) $("evidenceHashCode").textContent = hash;

  // Animate Risk Score Ring
  const scoreVal = result.risk_score ?? 0;
  $("scoreValue").textContent = scoreVal;
  const ring = $("scoreRing");
  const color = verdict === "DANGEROUS" ? "var(--verdict-danger)" : verdict === "SAFE" ? "var(--verdict-safe)" : "var(--verdict-warning)";
  ring.style.background = `conic-gradient(${color} ${scoreVal * 3.6}deg, rgba(255,255,255,0.06) 0deg)`;

  // 1. Render 5-Axis Threat Radar Heatmap
  renderThreatRadar(result.radar_vector || {
    social_engineering: Math.min(100, scoreVal + 5),
    authority_coercion: verdict === "DANGEROUS" ? 75 : 20,
    tech_exploitation: 35,
    financial_risk: Math.min(100, scoreVal + 10),
    identity_theft: 30
  });

  // 2. Render Statutory Legal Infractions
  renderStatutoryViolations(result.statutory_violations || []);

  // 3. Render Attack Progression Pipeline
  renderAttackVectorPipeline(result.attack_vector || []);

  // 4. Render Psychological Triggers
  renderPsychologicalTriggers(result.psychological_triggers || []);

  // 5. Render Evidence Highlights
  renderEvidenceHighlights(message, result.red_flags || []);

  // 6. Render Red Flag Cards
  renderRedFlagCards(result.red_flags || []);

  // 7. Render Emergency Playbook
  renderEmergencyPlaybook(result.emergency_checklist || []);

  // 8. Render Lists & Boundaries
  populateList("missingList", result.missing_evidence, "No missing evidence logged.");
  populateList("stepsList", result.next_steps, "No specific next steps provided.");
  $("limitationsText").textContent = (result.limitations || []).join(" ") || "Analysis is heuristic; verify independently.";

  // 9. Render Acoustic Audio Forensics Card if Audio Analysis Available
  renderAcousticForensics(result.audio_analysis);

  // 10. Render OCR Extracted Text Inspector if Image Mode
  if ($("imageOcrPreview") && $("imageOcrTextContent")) {
    if (result.extracted_text) {
      $("imageOcrPreview").style.display = "block";
      $("imageOcrTextContent").textContent = result.extracted_text;
    } else {
      $("imageOcrPreview").style.display = "none";
    }
  }

  setup3dCardPhysics();
}

function renderAcousticForensics(audioData) {
  const card = $("acousticForensicCard");
  if (!card) return;

  if (!audioData) {
    card.style.display = "none";
    return;
  }

  card.style.display = "block";
  $("acousticStressVal").textContent = `${audioData.stress_index || 0}%`;
  $("acousticDeepfakeVal").textContent = `${audioData.deepfake_probability || 0}%`;
  $("acousticSpoofVal").textContent = `${audioData.background_spoofing_score || 0}%`;
  $("acousticCoercionVal").textContent = `${audioData.coercion_cadence_score || 0}%`;

  if ($("acousticSpeakerProfile")) {
    $("acousticSpeakerProfile").textContent = audioData.speaker_profile || "Suspected Syndicate Operator";
  }
  if ($("acousticSummaryText")) {
    $("acousticSummaryText").textContent = audioData.acoustic_summary || "Acoustic profiling completed.";
  }

  const tagsRow = $("acousticTagsRow");
  if (tagsRow) {
    tagsRow.innerHTML = "";
    (audioData.detected_audio_markers || []).forEach(marker => {
      const tag = document.createElement("span");
      tag.className = "acoustic-tag";
      tag.textContent = `⚡ ${marker}`;
      tagsRow.appendChild(tag);
    });
  }
}

function renderThreatRadar(radarData) {
  const svg = $("threatRadarSvg");
  const readouts = $("radarReadouts");
  if (!svg || !radarData) return;

  const width = 320;
  const height = 280;
  const cx = width / 2;
  const cy = height / 2 - 10;
  const radius = 95;

  const axes = [
    { key: "social_engineering", label: "Social Eng.", icon: "🧠" },
    { key: "authority_coercion", label: "Authority Pressure", icon: "🚨" },
    { key: "tech_exploitation", label: "Tech Exploitation", icon: "💻" },
    { key: "financial_risk", label: "Financial Risk", icon: "💰" },
    { key: "identity_theft", label: "Identity Theft", icon: "🪪" }
  ];

  let svgContent = `
    <defs>
      <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="var(--accent-violet)" stop-opacity="0.15"/>
      </radialGradient>
      <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;

  // Draw concentric polygon web rings (20%, 40%, 60%, 80%, 100%)
  for (let step = 0.2; step <= 1.0; step += 0.2) {
    const ringPts = axes.map((_, i) => {
      const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
      return `${cx + radius * step * Math.cos(angle)},${cy + radius * step * Math.sin(angle)}`;
    }).join(" ");
    svgContent += `<polygon points="${ringPts}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
  }

  // Draw radial axis lines & labels
  axes.forEach((axis, i) => {
    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
    const ax = cx + radius * Math.cos(angle);
    const ay = cy + radius * Math.sin(angle);
    const lx = cx + (radius + 24) * Math.cos(angle);
    const ly = cy + (radius + 24) * Math.sin(angle);
    svgContent += `<line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>`;
    svgContent += `<text x="${lx}" y="${ly}" fill="var(--text-secondary)" font-size="9" text-anchor="middle" dominant-baseline="central" font-family="'DM Mono', monospace">${axis.icon} ${axis.label}</text>`;
  });

  // Calculate polygon points from radarData values
  const polyPoints = axes.map((axis, i) => {
    const val = Math.min(100, Math.max(0, radarData[axis.key] || 15));
    const factor = val / 100;
    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
    return {
      x: cx + radius * factor * Math.cos(angle),
      y: cy + radius * factor * Math.sin(angle),
      val: val
    };
  });

  const polyPtsStr = polyPoints.map(p => `${p.x},${p.y}`).join(" ");
  svgContent += `<polygon points="${polyPtsStr}" fill="url(#radarGrad)" stroke="var(--accent-cyan)" stroke-width="2.5" filter="url(#radarGlow)"/>`;

  // Draw vertex markers
  polyPoints.forEach((p, idx) => {
    svgContent += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--accent-cyan)" stroke="#fff" stroke-width="1.5"><title>${axes[idx].label}: ${p.val}/100</title></circle>`;
  });

  svg.innerHTML = svgContent;

  // Render metric readouts
  if (readouts) {
    readouts.innerHTML = axes.map(axis => {
      const val = radarData[axis.key] || 0;
      return `
        <div class="radar-metric-chip">
          <span class="radar-metric-label">${axis.icon} ${axis.label}</span>
          <span class="radar-metric-val">${val}/100</span>
        </div>
      `;
    }).join("");
  }
}

function renderStatutoryViolations(statutes) {
  const list = $("statutoryList");
  if (!list) return;
  list.replaceChildren();

  if (!statutes.length) {
    statutes = [
      "Section 66D, Information Technology Act (Cheating by personation)",
      "Section 419/420, Indian Penal Code / BNS (Fraudulent Inducement)"
    ];
  }

  statutes.forEach(s => {
    const pill = document.createElement("div");
    pill.className = "statutory-pill";
    pill.textContent = s;
    list.append(pill);
  });
}

function renderAttackVectorPipeline(steps) {
  const container = $("attackVectorPipeline");
  container.replaceChildren();

  if (!steps.length) {
    steps = [
      "1. Ingress: Unsolicited message received",
      "2. Bait: High-pressure impersonation",
      "3. Action: Demanding funds or OTP"
    ];
  }

  steps.forEach((step, idx) => {
    const card = document.createElement("div");
    card.className = "attack-step-card";

    const badge = document.createElement("span");
    badge.className = "step-seq-badge";
    badge.textContent = `PHASE 0${idx + 1}`;

    const text = document.createElement("div");
    text.className = "step-body-text";
    text.textContent = step;

    card.append(badge, text);
    container.append(card);
  });
}

function renderPsychologicalTriggers(triggers) {
  const container = $("triggerChipsWrap");
  container.replaceChildren();

  if (!triggers.length) triggers = ["Cognitive Urgency", "Authority Bias"];

  triggers.forEach(t => {
    const chip = document.createElement("span");
    chip.className = "psych-trigger-chip";
    chip.innerHTML = `<span class="chip-spark">✦</span> ${escapeHTML(t)}`;
    container.append(chip);
  });
}

function renderEvidenceHighlights(message, flags) {
  const container = $("highlightedMessage");
  container.replaceChildren();

  if (!flags.length || !message) {
    container.textContent = message || "(Screenshot evidence evaluated)";
    return;
  }

  let text = message;
  const segments = [];
  flags.forEach((f, idx) => {
    const q = f.quote;
    if (q && text.includes(q)) {
      const start = text.indexOf(q);
      segments.push({ start, end: start + q.length, quote: q, flagIdx: idx, severity: f.severity });
    }
  });

  segments.sort((a, b) => a.start - b.start);

  let cursor = 0;
  segments.forEach(seg => {
    if (seg.start > cursor) {
      container.append(document.createTextNode(text.slice(cursor, seg.start)));
    }
    const mark = document.createElement("mark");
    mark.className = `evidence-highlight ${safeSeverity(seg.severity)}`;
    mark.textContent = seg.quote;
    mark.title = `Flag #${seg.flagIdx + 1}: Click to inspect`;
    mark.addEventListener("click", () => selectEvidenceFlag(seg.flagIdx));
    container.append(mark);
    cursor = Math.max(cursor, seg.end);
  });

  if (cursor < text.length) {
    container.append(document.createTextNode(text.slice(cursor)));
  }
}

function renderRedFlagCards(flags) {
  const list = $("flagList");
  list.replaceChildren();

  if (!flags.length) {
    list.innerHTML = `<p style="color: var(--text-muted); padding: 12px;">No direct red flags flagged by heuristic patterns.</p>`;
    return;
  }

  flags.forEach((f, idx) => {
    const item = document.createElement("article");
    item.className = `flag-item ${safeSeverity(f.severity)}`;
    item.id = `flagCard_${idx}`;

    const head = document.createElement("div");
    head.className = "flag-head";

    const title = document.createElement("strong");
    title.textContent = `#${idx + 1} · ${f.category}`;

    const sevBadge = document.createElement("span");
    sevBadge.className = `severity-badge ${safeSeverity(f.severity)}`;
    sevBadge.textContent = (f.severity || "MEDIUM").toUpperCase();

    head.append(title, sevBadge);

    const quoteBlock = document.createElement("blockquote");
    quoteBlock.className = "flag-quote";
    quoteBlock.textContent = `"${f.quote}"`;

    const explanation = document.createElement("p");
    explanation.textContent = f.explanation;

    const whyMatters = document.createElement("p");
    whyMatters.className = "flag-why";
    whyMatters.innerHTML = `<strong>Why it matters:</strong> ${escapeHTML(f.why_it_matters)}`;

    item.append(head, quoteBlock, explanation, whyMatters);
    list.append(item);
  });
}

function selectEvidenceFlag(index) {
  document.querySelectorAll(".flag-item").forEach(el => el.classList.remove("selected"));
  const target = $(`flagCard_${index}`);
  if (target) {
    target.classList.add("selected");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    sfx.blip(1200, 0.03);
  }
}

function renderEmergencyPlaybook(checklist) {
  const container = $("playbookChecklist");
  container.replaceChildren();

  if (!checklist.length) {
    checklist = [
      "Freeze compromised accounts or payment cards immediately.",
      "Change passwords for affected portals from a clean device.",
      "Call India Cybercrime Helpline at 1930 / visit cybercrime.gov.in."
    ];
  }

  checklist.forEach((item, idx) => {
    const row = document.createElement("label");
    row.className = "playbook-item";

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.id = `playbook_${idx}`;
    chk.addEventListener("change", () => {
      row.classList.toggle("completed", chk.checked);
      if (chk.checked) sfx.success();
    });

    const span = document.createElement("span");
    span.textContent = item;

    row.append(chk, span);
    container.append(row);
  });
}

function populateList(elementId, items, fallbackMsg) {
  const el = $(elementId);
  el.replaceChildren();

  if (!items || !items.length) {
    const li = document.createElement("li");
    li.textContent = fallbackMsg;
    li.style.color = "var(--text-muted)";
    el.append(li);
    return;
  }

  items.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    el.append(li);
  });
}

function safeSeverity(sev) {
  const s = String(sev || "").toLowerCase();
  return ["critical", "high", "medium", "low"].includes(s) ? s : "medium";
}

// ============================================================================
// Formal Police FIR & Banking Evidence Pack Modal
// ============================================================================
async function openEvidencePackModal() {
  if (!state.lastResult) {
    showToast("Please execute an investigation first.");
    return;
  }

  $("evidenceDialog").showModal();
  $("evidencePreText").textContent = "Generating official cryptographic evidence dossier…";

  try {
    const res = await fetch("/api/evidence-pack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        suspect_text: state.lastMessage,
        suspect_sender: $("evidenceSuspectSender").value.trim() || undefined,
        victim_notes: $("evidenceVictimNotes").value.trim() || undefined,
        analysis_data: state.lastResult
      })
    });
    const d = await res.json();
    $("evidencePreText").textContent = d.formatted_report;
    sfx.success();
  } catch {
    $("evidencePreText").textContent = "Could not generate evidence pack. Server offline.";
  }
}

function copyEvidencePackText() {
  const text = $("evidencePreText").textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Official Evidence Pack copied to clipboard.");
    sfx.blip(1200, 0.03);
  });
}

function downloadEvidencePackTxt() {
  const text = $("evidencePreText").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ScamLens_Evidence_FIR_${Date.now()}.txt`;
  a.click();
  showToast("Downloaded official evidence document.");
}

// ============================================================================
// Ancillary Security Tools (QR/UPI, SMS Sender ID, Honeypot, URL, Copilot)
// ============================================================================

// Tool 02: URL Inspector
async function executeUrlScan() {
  const url = $("urlInput").value.trim();
  const out = $("urlResult");
  if (!url) {
    showToast("Enter a URL to inspect.");
    return;
  }
  out.textContent = "Analyzing domain entropy, punycode, and brand spoofing offline…";
  sfx.sonar();

  try {
    const res = await fetch("/api/url-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const d = await res.json();
    out.replaceChildren();

    const title = document.createElement("div");
    title.innerHTML = `<strong>VERDICT: ${d.verdict}</strong> · Risk ${d.risk_score}/100`;
    out.append(title);

    if (d.flags && d.flags.length) {
      d.flags.forEach(f => {
        const p = document.createElement("p");
        p.style.marginTop = "6px";
        p.innerHTML = `<span style="color: var(--verdict-danger)">●</span> <strong>${escapeHTML(f.rule)}:</strong> ${escapeHTML(f.detail)}`;
        out.append(p);
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No deceptive entropy or known punycode tricks matched.";
      out.append(p);
    }
  } catch {
    out.textContent = "URL Inspection failed. Check backend connection.";
  }
}

// Tool 03: QR & UPI Payment Forensics
async function executePaymentScan() {
  const payload = $("paymentInput").value.trim();
  const out = $("paymentResult");
  if (!payload) {
    showToast("Enter a UPI intent link, VPA, or payment payload.");
    return;
  }
  out.textContent = "Inspecting payment protocol, reverse-collect indicators, and destination…";
  sfx.sonar();

  try {
    const res = await fetch("/api/payment-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload })
    });
    const d = await res.json();
    out.replaceChildren();

    const color = d.verdict === "DANGEROUS" ? "var(--verdict-danger)" : "var(--accent-cyan)";
    const h = document.createElement("div");
    h.innerHTML = `<strong style="color: ${color}">VERDICT: ${d.verdict}</strong> · Category: <strong>${d.threat_category}</strong> · Risk ${d.risk_score}/100`;
    out.append(h);

    if (d.flags && d.flags.length) {
      d.flags.forEach(f => {
        const p = document.createElement("div");
        p.style.marginTop = "8px";
        p.innerHTML = `<div style="color: var(--verdict-danger); font-weight: 700;">⚠ ${escapeHTML(f.title)}</div>
                       <div style="font-size: 0.85rem;">${escapeHTML(f.explanation)}</div>
                       <div style="font-size: 0.82rem; color: var(--accent-cyan); margin-top: 2px;">🛡️ Safe action: ${escapeHTML(f.mitigation)}</div>`;
        out.append(p);
      });
    } else {
      const p = document.createElement("p");
      p.style.marginTop = "6px";
      p.textContent = "Standard format payload. Always verify recipient name before approving.";
      out.append(p);
    }
  } catch {
    out.textContent = "Payment scan failed.";
  }
}

// Tool 04: SMS Sender ID Inspector
async function executeSenderIdScan() {
  const senderId = $("senderIdInput").value.trim();
  const out = $("senderIdResult");
  if (!senderId) {
    showToast("Enter an SMS header or phone number.");
    return;
  }
  out.textContent = "Auditing telecom circle and DLT regulatory registry…";
  sfx.sonar();

  try {
    const res = await fetch("/api/sender-id-scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: senderId })
    });
    const d = await res.json();
    out.replaceChildren();

    const color = d.verdict === "DANGEROUS" ? "var(--verdict-danger)" : "var(--accent-cyan)";
    const h = document.createElement("div");
    h.innerHTML = `<strong style="color: ${color}">VERDICT: ${d.verdict}</strong> · Type: <strong>${d.sender_type}</strong>`;
    out.append(h);

    if (d.metadata && d.metadata.operator) {
      const metaDiv = document.createElement("div");
      metaDiv.style.margin = "8px 0";
      metaDiv.style.fontSize = "0.85rem";
      metaDiv.innerHTML = `<div>Carrier Operator: <strong>${d.metadata.operator}</strong></div>
                           <div>Telecom Circle: <strong>${d.metadata.telecom_circle}</strong></div>
                           <div>Registry Match: <strong>${d.metadata.verified_brand}</strong></div>`;
      out.append(metaDiv);
    }

    if (d.flags && d.flags.length) {
      d.flags.forEach(f => {
        const fDiv = document.createElement("div");
        fDiv.style.marginTop = "6px";
        fDiv.innerHTML = `<div style="color: var(--verdict-danger)">⚠ <strong>${escapeHTML(f.title)}</strong></div>
                          <div style="font-size: 0.82rem;">${escapeHTML(f.explanation)}</div>`;
        out.append(fDiv);
      });
    }
  } catch {
    out.textContent = "Sender ID inspection failed.";
  }
}

// Tool 05: Anti-Scam Honeypot & Counter-Bait Simulator
const HONEYPOT_DATA = {
  digital_arrest: [
    { key: "ask_fir", label: "Ask for Official Written FIR Copy & Officer Badge ID" },
    { key: "visit_station", label: "State: 'I will personally visit the nearest police station with my lawyer'" },
    { key: "feign_technical_issue", label: "State: 'My camera is broken and battery is at 2%'" }
  ],
  task_fraud: [
    { key: "deduct_fee", label: "State: 'Deduct the ₹3,000 security deposit from my earned wallet balance'" },
    { key: "request_company_reg", label: "Ask for MCA Company Registration Certificate & GST Number" }
  ],
  bank_kyc: [
    { key: "visit_branch", label: "State: 'I will walk into my local bank branch tomorrow to update KYC'" },
    { key: "give_wrong_otp", label: "Enter a dummy incorrect OTP (e.g. '000000')" }
  ]
};

function initHoneypotUI() {
  renderHoneypotReplies("digital_arrest");
}

function renderHoneypotReplies(scenarioKey) {
  const list = $("honeypotRepliesList");
  if (!list) return;
  list.replaceChildren();

  const options = HONEYPOT_DATA[scenarioKey] || HONEYPOT_DATA["digital_arrest"];
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "honeypot-reply-btn";
    btn.textContent = `💬 ${opt.label}`;
    btn.addEventListener("click", () => executeHoneypotSimulation(scenarioKey, opt.key));
    list.append(btn);
  });
}

async function executeHoneypotSimulation(scenarioKey, replyKey) {
  const out = $("honeypotResult");
  out.textContent = "Simulating adversary psychological retaliation…";
  sfx.sonar();

  try {
    const res = await fetch("/api/honeypot-simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario: scenarioKey, victim_reply: replyKey })
    });
    const d = await res.json();
    out.replaceChildren();

    const box = document.createElement("div");
    box.className = "adversary-reaction-box";
    box.innerHTML = `
      <div class="reaction-header">
        <strong>ADVERSARY RETALIATION BEHAVIOR</strong>
        <span class="escalation-badge">${escapeHTML(d.escalation_level)}</span>
      </div>
      <p style="color: #fca5a5; font-size: 0.88rem; margin-bottom: 10px;">
        "${escapeHTML(d.adversary_reaction)}"
      </p>
      <div style="font-size: 0.82rem; color: var(--accent-cyan); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
        🛡️ <strong>Recommended Counter-Move:</strong> ${escapeHTML(d.counter_defense)}
      </div>
    `;
    out.append(box);
    sfx.alert();
  } catch {
    out.textContent = "Simulation failed.";
  }
}

// Tool 06: Gemini Safety Copilot
async function executeCopilotQuestion() {
  const qInput = $("copilotQuestion");
  const q = qInput.value.trim();
  if (!q) return;

  qInput.value = "";
  appendCopilotMessage("user", q);
  sfx.blip(1000, 0.03);

  const botMsg = appendCopilotMessage("bot", "Analyzing containment strategy with Google Gemini…");

  try {
    const res = await fetch("/api/copilot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: q,
        message: state.lastMessage,
        verdict: state.lastResult ? state.lastResult.verdict : "INSUFFICIENT_EVIDENCE",
        risk_score: state.lastResult ? state.lastResult.risk_score : 0,
        language: state.language,
        api_key: state.geminiKey || undefined,
        history: state.copilotChatHistory
      })
    });
    const d = await res.json();
    botMsg.querySelector(".msg-body").textContent = d.answer;
    state.copilotChatHistory.push({ role: "user", content: q }, { role: "assistant", content: d.answer });
    sfx.success();
  } catch {
    botMsg.querySelector(".msg-body").textContent = "Could not reach Gemini Safety Copilot.";
  }
}

function appendCopilotMessage(role, text) {
  const chatBox = $("copilotChatBox");
  const msg = document.createElement("div");
  msg.className = `copilot-msg ${role}-msg`;

  const avatar = document.createElement("div");
  avatar.className = "msg-avatar";
  avatar.textContent = role === "bot" ? "✦" : "👤";

  const body = document.createElement("div");
  body.className = "msg-body";
  body.textContent = text;

  msg.append(avatar, body);
  chatBox.append(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// ============================================================================
// Fullscreen 3D Holo-Deck Inspection
// ============================================================================
let fullscreenVisualizer = null;
function openFullscreenHoloDeck() {
  $("holoModal").showModal();
  if (!fullscreenVisualizer) {
    try {
      fullscreenVisualizer = new ThreatVisualizer3D("fullscreenCanvas3d");
      if (state.lastResult) fullscreenVisualizer.setVerdict(state.lastResult.verdict, state.lastResult.risk_score);
    } catch (_) {}
  }
  sfx.sonar();
  showToast("Entered Fullscreen 3D Holo-Deck.");
}

// ============================================================================
// Local SQLite Audit Vault (History)
// ============================================================================
let cachedHistory = [];

async function loadHistory() {
  const root = $("historyList");
  const filterVerdict = $("historyFilterSelect").value;
  try {
    let url = "/api/history?limit=40";
    if (filterVerdict) url += `&verdict=${encodeURIComponent(filterVerdict)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Vault unavailable");
    const data = await res.json();
    cachedHistory = data.items || [];
    renderHistoryCards(cachedHistory);
  } catch {
    root.textContent = "Could not load local vault. Ensure backend server is active.";
  }
}

function renderHistoryCards(items) {
  const root = $("historyList");
  root.replaceChildren();

  if (!items.length) {
    const empty = document.createElement("div");
    empty.style.color = "var(--text-muted)";
    empty.style.padding = "16px";
    empty.textContent = "No saved investigation records match your filter.";
    root.append(empty);
    return;
  }

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "history-item tilt-3d";

    const body = document.createElement("div");
    const meta = document.createElement("div");
    meta.className = "history-meta";

    const color = item.verdict === "DANGEROUS" ? "var(--verdict-danger)" : item.verdict === "SAFE" ? "var(--verdict-safe)" : "var(--verdict-warning)";
    meta.innerHTML = `<span style="color: ${color}">●</span> #${item.id} · <strong style="color: ${color}">${item.verdict}</strong> · RISK ${item.risk_score}/100 · ${item.engine.toUpperCase()}`;

    const preview = document.createElement("p");
    preview.textContent = item.message_preview;

    const time = document.createElement("div");
    time.className = "history-time";
    time.textContent = new Date(item.created_at).toLocaleString();

    body.append(meta, preview, time);

    const actions = document.createElement("div");
    actions.className = "history-actions";

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "Inspect";
    viewBtn.addEventListener("click", async () => {
      try {
        const r = await fetch(`/api/history/${item.id}`);
        const d = await r.json();
        renderFindingsReport(d.report, d.message_preview);
        $("resultsSection").hidden = false;
        $("resultsSection").scrollIntoView({ behavior: "smooth" });
        showToast(`Loaded Report #${item.id} from local vault.`);
      } catch {
        showToast("Could not retrieve vault record.");
      }
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", async () => {
      if (!confirm(`Permanently delete Record #${item.id}?`)) return;
      const r = await fetch(`/api/history/${item.id}`, { method: "DELETE" });
      if (r.ok) {
        showToast("Record deleted from local vault.");
        loadHistory();
      }
    });

    actions.append(viewBtn, delBtn);
    card.append(body, actions);
    root.append(card);
  });

  setup3dCardPhysics();
}

function filterHistoryList() {
  const query = $("historySearchInput").value.toLowerCase();
  const filtered = cachedHistory.filter(item =>
    item.message_preview.toLowerCase().includes(query) ||
    item.verdict.toLowerCase().includes(query) ||
    item.engine.toLowerCase().includes(query)
  );
  renderHistoryCards(filtered);
}

async function clearEntireHistory() {
  if (!confirm("Are you sure you want to PERMANENTLY ERASE all records in your local SQLite vault?")) return;
  try {
    const res = await fetch("/api/history/clear", { method: "POST" });
    if (res.ok) {
      showToast("Local vault records erased.");
      loadHistory();
    }
  } catch {
    showToast("Could not wipe vault.");
  }
}

// ============================================================================
// Customization Studio, Settings & Themes
// ============================================================================
function openSettingsModal() {
  $("geminiApiKeyInput").value = state.geminiKey;
  $("geminiModelSelect").value = state.geminiModel;
  $("languageSelect").value = state.language;
  $("particleStyleSelect").value = state.particleStyle;
  $("particleDensitySlider").value = state.particleDensity;
  $("particleDensityVal").textContent = `${state.particleDensity}%`;
  $("speedSlider").value = state.rotationSpeed * 10;
  $("speedVal").textContent = `${state.rotationSpeed.toFixed(1)}x`;
  $("tiltIntensitySlider").value = state.tiltIntensity;
  $("tiltIntensityVal").textContent = state.tiltIntensity === 0 ? "Off" : state.tiltIntensity > 12 ? "Extreme 3D" : "Balanced 3D";
  $("gridFloorToggle").checked = state.gridFloorEnabled;
  $("scanlineToggle").checked = state.scanlineEnabled;
  $("soundPackSelect").value = state.soundPack;
  $("volumeSlider").value = Math.round(state.soundVolume * 100);
  $("volumeVal").textContent = `${Math.round(state.soundVolume * 100)}%`;

  $("customPrimaryColor").value = state.customPrimaryColor;
  $("customSecondaryColor").value = state.customSecondaryColor;
  $("customBgColor").value = state.customBgColor;
  $("customPaletteBox").style.display = state.activeTheme === "custom" ? "block" : "none";

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.themeName === state.activeTheme);
  });

  $("settingsDialog").showModal();
}

function saveSettingsModal() {
  state.geminiKey = $("geminiApiKeyInput").value.trim();
  state.geminiModel = $("geminiModelSelect").value;
  state.language = $("languageSelect").value;
  state.particleStyle = $("particleStyleSelect").value;
  state.particleDensity = Number($("particleDensitySlider").value);
  state.rotationSpeed = Number($("speedSlider").value) / 10;
  state.tiltIntensity = Number($("tiltIntensitySlider").value);
  state.gridFloorEnabled = $("gridFloorToggle").checked;
  state.scanlineEnabled = $("scanlineToggle").checked;
  state.soundPack = $("soundPackSelect").value;
  state.soundVolume = Number($("volumeSlider").value) / 100;

  localStorage.setItem("scamlens_gemini_key", state.geminiKey);
  localStorage.setItem("scamlens_gemini_model", state.geminiModel);
  localStorage.setItem("scamlens_lang", state.language);
  localStorage.setItem("scamlens_particle_style", state.particleStyle);
  localStorage.setItem("scamlens_density", state.particleDensity);
  localStorage.setItem("scamlens_speed", $("speedSlider").value);
  localStorage.setItem("scamlens_tilt_intensity", state.tiltIntensity);
  localStorage.setItem("scamlens_grid_floor", state.gridFloorEnabled);
  localStorage.setItem("scamlens_scanline", state.scanlineEnabled);
  localStorage.setItem("scamlens_sound_pack", state.soundPack);
  localStorage.setItem("scamlens_sound_volume", $("volumeSlider").value);

  // Re-init background 3D environment
  if (bgEnvironment3D) {
    bgEnvironment3D.initParticles();
    bgEnvironment3D.initGridFloor();
  }

  // Toggle Scanline CSS Overlay
  const overlay = $("cyberGridOverlay");
  if (overlay) overlay.style.display = state.scanlineEnabled ? "block" : "none";

  $("settingsDialog").close();
  checkBackendHealth();
  sfx.success();
  showToast("Customization settings applied.");
}

function resetSettingsDefaults() {
  if (!confirm("Reset all settings to default values?")) return;
  state.activeTheme = "vision-pro";
  state.particleStyle = "stars";
  state.particleDensity = 100;
  state.rotationSpeed = 1.0;
  state.tiltIntensity = 10;
  state.tilt3dEnabled = true;
  state.gridFloorEnabled = true;
  state.soundPack = "cyberpunk";
  state.soundVolume = 0.8;
  state.language = "en";
  state.scanlineEnabled = true;
  applyTheme("vision-pro");
  openSettingsModal();
}

function applyTheme(themeName) {
  state.activeTheme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("scamlens_theme", themeName);

  if ($("customPaletteBox")) {
    $("customPaletteBox").style.display = themeName === "custom" ? "block" : "none";
  }

  const themeColors = {
    "vision-pro": 0x38bdf8,
    neon: 0x00e5ff,
    matrix: 0x22c55e,
    crimson: 0xef4444,
    amethyst: 0xc084fc,
    titanium: 0x38bdf8,
    solar: 0xfbbf24,
    stealth: 0xe2e8f0,
    custom: parseInt(state.customPrimaryColor.replace("#", "0x"), 16) || 0x00e5ff
  };

  if (threatCore3D) {
    threatCore3D.targetThemeColor.setHex(themeColors[themeName] || 0x38bdf8);
  }
}

function applyCustomPaletteColors() {
  state.customPrimaryColor = $("customPrimaryColor").value;
  state.customSecondaryColor = $("customSecondaryColor").value;
  state.customBgColor = $("customBgColor").value;

  localStorage.setItem("scamlens_custom_primary", state.customPrimaryColor);
  localStorage.setItem("scamlens_custom_secondary", state.customSecondaryColor);
  localStorage.setItem("scamlens_custom_bg", state.customBgColor);

  document.documentElement.style.setProperty("--custom-accent", state.customPrimaryColor);
  document.documentElement.style.setProperty("--custom-secondary", state.customSecondaryColor);
  document.documentElement.style.setProperty("--custom-bg", state.customBgColor);

  if (threatCore3D) {
    threatCore3D.targetThemeColor.setHex(parseInt(state.customPrimaryColor.replace("#", "0x"), 16));
  }
}

function exportProfileConfig() {
  const profile = {
    version: "3.0.0",
    theme: state.activeTheme,
    customColors: {
      primary: state.customPrimaryColor,
      secondary: state.customSecondaryColor,
      bg: state.customBgColor
    },
    particleStyle: state.particleStyle,
    particleDensity: state.particleDensity,
    rotationSpeed: state.rotationSpeed,
    tiltIntensity: state.tiltIntensity,
    soundPack: state.soundPack,
    soundVolume: state.soundVolume,
    language: state.language
  };
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `scamlens_profile_${Date.now()}.json`;
  a.click();
  showToast("Exported configuration profile JSON.");
}

function importProfileConfig(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const cfg = JSON.parse(evt.target.result);
      if (cfg.theme) applyTheme(cfg.theme);
      if (cfg.particleDensity) state.particleDensity = cfg.particleDensity;
      if (cfg.rotationSpeed) state.rotationSpeed = cfg.rotationSpeed;
      if (cfg.soundPack) state.soundPack = cfg.soundPack;
      openSettingsModal();
      showToast("Profile configuration loaded successfully.");
      sfx.success();
    } catch {
      showToast("Invalid profile JSON file.");
    }
  };
  reader.readAsText(file);
}

async function testGeminiKeyInModal() {
  const key = $("geminiApiKeyInput").value.trim() || state.geminiKey;
  if (!key) {
    showToast("Enter a Gemini API key first.");
    return;
  }
  const statusTag = $("geminiKeyStatus");
  statusTag.textContent = "Verifying with Google AI…";
  statusTag.style.color = "var(--accent-cyan)";

  try {
    const res = await fetch("/api/test-gemini-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key, model: $("geminiModelSelect").value })
    });
    const d = await res.json();
    if (d.status === "valid") {
      statusTag.textContent = `CONNECTED (${d.model}) • ${d.latency_ms || 250}ms ✓`;
      statusTag.style.color = "var(--verdict-safe)";
      state.geminiKey = key;
      localStorage.setItem("scamlens_gemini_key", key);
      sfx.success();
      showToast(d.message || "Google Gemini API connected successfully!");
      checkBackendHealth();
    } else {
      statusTag.textContent = "KEY REJECTED ✗";
      statusTag.style.color = "var(--verdict-danger)";
      showToast(d.error || "Gemini API key rejected.");
      sfx.alert();
    }
  } catch {
    statusTag.textContent = "TEST FAILED";
    statusTag.style.color = "var(--verdict-danger)";
    showToast("Could not contact verification endpoint.");
  }
}

// ============================================================================
// Utilities: Voice Briefing, Copy, Downloads, Health, Toasts
// ============================================================================
let speechUtterance = null;
function toggleSpeechBriefing() {
  if (!window.speechSynthesis) {
    showToast("Speech synthesis not supported in this browser.");
    return;
  }
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    $("speakIcon").textContent = "🔊";
    showToast("Voice briefing cancelled.");
    return;
  }
  if (!state.lastResult) return;

  const script = state.lastResult.audio_briefing_text || `${state.lastResult.verdict}. ${state.lastResult.summary}`;
  speechUtterance = new SpeechSynthesisUtterance(script);
  speechUtterance.rate = 1.0;
  speechUtterance.onend = () => { $("speakIcon").textContent = "🔊"; };
  $("speakIcon").textContent = "⏹";
  window.speechSynthesis.speak(speechUtterance);
}

function copyOfficialComplaint() {
  if (!state.lastResult) return;
  const r = state.lastResult;
  const complaint = `INCIDENT REPORT TO CYBERCRIME & BANK FRAUD CELL:
Verdict: ${r.verdict} (Risk: ${r.risk_score}/100)
Pattern: ${r.scam_type}
Evidence Hash: ${r.evidence_hash || "SHA256-PENDING"}
Summary: ${r.summary}
Evidence Quote: ${r.red_flags.map(f => `"${f.quote}" (${f.explanation})`).join("; ")}
Suspect text: "${state.lastMessage}"`;

  navigator.clipboard.writeText(complaint).then(() => {
    showToast("Incident complaint copied to clipboard.");
    sfx.blip(1200, 0.03);
  });
}

function downloadReportJSON() {
  if (!state.lastResult) return;
  const blob = new Blob([JSON.stringify(state.lastResult, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `ScamLens_Audit_${Date.now()}.json`;
  a.click();
  showToast("Audit JSON downloaded.");
}

async function checkBackendHealth() {
  try {
    const res = await fetch("/api/health");
    if (!res.ok) throw new Error();
    const data = await res.json();

    const isGemini = data.active_provider === "gemini" || Boolean(state.geminiKey);
    $("engineStatus").textContent = isGemini ? `GOOGLE GEMINI (${data.gemini_model || "FLASH"})` : data.llm_configured ? "OPENAI ADAPTER" : "LOCAL HEURISTICS READY";
    $("liveDot").style.background = isGemini ? "var(--accent-cyan)" : "var(--accent-violet)";
    $("statMode").textContent = isGemini ? "GEMINI" : data.llm_configured ? "OPENAI" : "RULES";
  } catch {
    $("engineStatus").textContent = "API ENGINE OFFLINE";
    $("liveDot").style.background = "var(--verdict-danger)";
  }
}

let toastTimer = null;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function escapeHTML(str) {
  return String(str ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

// Escape key stops mic recording immediately
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && state.isRecording) {
    stopAudioRecording();
  }
});
