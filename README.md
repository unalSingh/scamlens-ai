# ScamLens AI 3D (Apple Vision Pro Edition) — Advanced Fraud Intelligence & Google Gemini Defense

An elite cybersecurity intelligence and explainable fraud detection platform built for hackathon dominance. Combines **Apple Vision Pro (visionOS Spatial)** frosted glass aesthetics, a high-performance **Three.js 3D Threat Core**, native **Google Gemini 2.5 Flash** (text, multimodal vision & deep audio), **Real-Time Web Audio Oscilloscope Visualizer**, **Deep Acoustic Voice Forensics**, **Client-Side E2EE Privacy Shield**, **Google reCAPTCHA Protection**, **Multi-Language Support (12 Languages)**, and **Step-by-Step Interactive Guide**.

---

## 🌟 Key Upgrades & Capabilities

### 1. 🥽 Apple Vision Pro (visionOS Spatial) UI & 3D Interactive Core
- **visionOS Frosted Glassmorphism**: Ultra-fine frosted glass panels (`backdrop-filter: blur(35px) saturate(210%)`), luminous border reflections, and floating spatial docks.
- **Floating Spatial Navigation Dock**: Instant one-click jumping between Text Scan, Vision Screenshot, Voice Forensics, URL Scanner, UPI / QR Fraud, SMS Sender ID, Honeypot Lab, and Local Vault.
- **Interactive 3D Three.js Telemetry Core**: 5 distinct visualization modes (Shield, Globe, Neural Cortex, Tesseract, Sonar Radar) with reactive particle orbital rings, dynamic color shifts (Azure for Safe, Amber for Warning, Crimson for Danger), and 360-degree rotation.
- **3D Gyroscopic Card Tilt & Specular Sheen**: Cards tilt in 3D perspective (`perspective(1200px)`) with dynamic specular highlights that follow the cursor.

### 2. 🎙️ Deep Acoustic Voice & Sound Analyzer (Microphone & Audio Forensics)
- **Real-Time Web Audio API Oscilloscope**: Live animated frequency waveform canvas powered by `AudioContext` and `AnalyserNode`.
- **MediaRecorder & Microphone Integration**: High-fidelity audio recording with live recording timer and permissions state handling.
- **Deep Acoustic Forensics Card**:
  - **Voice Stress Index (0-100)**: Detects aggressive intimidation and hostile interrogation cadences.
  - **AI Voice Clone / Deepfake Probability (0-100)**: Identifies synthetic cadence and robotic prosody.
  - **Background Noise Spoofing Score (0-100)**: Uncovers fake police radio sirens and call-center chatter.
  - **Coercion Cadence Score (0-100)**: Measures high-pressure countdowns and boiler-room pacing.
  - **Spoken Dialogue Transcript**: Exact verbatim speech transcription with timestamp tags.

### 3. 📸 Multimodal Screenshot Vision (Zero-502 Bulletproof Pipeline)
- **Google Gemini Multimodal Vision**: Extracts text, verifies official logos, seals (CBI, Police, Supreme Court, Banks), and QR payloads.
- **Offline Visual Deception Fallback**: If Gemini is offline, without an API key, or experiencing network timeout, the engine **NEVER crashes with a 502 error**. Built-in visual heuristics extract embedded tokens, analyze format metadata, inspect forgery signatures, and return a complete forensic dossier.
- **Clipboard Paste Anywhere**: Press <kbd>Ctrl+V</kbd> anywhere on the page to immediately paste screenshots.
- **OCR Text Inspector**: Interactive preview of extracted text with 1-click inspection.

### 4. 🔒 End-to-End Encryption (E2EE) & Client-Side Privacy Shield
- **Client-Side PII Auto-Redactor**: Automatically masks phone numbers, 16-digit bank cards, Aadhaar numbers, PAN cards, OTPs, and passwords (`[REDACTED_PHONE_XXXX]`, `[REDACTED_AADHAAR_XXXX]`) *before* analysis.
- **Web Cryptography API (AES-256-GCM)**: Local vault records encrypted client-side with user-controlled passphrase.
- **Cryptographic Evidence Fingerprint**: Every investigation computes a SHA-256 hash to preserve legal chain of custody.

### 5. 🛡️ Google reCAPTCHA Verification Shield
- Integrated Google reCAPTCHA v3 / Enterprise verification box protecting the analysis pipeline.
- Human verification checkbox with fallback and support for custom reCAPTCHA server secret keys.

### 6. 🌐 Multi-Language Internationalization (12 Languages)
- Instant live language switcher in top navigation:
  - **English**, **Hindi (हिन्दी)**, **Hinglish**, **Spanish (Español)**, **French (Français)**, **German (Deutsch)**, **Bengali (বাংলা)**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, **Marathi (मराठी)**, **Arabic (العربية)**, **Chinese (中文)**, **Japanese (日本語)**.
- Automatically translates entire UI, updates SpeechRecognition language, and directs Gemini to generate native reports in that language.

### 7. 📖 Step-by-Step Interactive Guide & 1-Click Hackathon Test Drive
- Comprehensive 5-step spatial tutorial modal explaining the fraud detection pipeline from ingestion to FIR generation.
- **1-Click Test Drive Buttons**: Judges can test realistic scam scenarios (Digital Arrest, Skype Extortion Call, Telegram Task Trap, Malicious APK Wedding Card) in 2 seconds with a single click.

### 8. ⚡ High-Throughput Optimization for Thousands of Users
- **In-Memory LRU Threat Cache**: Repeated messages and scans resolve in sub-millisecond time (`< 1ms`), drastically reducing API cost and latency.
- **Async Concurrency & Rate Limiting**: Protects against automated spam while supporting concurrent users.
- **60 FPS Hardware-Accelerated Frontend**: GPU-accelerated CSS transforms and adaptive Three.js rendering.

---

## 🚀 Quick Start Guide

### Step 1: Launch Server
On Windows PowerShell:
```powershell
.\run.ps1
```
Or on Windows Command Prompt:
```cmd
run.bat
```

### Step 2: Open in Browser
- On your PC: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- On Mobile / Tablet: `http://<YOUR_LOCAL_IP>:8000` (shown in startup banner)

### Step 3: Enter Google Gemini API Key (Optional but Recommended)
1. Get a free API key at [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Enter it into `.env` as `GEMINI_API_KEY=AIzaSy...` OR open the **STUDIO** modal in the website topbar, paste your key, and click **Verify Key**.
3. Live key validation confirms connection, active model (`gemini-2.5-flash`), and real-time latency in milliseconds.

---

## 🧪 Testing & Verification

Run the comprehensive unit test suite:
```powershell
& "$env:LOCALAPPDATA\Programs\Python\Python313\python.exe" -m unittest discover tests
```
All unit tests execute and pass in < 0.1s.
