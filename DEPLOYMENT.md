# 🚀 THIRSTEE Deployment Guide

This guide covers multiple deployment options for the THIRSTEE web application with Flask backend.

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Docker** and Docker Compose (for containerized deployment)
- **PostgreSQL** (for production database)

## 🛠️ Quick Setup

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd thirstee-webapp
npm run setup
```

### 2. Start Development Servers
```bash
# Option 1: Run both frontend and backend together
npm run dev:full

# Option 2: Run separately
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py

# Terminal 2 - Frontend
npm run dev
```

### 3. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:3000/admin
- **Credentials**: admin / thirstee2024

## 🐳 Docker Deployment

### Development with Docker
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production with Docker
```bash
# Deploy to production
npm run deploy

# Or manually:
docker-compose -f docker-compose.yml up -d
```

## ☁️ Cloud Deployment Options

### 1. Vercel + Heroku (Recommended)

#### Frontend (Vercel)
1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com/api
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   ```

#### Backend (Heroku)
1. **Create Heroku App**:
   ```bash
   cd backend
   heroku create your-thirstee-api
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set FLASK_ENV=production
   heroku config:set SECRET_KEY=your-production-secret
   heroku config:set JWT_SECRET_KEY=your-jwt-secret
   heroku config:set DATABASE_URL=your-postgres-url
   ```

3. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

### 2. AWS Deployment

#### Frontend (AWS Amplify)
1. Connect your GitHub repository
2. Set build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

#### Backend (AWS ECS/Fargate)
1. Build and push Docker image to ECR
2. Create ECS service with the image
3. Configure RDS PostgreSQL database
4. Set up Application Load Balancer

### 3. DigitalOcean App Platform

#### Full Stack Deployment
1. **Create App**:
   - Connect GitHub repository
   - Configure services:

2. **Frontend Service**:
   ```yaml
   name: thirstee-frontend
   source_dir: /
   github:
     repo: your-username/thirstee-webapp
     branch: main
   run_command: npm start
   build_command: npm run build
   ```

3. **Backend Service**:
   ```yaml
   name: thirstee-backend
   source_dir: /backend
   github:
     repo: your-username/thirstee-webapp
     branch: main
   run_command: gunicorn app:app
   ```

## 🗄️ Database Setup

### Development (SQLite)
- Automatically created when running the backend
- File: `backend/thirstee.db`

### Production (PostgreSQL)

#### Local PostgreSQL
```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb thirstee_db
sudo -u postgres createuser thirstee_user

# Set environment variable
export DATABASE_URL=postgresql://thirstee_user:password@localhost/thirstee_db
```

#### Cloud PostgreSQL
- **Heroku Postgres**: Automatically provisioned
- **AWS RDS**: Create PostgreSQL instance
- **DigitalOcean Managed Database**: Create PostgreSQL cluster

## 🔧 Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Backend (.env)
```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=postgresql://user:pass@host:port/dbname

# Image Upload (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Optional)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 🔒 Security Checklist

### Production Security
- [ ] Change default admin password
- [ ] Use strong SECRET_KEY and JWT_SECRET_KEY
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable database backups
- [ ] Configure monitoring and logging

### SSL/HTTPS Setup
```bash
# Using Let's Encrypt with Certbot
sudo apt-get install certbot
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring & Maintenance

### Health Checks
- **Backend**: `GET /api/health`
- **Frontend**: Check if homepage loads

### Logging
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Heroku logs
heroku logs --tail -a your-app-name
```

### Database Backups
```bash
# PostgreSQL backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

## 🚀 Performance Optimization

### Frontend
- Enable Next.js Image Optimization
- Configure CDN (Cloudflare/AWS CloudFront)
- Enable gzip compression
- Optimize bundle size

### Backend
- Use Redis for caching
- Configure database connection pooling
- Enable response compression
- Optimize database queries

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in Flask app
   - Verify API URL in frontend environment

2. **Database Connection**:
   - Verify DATABASE_URL format
   - Check database server status
   - Ensure network connectivity

3. **Authentication Issues**:
   - Check JWT_SECRET_KEY consistency
   - Verify token expiration settings
   - Clear browser localStorage

4. **Image Upload Failures**:
   - Configure Cloudinary credentials
   - Check file size limits
   - Verify upload permissions

### Debug Commands
```bash
# Check backend health
curl http://localhost:5000/api/health

# Test database connection
python -c "from backend.app import db; db.create_all(); print('DB OK')"

# Check frontend build
npm run build

# Verify environment variables
printenv | grep NEXT_PUBLIC
```

## 📞 Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test API endpoints manually
4. Check database connectivity

---

**🎉 Congratulations!** Your THIRSTEE application is now ready for production deployment!

For additional help, refer to the platform-specific documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Heroku Docs](https://devcenter.heroku.com/)
- [AWS Docs](https://docs.aws.amazon.com/)
- [DigitalOcean Docs](https://docs.digitalocean.com/)