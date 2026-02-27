@echo off
echo ================================================
echo AFODAMS Backend Deployment Script
echo ================================================
echo.

cd /d "c:\Users\HP\Desktop\afodamspropertylimited\backend"

REM Check for secrets
echo [1/4] Checking for sensitive files...
if exist ".env" (
    echo.
    echo WARNING: .env file detected!
    echo This file contains MongoDB credentials and secrets.
    echo.
    set /p confirm="Type 'SAFE' to confirm .env is in .gitignore and won't be pushed: "
    if not "!confirm!"=="SAFE" (
        echo Deployment cancelled for safety.
        pause
        exit /b 1
    )
)

echo [2/4] Verifying .gitignore protection...
findstr /C:".env" .gitignore >nul
if errorlevel 1 (
    echo ERROR: .env not found in .gitignore!
    echo Adding .env to .gitignore for safety...
    echo .env >> .gitignore
)

echo [3/4] Staging backend files (excluding .env)...
git add .

echo [4/4] Committing changes...
git commit -m "chore: Backend updates for deployment"

echo.
echo ================================================
echo Backend staged and committed!
echo.
echo Choose deployment platform:
echo 1. Push to GitHub only (manual deploy)
echo 2. Deploy to Render.com
echo 3. Deploy to Fly.io
echo ================================================
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo Pushing to GitHub...
    git push origin main
    echo.
    echo Done! Deploy manually from your hosting platform.
) else if "%choice%"=="2" (
    echo.
    echo Deploying to Render.com...
    echo Visit: https://dashboard.render.com
    echo Link your GitHub repo and it will auto-deploy!
) else if "%choice%"=="3" (
    echo.
    echo Deploying to Fly.io...
    fly deploy
) else (
    echo Invalid choice.
)

pause
