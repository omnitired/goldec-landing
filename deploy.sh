#!/bin/bash

# Deploy script for goldec-landing
# Builds the Next.js project and syncs to the landing server

set -e  # Exit on any error

# Configuration
SERVER_HOST="landing"
SERVER_USER="root"  # Change this to your server username
SERVER_PATH="/root/goldec-landing"  # Change this to your desired server path

echo "Building project..."
npm run build

echo "Syncing to server..."
rsync -rvz --delete --no-perms --no-owner --no-group \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='.env*' \
    ./ "$SERVER_USER@$SERVER_HOST:$SERVER_PATH/"

echo "installing dependencies..."
# ssh "$SERVER_USER@$SERVER_HOST" "source ~/.nvm/nvm.sh && cd $SERVER_PATH && npm ci"
echo "Restarting pm2 service..."
ssh "$SERVER_USER@$SERVER_HOST" "source ~/.nvm/nvm.sh && pm2 restart goldec-landing"

echo "Deploy complete!"
