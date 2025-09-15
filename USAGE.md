# USAGE

## Overview

The `serve.sh` script is the main entrypoint to manage services.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (>= 20.x)
- [Docker Compose](https://docs.docker.com/compose/) (v2)

No Node.js installation is required locally — all builds run inside Docker.

---

## First Run

Clone the repo and run:

```bash
chmod +x serve.sh
./serve.sh start
```

The script will:

- Ensure `.env` files exist for **backend** and **frontend** (copied from `.env.example` if missing).
- Build and start containers.

---

## Available Commands

### Start

```bash
./serve.sh start
```

- Builds backend and frontend images.
- Starts MongoDB, Backend API, and Frontend UI.
- Runs in detached mode (`-d`).

### Stop

```bash
./serve.sh stop
```

- Stops and removes all running containers defined in `docker-compose.yml`.

---

## Accessing Services

- **Backend API**: [http://localhost:3000](http://localhost:3000)
- **Frontend App**: [http://localhost:8080](http://localhost:8080)

---

## Logs

To view logs while running:

```bash
docker compose logs -f
```

---

## Environment Files

- `backend/.env.example` → copied to `backend/.env`
- `frontend/.env.example` → copied to `frontend/.env`

Edit these to configure database URI, API URL, or secrets.

---

## Development Notes

- Backend NestJS app listens on port **3000**.
- Frontend Vue app is served through **Nginx** on port **8080**.
- MongoDB runs on **27017** with a persistent volume.

---

## Cleanup

To remove all containers and volumes:

```bash
docker compose down -v
```
