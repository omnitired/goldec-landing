This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# 🏆 Goldec Landing

A modern, responsive landing page for Goldec - built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🚀 **Fast & Modern**: Built with Next.js 15 and React 19
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Beautiful UI**: Crafted with Tailwind CSS and Framer Motion
- 🌐 **Static Export**: Optimized for deployment anywhere
- 🔧 **TypeScript**: Fully typed for better development experience
- 📊 **Partners Section**: Dynamic partner logos and information
- 🌙 **Dark Mode**: Built-in dark mode support

## 🚀 Quick Deployment

### Super Easy Deployment (Recommended)

```bash
# One command deployment
./deploy.sh local    # Deploy locally with Docker
./deploy.sh vercel   # Deploy to Vercel
./deploy.sh build    # Build static files

# Or use Make commands
make deploy-local    # Deploy locally
make deploy-vercel   # Deploy to Vercel
make quick-deploy    # Build and deploy locally
```

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/goldec-landing)

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Docker (optional, for containerized deployment)

### Getting Started

```bash
# Install dependencies
npm install
# or
make install

# Start development server
npm run dev
# or
make dev

# Start with Docker
make dev-docker
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📦 Deployment Options

We provide multiple deployment options to make deployment as easy as possible:

### 1. 🐳 Docker (Recommended)
```bash
# Build and run locally
docker-compose up --build

# Or use our script
./deploy.sh local
```

### 2. ☁️ Vercel (Easiest)
```bash
# Install Vercel CLI and deploy
npm i -g vercel
vercel --prod

# Or use our script
./deploy.sh vercel
```

### 3. 📄 Static Hosting
```bash
# Build static files
npm run build

# Upload ./build folder to any static hosting
```

### 4. 🔄 GitHub Actions
Push to main/master branch for automatic deployment (configured in `.github/workflows/deploy.yml`)

## 📚 Documentation

- [📖 Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [🏗️ Project Structure](./STRUCTURE.md) - Code organization and architecture
- [🐛 Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Deployment Guide](./DEPLOYMENT.md)
2. Review [Troubleshooting](./TROUBLESHOOTING.md)
3. Open an issue in this repository

---

**Made with ❤️ for Goldec**
