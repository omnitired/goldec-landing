# 🚀 Deployment Guide for Goldec Landing

This guide provides multiple easy deployment options for the Goldec Landing page.

## Quick Start

The easiest way to deploy is using our deployment script:

```bash
./deploy.sh [option]
```

## Deployment Options

### 1. 🐳 Docker Deployment (Recommended)

#### Local Docker Deployment
```bash
# Build and run with Docker Compose
./deploy.sh local

# Or manually:
docker-compose up --build -d
```

Your app will be available at `http://localhost`

#### Production Docker
```bash
# Build Docker image
./deploy.sh docker

# Run the container
docker run -p 80:80 goldec-landing:latest
```

### 2. ☁️ Vercel Deployment (Easiest)

#### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/goldec-landing)

#### Manual Vercel Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
./deploy.sh vercel

# Or manually:
vercel --prod
```

### 3. 📄 GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "GitHub Actions" as source
4. The workflow will automatically deploy on push to main/master

### 4. 🔧 Manual Static Build

```bash
# Build static files
./deploy.sh build

# Or manually:
npm run build

# Files will be in ./build directory
# Upload to any static hosting service
```

### 5. 🖥️ Development Server

```bash
# Run development server with Docker
./deploy.sh dev

# Or manually:
npm run dev
```

## Environment Setup

### Prerequisites
- Node.js 18+
- Docker (for Docker deployments)
- Git

### Environment Variables
Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add other environment variables as needed
```

## Hosting Platforms

### Recommended Platforms

1. **Vercel** (Easiest)
   - Zero configuration
   - Automatic deployments
   - Global CDN
   - Free tier available

2. **Netlify**
   - Drag and drop deployment
   - Continuous deployment
   - Free tier available

3. **GitHub Pages**
   - Free for public repositories
   - Automatic deployment with GitHub Actions

4. **AWS S3 + CloudFront**
   - Highly scalable
   - Cost-effective for high traffic

5. **DigitalOcean App Platform**
   - Simple deployment
   - Automatic scaling

### Platform-Specific Instructions

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

#### AWS S3
1. Create S3 bucket
2. Enable static website hosting
3. Upload `build` folder contents
4. Configure CloudFront (optional)

## Automated Deployment

### GitHub Actions
The included workflow (`.github/workflows/deploy.yml`) automatically:
- Builds the application
- Runs linting
- Deploys to your chosen platform

### Setup GitHub Actions
1. Add secrets to your repository:
   - `VERCEL_TOKEN` (for Vercel deployment)
   - `ORG_ID` (for Vercel)
   - `PROJECT_ID` (for Vercel)

2. Push to main/master branch to trigger deployment

## Troubleshooting

### Common Issues

1. **Build fails**
   ```bash
   # Clean and rebuild
   ./deploy.sh clean
   npm ci
   npm run build
   ```

2. **Docker issues**
   ```bash
   # Reset Docker
   docker-compose down
   docker system prune -f
   ./deploy.sh local
   ```

3. **Port conflicts**
   ```bash
   # Check what's using port 80
   lsof -i :80
   
   # Use different port
   docker run -p 8080:80 goldec-landing:latest
   ```

### Performance Optimization

1. **Enable compression** (already configured in nginx.conf)
2. **Optimize images** (already configured with `unoptimized: true`)
3. **Use CDN** (automatic with Vercel/Netlify)

## Security

- Security headers are configured in nginx.conf
- No sensitive data in client-side code
- HTTPS enforced on production platforms

## Monitoring

### Recommended Tools
- **Vercel Analytics** (if using Vercel)
- **Google Analytics**
- **Sentry** (for error tracking)
- **Uptime monitoring** (UptimeRobot, Pingdom)

## Support

If you encounter issues:
1. Check this guide
2. Review the logs
3. Check platform-specific documentation
4. Open an issue in the repository

---

**Happy Deploying! 🎉**