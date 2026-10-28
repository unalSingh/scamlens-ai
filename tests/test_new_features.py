import unittest
from backend.payment_analyzer import analyze_payment_payload
from backend.sender_analyzer import analyze_sender_id
from backend.honeypot_engine import simulate_honeypot

class NewFeaturesTest(unittest.TestCase):
    def test_reverse_upi_collect_detected(self):
        result = analyze_payment_payload("upi://pay?pa=scammer@okaxis&pn=Refund%20Claim&am=5000&tn=Receive%20Cashback")
        self.assertEqual(result["verdict"], "DANGEROUS")
        self.assertIn("Reverse UPI", result["threat_category"])
        self.assertTrue(any("Reverse UPI Collection" in f["title"] for f in result["flags"]))

    def test_crypto_address_detected(self):
        result = analyze_payment_payload("Deposit 200 USDT to TXYZopq1234567890123456789012345678")
        self.assertIn("Cryptocurrency", result["threat_category"])
        self.assertGreaterEqual(result["risk_score"], 40)

    def test_sender_id_dlt_parsing(self):
        result = analyze_sender_id("VK-HDFCBK")
        self.assertEqual(result["sender_type"], "Indian DLT Registered Header")
        self.assertEqual(result["metadata"]["operator"], "Vodafone Idea (Vi)")
        self.assertEqual(result["metadata"]["telecom_circle"], "Kolkata")
        self.assertIn("HDFC Bank", result["metadata"]["verified_brand"])

    def test_sender_id_personal_mobile(self):
        result = analyze_sender_id("9876543210")
        self.assertEqual(result["verdict"], "DANGEROUS")
        self.assertTrue(any("Personal Mobile" in f["title"] for f in result["flags"]))

    def test_honeypot_simulation(self):
        result = simulate_honeypot("digital_arrest", "ask_fir")
        self.assertEqual(result["scenario_key"], "digital_arrest")
        self.assertIn("badge", result["selected_action"].lower())
        self.assertIn("adversary_reaction", result)
        self.assertTrue(len(result["all_options"]) >= 2)

    def test_offline_image_forensics(self):
        from backend.analysis_engine import analyze_image_rules
        sample_img_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\nIDATx\x9cc\x00\x01\x00\x00\x05\x00\x01\r\n-\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
        res = analyze_image_rules(sample_img_bytes, "image/png", "other")
        self.assertIn(res["verdict"], ["SAFE", "SUSPICIOUS", "DANGEROUS"])
        self.assertTrue(res["evidence_hash"].startswith("SHA256-"))
        self.assertIn("image_forensics", res["engine"])

    def test_audio_acoustic_forensics(self):
        from backend.analysis_engine import analyze_audio_rules
        transcript = "This is CBI Crime Branch. You are under digital arrest. Stay on line or armed police will raid."
        res = analyze_audio_rules(transcript, None, "audio/webm")
        self.assertEqual(res["verdict"], "DANGEROUS")
        self.assertGreaterEqual(res["risk_score"], 80)
        self.assertIsNotNone(res.get("audio_analysis"))
        self.assertGreaterEqual(res["audio_analysis"]["coercion_cadence_score"], 50)
        self.assertTrue(len(res["audio_analysis"]["detected_audio_markers"]) > 0)

if __name__ == "__main__":
    unittest.main()
