#!/bin/bash

# Goldec Landing Deployment Script
# This script provides multiple deployment options

set -e

echo "🚀 Goldec Landing Deployment Script"
echo "===================================="

# Function to show usage
show_usage() {
    echo "Usage: ./deploy.sh [option]"
    echo ""
    echo "Options:"
    echo "  local     - Build and run locally with Docker"
    echo "  dev       - Run development server with Docker"
    echo "  build     - Build static files only"
    echo "  vercel    - Deploy to Vercel"
    echo "  docker    - Build and run production Docker container"
    echo "  clean     - Clean build files and Docker containers"
    echo "  help      - Show this help message"
    echo ""
}

# Function to build static files
build_static() {
    echo "📦 Building static files..."
    npm ci
    npm run build
    echo "✅ Build completed! Files are in ./build directory"
}

# Function to deploy with Docker locally
deploy_local() {
    echo "🐳 Building and running with Docker..."
    docker-compose down 2>/dev/null || true
    docker-compose build
    docker-compose up -d
    echo "✅ Application is running at http://localhost"
}

# Function to run development server
run_dev() {
    echo "🔧 Starting development server with Docker..."
    docker-compose --profile dev down 2>/dev/null || true
    docker-compose --profile dev up --build goldec-dev
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "☁️ Deploying to Vercel..."
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    vercel --prod
    echo "✅ Deployed to Vercel!"
}

# Function to build Docker image
build_docker() {
    echo "🐳 Building production Docker image..."
    docker build -t goldec-landing:latest .
    echo "✅ Docker image built successfully!"
    echo "To run: docker run -p 80:80 goldec-landing:latest"
}

# Function to clean up
clean_up() {
    echo "🧹 Cleaning up..."
    rm -rf build/ .next/ node_modules/.cache/
    docker-compose down 2>/dev/null || true
    docker system prune -f 2>/dev/null || true
    echo "✅ Cleanup completed!"
}

# Main script logic
case "$1" in
    "local")
        deploy_local
        ;;
    "dev")
        run_dev
        ;;
    "build")
        build_static
        ;;
    "vercel")
        deploy_vercel
        ;;
    "docker")
        build_docker
        ;;
    "clean")
        clean_up
        ;;
    "help" | "")
        show_usage
        ;;
    *)
        echo "❌ Unknown option: $1"
        show_usage
        exit 1
        ;;
esac