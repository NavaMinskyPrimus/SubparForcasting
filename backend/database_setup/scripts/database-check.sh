#!/bin/bash
set -euo pipefail

CONTAINER_NAME="${1:-localdb}"
DB_USER="${DB_USER:-localuser}"
DB_NAME="${DB_NAME:-localdb}"

echo "== Connecting to container: ${CONTAINER_NAME}  db: ${DB_NAME}  user: ${DB_USER} =="

docker exec -i "$CONTAINER_NAME" psql -U "$DB_USER" -d "$DB_NAME" -v ON_ERROR_STOP=1 <<'SQL'
\pset pager off
\pset null '(null)'
\timing on

\echo
\echo '===================='
\echo 'DATABASE / SEARCH PATH'
\echo '===================='
SELECT current_database() AS db, current_user AS usr;
SHOW search_path;

\echo
\echo '===================='
\echo 'TABLE LIST'
\echo '===================='
\dt public.*

\echo
\echo '===================='
\echo 'COLUMNS (public schema)'
\echo '===================='
SELECT table_name,
       ordinal_position,
       column_name,
       data_type,
       is_nullable,
       column_default
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;

\echo
\echo '===================='
\echo 'CONSTRAINTS (PK/FK/UNIQUE/CHECK)'
\echo '===================='
SELECT tc.table_name,
       tc.constraint_type,
       tc.constraint_name,
       COALESCE(string_agg(kcu.column_name, ', ' ORDER BY kcu.ordinal_position), '') AS columns,
       COALESCE(ccu.table_name, '') AS references_table,
       COALESCE(ccu.column_name, '') AS references_column
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
 AND tc.table_schema = kcu.table_schema
LEFT JOIN information_schema.constraint_column_usage ccu
  ON tc.constraint_name = ccu.constraint_name
 AND tc.table_schema = ccu.table_schema
WHERE tc.table_schema = 'public'
GROUP BY tc.table_name, tc.constraint_type, tc.constraint_name, ccu.table_name, ccu.column_name
ORDER BY tc.table_name, tc.constraint_type, tc.constraint_name;

\echo
\echo '===================='
\echo 'INDEXES'
\echo '===================='
SELECT tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

\echo
\echo '===================='
\echo 'ROW COUNTS'
\echo '===================='
SELECT format('SELECT %L AS table, count(*) AS rows FROM %I.%I;',
              schemaname||'.'||tablename, schemaname, tablename)
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename
\gexec

\echo
\echo '===================='
\echo 'ALL DATA (every table)'
\echo '===================='
-- This prints each table in a readable format.
SELECT format('TABLE %I.%I;', schemaname, tablename)
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename
\gexec

SQL
