#!/bin/bash
set -eu

# create non-root user
psql -v ON_ERROR_STOP=1 --username $POSTGRES_USER --dbname $POSTGRES_DB <<-EOSQL
    CREATE USER "$DB_APP_USER_NAME" WITH PASSWORD '$DB_APP_USER_PASSWORD';
    GRANT CONNECT ON DATABASE "$POSTGRES_DB" TO "$DB_APP_USER_NAME";
    GRANT USAGE ON SCHEMA public TO "$DB_APP_USER_NAME";
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "$DB_APP_USER_NAME";
EOSQL

echo "User $DB_APP_USER_NAME created."