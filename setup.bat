@echo off
REM Course Platform - Windows Quick Start Script

echo 🚀 Course Platform - Quick Setup
echo ==================================

REM Check Node.js
echo.
echo Checking Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found

REM Backend Setup
echo.
echo Setting up Backend...
cd backend

echo Installing backend dependencies...
call npm install

if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update backend\.env with your MongoDB URI
)

echo ✓ Backend setup complete

REM Frontend Setup
echo.
echo Setting up Frontend...
cd ..\frontend

echo Installing frontend dependencies...
call npm install

echo ✓ Frontend setup complete

REM Done
echo.
echo =====================================
echo ✓ Setup Complete!
echo =====================================
echo.
echo Next Steps:
echo 1. Start MongoDB: mongosh
echo 2. Start Backend: cd backend ^&^& npm run dev
echo 3. Start Frontend: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173 in your browser
echo.
echo Make sure to update:
echo - backend\.env with your MongoDB connection string
echo - backend\.env with a strong JWT_SECRET
echo.
pause
