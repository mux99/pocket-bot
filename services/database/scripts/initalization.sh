#!/bin/bash
set e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE pocketbot;
EOSQL

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f scripts/schemas.sql
