FROM postgres:latest

ENV POSTGRES_PASSWORD=2jP0iPXZcAsRRP2IP8zfTYW1U
ENV POSTGRES_USER=pocketuser
ENV POSTGRES_DB=pocketbot

COPY scripts/schema.sql /docker-entrypoint-initdb.d/

