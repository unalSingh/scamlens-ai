from typing import Literal, List, Optional, Dict, Any
from pydantic import BaseModel, Field

MessageType = Literal[
    "email", "sms", "whatsapp", "job_offer", "crypto",
    "arrest_police", "delivery", "voice_call", "other"
]
Verdict = Literal["SAFE", "SUSPICIOUS", "DANGEROUS", "INSUFFICIENT_EVIDENCE"]
Severity = Literal["low", "medium", "high", "critical"]

class AnalyzeRequest(BaseModel):
    message: str = Field(min_length=1, max_length=50000)
    message_type: str = "other"
    language: Optional[str] = "en"
    api_key: Optional[str] = None
    provider: Optional[str] = None
    model: Optional[str] = None
    recaptcha_token: Optional[str] = None
    encrypted: Optional[bool] = False

class RedFlag(BaseModel):
    quote: str
    category: str
    severity: Severity = "medium"
    explanation: str
    why_it_matters: str

class RadarVector(BaseModel):
    social_engineering: int = Field(default=0, ge=0, le=100)
    authority_coercion: int = Field(default=0, ge=0, le=100)
    tech_exploitation: int = Field(default=0, ge=0, le=100)
    financial_risk: int = Field(default=0, ge=0, le=100)
    identity_theft: int = Field(default=0, ge=0, le=100)

class AudioAcousticReport(BaseModel):
    stress_index: int = Field(default=0, ge=0, le=100)
    deepfake_probability: int = Field(default=0, ge=0, le=100)
    background_spoofing_score: int = Field(default=0, ge=0, le=100)
    coercion_cadence_score: int = Field(default=0, ge=0, le=100)
    detected_audio_markers: List[str] = []
    acoustic_summary: str = ""
    speaker_profile: str = "Unknown"

class AnalyzeResponse(BaseModel):
    verdict: Verdict
    risk_score: int = Field(ge=0, le=100)
    summary: str
    scam_type: Optional[str] = "General Message"
    urgency_level: Optional[Severity] = "medium"
    psychological_triggers: Optional[List[str]] = []
    attack_vector: Optional[List[str]] = []
    red_flags: List[RedFlag]
    missing_evidence: List[str]
    next_steps: List[str]
    limitations: List[str]
    emergency_checklist: Optional[List[str]] = []
    radar_vector: Optional[RadarVector] = None
    audio_analysis: Optional[AudioAcousticReport] = None
    statutory_violations: Optional[List[str]] = []
    evidence_hash: Optional[str] = None
    audio_briefing_text: Optional[str] = None
    extracted_text: Optional[str] = None
    engine: str = "rules"
    model_name: Optional[str] = None
    analysis_id: Optional[int] = None
    cached: Optional[bool] = False

class ImageAnalyzeRequest(BaseModel):
    image_base64: str = Field(description="Base64 encoded image data (data:image/... or raw)")
    mime_type: str = "image/png"
    message_type: str = "other"
    language: Optional[str] = "en"
    api_key: Optional[str] = None
    model: Optional[str] = None
    recaptcha_token: Optional[str] = None

class AudioAnalyzeRequest(BaseModel):
    audio_base64: Optional[str] = None
    transcript: Optional[str] = None
    mime_type: Optional[str] = "audio/webm"
    language: Optional[str] = "en"
    api_key: Optional[str] = None
    model: Optional[str] = None
    recaptcha_token: Optional[str] = None

class URLRequest(BaseModel):
    url: str = Field(min_length=3, max_length=2048)

class CopilotRequest(BaseModel):
    question: str = Field(min_length=2, max_length=2000)
    message: str = Field(default="", max_length=20000)
    verdict: str = "INSUFFICIENT_EVIDENCE"
    risk_score: int = Field(default=0, ge=0, le=100)
    language: Optional[str] = "en"
    api_key: Optional[str] = None
    history: Optional[List[dict]] = []

class PaymentScanRequest(BaseModel):
    payload: str = Field(min_length=3, max_length=2048, description="UPI intent URL, VPA address, or payment link")

class SenderIdRequest(BaseModel):
    sender_id: str = Field(min_length=2, max_length=30, description="SMS alphanumeric header or phone number")

class HoneypotRequest(BaseModel):
    scenario: str
    victim_reply: str
    step: int = 1
    conversation: Optional[List[Dict[str, str]]] = []

class EvidencePackRequest(BaseModel):
    analysis_id: Optional[int] = None
    incident_date: Optional[str] = None
    victim_notes: Optional[str] = None
    suspect_sender: Optional[str] = None
    suspect_text: Optional[str] = None
    analysis_data: Optional[Dict[str, Any]] = None

class RecaptchaVerifyRequest(BaseModel):
    token: str
    action: Optional[str] = "investigate"
