#!/bin/bash
set -xeuo pipefail
docker-compose up -d --build postgres
sleep 2
docker-compose up --build user-api
docker-compose down