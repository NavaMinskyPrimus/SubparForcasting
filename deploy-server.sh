#!/bin/bash
set -e

echo "==> Pulling latest from deploy branch..."
cd /home/ubuntu/app
git pull origin deploy

echo "==> Installing dependencies..."
npm run install:all

echo "==> Building backend..."
cd backend && npm run build && cd ..

echo "==> Building frontend..."
cd frontend && npm run build && cd ..

echo "==> Restarting services..."
pm2 restart all

echo "==> Done! Deploy complete."
