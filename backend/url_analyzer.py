"""Offline URL heuristics. This does not visit URLs or verify reputation."""
from urllib.parse import urlparse
import re, ipaddress
SHORTENERS = {'bit.ly','tinyurl.com','t.co','is.gd','cutt.ly','rb.gy','shorturl.at','ow.ly'}
SUSPICIOUS_WORDS = ('login','verify','secure','account','wallet','payment','update','confirm','bank','support')
BRANDS = ('paypal','microsoft','apple','google','amazon','facebook','instagram','whatsapp','netflix','sbi','hdfc','icici')

def analyze_url(raw: str):
    value = raw.strip()
    if not value: return {'url': '', 'risk_score': 0, 'verdict': 'INSUFFICIENT_EVIDENCE', 'signals': [], 'limitations': ['No URL supplied.']}
    candidate = value if '://' in value else 'https://' + value
    try:
        p = urlparse(candidate)
        host = (p.hostname or '').lower().rstrip('.')
        if not host or '.' not in host: raise ValueError()
    except Exception:
        return {'url': value, 'risk_score': 35, 'verdict': 'SUSPICIOUS', 'signals': ['URL could not be parsed reliably.'], 'limitations': ['This is a syntax-only check; no external reputation lookup was performed.']}
    signals=[]; score=0
    try:
        ipaddress.ip_address(host); signals.append('Uses an IP address instead of a conventional domain.'); score += 25
    except ValueError: pass
    if host in SHORTENERS: signals.append('Uses a URL-shortening service that hides the final destination.'); score += 22
    if p.username or p.password: signals.append('Contains user-info credentials before the hostname.'); score += 35
    if host.startswith('xn--') or '.xn--' in host: signals.append('Contains an internationalized/punycode hostname; inspect for lookalike characters.'); score += 20
    if host.count('-') >= 2: signals.append('Hostname contains multiple hyphens. This can be legitimate but merits inspection.'); score += 8
    if len(host) > 45: signals.append('Hostname is unusually long.'); score += 8
    if host.count('.') >= 4: signals.append('Hostname has many subdomain levels.'); score += 10
    if any(word in (host + p.path).lower() for word in SUSPICIOUS_WORDS): signals.append('URL includes account/security/action words often used in phishing lures.'); score += 8
    for brand in BRANDS:
        if brand in host and not (host == brand+'.com' or host.endswith('.'+brand+'.com')):
            signals.append(f'Brand-like text "{brand}" appears in a domain that is not its obvious official domain.'); score += 20; break
    if p.scheme.lower() != 'https': signals.append('Does not use HTTPS.'); score += 12
    score=min(100,score)
    verdict='DANGEROUS' if score>=55 else 'SUSPICIOUS' if score>=20 else 'INSUFFICIENT_EVIDENCE'
    if not signals: signals=['No obvious URL-pattern red flags were detected. This does not establish that the site is safe.']
    return {'url': value, 'hostname': host, 'scheme': p.scheme, 'risk_score': score, 'verdict': verdict, 'signals': signals, 'limitations': ['Offline heuristic only: the URL was not opened and no DNS, certificate, blocklist, or reputation service was queried.', 'A low score is not proof of safety; confirm the domain through an independently trusted source.']}
