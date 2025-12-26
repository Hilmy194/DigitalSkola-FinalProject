# Forum Application - Full Stack Cloud Deployment

Aplikasi forum diskusi berbasis web dengan fitur autentikasi, manajemen postingan, dan profil pengguna. Dibangun menggunakan Node.js/Express (backend) dan React/Vite (frontend) dengan deployment ke cloud platform.

## Daftar Isi
- [Kriteria Teknis](#kriteria-teknis-proyek)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Setup & Installation](#setup-installation)
- [Dokumentasi API](#dokumentasi-api)
- [Database Design](#database-design)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring](#monitoring-logging)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)

---

## Kriteria Teknis Proyek

| Aspek | Status | Keterangan |
|-------|--------|------------|
| CI/CD | Implemented | GitHub Actions - auto build, test, deploy |
| Deployment | Implemented | Docker Compose + Cloud ready (Railway/AWS/GCP) |
| Keamanan | Implemented | .env.example, JWT, bcrypt, no hardcoded secrets |
| Monitoring | Implemented | Winston logging + PM2 monitoring + health checks |
| Scaling | Implemented | PM2 cluster mode + Docker orchestration |
| Dokumentasi | Complete | README lengkap dengan API docs & deployment guide |

---

## Fitur Utama

- **Authentication & Authorization** - JWT-based auth dengan bcrypt
- **User Management** - Register, login, profile management
- **Forum Posts** - CRUD operations untuk postingan forum
- **Security** - Password hashing, JWT tokens, SQL injection protection
- **RESTful API** - Clean API architecture

## Teknologi yang Digunakan

### Backend
- Node.js & Express.js
- MySQL Database
- JWT untuk authentication
- bcrypt untuk password hashing
- Winston untuk logging
- PM2 untuk process management

### Frontend
- React.js with Vite
- Tailwind CSS
- React Router
- Axios untuk HTTP requests

### DevOps & Cloud
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Railway/AWS/GCP (Cloud Platform)
- Nginx (Reverse Proxy)

## Struktur Proyek

```
finprokemjar-deploy/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── requestLogger.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── logger.js
│   ├── logs/
│   ├── server.js
│   ├── setup-database.js
│   ├── ecosystem.config.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Forum.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Profile.jsx
│   │   ├── config/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── docker-compose.yml
```

---

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Docker & Docker Compose (optional)
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

3. Setup environment variables:
```bash
cp .env.example .env
```

Edit file `.env`:
```env
PORT=5001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=forum_db
LOG_LEVEL=info
NODE_ENV=development
```

4. Setup database:
```bash
node setup-database.js
```

5. Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:5001`

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

Frontend akan berjalan di `http://localhost:5173`

---

## Dokumentasi API

**Base URL:** `http://localhost:5001/api`

### Authentication Endpoints

#### 1. Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### 2. Login User
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 3. Get User Profile (Protected)
```
GET /auth/profile
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2024-12-26T10:00:00.000Z"
}
```

### Post Endpoints

#### 4. Get All Posts
```
GET /posts
```

**Query Parameters:**
- `limit` (optional): Number of posts (default: 50)
- `offset` (optional): Number to skip (default: 0)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "title": "Welcome to the Forum",
    "content": "This is my first post!",
    "user_id": 1,
    "username": "johndoe",
    "created_at": "2024-12-26T10:00:00.000Z",
    "updated_at": "2024-12-26T10:00:00.000Z"
  }
]
```

#### 5. Create Post (Protected)
```
POST /posts
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My New Post",
  "content": "This is the content of my post."
}
```

**Success Response (201):**
```json
{
  "message": "Post created successfully",
  "postId": 2
}
```

#### 6. Update Post (Protected)
```
PUT /posts/:id
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Success Response (200):**
```json
{
  "message": "Post updated successfully"
}
```

#### 7. Delete Post (Protected)
```
DELETE /posts/:id
```

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "message": "Post deleted successfully"
}
```

### Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Database Design

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Security Features

1. **Password Hashing** - Menggunakan bcrypt dengan salt rounds
2. **JWT Authentication** - Token-based authentication dengan expiry
3. **Protected Routes** - Middleware untuk route protection
4. **Input Validation** - Validasi data sebelum processing
5. **CORS Configuration** - Configured untuk keamanan cross-origin
6. **SQL Injection Protection** - Menggunakan prepared statements
7. **Environment Variables** - Sensitive data disimpan di .env

---

## Testing

```bash
# Backend testing
cd backend
npm test

# Frontend testing
cd frontend
npm test
```

---

## Deployment

### Option 1: Docker Deployment

**Quick Start dengan Docker Compose:**

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

### Option 2: Railway Deployment

1. Push code ke GitHub
2. Login ke Railway.app
3. New Project → Deploy from GitHub
4. Select repository
5. Add environment variables
6. Deploy automatically

### Option 3: AWS EC2 Deployment

**Step 1: Launch EC2 Instance**
- AMI: Ubuntu Server 22.04 LTS
- Instance type: t2.micro (Free tier)
- Security group: Allow HTTP (80), HTTPS (443), SSH (22)

**Step 2: Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Node.js & PM2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

**Step 3: Deploy Application**
```bash
# Clone repository
git clone https://github.com/username/finprokemjar-deploy.git
cd finprokemjar-deploy

# Setup environment variables
cd backend
cp .env.example .env
nano .env  # Edit dengan production values

# Run with Docker
cd ..
docker-compose up -d

# Or run with PM2
cd backend
pm2 start ecosystem.config.js --env production
```

**Step 4: Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/forum
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/forum /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Step 5: Setup SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Deployment Checklist

**Backend:**
- [ ] Environment variables configured
- [ ] Database setup complete
- [ ] Health check endpoint responding
- [ ] Logs configured

**Frontend:**
- [ ] Build successful
- [ ] API endpoint configured
- [ ] CORS enabled
- [ ] Static assets loading

**Infrastructure:**
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Firewall configured
- [ ] Monitoring enabled

---

## Monitoring & Logging

### Winston Logger

**Log Files Location:**
```
backend/logs/
├── combined.log     # All logs
├── error.log        # Errors only
├── exceptions.log   # Uncaught exceptions
└── rejections.log   # Unhandled rejections
```

**Log Levels:**
- `error`: Error yang perlu perhatian
- `warn`: Warning
- `info`: Informasi umum
- `debug`: Debug info (development)

### PM2 Monitoring

```bash
pm2 status              # Status semua aplikasi
pm2 logs forum-api      # View logs real-time
pm2 monit               # Terminal monitoring dashboard
pm2 restart forum-api   # Restart aplikasi
```

### Docker Monitoring

```bash
docker-compose ps                    # Status containers
docker-compose logs -f backend       # Follow backend logs
docker stats                         # Resource usage
```

### Health Check

**Endpoint:**
```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "uptime": "2h 15m",
  "timestamp": "2024-12-26T10:00:00.000Z"
}
```

### Metrics to Monitor

1. API response time
2. Error rate
3. CPU & memory usage
4. Database connection pool
5. Active users
6. Request count

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/ci-cd.yml`

**Trigger Events:**
- Push to `main` or `develop` branch
- Pull request to `main`

**Pipeline Steps:**

1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Run tests
5. Build application
6. Deploy to production (main branch only)

**Example Configuration:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
      
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test
      
      - name: Build
        run: cd frontend && npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: echo "Deploying..."
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5001
kill -9 <PID>
```

#### Database Connection Error
1. Check MySQL is running
2. Verify credentials in `.env`
3. Check database exists
4. Re-run setup script: `node setup-database.js`

#### JWT Token Error
1. Check JWT_SECRET is set in `.env`
2. Token expired - login again
3. Verify token format: `Bearer <token>`

#### CORS Error
Check backend CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

#### Docker Container Won't Start
```bash
# Check logs
docker-compose logs backend

# Rebuild containers
docker-compose down
docker-compose up -d --build
```

### Debug Mode

Enable debug logging:
```env
LOG_LEVEL=debug
NODE_ENV=development
```

Check logs:
```bash
# Backend logs
tail -f backend/logs/combined.log

# Docker logs
docker-compose logs -f backend

# PM2 logs
pm2 logs forum-api
```

---

