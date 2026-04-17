# THIRSTEE - Water Bottle Solutions with Purpose

A modern, full-stack web application for THIRSTEE - a company that provides free custom-labeled water bottles for advertising while supporting communities in need.

## 🌟 Features

### Frontend Features
- **Modern Design**: Professional typography, elegant color scheme, and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Components**: Smooth animations using Framer Motion
- **Hero Carousel**: Rotating slides showcasing water crisis awareness
- **Dynamic Sections**: About, Services, Products, Testimonials, and more
- **Image Gallery**: Filterable project gallery with lightbox functionality
- **Contact Forms**: Professional contact and inquiry forms

### Backend Features
- **Flask REST API**: Complete backend with database integration
- **Authentication**: JWT-based admin authentication system
- **Database Models**: Products, Gallery, Join Requests, Contact Messages, Settings
- **Image Upload**: Cloudinary integration for image management
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Data Validation**: Email validation and input sanitization
- **Rate Limiting**: API protection against abuse
- **Health Monitoring**: Health check endpoints

### Admin Dashboard
- **Secure Login**: JWT authentication with session management
- **Content Management**: Edit all website content dynamically
- **Product Management**: Add, edit, delete products with inventory tracking
- **Gallery Management**: Upload and organize project images
- **Request Management**: Review and manage partnership requests
- **User Management**: Manage sponsors and user accounts
- **Site Settings**: Configure global site settings
- **Real-time Stats**: Dashboard with key metrics and analytics

### Pages Included
- **Home**: Complete landing page with all sections
- **About**: Company story, mission, vision, and team
- **Services**: Detailed service offerings with features
- **Gallery**: Project showcase with category filtering
- **Contact**: Contact information and inquiry forms
- **Admin**: Complete dashboard for content management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL (for production)

### Quick Setup

1. **Clone and setup the project**
   ```bash
   git clone <your-repo-url>
   cd thirstee-webapp
   npm run setup
   ```

2. **Start development servers**
   ```bash
   # Run both frontend and backend
   npm run dev:full
   
   # Or run separately:
   # Backend: cd backend && python app.py
   # Frontend: npm run dev
   ```

3. **Access the application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### Admin Access
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `thirstee2024`

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography
- **Typography**: Inter + Poppins font combination
- **Images**: Next.js Image optimization

### Backend
- **Framework**: Flask with SQLAlchemy ORM
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT with Flask-JWT-Extended
- **Image Upload**: Cloudinary integration
- **Validation**: Email validation and input sanitization
- **Security**: CORS, rate limiting, password hashing

### Infrastructure
- **Containerization**: Docker and Docker Compose
- **Reverse Proxy**: Nginx with SSL termination
- **Database**: PostgreSQL with connection pooling
- **File Storage**: Cloudinary for image management

## 🎨 Design System

### Colors
- **Primary**: Blue tones (#1890ff family)
- **Secondary**: Cyan tones (#0ea5e9 family) 
- **Accent**: Green tones (#10b981 family)
- **Gradients**: Multi-color gradients for visual appeal

### Typography
- **Headings**: Poppins (Display font)
- **Body**: Inter (Sans-serif)
- **Weights**: 300-900 range for flexibility

### Components
- **Buttons**: Primary, secondary, and gradient variants
- **Cards**: Hover effects and shadow transitions
- **Forms**: Modern input styling with focus states
- **Navigation**: Smooth transitions and active states

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid System**: CSS Grid and Flexbox for layouts
- **Touch Friendly**: Large touch targets and gestures

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (auth required)
- `PUT /api/products/:id` - Update product (auth required)
- `DELETE /api/products/:id` - Delete product (auth required)

### Gallery
- `GET /api/gallery` - Get gallery items
- `POST /api/gallery` - Create gallery item (auth required)
- `PUT /api/gallery/:id` - Update gallery item (auth required)
- `DELETE /api/gallery/:id` - Delete gallery item (auth required)

### Join Requests
- `GET /api/join-requests` - Get all requests (auth required)
- `POST /api/join-requests` - Submit join request
- `PUT /api/join-requests/:id/status` - Update request status (auth required)

### Contact
- `GET /api/contact` - Get contact messages (auth required)
- `POST /api/contact` - Submit contact message

### Upload
- `POST /api/upload` - Upload image (auth required)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings (auth required)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (auth required)

## 🚀 Deployment

### Development
```bash
npm run dev:full
```

### Production with Docker
```bash
npm run deploy
```

### Cloud Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including:
- Vercel + Heroku
- AWS (Amplify + ECS)
- DigitalOcean App Platform
- Docker deployment

## 🔒 Security Features

- **JWT Authentication**: Secure admin access
- **Password Hashing**: Werkzeug security for passwords
- **Input Validation**: Email validation and sanitization
- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: API protection against abuse
- **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
- **XSS Protection**: Input sanitization and validation

## 📊 Performance Features

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loads
- **Database Optimization**: Efficient queries and indexing
- **Caching**: Response caching and static file optimization
- **CDN Ready**: Optimized for CDN deployment
- **Lazy Loading**: Components load as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for THIRSTEE. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: support@thirstee.com
- Phone: +1 (555) 123-4567

---

**THIRSTEE** - Quenching thirst, creating impact, one bottle at a time. 💧