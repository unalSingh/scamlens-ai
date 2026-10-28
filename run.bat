@echo off
set PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python313\python.exe
if not exist "%PYTHON_EXE%" (
    set PYTHON_EXE=python
)
echo ======================================================================
echo   SCAMLENS AI 3D v3.0 - NETWORK SERVER READY
echo ======================================================================
echo   -^> On this PC:      http://127.0.0.1:8000
echo   -^> On Mobile/Other: Check your Wi-Fi IPv4 address (e.g. http://10.181.78.215:8000)
echo   (Ensure mobile is connected to the same Wi-Fi network)
echo ======================================================================
start http://localhost:8000
"%PYTHON_EXE%" -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
