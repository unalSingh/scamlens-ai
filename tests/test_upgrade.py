import tempfile, unittest
from pathlib import Path
from backend.url_analyzer import analyze_url
from backend import database

class URLAnalyzerTests(unittest.TestCase):
    def test_shortener_is_flagged(self):
        result = analyze_url('https://bit.ly/abc')
        self.assertTrue(any('shortening' in s.lower() for s in result['signals']))
        self.assertGreaterEqual(result['risk_score'], 20)
    def test_no_signal_is_not_safe_verdict(self):
        result = analyze_url('https://example.com')
        self.assertEqual(result['verdict'], 'INSUFFICIENT_EVIDENCE')
        self.assertTrue(result['limitations'])
    def test_invalid_url(self):
        result = analyze_url('not a valid url')
        self.assertIn(result['verdict'], {'SUSPICIOUS','INSUFFICIENT_EVIDENCE'})

class DatabaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old = database.DB_PATH
        database.DB_PATH = Path(self.tmp.name) / 'test.db'
        database.init_db()
    def tearDown(self):
        database.DB_PATH = self.old
        self.tmp.cleanup()
    def test_save_list_get_delete(self):
        result={'verdict':'SUSPICIOUS','risk_score':42,'engine':'rules','red_flags':[{'quote':'pay fee'}]}
        item_id=database.save_analysis('Please pay fee now', 'job_offer', result)
        items=database.list_analyses()
        self.assertEqual(items[0]['id'], item_id)
        self.assertEqual(database.get_analysis(item_id)['report']['verdict'], 'SUSPICIOUS')
        self.assertTrue(database.delete_analysis(item_id))
        self.assertIsNone(database.get_analysis(item_id))

if __name__ == '__main__': unittest.main()
