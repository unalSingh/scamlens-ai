import unittest
from backend.analysis_engine import analyze_rules

class AnalysisTests(unittest.TestCase):
    def test_otp_request_is_dangerous(self):
        result = analyze_rules("Submit your OTP immediately to restore access.", "sms")
        self.assertEqual(result["verdict"], "DANGEROUS")
        self.assertTrue(any("OTP" in f["quote"] or "otp" in f["quote"].lower() for f in result["red_flags"]))

    def test_job_fee_is_flagged(self):
        result = analyze_rules("Pay a refundable registration fee to get this job.", "job_offer")
        self.assertIn(result["verdict"], {"SUSPICIOUS", "DANGEROUS"})
        self.assertTrue(result["red_flags"])

    def test_no_indicators_does_not_claim_safe(self):
        result = analyze_rules("The team meeting is scheduled for 2 PM tomorrow.", "other")
        self.assertEqual(result["verdict"], "INSUFFICIENT_EVIDENCE")
        self.assertTrue(result["limitations"])

if __name__ == "__main__":
    unittest.main()
