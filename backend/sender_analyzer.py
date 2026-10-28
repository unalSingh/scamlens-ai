"""SMS Alphanumeric Header & Sender ID Forensic Analyzer.
Decodes Indian DLT / TRAI telecom circle and entity identifiers,
and detects spoofed alphanumeric headers and international fraud routing.
"""
import re
from typing import Dict, Any, List

# Indian DLT Telecom Operator Codes
OPERATOR_CODES = {
    "A": "Bharti Airtel",
    "B": "BSNL",
    "J": "Reliance Jio",
    "V": "Vodafone Idea (Vi)",
    "M": "MTNL",
    "T": "Tata Teleservices"
}

# Indian Service Area / Circle Codes
CIRCLE_CODES = {
    "D": "Delhi NCR",
    "M": "Mumbai",
    "K": "Kolkata",
    "W": "West Bengal",
    "B": "Maharashtra",
    "X": "Gujarat",
    "Y": "Andhra Pradesh / Telangana",
    "T": "Tamil Nadu / Chennai",
    "C": "Karnataka",
    "H": "Kerala",
    "P": "Punjab",
    "R": "Rajasthan",
    "U": "UP West",
    "E": "UP East",
    "Z": "Bihar / Jharkhand",
    "O": "Odisha",
    "A": "Assam",
    "S": "North East",
    "I": "Haryana",
    "J": "Himachal Pradesh",
    "L": "Jammu & Kashmir"
}

KNOWN_BANK_HEADERS = {
    "HDFCBK": "HDFC Bank",
    "SBINB": "State Bank of India (NetBanking)",
    "SBIINB": "State Bank of India",
    "ICICIB": "ICICI Bank",
    "AXISBK": "Axis Bank",
    "KOTAKB": "Kotak Mahindra Bank",
    "PNBSMS": "Punjab National Bank",
    "BOISMS": "Bank of India",
    "FEDEX": "FedEx Express (Legitimate Delivery)",
    "AMAZON": "Amazon Services",
    "FLPKRT": "Flipkart Internet",
    "GOOGLE": "Google Verification",
    "UBERIN": "Uber Technologies"
}

def analyze_sender_id(sender_raw: str) -> Dict[str, Any]:
    cleaned = sender_raw.strip().upper()
    flags: List[Dict[str, str]] = []
    risk_score = 0
    sender_type = "Unknown Format"
    metadata: Dict[str, Any] = {}

    # 1. Check Indian DLT Format: e.g. "VK-HDFCBK", "AD-SBINB", "JM-AMAZON"
    # Format: 2-letter prefix + hyphen + 6-character alphanumeric header
    dlt_match = re.match(r"^([A-Z]{2})[- ]([A-Z0-9]{3,8})$", cleaned)

    if dlt_match:
        prefix = dlt_match.group(1)
        header = dlt_match.group(2)
        op_char = prefix[0]
        circle_char = prefix[1]

        op_name = OPERATOR_CODES.get(op_char, f"Unknown Operator ({op_char})")
        circle_name = CIRCLE_CODES.get(circle_char, f"Unknown Circle ({circle_char})")
        known_org = KNOWN_BANK_HEADERS.get(header)

        sender_type = "Indian DLT Registered Header"
        metadata = {
            "format": "TRAI DLT 2-character prefix + Alphanumeric Header",
            "operator": op_name,
            "telecom_circle": circle_name,
            "assigned_header": header,
            "verified_brand": known_org or "Not in Top Tier Registry (Requires independent verification)"
        }

        # Check for lookalike spoofing on header (e.g., "SBIINB" vs "SB1INB", "HDFCBK" vs "HDFCBG")
        if not known_org:
            for legit_header in KNOWN_BANK_HEADERS.keys():
                # Levenshtein distance check or substring
                if legit_header in header or header in legit_header:
                    flags.append({
                        "severity": "high",
                        "title": f"Possible Brand Lookalike Spoofing ('{header}')",
                        "explanation": f"This header closely resembles verified brand '{legit_header}' but is not an exact match.",
                        "mitigation": "Scammers register similar-sounding DLT headers under shell companies."
                    })
                    risk_score += 40
                    break

    # 2. Check Standard Phone Number or International Code
    elif re.match(r"^\+?[0-9]{8,15}$", cleaned.replace("-", "").replace(" ", "")):
        sender_type = "Standard MSISDN / Mobile Number"
        num = cleaned.replace("-", "").replace(" ", "")
        metadata["number"] = num

        # Flag personal 10-digit mobile number claiming to be bank or police
        if len(num) == 10 or (len(num) == 12 and num.startswith("91")):
            flags.append({
                "severity": "critical",
                "title": "Personal Mobile Number Origin",
                "explanation": "Banks, law enforcement, and utility providers NEVER send official automated OTP or warning SMS from ordinary 10-digit consumer SIM cards.",
                "mitigation": "Treat any transactional claim from a 10-digit mobile number as fraudulent."
            })
            risk_score += 50

        # International prefixes often used in WhatsApp/Telegram fraud in South Asia
        if num.startswith("+92") or num.startswith("92"):
            metadata["origin_country"] = "Pakistan (+92)"
            flags.append({
                "severity": "critical",
                "title": "Cross-Border Fraud Origin (+92)",
                "explanation": "Indian law enforcement has repeatedly warned against WhatsApp calls/SMS from +92 claiming to be Mumbai Police, CBI, or KBC Lottery.",
                "mitigation": "Immediately block and report. Do not answer video calls."
            })
            risk_score += 55
        elif num.startswith("+1") or num.startswith("1"):
            metadata["origin_country"] = "North America / Virtual VoIP (+1)"
            flags.append({
                "severity": "medium",
                "title": "Virtual VoIP Service Indicator (+1)",
                "explanation": "Often purchased via burner app services (TextNow, Skype, Twilio) to obscure fraud syndicate origins.",
                "mitigation": "Verify whether the business legitimately operates from the US/Canada."
            })
            risk_score += 25
    else:
        # Bare text header without telecom prefix (e.g. "POLICE", "SBI", "ALERT")
        sender_type = "Unstructured Alphanumeric String"
        flags.append({
            "severity": "critical",
            "title": "Missing Regulatory Telecom Routing Prefix",
            "explanation": "Unregistered sender strings lacking telecom carrier prefixes are typically sent via unverified web SMS spoofing APIs or burner gateways.",
            "mitigation": "Do not trust sender names that cannot be tied to a registered telecom route."
        })
        risk_score += 50

    risk_score = min(risk_score, 100)
    verdict = "DANGEROUS" if risk_score >= 50 else ("SUSPICIOUS" if risk_score >= 25 else "VERIFIED_FORMAT")

    return {
        "verdict": verdict,
        "risk_score": risk_score,
        "sender_type": sender_type,
        "metadata": metadata,
        "flags": flags,
        "sender_id": cleaned
    }
