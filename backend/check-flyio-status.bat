@echo off
echo ================================================
echo Fly.io Status Check
echo ================================================
echo.

cd /d "c:\Users\HP\Desktop\afodamspropertylimited\backend"

echo Checking if app exists...
fly apps list

echo.
echo ================================================
echo Checking app status...
fly status --app afodams-backend

echo.
echo ================================================
pause
