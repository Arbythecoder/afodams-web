@echo off
echo ================================================
echo Complete Fly.io Setup from Scratch
echo ================================================
echo.

cd /d "c:\Users\HP\Desktop\afodamspropertylimited\backend"

echo [Step 1] Login to Fly.io...
fly auth login
if errorlevel 1 (
    echo Login failed! Please try again.
    pause
    exit /b 1
)

echo.
echo [Step 2] Launch new Fly.io app...
echo This will create and configure the app automatically.
echo.

fly launch --name afodams-backend --region fra --no-deploy

echo.
echo [Step 3] Set environment secrets...
echo.
echo You need to provide your MongoDB connection string.
echo Example: mongodb+srv://username:password@cluster.mongodb.net/dbname
echo.
set /p MONGO_URI="Paste your MongoDB URI: "
fly secrets set MONGO_URI="%MONGO_URI%" --app afodams-backend

echo.
set /p JWT_SECRET="Enter JWT Secret (or press Enter for auto-generated): "
if "%JWT_SECRET%"=="" (
    fly secrets set JWT_SECRET="afodams-jwt-2026-%RANDOM%%RANDOM%" --app afodams-backend
) else (
    fly secrets set JWT_SECRET="%JWT_SECRET%" --app afodams-backend
)

echo.
echo [Step 4] Deploy the application...
fly deploy --app afodams-backend

echo.
echo ================================================
echo Deployment Complete!
echo.
echo Your backend URL: https://afodams-backend.fly.dev
echo.
echo Test it: https://afodams-backend.fly.dev/health
echo.
echo Useful commands:
echo   fly logs --app afodams-backend
echo   fly status --app afodams-backend
echo   fly open --app afodams-backend
echo ================================================
pause
