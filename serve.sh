#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ensure_envs() {
  if [ ! -f "$ROOT_DIR/backend/.env" ]; then
    cp "$ROOT_DIR/backend/.env.example" "$ROOT_DIR/backend/.env"
    echo "[backend] Created .env from .env.example"
  fi

  if [ ! -f "$ROOT_DIR/frontend/.env" ]; then
    cp "$ROOT_DIR/frontend/.env.example" "$ROOT_DIR/frontend/.env"
    echo "[frontend] Created .env from .env.example"
  fi
}

start() {
  ensure_envs
  docker compose up --build -d
  echo
  echo "Services are starting:"
  echo "  API      : http://localhost:3000   (Swagger: http://localhost:3000/docs)"
  echo "  Frontend : http://localhost:8080"
  echo
  echo "To view logs: docker compose logs -f"
}

stop() {
  docker compose down
  echo "Services stopped."
}

case "${1:-}" in
  start)
    start
    ;;
  stop)
    stop
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
