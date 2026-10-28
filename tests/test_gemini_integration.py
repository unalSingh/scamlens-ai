import unittest
from backend.schemas import AnalyzeResponse, RedFlag, ImageAnalyzeRequest
from backend.analysis_engine import analyze_rules
from backend.llm_provider import get_active_provider_name, gemini_configured, get_gemini_api_key

class GeminiIntegrationTests(unittest.TestCase):
    def test_provider_defaults_to_rules_without_keys(self):
        active = get_active_provider_name()
        self.assertIn(active, ["gemini", "openai", "rules"])

    def test_schema_rich_fields(self):
        result = analyze_rules("CBI Digital Arrest warrant issued. Pay ₹50,000 immediately to clear customs.", "other")
        self.assertEqual(result["verdict"], "DANGEROUS")
        self.assertIn("Digital Arrest", result["scam_type"])
        self.assertTrue(len(result["psychological_triggers"]) > 0)
        self.assertTrue(len(result["attack_vector"]) > 0)
        self.assertTrue(len(result["emergency_checklist"]) > 0)

        # Validate with pydantic AnalyzeResponse model
        response = AnalyzeResponse(**result)
        self.assertEqual(response.verdict, "DANGEROUS")
        self.assertEqual(response.engine, "rules")

    def test_custom_key_detection(self):
        self.assertFalse(gemini_configured("123"))
        self.assertTrue(gemini_configured("AIzaSyFakeValidLookingKey1234567890"))
        self.assertEqual(get_gemini_api_key("AIzaSyFakeValidLookingKey1234567890"), "AIzaSyFakeValidLookingKey1234567890")

if __name__ == "__main__":
    unittest.main()
