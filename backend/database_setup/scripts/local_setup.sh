#!/bin/bash
set -e
SEED_DATA=$1
echo "cleanup"
docker rm -f localdb >/dev/null 2>&1 || true

echo "Starting local environment..."
#get 
DIRNAME="$(dirname "${BASH_SOURCE[0]}")"
LOCAL_SETUP_DIR="$(cd "$DIRNAME/.." && pwd)"
echo $DIRNAME
echo $LOCAL_SETUP_DIR
# Start Docker containers
echo "Starting PostgreSQL..."
docker compose -f "$LOCAL_SETUP_DIR/docker-compose.yml" up -d

echo "Checking PostgreSQL..."
until docker exec localdb pg_isready -U localuser -d localdb; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done
echo "PostgreSQL is ready!"

docker exec -i localdb psql -U localuser -d localdb << 'EOF'
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "questions" CASCADE;
DROP TABLE IF EXISTS "answers" CASCADE;
DROP TABLE IF EXISTS "settings" CASCADE;
DROP SEQUENCE IF EXISTS "Users_UserID_seq" CASCADE;
DROP SEQUENCE IF EXISTS "Question_Id_seq" CASCADE;
DROP TYPE IF EXISTS user_permission CASCADE;
EOF

docker exec -i localdb psql -U localuser -d localdb < "$LOCAL_SETUP_DIR/postgres_schema.sql"

echo "Seeding local data..."
BACKEND_DIR="$(cd "$LOCAL_SETUP_DIR/.." && pwd)"
cd "$BACKEND_DIR" && NODE_ENV=local DB_HOST=localhost DB_USER=localuser DB_PASSWORD=localpass DB_NAME=localdb DB_PORT=5432 node "$LOCAL_SETUP_DIR/$SEED_DATA"
echo "Test data seeded!"
