#!/bin/bash

# Course Platform - Quick Start Script
# This script automates the setup process

set -e

echo "🚀 Course Platform - Quick Setup"
echo "=================================="

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${BLUE}Checking Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Backend Setup
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd backend

echo "Installing backend dependencies..."
npm install

echo "Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your MongoDB URI${NC}"
fi

echo -e "${GREEN}✓ Backend setup complete${NC}"

# Frontend Setup
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd ../frontend

echo "Installing frontend dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Done
echo -e "\n${GREEN}=====================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "\n${BLUE}Next Steps:${NC}"
echo -e "1. Start MongoDB: mongosh"
echo -e "2. Start Backend: cd backend && npm run dev"
echo -e "3. Start Frontend: cd frontend && npm run dev"
echo -e "4. Open http://localhost:5173 in your browser"
echo -e "\n${YELLOW}Make sure to update:${NC}"
echo -e "- backend/.env with your MongoDB connection string"
echo -e "- backend/.env with a strong JWT_SECRET"
