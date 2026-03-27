#!/bin/bash
set -e

KEY="$(dirname "$0")/backend/Subpar key pair.pem"
EC2_USER="ubuntu"
EC2_HOST="3.236.115.107"

echo "==> Merging main into deploy..."
git checkout deploy
git merge main --no-edit
git push origin deploy

echo "==> Switching back to main..."
git checkout main

echo "==> Deploying to EC2..."
ssh -i "$KEY" "$EC2_USER@$EC2_HOST" 'bash /home/ubuntu/app/deploy-server.sh'

echo "==> All done! App is live."
