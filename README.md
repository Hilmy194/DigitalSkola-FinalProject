# Forum Application - Full Stack Cloud Deployment

> **Aplikasi forum diskusi modern berbasis cloud dengan fitur lengkap autentikasi, manajemen konten, monitoring, dan CI/CD otomatis.**

## 📋 Daftar Isi
- [Kriteria Teknis](#kriteria-teknis-proyek)
- [Deskripsi Proyek](#deskripsi-proyek)
- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi-yang-digunakan)
- [Struktur Proyek](#struktur-proyek)
- [Setup & Installation](#setup--installation)
- [Dokumentasi API](#dokumentasi-api)
- [Database Design](#database-design)
- [Security Features](#security-features)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring & Logging](#monitoring--logging)
- [CI/CD Pipeline](#cicd-pipeline)
- [Scaling & Performance](#scaling--performance)
- [Troubleshooting](#troubleshooting)

---

## 🏗️ Kriteria Teknis Proyek

| Aspek | Status | Keterangan |
|-------|--------|------------|
| 🔧 CI/CD | ✅ | GitHub Actions - auto build, test, deploy |
| ☁️ Deployment | ✅ | Docker Compose + Cloud ready (Railway/AWS/GCP) |
| 🔐 Keamanan | ✅ | .env.example, JWT, bcrypt, no hardcoded secrets |
| 📈 Monitoring | ✅ | Winston logging + PM2 monitoring + health checks |
| 🚀 Scaling | ✅ | PM2 cluster mode + Docker orchestration |
| 📚 Dokumentasi | ✅ | README lengkap dengan API docs & deployment guide |

---

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

---

## 📚 Dokumentasi API

**Base URL:** `http://localhost:5001/api`

### 🔐 Authentication Endpoints

#### 1. Register User
**Endpoint:** `POST /auth/register`

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

**Error Response (400):**
```json
{
  "error": "Username already exists"
}
```

---

#### 2. Login User
**Endpoint:** `POST /auth/login`

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

---

#### 3. Get User Profile (Protected)
**Endpoint:** `GET /auth/profile`

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

---

### 📝 Post Endpoints

#### 4. Get All Posts
**Endpoint:** `GET /posts`

**Query Parameters (optional):**
- `limit`: Number of posts (default: 50)
- `offset`: Number to skip (default: 0)

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

---

#### 5. Get Single Post
**Endpoint:** `GET /posts/:id`

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Welcome to the Forum",
  "content": "This is my first post!",
  "user_id": 1,
  "username": "johndoe"
}
```

---

#### 6. Create Post (Protected)
**Endpoint:** `POST /posts`

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

---

#### 7. Update Post (Protected)
**Endpoint:** `PUT /posts/:id`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
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

**Error Response (403):**
```json
{
  "error": "You can only edit your own posts"
}
```

---

#### 8. Delete Post (Protected)
**Endpoint:** `DELETE /posts/:id`

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

---

### 👤 User Endpoints

#### 9. Get User by ID
**Endpoint:** `GET /users/:id`

**Success Response (200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "created_at": "2024-12-26T10:00:00.000Z"
}
```

---

#### 10. Update User Profile (Protected)
**Endpoint:** `PUT /users/profile`

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

---

### 🔒 Authentication & Authorization

**How to Authenticate:**
1. Register or login to get a JWT token
2. Include token in Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

**Protected Routes:**
- `GET /auth/profile`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `PUT /users/profile`

**Token Expiration:** JWT tokens expire after 24 hours

---

### 📊 Error Codes

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

### 💡 API Usage Examples

**Using cURL:**
```bash
# Register
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","email":"john@example.com","password":"secure123"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secure123"}'

# Create Post (with token)
curl -X POST http://localhost:5001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Post","content":"Post content"}'
```

**Using JavaScript (Fetch API):**
```javascript
// Login
const response = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'secure123'
  })
});
const { token } = await response.json();

// Create Post
await fetch('http://localhost:5001/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My Post',
    content: 'Content here'
  })
});
```

---

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

### 🚀 Deployment Options

#### Option 1: Railway (Recommended - Easiest)

**Backend Deployment:**
1. Push code ke GitHub
2. Login ke [Railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Select your repository
5. Add environment variables:
   - `PORT=5001`
   - `JWT_SECRET=your-secret-key`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
6. Railway auto-detects Node.js dan deploy

**Database Setup:**
- Add MySQL plugin di Railway dashboard
- Copy credentials ke backend environment variables
- Run database setup script

**Frontend Deployment:**
- Deploy ke Vercel/Netlify atau same Railway project

**Cost:** Free tier ($5 credit/month)

---

#### Option 2: Docker + VPS (Full Control)

**Prerequisites:**
- VPS dengan Docker installed (DigitalOcean, Linode, AWS EC2)
- Domain name (optional)

**Deployment Steps:**
```bash
# 1. Clone repo ke VPS
git clone https://github.com/username/finprokemjar-deploy.git
cd finprokemjar-deploy

# 2. Setup environment
cp backend/.env.example backend/.env
nano backend/.env  # Edit dengan production values

# 3. Build dan run dengan Docker
docker-compose up -d

# 4. Check status
docker-compose ps
docker-compose logs -f
```

**Nginx Reverse Proxy Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

**SSL Setup dengan Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
sudo certbot renew --dry-run  # Test auto-renewal
```

---

#### Option 3: AWS/GCP (Enterprise Scale)

**AWS Elastic Beanstalk:**
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create production

# Deploy
eb deploy
```

**Google Cloud Run:**
```bash
# Build Docker image
docker build -t gcr.io/PROJECT_ID/forum-api ./backend

# Push to GCR
docker push gcr.io/PROJECT_ID/forum-api

# Deploy
gcloud run deploy forum-api \
  --image gcr.io/PROJECT_ID/forum-api \
  --platform managed \
  --region asia-southeast1
```

---

### 🐳 Quick Start dengan Docker

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

---

### 📊 Production Deployment dengan PM2

```bash
cd backend
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

**PM2 Monitoring Commands:**
- `pm2 status` - Check app status
- `pm2 logs` - View logs
- `pm2 monit` - Real-time monitoring dashboard
- `pm2 restart forum-api` - Restart application

---

### 🔐 Security Deployment Checklist

- [ ] Change `JWT_SECRET` ke strong random string
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure CORS dengan proper origins
- [ ] Use strong database passwords
- [ ] Enable firewall (UFW/Security Groups)
- [ ] Keep dependencies updated
- [ ] Enable rate limiting
- [ ] Setup backup strategy
- [ ] Configure security headers

---

### 📊 Post-Deployment Verification

**Health Check:**
```bash
# Check backend health
curl https://yourdomain.com/health

# Test API registration
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'
```

**Setup Monitoring:**
1. Configure PM2 monitoring (if not using Docker)
2. Setup uptime monitoring (UptimeRobot, Pingdom)
3. Configure log aggregation
4. Setup alerts for critical errors
5. Enable performance monitoring

**Performance Testing:**
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Load test API
ab -n 1000 -c 10 https://yourdomain.com/api/posts
```

---

### 🔄 Application Updates & Maintenance

**Update dengan Docker:**
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

**Update dengan PM2:**
```bash
git pull origin main
cd backend
npm install
pm2 restart forum-api
```

**Database Backup:**
```bash
# Backup MySQL
docker exec forum-db mysqldump -u root -p forum_db > backup-$(date +%Y%m%d).sql

# Restore from backup
docker exec -i forum-db mysql -u root -p forum_db < backup-20241226.sql
```

**View Application Logs:**
```bash
# Docker logs
docker-compose logs -f backend
docker-compose logs --tail=100 backend

# PM2 logs
pm2 logs forum-api

# System logs
tail -f /var/log/nginx/error.log
```

---

### ✅ Deployment Success Checklist

**Backend:**
- [ ] Code pushed to GitHub/GitLab
- [ ] Environment variables configured
- [ ] Database setup complete
- [ ] Health check endpoint responding
- [ ] Logs configured and accessible
- [ ] PM2/Docker running stable

**Frontend:**
- [ ] Build successful (`npm run build`)
- [ ] API endpoint configured correctly
- [ ] CORS enabled on backend
- [ ] Static assets loading properly
- [ ] Routes working correctly

**Infrastructure:**
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Firewall rules configured
- [ ] Monitoring enabled
- [ ] Backup strategy implemented

**Security:**
- [ ] No secrets in code repository
- [ ] Strong passwords used
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled

---

---

## 📈 Monitoring & Logging

### 📊 Monitoring Tools

#### 1. PM2 Monitoring (Production)

**Install PM2:**
```bash
npm install -g pm2
```

**Start dengan Monitoring:**
```bash
cd backend
pm2 start ecosystem.config.js --env production
```

**PM2 Commands:**
```bash
pm2 status              # Status semua aplikasi
pm2 logs forum-api      # View logs real-time
pm2 monit               # Terminal monitoring dashboard
pm2 restart forum-api   # Restart aplikasi
pm2 stop forum-api      # Stop aplikasi
pm2 delete forum-api    # Remove dari PM2
```

**PM2 Plus (Cloud Monitoring - Optional):**
```bash
pm2 link <secret_key> <public_key>
```
Dashboard: https://app.pm2.io

---

#### 2. Winston Logger

**Features:**
- ✅ Request/Response logging
- ✅ Error tracking
- ✅ File rotation (max 5MB per file)
- ✅ Console output dengan colors
- ✅ JSON format untuk parsing

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

**Example Usage dalam Code:**
```javascript
const logger = require('./utils/logger');

logger.info('User logged in', { userId: 1, username: 'john' });
logger.error('Database connection failed', { error: err.message });
logger.warn('High memory usage', { usage: '450MB' });
```

---

#### 3. Docker Monitoring

**Docker Stats:**
```bash
docker-compose ps                    # Status containers
docker-compose logs -f backend       # Follow backend logs
docker stats                         # Resource usage real-time
```

**Health Checks:**
- Backend: `http://localhost:5001/health`
- Frontend: `http://localhost:80`

**Response Example:**
```json
{
  "status": "ok",
  "uptime": "2h 15m",
  "timestamp": "2024-12-26T10:00:00.000Z"
}
```

---

### 📈 Key Metrics to Monitor

1. **API Performance**
   - Response time per endpoint
   - Request count
   - Error rate (should be < 5%)

2. **System Resources**
   - CPU usage
   - Memory usage
   - Disk I/O

3. **Database**
   - Query performance
   - Connection pool status
   - Slow queries (> 1 second)

4. **Application Health**
   - Active users
   - Failed logins
   - API errors
   - Uptime percentage

---

### 🔔 Alert Configuration

**PM2 Alerts (ecosystem.config.js):**
```javascript
{
  max_memory_restart: '500M',  // Restart if > 500MB
  min_uptime: '10s',           // Min uptime before restart
  max_restarts: 10             // Max restart attempts
}
```

**Log Monitoring:**
```bash
# Count errors in last 1000 lines
tail -1000 backend/logs/error.log | grep "error" | wc -l

# Watch error log real-time
tail -f backend/logs/error.log

# Find most frequent errors
cat backend/logs/error.log | grep -oP '"message":".*?"' | sort | uniq -c | sort -rn | head -10
```

---

### 📊 Monitoring Dashboard Options

#### Option 1: PM2 Plus (Recommended)
- Real-time monitoring
- Error tracking
- Custom metrics
- Alerts via email/Slack
- **Free tier**: 1 server
- Dashboard: https://app.pm2.io

#### Option 2: Grafana + Prometheus
```yaml
# docker-compose.yml addition
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

#### Option 3: ELK Stack (Advanced)
- Elasticsearch: Log storage
- Logstash: Log processing
- Kibana: Visualization

---

### 🚨 Quick Health Check Script

**Create `health-check.sh`:**
```bash
#!/bin/bash
BACKEND_URL="http://localhost:5001/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL)

if [ $RESPONSE -eq 200 ]; then
  echo "✅ Backend is healthy"
  exit 0
else
  echo "❌ Backend is down (HTTP $RESPONSE)"
  # Send alert or restart service
  pm2 restart forum-api
  exit 1
fi
```

**Setup Cron Job:**
```bash
# Check health every 5 minutes
*/5 * * * * /path/to/health-check.sh >> /var/log/health-check.log 2>&1
```

---

### 🔍 Log Analysis Commands

**Find most frequent errors:**
```bash
cat backend/logs/error.log | grep -oP '"message":".*?"' | \
  sort | uniq -c | sort -rn | head -10
```

**Count requests by endpoint:**
```bash
cat backend/logs/combined.log | grep -oP '"path":".*?"' | \
  sort | uniq -c | sort -rn
```

**Average response time:**
```bash
cat backend/logs/combined.log | grep -oP '"duration":"[0-9]+ms"' | \
  grep -oP '[0-9]+' | awk '{sum+=$1; count++} END {print sum/count "ms"}'
```

**Monitor real-time logs with filters:**
```bash
# Show only errors
tail -f backend/logs/combined.log | grep "error"

# Show specific endpoint
tail -f backend/logs/combined.log | grep "/api/posts"

# Show slow requests (>1000ms)
tail -f backend/logs/combined.log | grep -P '"duration":"[1-9][0-9]{3,}ms"'
```

---

### 📱 Monitoring Best Practices

1. **Set up alerts** untuk error rate > 5%
2. **Monitor disk space** - logs dapat grow besar (setup log rotation)
3. **Track slow queries** - database queries > 1 second
4. **Monitor memory leaks** - restart if memory grows continuously
5. **Set up uptime monitoring** - UptimeRobot (free), Pingdom, StatusCake
6. **Regular backups** - automated daily database backups
7. **Performance baselines** - know your normal metrics
8. **Security monitoring** - failed login attempts, unusual traffic

---

### 🎯 Monitoring Setup Next Steps

1. ✅ Install Winston: `npm install winston`
2. ✅ Install PM2: `npm install -g pm2`
3. ✅ Setup monitoring dashboard (PM2 Plus or Grafana)
4. ✅ Configure alerts (email/Slack)
5. ✅ Test with load testing tool (Apache Bench, k6, Artillery)
6. ✅ Setup automated backups
7. ✅ Configure uptime monitoring service

---

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

Pipeline otomatis dengan GitHub Actions (`.github/workflows/ci-cd.yml`):

**Trigger Events:**
- Push ke branch `main` atau `develop`
- Pull request ke `main`

**Pipeline Steps:**

1. **✅ Checkout Code**
   - Clone repository ke runner

2. **✅ Setup Environment**
   - Install Node.js
   - Cache dependencies untuk faster builds

3. **✅ Install Dependencies**
   - Backend: `npm install`
   - Frontend: `npm install`

4. **✅ Run Tests**
   - Unit tests
   - Integration tests
   - Code coverage report

5. **✅ Code Quality Checks**
   - Linting (ESLint)
   - Code formatting checks
   - Security vulnerability scan

6. **✅ Build Frontend**
   - `npm run build`
   - Verify build artifacts

7. **✅ Deploy to Production** (only on `main` branch)
   - Deploy backend to Railway/AWS/GCP
   - Deploy frontend to Vercel/Netlify
   - Run post-deployment health checks

**Status Badge:**
```markdown
![CI/CD Status](https://github.com/username/repo/workflows/CI-CD/badge.svg)
```

**View Pipeline:**
- Check di tab "Actions" di GitHub repository
- See logs untuk setiap step
- Re-run failed jobs jika needed

**Manual Trigger:**
```bash
# Trigger via GitHub UI
# Go to Actions → Select workflow → Run workflow
```

---

### Environment Variables untuk CI/CD

**GitHub Secrets (Settings → Secrets and variables → Actions):**
```
JWT_SECRET
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
RAILWAY_TOKEN (for Railway deployment)
```

**Example Workflow Configuration:**
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
          cache: 'npm'
      
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
        run: echo "Deploying to production..."
```

---

---

## 🔄 Scaling & Performance

### PM2 Cluster Mode

**Auto-scaling dengan PM2:**
```bash
# Start dengan semua CPU cores
pm2 start ecosystem.config.js --env production

# Manual scaling
pm2 scale forum-api 4  # Scale to 4 instances

# Check instances
pm2 list
```

**Ecosystem Config (ecosystem.config.js):**
```javascript
module.exports = {
  apps: [{
    name: 'forum-api',
    script: './server.js',
    instances: 'max',  // Use all CPU cores
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5001
    }
  }]
};
```

**Cluster Benefits:**
- Automatic load balancing
- Zero-downtime restarts
- Better CPU utilization
- Automatic restart on crash

---

### Docker Scaling

**Scale Backend Service:**
```bash
# Scale to 3 instances
docker-compose up -d --scale backend=3

# Check running instances
docker-compose ps
```

**Resource Limits (docker-compose.yml):**
```yaml
backend:
  deploy:
    resources:
      limits:
        cpus: '1.0'
        memory: 512M
      reservations:
        cpus: '0.5'
        memory: 256M
    replicas: 3
```

---

### Load Balancing (Production)

**Nginx Load Balancer Configuration:**
```nginx
upstream backend_servers {
    least_conn;  # Use least connections algorithm
    server backend1:5001;
    server backend2:5001;
    server backend3:5001;
}

server {
    listen 80;
    
    location /api {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Health checks
        proxy_next_upstream error timeout http_502 http_503;
        proxy_connect_timeout 5s;
    }
}
```

**Health Checks:**
- Auto-restart on failure (PM2/Docker)
- Nginx upstream health monitoring
- Remove unhealthy instances from pool

---

### Performance Optimization Tips

**Database:**
- Add indexes pada frequently queried columns
- Use connection pooling (already configured)
- Implement query caching
- Regular database optimization

**API:**
- Implement rate limiting
- Enable compression (gzip)
- Cache static responses
- Use Redis for session/cache

**Frontend:**
- Enable lazy loading
- Optimize images
- Minify CSS/JS (Vite handles this)
- Use CDN for static assets

**Server:**
- Enable HTTP/2
- Configure proper caching headers
- Use reverse proxy (Nginx)
- Enable keep-alive connections

---

### Performance Monitoring

**Load Testing dengan Apache Bench:**
```bash
# 1000 requests, 10 concurrent
ab -n 1000 -c 10 http://localhost:5001/api/posts

# With authentication
ab -n 1000 -c 10 -H "Authorization: Bearer TOKEN" \
   http://localhost:5001/api/posts
```

**Load Testing dengan k6:**
```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,        // Virtual users
  duration: '30s' // Test duration
};

export default function() {
  let response = http.get('http://localhost:5001/api/posts');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500
  });
  sleep(1);
}
```

**Run k6:**
```bash
k6 run load-test.js
```

---

### Horizontal Scaling Strategy

**Database:**
- Master-Slave replication
- Read replicas untuk queries
- Write to master only

**Application:**
- Multiple instances dengan load balancer
- Session sharing via Redis
- Stateless architecture

**Caching:**
- Redis/Memcached untuk session
- CDN untuk static assets
- Application-level caching

---

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

---

## 🆘 Troubleshooting

### Common Issues & Solutions

#### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5001
kill -9 <PID>

# Or change port in .env
PORT=5002
```

---

#### Database Connection Error
**Problem:** `Error: connect ECONNREFUSED` atau `ER_ACCESS_DENIED_ERROR`

**Solution:**
1. Check MySQL is running:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux
   sudo systemctl start mysql
   
   # Docker
   docker-compose ps
   ```

2. Verify credentials in `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=forum_db
   ```

3. Check database exists:
   ```bash
   mysql -u root -p
   SHOW DATABASES;
   ```

4. Re-run setup script:
   ```bash
   node backend/setup-database.js
   ```

---

#### JWT Token Error
**Problem:** `JsonWebTokenError: invalid token` atau `TokenExpiredError`

**Solution:**
1. Check JWT_SECRET is set in `.env`
2. Token expired (24h) - login again
3. Clear browser localStorage/cookies
4. Verify token format: `Bearer <token>`

---

#### CORS Error
**Problem:** `Access-Control-Allow-Origin` error in browser console

**Solution:**
1. Check backend CORS configuration:
   ```javascript
   // server.js
   app.use(cors({
     origin: 'http://localhost:5173',  // Frontend URL
     credentials: true
   }));
   ```

2. Update frontend API URL in config
3. Clear browser cache

---

#### Container Won't Start (Docker)
**Problem:** Docker container exits immediately

**Solution:**
```bash
# Check logs
docker-compose logs backend
docker-compose logs db

# Check container status
docker-compose ps

# Rebuild containers
docker-compose down
docker-compose up -d --build

# Check environment variables
docker-compose config
```

---

#### Frontend Build Error
**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 14+

# Clear Vite cache
rm -rf node_modules/.vite

# Try building again
npm run build
```

---

#### PM2 Application Won't Start
**Problem:** PM2 app keeps restarting or crashing

**Solution:**
```bash
# Check logs
pm2 logs forum-api --lines 100

# Check status
pm2 status

# Delete and restart
pm2 delete forum-api
pm2 start ecosystem.config.js --env production

# Check for errors
pm2 describe forum-api
```

---

#### High Memory Usage
**Problem:** Application using too much memory

**Solution:**
```bash
# Check memory usage
docker stats
pm2 monit

# Restart with memory limit
pm2 start ecosystem.config.js --max-memory-restart 500M

# Check for memory leaks
node --inspect server.js
```

---

#### Slow API Response
**Problem:** API endpoints responding slowly

**Solution:**
1. Check database indexes:
   ```sql
   SHOW INDEX FROM posts;
   SHOW INDEX FROM users;
   ```

2. Enable query logging:
   ```javascript
   // In database.js
   pool.on('connection', (connection) => {
     connection.on('enqueue', (sequence) => {
       console.log('Query:', sequence.sql);
     });
   });
   ```

3. Monitor with PM2:
   ```bash
   pm2 monit
   ```

4. Check database connection pool
5. Implement caching

---

#### SSL Certificate Issues
**Problem:** HTTPS not working atau certificate errors

**Solution:**
```bash
# Renew Let's Encrypt certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check certificate expiration
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal
```

---

### Debug Mode

**Enable Debug Logging:**
```env
# .env
LOG_LEVEL=debug
NODE_ENV=development
```

**Check Logs:**
```bash
# Backend logs
tail -f backend/logs/combined.log
tail -f backend/logs/error.log

# Docker logs
docker-compose logs -f --tail=100 backend

# PM2 logs
pm2 logs forum-api --lines 100
```

---

### Getting Help

1. **Check Logs First** - Most issues show in logs
2. **Verify Environment Variables** - Common source of issues
3. **Check Service Status** - MySQL, Docker, PM2
4. **Test Endpoints** - Use curl or Postman
5. **Review Recent Changes** - Git history

**Useful Commands:**
```bash
# Health check
curl http://localhost:5001/health

# Test database connection
mysql -u root -p -e "SELECT 1"

# Check all services
docker-compose ps
pm2 status

# System resources
top
df -h
free -m
```

---

## � Version Control & Git Workflow

Project menggunakan Git untuk version control dengan best practices:

### Branch Strategy
```
main         - Production ready code
develop      - Development branch
feature/*    - Feature branches
hotfix/*     - Emergency fixes
```

### Common Git Commands
```bash
# Clone repository
git clone https://github.com/username/finprokemjar-deploy.git

# Create feature branch
git checkout -b feature/new-feature

# Stage and commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Merge to develop
git checkout develop
git merge feature/new-feature

# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Commit Message Convention
```
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code formatting
refactor: Code refactoring
test: Adding tests
chore: Maintenance tasks
```

---

## 📞 Contact & Support

**Developer Information:**
- **Nama:** [Your Name]
- **Email:** [your.email@example.com]
- **GitHub:** [github.com/username]
- **Program:** Cloud Full-Stack Development
- **Date:** December 2025

**Project Links:**
- **Repository:** https://github.com/username/finprokemjar-deploy
- **Issues:** https://github.com/username/finprokemjar-deploy/issues
- **Documentation:** This README file

**Untuk pertanyaan atau issues:**
1. Check [Troubleshooting](#troubleshooting) section
2. Search existing GitHub Issues
3. Create new issue dengan detail lengkap
4. Include error logs and steps to reproduce

---

## 📝 License

This project is created for **educational purposes** as part of Cloud Full-Stack Development program.

**License:** MIT License (or specify your license)

```
Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Acknowledgments

- **Mentors & Instructors** - Thank you untuk guidance
- **Open Source Community** - Para contributor library yang digunakan
- **Cloud Providers** - Railway, Vercel, AWS, GCP
- **Documentation** - Node.js, React, MySQL, Docker docs

---

## 📚 Additional Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Docker Documentation](https://docs.docker.com/)
- [PM2 Documentation](https://pm2.keymetrics.io/)

### Tutorials & Guides
- [JWT Authentication Guide](https://jwt.io/introduction)
- [Docker Compose Guide](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

### Tools
- [Postman](https://www.postman.com/) - API Testing
- [DBeaver](https://dbeaver.io/) - Database Management
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 🎯 Project Status

- ✅ **Version:** 1.0.0
- ✅ **Status:** Production Ready
- ✅ **Last Updated:** December 26, 2025
- ✅ **Maintenance:** Active

### Roadmap / Future Enhancements
- [ ] Add comment system on posts
- [ ] Implement real-time notifications
- [ ] Add file upload functionality
- [ ] Implement user roles (admin, moderator)
- [ ] Add search functionality
- [ ] Implement pagination on frontend
- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add social media login
- [ ] Implement rate limiting
- [ ] Add Redis caching layer
- [ ] Implement WebSocket for real-time updates

---

## 📊 Project Statistics

```
Total Files: 25+
Lines of Code: 2000+
API Endpoints: 10+
Technologies: 8+
Docker Containers: 3
Deployment Platforms: 3+
```

---

**⭐ If you find this project helpful, please give it a star on GitHub!**

**🐛 Found a bug? Open an issue!**

**💡 Have a suggestion? We'd love to hear it!**

---

*Last updated: December 26, 2025*  
*Made with ❤️ for Cloud Full-Stack Development Program*
