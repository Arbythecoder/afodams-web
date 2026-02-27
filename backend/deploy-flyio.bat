@echo off
echo ================================================
echo Deploying Backend to Fly.io
echo ================================================
echo.

cd /d "c:\Users\HP\Desktop\afodamspropertylimited\backend"

REM Check for .env file
echo [1/5] Checking for secrets...
if exist ".env" (
    echo WARNING: .env file detected locally (this is OK - it won't be deployed)
    echo Fly.io will use environment secrets you set via dashboard/CLI
)

REM Verify Fly CLI is installed
echo.
echo [2/5] Checking Fly CLI installation...
where fly >nul 2>nul
if errorlevel 1 (
    echo ERROR: Fly CLI not installed!
    echo.
    echo Install it from: https://fly.io/docs/hands-on/install-flyctl/
    echo Or run: powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
    pause
    exit /b 1
)

echo Fly CLI found!

REM Stage and commit changes
echo.
echo [3/5] Staging backend files...
git add .
git status --short

echo.
echo [4/5] Committing changes...
git commit -m "deploy: Backend deployment to Fly.io" || echo No changes to commit

echo.
echo [5/5] Deploying to Fly.io...
echo.
echo IMPORTANT: Make sure you've set these secrets in Fly.io:
echo   - MONGO_URI
echo   - JWT_SECRET
echo   - EMAIL_USER
echo   - EMAIL_PASS
echo.
echo Set secrets with: fly secrets set MONGO_URI="your-mongo-uri"
echo.
pause

fly deploy

echo.
echo ================================================
echo Deployment complete!
echo Check status: fly status
echo View logs: fly logs
echo Open app: fly open
echo ================================================
pause
