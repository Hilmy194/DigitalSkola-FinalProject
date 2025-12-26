# Monitoring & Logging Setup Guide

## 📊 Monitoring Tools

### 1. PM2 Monitoring (Production)

**Install PM2:**
```bash
npm install -g pm2
```

**Start dengan monitoring:**
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

### 2. Winston Logger

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

### 3. Docker Monitoring

**Docker Stats:**
```bash
docker-compose ps                    # Status containers
docker-compose logs -f backend       # Follow backend logs
docker stats                         # Resource usage
```

**Health Checks:**
- Backend: `http://localhost:5001/health`
- Frontend: `http://localhost:80`

---

## 📈 Monitoring Metrics

### Key Metrics to Monitor:

1. **API Performance**
   - Response time per endpoint
   - Request count
   - Error rate

2. **System Resources**
   - CPU usage
   - Memory usage
   - Disk I/O

3. **Database**
   - Query performance
   - Connection pool status
   - Slow queries

4. **Application**
   - Active users
   - Failed logins
   - API errors

---

## 🔔 Alert Configuration

### PM2 Alerts (ecosystem.config.js):
```javascript
{
  max_memory_restart: '500M',  // Restart if > 500MB
  min_uptime: '10s',           // Min uptime before restart
  max_restarts: 10             // Max restart attempts
}
```

### Log Monitoring:
Monitor error.log untuk patterns:
```bash
# Count errors in last hour
tail -1000 backend/logs/error.log | grep "error" | wc -l

# Watch error log real-time
tail -f backend/logs/error.log
```

---

## 📊 Monitoring Dashboard Options

### Option 1: PM2 Plus (Recommended)
- Real-time monitoring
- Error tracking
- Custom metrics
- Alerts via email/Slack
- **Free tier**: 1 server

### Option 2: Grafana + Prometheus
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
```

### Option 3: ELK Stack (Advanced)
- Elasticsearch
- Logstash
- Kibana

---

## 🚨 Quick Health Check Script

**Create `health-check.sh`:**
```bash
#!/bin/bash
BACKEND_URL="http://localhost:5001/health"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL)

if [ $RESPONSE -eq 200 ]; then
  echo "✅ Backend is healthy"
else
  echo "❌ Backend is down (HTTP $RESPONSE)"
  # Send alert here
fi
```

---

## 📱 Monitoring Best Practices

1. **Set up alerts** untuk error rate > 5%
2. **Monitor disk space** (logs dapat grow besar)
3. **Track slow queries** (> 1 second)
4. **Monitor memory leaks**
5. **Set up uptime monitoring** (UptimeRobot, Pingdom)

---

## 🔍 Log Analysis

**Find most frequent errors:**
```bash
cat backend/logs/error.log | grep -oP '"message":".*?"' | sort | uniq -c | sort -rn | head -10
```

**Count requests by endpoint:**
```bash
cat backend/logs/combined.log | grep -oP '"path":".*?"' | sort | uniq -c | sort -rn
```

**Average response time:**
```bash
cat backend/logs/combined.log | grep -oP '"duration":"[0-9]+ms"' | grep -oP '[0-9]+' | awk '{sum+=$1; count++} END {print sum/count "ms"}'
```

---

## 🎯 Next Steps

1. Install winston: `npm install winston`
2. Install PM2: `npm install -g pm2`
3. Setup monitoring dashboard
4. Configure alerts
5. Test with load testing tool (Apache Bench, k6)
