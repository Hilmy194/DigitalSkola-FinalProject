// PM2 Ecosystem Configuration for Production
module.exports = {
  apps: [{
    name: 'forum-api',
    script: './server.js',
    
    // Instances and scaling
    instances: process.env.NODE_ENV === 'production' ? 'max' : 1,
    exec_mode: 'cluster',
    
    // Auto restart configuration
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    
    // Environment variables
    env: {
      NODE_ENV: 'development',
      PORT: 5001
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5001
    },
    
    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    merge_logs: true,
    
    // Monitoring and metrics
    instance_var: 'INSTANCE_ID',
    
    // Advanced features
    min_uptime: '10s',
    max_restarts: 10,
    
    // Kill timeout
    kill_timeout: 5000,
    
    // Wait for ready
    wait_ready: true,
    listen_timeout: 3000
  }],

  // Deployment configuration
  deploy: {
    production: {
      user: 'node',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:username/finprokemjar-secure.git',
      path: '/var/www/forum-api',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-deploy-local': 'echo "Deploying to production server..."'
    }
  }
};
