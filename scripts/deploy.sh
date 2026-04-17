#!/bin/bash

# THIRSTEE Production Deployment Script

echo "🚀 Deploying THIRSTEE to production..."

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Build and deploy with Docker
echo "🐳 Building Docker containers..."
docker-compose -f docker-compose.yml build

echo "🚀 Starting production services..."
docker-compose -f docker-compose.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check health
echo "🏥 Checking service health..."
curl -f http://localhost:5000/api/health || echo "❌ Backend health check failed"
curl -f http://localhost:3000 || echo "❌ Frontend health check failed"

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your application is running at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:5000/api"
echo "- Admin Panel: http://localhost:3000/admin"
echo ""
echo "📊 To view logs:"
echo "docker-compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "docker-compose down"