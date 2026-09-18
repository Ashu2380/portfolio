#!/usr/bin/env bash
# Full build: React frontend -> Spring Boot static -> executable jar
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "==> Building frontend"
cd "$ROOT/frontend"
if [ ! -d node_modules ]; then npm install --no-audit --no-fund; fi
npm run build

echo "==> Syncing into Spring Boot static"
STATIC="$ROOT/backend/src/main/resources/static"
rm -rf "$STATIC"
mkdir -p "$STATIC"
cp -r "$ROOT/frontend/dist/"* "$STATIC/"

echo "==> Packaging backend"
cd "$ROOT/backend"
mvn -q -DskipTests package

echo "==> Done: backend/target/*.jar  (run: java -jar backend/target/*.jar)"
