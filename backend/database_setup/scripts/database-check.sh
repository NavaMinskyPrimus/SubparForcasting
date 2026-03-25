#!/bin/bash
set -euo pipefail

CONTAINER_NAME="${1:-localdb}"
DB_USER="${DB_USER:-localuser}"
DB_NAME="${DB_NAME:-localdb}"

docker exec -i "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 <<'SQL'
\pset pager off
\pset null '(null)'

\echo '===================='
\echo 'ALL DATA (every table)'
\echo '===================='
TABLE public.users;
TABLE public.questions;
TABLE public.answers;
TABLE public.results;
TABLE public.settings;

SQL
