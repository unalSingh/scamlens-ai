@echo off
title ScamLens 4G Live Sharer
echo ======================================================================
echo           SCAMLENS AI 3D - 4G / MOBILE INTERNET TUNNEL
echo ======================================================================
echo.
echo [IMPORTANT] Ensure "start.bat" is already running in your other window!
echo.
echo Starting secure tunnel...
echo (If asked "Are you sure you want to continue connecting (yes/no)?", type yes and press Enter)
echo.
ssh -p 443 -R0:127.0.0.1:8000 a.pinggy.io
echo.
echo If pinggy is busy, trying localhost.run fallback:
ssh -R 80:127.0.0.1:8000 nokey@localhost.run
pause
