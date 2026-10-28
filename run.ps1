$pythonExe = "$env:LOCALAPPDATA\Programs\Python\Python313\python.exe"
if (-not (Test-Path $pythonExe)) {
    $pythonExe = "python"
}

# Find local IPv4 address
$localIp = "127.0.0.1"
try {
    $ipConfig = ipconfig | Select-String "IPv4 Address"
    if ($ipConfig) {
        $match = [regex]::Match($ipConfig[0], '([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})')
        if ($match.Success) {
            $localIp = $match.Groups[1].Value
        }
    }
} catch {}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  SCAMLENS AI 3D v3.0 - NETWORK SERVER READY" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  -> On this PC:      http://127.0.0.1:8000" -ForegroundColor White
Write-Host "  -> On Mobile/Other: http://$($localIp):8000" -ForegroundColor Yellow
Write-Host "  (Ensure mobile is connected to the same Wi-Fi network)" -ForegroundColor DarkGray
Write-Host "======================================================================" -ForegroundColor Cyan
& $pythonExe -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
