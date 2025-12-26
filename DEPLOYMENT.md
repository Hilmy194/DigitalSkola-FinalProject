# Deployment Guide - Forum Application

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Easiest)

**Backend:**
1. Push code ke GitHub
2. Login ke [Railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Select repository
5. Add environment variables:
   - `PORT=5001`
   - `JWT_SECRET=your-secret`
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
6. Railway auto-detects Node.js dan deploy

**Database:**
- Add MySQL plugin di Railway
- Copy credentials ke environment variables

**Frontend:**
- Same process atau deploy ke Vercel/Netlify

**Cost:** Free tier ($5 credit/month)

---

### Option 2: Docker + VPS (Full Control)

**Prerequisites:**
- VPS dengan Docker installed (DigitalOcean, Linode, AWS EC2)
- Domain name (optional)

**Steps:**
```bash
# 1. Clone repo ke VPS
git clone https://github.com/username/finprokemjar-secure.git
cd finprokemjar-secure

# 2. Setup environment
cp backend/.env.example backend/.env
nano backend/.env  # Edit dengan production values

# 3. Build dan run
docker-compose up -d

# 4. Check status
docker-compose ps
docker-compose logs -f
```

**Nginx Reverse Proxy:**
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
    }
}
```

**SSL dengan Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

### Option 3: AWS/GCP (Enterprise)

**AWS Elastic Beanstalk:**
1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Create environment: `eb create production`
4. Deploy: `eb deploy`

**Google Cloud Run:**
1. Build image: `docker build -t gcr.io/PROJECT_ID/forum-api ./backend`
2. Push: `docker push gcr.io/PROJECT_ID/forum-api`
3. Deploy: `gcloud run deploy forum-api --image gcr.io/PROJECT_ID/forum-api`

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Use environment variables (never hardcode)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use strong database password
- [ ] Enable firewall (UFW/Security Groups)
- [ ] Keep dependencies updated
- [ ] Enable rate limiting
- [ ] Setup backup strategy

---

## 📊 Post-Deployment

### Verify Deployment
```bash
# Health check
curl https://yourdomain.com/health

# Test API
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'
```

### Setup Monitoring
1. Configure PM2 monitoring (if not using Docker)
2. Setup uptime monitoring (UptimeRobot, Pingdom)
3. Configure log aggregation
4. Setup alerts for errors

### Performance Testing
```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test
ab -n 1000 -c 10 https://yourdomain.com/api/posts
```

---

## 🔄 CI/CD Workflow

GitHub Actions automatically:
1. Runs tests on push
2. Builds application
3. Deploys to production (main branch)

**Trigger manual deploy:**
- Go to GitHub → Actions
- Select workflow
- Click "Run workflow"

---

## 📝 Maintenance

### Update Application
```bash
# With Docker
git pull
docker-compose down
docker-compose up -d --build

# With PM2
git pull
cd backend
npm install
pm2 restart forum-api
```

### Backup Database
```bash
# MySQL backup
docker exec forum-db mysqldump -u root -p forum_db > backup.sql

# Restore
docker exec -i forum-db mysql -u root -p forum_db < backup.sql
```

### View Logs
```bash
# Docker
docker-compose logs -f backend

# PM2
pm2 logs forum-api

# System logs
tail -f /var/log/nginx/error.log
```

---

## 🆘 Troubleshooting

**Container won't start:**
```bash
docker-compose logs backend
docker-compose ps
```

**Database connection error:**
- Check environment variables
- Verify database is running
- Check network connectivity

**Port already in use:**
```bash
# Find process
lsof -i :5001
# Kill process
kill -9 PID
```

**Out of memory:**
- Check Docker limits
- Increase PM2 max memory
- Monitor with `docker stats`

---

## 📞 Support Resources

- Railway Docs: https://docs.railway.app
- Docker Docs: https://docs.docker.com
- PM2 Docs: https://pm2.keymetrics.io
- Let's Encrypt: https://letsencrypt.org

---

## ✅ Deployment Checklist

Backend:
- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database setup complete
- [ ] Health check endpoint working
- [ ] Logs configured
- [ ] PM2/Docker configured

Frontend:
- [ ] Build successful
- [ ] API endpoint configured
- [ ] CORS enabled
- [ ] Static assets loading

Infrastructure:
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Firewall rules set
- [ ] Monitoring enabled
- [ ] Backup strategy in place

Security:
- [ ] Secrets not in code
- [ ] Strong passwords used
- [ ] HTTPS enabled
- [ ] Security headers configured
