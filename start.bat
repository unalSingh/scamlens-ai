@echo off
title ScamLens AI 3D Server
cd /d "%~dp0"

set PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python313\python.exe
if not exist "%PYTHON_EXE%" (
    set PYTHON_EXE=python
)

echo ======================================================================
echo           SCAMLENS AI 3D v3.0 - SERVER STARTING
echo ======================================================================
echo.
echo   [PC Browser]:       http://127.0.0.1:8000
echo   [Mobile on Wi-Fi]:  http://10.181.78.215:8000
echo.
echo   Press Ctrl+C to stop the server at any time.
echo ======================================================================
echo.

"%PYTHON_EXE%" -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

echo.
echo Server stopped.
pause
