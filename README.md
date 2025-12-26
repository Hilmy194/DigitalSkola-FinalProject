# Forum Application - Full Stack Cloud Deployment

## �️ Kriteria Teknis Proyek

| Aspek | Status | Keterangan |
|-------|--------|------------|
| 🔧 CI/CD | ✅ | GitHub Actions - auto build, test, deploy |
| ☁ Deployment | ✅ | Docker Compose + Cloud ready (Railway/AWS/GCP) |
| 🔐 Keamanan | ✅ | .env.example, JWT, bcrypt, no hardcoded secrets |
| 📈 Monitoring | ✅ | Winston logging + PM2 monitoring + health checks |
| 🚀 Scaling | ✅ | PM2 cluster mode + Docker orchestration |
| 📚 Dokumentasi | ✅ | README, API docs, monitoring guide |

## �📋 Deskripsi Proyek
Aplikasi forum diskusi berbasis web dengan fitur autentikasi, manajemen postingan, dan profil pengguna. Dibangun menggunakan Node.js/Express (backend) dan React/Vite (frontend).

## 🎯 Fitur Utama
- ✅ **Authentication & Authorization** - JWT-based auth dengan bcrypt
- ✅ **User Management** - Register, login, profile management
- ✅ **Forum Posts** - CRUD operations untuk postingan forum
- ✅ **Security** - Password hashing, JWT tokens, SQL injection protection
- ✅ **RESTful API** - Clean API architecture

## 🛠️ Teknologi yang Digunakan

### Backend
- Node.js & Express.js
- MySQL Database
- JWT untuk authentication
- bcrypt untuk password hashing
- CORS enabled

### Frontend
- React.js with Vite
- Tailwind CSS
- React Router untuk navigation
- Axios untuk HTTP requests

## 📦 Struktur Proyek
```
finprokemjar-secure/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   ├── server.js        # Entry point
│   └── .env            # Environment variables
└── frontend/
    ├── src/
    │   ├── pages/       # React pages
    │   └── config/      # Frontend config
    └── vite.config.js
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14+)
- MySQL (v8+)
- npm atau yarn

### Backend Setup
1. Navigate ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables (buat file `.env`):
```env
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=forum_db
LOG_LEVEL=info
```

Atau copy dari template:
```bash
cp .env.example .env
# Edit .env dengan credentials Anda
```

4. Setup database:
```bash
node setup-database.js
```

5. Jalankan server:
```bash
npm start
```
Server berjalan di `http://localhost:5001`

### Frontend Setup
1. Navigate ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```
Frontend berjalan di `http://localhost:5173`

## 🔐 Security Features
1. **Password Hashing** - Menggunakan bcrypt dengan salt rounds
2. **JWT Authentication** - Token-based authentication
3. **Protected Routes** - Middleware untuk route protection
4. **Input Validation** - Validasi data sebelum processing
5. **CORS Configuration** - Configured untuk keamanan cross-origin
6. **SQL Injection Protection** - Menggunakan prepared statements
7. **Environment Variables** - Sensitive data disimpan di .env

## 📚 API Documentation
Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk detail lengkap semua endpoints.

### Quick API Overview
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

## 🗄️ Database Design
Database menggunakan MySQL dengan struktur:

**Users Table:**
- id (PRIMARY KEY)
- username (UNIQUE)
- email (UNIQUE)
- password (HASHED)
- created_at

**Posts Table:**
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- title
- content
- created_at
- updated_at

## 🧪 Testing
```bash
# Backend testing
cd backend
npm test

# Frontend testing
cd frontend
npm test
```

## 📤 Deployment

### Quick Start with Docker
```bash
# Build dan jalankan semua services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Production Deployment with PM2
```bash
cd backend
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

**PM2 Monitoring:**
- `pm2 status` - Check app status
- `pm2 logs` - View logs
- `pm2 monit` - Real-time monitoring dashboard

### Backend Deployment (contoh menggunakan Railway/Heroku)
1. Push code ke Git repository
2. Connect repository ke platform deployment
3. Set environment variables
4. Deploy

### Frontend Deployment (contoh menggunakan Vercel/Netlify)
1. Build production:
```bash
npm run build
```
2. Deploy folder `dist` ke hosting

### Database Deployment
- Gunakan managed database service (Railway, PlanetScale, AWS RDS)
- Update DB_HOST di environment variables

## � Monitoring & Logging

### Logging dengan Winston
- **Combined logs**: `backend/logs/combined.log`
- **Error logs**: `backend/logs/error.log`
- **Real-time**: `tail -f backend/logs/combined.log`

### PM2 Monitoring
```bash
pm2 monit           # Terminal dashboard
pm2 logs forum-api  # Application logs
pm2 status          # Process status
```

### Health Checks
- Backend: `http://localhost:5001/health`
- Response includes: status, uptime, timestamp

**Lihat [MONITORING.md](./MONITORING.md) untuk setup lengkap**

## 🚀 CI/CD Pipeline

Pipeline otomatis dengan GitHub Actions (`.github/workflows/ci-cd.yml`):

**Trigger:** Push ke `main` atau `develop`

**Steps:**
1. ✅ Install dependencies (backend & frontend)
2. ✅ Run tests
3. ✅ Build frontend
4. ✅ Code quality checks
5. ✅ Deploy to production (if on main branch)

**Status:** Check di tab "Actions" di GitHub repository

## 🔄 Scaling

### PM2 Cluster Mode
```bash
# Start dengan semua CPU cores
pm2 start ecosystem.config.js --env production

# Ecosystem config auto-scales:
# - Development: 1 instance
# - Production: max cores available
```

### Docker Scaling
```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Resource limits di docker-compose.yml:
# - CPU: 0.5-1 core
# - Memory: 256MB-512MB
```

### Load Balancing (Production)
- Use Nginx/HAProxy untuk multiple instances
- Configure health checks
- Auto-restart on failure

## �🔄 Version Control
Project menggunakan Git untuk version control:
```bash
git add .
git commit -m "Your message"
git push origin main
```

## 👨‍💻 Developer
**Nama:** [Your Name]
**Program:** Cloud Full-Stack Development
**Date:** December 2025

## 📝 License
This project is for educational purposes.

## 🆘 Troubleshooting
- **Port sudah digunakan**: Ubah PORT di .env
- **Database connection error**: Periksa kredensial di .env
- **JWT error**: Pastikan JWT_SECRET sudah di-set
- **CORS error**: Periksa konfigurasi CORS di server.js

## 📞 Contact & Support
Untuk pertanyaan atau issues, silakan buka issue di repository ini.
