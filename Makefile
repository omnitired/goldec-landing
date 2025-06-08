# Goldec Landing Makefile
# Simple commands for deployment and development

.PHONY: help install dev build deploy-local deploy-vercel clean docker-build docker-run

# Default target
help:
	@echo "🚀 Goldec Landing - Available Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make dev-docker   - Start development server with Docker"
	@echo ""
	@echo "Building:"
	@echo "  make build        - Build static files"
	@echo "  make docker-build - Build Docker image"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy-local   - Deploy locally with Docker"
	@echo "  make deploy-vercel  - Deploy to Vercel"
	@echo "  make docker-run     - Run Docker container"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean        - Clean build files and containers"
	@echo "  make lint         - Run linting"
	@echo ""

# Development
install:
	@echo "📦 Installing dependencies..."
	npm ci

dev:
	@echo "🔧 Starting development server..."
	npm run dev

dev-docker:
	@echo "🐳 Starting development server with Docker..."
	docker-compose --profile dev up --build goldec-dev

# Building
build:
	@echo "📦 Building static files..."
	npm ci
	npm run build
	@echo "✅ Build completed! Files are in ./build directory"

docker-build:
	@echo "🐳 Building Docker image..."
	docker build -t goldec-landing:latest .
	@echo "✅ Docker image built successfully!"

# Deployment
deploy-local:
	@echo "🚀 Deploying locally with Docker..."
	docker-compose down 2>/dev/null || true
	docker-compose up --build -d
	@echo "✅ Application is running at http://localhost"

deploy-vercel:
	@echo "☁️ Deploying to Vercel..."
	@command -v vercel >/dev/null 2>&1 || npm install -g vercel
	vercel --prod
	@echo "✅ Deployed to Vercel!"

docker-run:
	@echo "🐳 Running Docker container..."
	docker run -d -p 80:80 --name goldec-landing goldec-landing:latest
	@echo "✅ Container is running at http://localhost"

# Utilities
clean:
	@echo "🧹 Cleaning up..."
	rm -rf build/ .next/ node_modules/.cache/
	docker-compose down 2>/dev/null || true
	docker container rm goldec-landing 2>/dev/null || true
	docker system prune -f 2>/dev/null || true
	@echo "✅ Cleanup completed!"

lint:
	@echo "🔍 Running linting..."
	npm run lint

# Quick deployment (build + deploy)
quick-deploy: build deploy-local
	@echo "🎉 Quick deployment completed!"

# Full Docker workflow
docker-deploy: docker-build docker-run
	@echo "🎉 Docker deployment completed!"