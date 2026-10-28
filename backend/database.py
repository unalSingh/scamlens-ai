"""Local SQLite store for investigation history with safe connection management."""
import sqlite3, json, os
from pathlib import Path
from datetime import datetime, timezone
from contextlib import contextmanager

DB_PATH = Path(os.getenv('SCAMLENS_DB_PATH', Path(__file__).resolve().parent.parent / 'scamlens_history.db'))

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()

def init_db():
    with get_db() as c:
        c.execute('''CREATE TABLE IF NOT EXISTS analyses (
          id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL,
          message_type TEXT NOT NULL, message_preview TEXT NOT NULL,
          verdict TEXT NOT NULL, risk_score INTEGER NOT NULL, engine TEXT NOT NULL,
          red_flag_count INTEGER NOT NULL, report_json TEXT NOT NULL)''')

def save_analysis(message: str, message_type: str, result: dict) -> int:
    preview = message[:240]
    with get_db() as c:
        cur = c.execute('INSERT INTO analyses(created_at,message_type,message_preview,verdict,risk_score,engine,red_flag_count,report_json) VALUES(?,?,?,?,?,?,?,?)',
          (datetime.now(timezone.utc).isoformat(), message_type, preview, result.get('verdict','INSUFFICIENT_EVIDENCE'), int(result.get('risk_score',0)), result.get('engine','rules'), len(result.get('red_flags',[])), json.dumps(result, ensure_ascii=False)))
        return int(cur.lastrowid)

def list_analyses(limit: int = 50, filter_verdict: str = None):
    with get_db() as c:
        if filter_verdict:
            rows = c.execute('SELECT id,created_at,message_type,message_preview,verdict,risk_score,engine,red_flag_count FROM analyses WHERE verdict=? ORDER BY id DESC LIMIT ?', (filter_verdict, max(1,min(limit,100)))).fetchall()
        else:
            rows = c.execute('SELECT id,created_at,message_type,message_preview,verdict,risk_score,engine,red_flag_count FROM analyses ORDER BY id DESC LIMIT ?', (max(1,min(limit,100)),)).fetchall()
        return [dict(r) for r in rows]

def get_analysis(item_id: int):
    with get_db() as c:
        row = c.execute('SELECT * FROM analyses WHERE id=?', (item_id,)).fetchone()
        if not row: return None
        data = dict(row); data['report'] = json.loads(data.pop('report_json'))
        return data

def delete_analysis(item_id: int):
    with get_db() as c:
        cur = c.execute('DELETE FROM analyses WHERE id=?', (item_id,))
        return cur.rowcount > 0

def clear_all_analyses():
    with get_db() as c:
        c.execute('DELETE FROM analyses')
        return True
