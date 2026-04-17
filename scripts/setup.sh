#!/bin/bash

# THIRSTEE Project Setup Script

echo "🚀 Setting up THIRSTEE project..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

# Setup Backend
echo "📦 Setting up Flask backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Initialize database
echo "🗄️ Initializing database..."
python app.py &
BACKEND_PID=$!
sleep 5
kill $BACKEND_PID

cd ..

# Setup Frontend
echo "🎨 Setting up Next.js frontend..."
npm install

# Create environment files if they don't exist
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "📝 Created .env.local - please update with your configuration"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "📝 Created backend/.env - please update with your configuration"
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development servers:"
echo "1. Backend: cd backend && source venv/bin/activate && python app.py"
echo "2. Frontend: npm run dev"
echo ""
echo "🌐 Access the application:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:5000/api"
echo "- Admin Panel: http://localhost:3000/admin"
echo ""
echo "🔑 Default admin credentials:"
echo "- Username: admin"
echo "- Password: thirstee2024"