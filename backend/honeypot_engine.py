"""Anti-Scam Honeypot & Psychological Retaliation Simulator.
Simulates adversary behavioral escalation when confronted with
delay tactics, verification demands, or defiance.
"""
from typing import Dict, Any, List

SCENARIO_PROFILES = {
    "digital_arrest": {
        "title": "CBI / Police Digital Arrest",
        "initial_claim": "Illegal parcel seized at customs with drugs. Arrest warrant issued. Stay on Skype call.",
        "responses": {
            "ask_fir": {
                "label": "Ask for Official Written FIR Copy & Officer Badge ID",
                "scammer_retaliation": "Adversary sends a fabricated digital stamp document with blurry government seals, becomes visibly hostile, claims 'arguing with an officer is non-bailable contempt of court', and threatens immediate raid in 20 minutes.",
                "escalation_level": "High (Intimidation & Counterfeit Badges)",
                "recommended_move": "Immediately disconnect. True police never conduct video arrest proceedings or demand cash bail over Skype."
            },
            "visit_station": {
                "label": "State: 'I will personally visit the nearest police station with my lawyer'",
                "scammer_retaliation": "Adversary panics, tries to forbid you from leaving the room or telling anyone ('This is an in-camera confidential national security investigation'), and threatens that leaving will trigger an emergency SWAT raid.",
                "escalation_level": "Critical (Panic & Isolation Pressure)",
                "recommended_move": "Hang up and go directly to your local police station or dial 1930. The scam syndicate will vanish."
            },
            "feign_technical_issue": {
                "label": "State: 'My camera is broken and battery is at 2%'",
                "scammer_retaliation": "Scammer demands you plug in the charger immediately and switch to WhatsApp audio, insisting 'If you disconnect, it is treated as absconding'.",
                "escalation_level": "Medium (Coercion)",
                "recommended_move": "Turn off phone or block the number. File an incident complaint on cybercrime.gov.in."
            }
        }
    },
    "task_fraud": {
        "title": "Telegram Work-From-Home Task Scam",
        "initial_claim": "Earn ₹4,500 daily by liking YouTube videos. Deposit ₹3,000 refundable security to unlock VIP tasks.",
        "responses": {
            "deduct_fee": {
                "label": "State: 'Deduct the ₹3,000 security deposit from my earned wallet balance'",
                "scammer_retaliation": "Adversary gives a convoluted technical excuse ('Our automated smart contract ledger requires fresh external liquidity verification'), claiming the system won't let you withdraw until the top-up is completed.",
                "escalation_level": "High (Circular Sunk-Cost Trap)",
                "recommended_move": "Refuse to pay. Any money already deposited is gone; depositing more will only increase your loss."
            },
            "request_company_reg": {
                "label": "Ask for MCA Company Registration Certificate & GST Number",
                "scammer_retaliation": "Sends a Photoshopped certificate of incorporation for an unrelated registered company and pressures you: 'Hurry, task slot expires in 12 minutes!'.",
                "escalation_level": "Medium (Impersonation Lure)",
                "recommended_move": "Block the recruiter. Legitimate employers never require cash deposits to perform work."
            }
        }
    },
    "bank_kyc": {
        "title": "Bank Account Block / KYC Expiration",
        "initial_claim": "NetBanking access blocked due to expired PAN. Click link to submit OTP within 30 minutes.",
        "responses": {
            "visit_branch": {
                "label": "State: 'I will walk into my local bank branch tomorrow to update KYC'",
                "scammer_retaliation": "Scammer warns: 'Branch servers are offline today. If you do not update online right now, a penalty fee of ₹5,000 will be auto-debited and your account frozen permanently'.",
                "escalation_level": "High (Fabricated Financial Penalties)",
                "recommended_move": "Ignore completely. Banks cannot penalize or debit your account for updating KYC at a branch."
            },
            "give_wrong_otp": {
                "label": "Enter a dummy incorrect OTP (e.g., '000000')",
                "scammer_retaliation": "The phishing gateway displays 'Invalid OTP. Please re-enter current SMS OTP', while the attacker's script triggers another actual debit attempt on your card.",
                "escalation_level": "Critical (Active Automated Harvester)",
                "recommended_move": "Do not enter any numbers on unverified portals. Freeze debit card through official bank app immediately."
            }
        }
    }
}

def simulate_honeypot(scenario_key: str, reply_key: str) -> Dict[str, Any]:
    scenario = SCENARIO_PROFILES.get(scenario_key, SCENARIO_PROFILES["digital_arrest"])
    options = scenario.get("responses", {})
    action = options.get(reply_key)

    if not action:
        # Pick first available as fallback
        reply_key = list(options.keys())[0]
        action = options[reply_key]

    return {
        "scenario_key": scenario_key,
        "scenario_title": scenario["title"],
        "initial_claim": scenario["initial_claim"],
        "selected_action": action["label"],
        "adversary_reaction": action["scammer_retaliation"],
        "escalation_level": action["escalation_level"],
        "counter_defense": action["recommended_move"],
        "all_options": [
            {"key": k, "label": v["label"]} for k, v in options.items()
        ]
    }
