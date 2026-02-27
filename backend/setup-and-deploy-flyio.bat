@echo off
echo ================================================
echo Fly.io Setup and Deployment
echo ================================================
echo.

cd /d "c:\Users\HP\Desktop\afodamspropertylimited\backend"

echo [1/6] Checking Fly CLI...
where fly >nul 2>nul
if errorlevel 1 (
    echo ERROR: Fly CLI not installed!
    echo Install from: https://fly.io/docs/hands-on/install-flyctl/
    pause
    exit /b 1
)

echo [2/6] Logging in to Fly.io...
fly auth login

echo.
echo [3/6] Creating Fly app (if it doesn't exist)...
fly apps create afodams-backend --org personal 2>nul
if errorlevel 1 (
    echo App might already exist, continuing...
)

echo.
echo [4/6] Setting up secrets...
echo.
echo CRITICAL: You need to set these environment variables.
echo.
set /p MONGO_URI="Enter your MongoDB URI (or press Enter to skip): "
if not "%MONGO_URI%"=="" (
    fly secrets set MONGO_URI="%MONGO_URI%"
)

set /p JWT_SECRET="Enter your JWT Secret (or press Enter to use default): "
if "%JWT_SECRET%"=="" set JWT_SECRET=afodams-jwt-secret-2026-change-in-production
fly secrets set JWT_SECRET="%JWT_SECRET%"

set /p EMAIL_USER="Enter your Email (for notifications): "
if not "%EMAIL_USER%"=="" (
    fly secrets set EMAIL_USER="%EMAIL_USER%"
)

set /p EMAIL_PASS="Enter your Email Password: "
if not "%EMAIL_PASS%"=="" (
    fly secrets set EMAIL_PASS="%EMAIL_PASS%"
)

echo.
echo [5/6] Allocating IP address...
fly ips allocate-v4 2>nul

echo.
echo [6/6] Deploying to Fly.io...
fly deploy

echo.
echo ================================================
echo Deployment Complete!
echo.
echo Your backend is live at: https://afodams-backend.fly.dev
echo.
echo Useful commands:
echo   fly status          - Check app status
echo   fly logs           - View logs
echo   fly open           - Open in browser
echo   fly ssh console    - SSH into the app
echo ================================================
pause
