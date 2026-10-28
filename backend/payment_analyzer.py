"""Forensic Payment & UPI QR Code Threat Analyzer.
Detects UPI reverse-collection fraud, deceptive merchant handles,
punycode redirects, and cryptocurrency address traps.
"""
import re
from urllib.parse import parse_qs, urlparse
from typing import Dict, Any, List

def analyze_payment_payload(payload: str) -> Dict[str, Any]:
    cleaned = payload.strip()
    flags: List[Dict[str, str]] = []
    risk_score = 0
    threat_category = "Standard Payment"
    details: Dict[str, Any] = {}

    # Check if UPI Intent URI
    if cleaned.startswith("upi://") or "pay?pa=" in cleaned:
        threat_category = "UPI Intent Payment"
        parsed = urlparse(cleaned)
        params = parse_qs(parsed.query)

        vpa = params.get("pa", [""])[0]
        payee_name = params.get("pn", [""])[0]
        amount = params.get("am", [""])[0]
        txn_note = params.get("tn", [""])[0]
        mode = params.get("mode", [""])[0]

        details = {
            "protocol": "Unified Payments Interface (UPI)",
            "payee_vpa": vpa,
            "payee_name": payee_name or "Not Specified",
            "amount": amount or "Dynamic / User Input",
            "transaction_note": txn_note or "None",
            "mode": mode or "Standard P2P/P2M"
        }

        # Check for Reverse-Collect Scam
        # Scammers trick victims into entering UPI PIN to "receive" cashback, refunds, or OLX buyer payment
        reverse_collect_indicators = [
            "refund", "cashback", "receive", "claim", "prize", "reward", "credit", "won", "accept money"
        ]
        for term in reverse_collect_indicators:
            if term in txn_note.lower() or term in payee_name.lower():
                flags.append({
                    "severity": "critical",
                    "title": "Reverse UPI Collection Fraud Indicator",
                    "explanation": f"Note/Name contains '{term}'. Scammers send a DEBIT request disguised as a payment to receive.",
                    "mitigation": "NEVER enter your UPI PIN to receive money. Entering PIN always DEBITS your account."
                })
                risk_score += 50
                threat_category = "Reverse UPI Collect Trap"
                break

        # Check VPA handle
        if vpa:
            # Personal handle instead of verified merchant
            common_psp_handles = ["okaxis", "okhdfcbank", "oksbi", "okicici", "paytm", "ybl", "ibl", "axl"]
            vpa_domain = vpa.split("@")[-1].lower() if "@" in vpa else ""

            # Check if attempting to impersonate brands in personal VPAs
            impersonated_brands = ["sbi", "hdfc", "police", "customs", "cbi", "support", "airtel", "electricity"]
            vpa_prefix = vpa.split("@")[0].lower() if "@" in vpa else ""
            for brand in impersonated_brands:
                if brand in vpa_prefix and any(psp in vpa_domain for psp in common_psp_handles):
                    flags.append({
                        "severity": "high",
                        "title": f"Personal VPA Brand Spoofing ('{brand}')",
                        "explanation": f"The VPA uses '{brand}' on a consumer wallet handle ({vpa_domain}). Genuine organizations use dedicated corporate gateways.",
                        "mitigation": "Do not transfer funds to individual personal UPI IDs claiming to represent institutions."
                    })
                    risk_score += 35
                    break

    # Cryptocurrency Address Detection
    btc_match = re.search(r"\b([13][a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[ac-hj-np-z02-9]{11,71})\b", cleaned)
    eth_match = re.search(r"\b(0x[a-fA-F0-9]{40})\b", cleaned)
    trc20_match = re.search(r"\b(T[A-Za-z0-9]{33})\b", cleaned)
    crypto_kw = re.search(r"\b(usdt|crypto|bitcoin|ethereum|btc|eth|tron|trx|wallet)\b", cleaned, re.IGNORECASE)

    if btc_match or eth_match or trc20_match or crypto_kw:
        threat_category = "Cryptocurrency Wallet Transfer"
        coin = "Bitcoin" if btc_match else ("Ethereum / ERC-20" if eth_match else ("TRC-20 / USDT" if trc20_match else "Crypto Asset"))
        addr = (btc_match or eth_match or trc20_match).group(0) if (btc_match or eth_match or trc20_match) else "Specified in context"
        details = {
            "protocol": f"Blockchain Asset Transfer ({coin})",
            "destination_address": addr
        }
        flags.append({
            "severity": "high",
            "title": f"Irreversible {coin} Transfer",
            "explanation": "Cryptocurrency transactions have zero consumer protection, chargebacks, or banking recourse.",
            "mitigation": "Never send crypto for investment yields, job security deposits, or law enforcement fines."
        })
        risk_score += 45

    # General HTTP/Web Payment Link
    if cleaned.startswith("http://") or cleaned.startswith("https://"):
        threat_category = "Payment Web Gateway Link"
        details["url"] = cleaned
        if "http://" in cleaned:
            flags.append({
                "severity": "critical",
                "title": "Unencrypted HTTP Payment Gateway",
                "explanation": "Payment requests must always use HTTPS. HTTP transmits credentials in cleartext.",
                "mitigation": "Immediately abort navigation."
            })
            risk_score += 45

    # Verdict
    risk_score = min(risk_score, 100)
    if risk_score >= 50:
        verdict = "DANGEROUS"
    elif risk_score >= 20:
        verdict = "SUSPICIOUS"
    elif flags:
        verdict = "CAUTION"
    else:
        verdict = "STANDARD_FORMAT"
        risk_score = 10

    return {
        "verdict": verdict,
        "risk_score": risk_score,
        "threat_category": threat_category,
        "flags": flags,
        "details": details,
        "raw_payload": cleaned[:200]
    }
