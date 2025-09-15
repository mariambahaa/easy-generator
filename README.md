# Full Stack Authentication Application

This project provides a production-ready authentication system composed of a Vue 3 + Vuetify frontend and a NestJS + MongoDB backend.

It includes user registration, login, protected routes with JWT, responsive layouts, theming, and Docker-based orchestration.

---

## Project Structure

```text
.
├── backend/
├── frontend/
├── docker-compose.yml
├── serve.sh
```

---

## Quick Start

```bash
# build and start the full stack
./serve.sh

# backend service is available at
http://localhost:3000

# frontend service is available at
http://localhost:8080
```

---

## Technologies

- **Frontend**: Vue 3, Vuetify 3, TypeScript, Vite, Pinia, Vue Router
- **Backend**: NestJS, MongoDB, Mongoose, Passport JWT, Bcrypt
- **Infrastructure**: Docker, Docker Compose

---

## Environment Variables

### Backend (`backend/.env`)

```text
MONGO_URI=mongodb://mongo:27017/authdb
JWT_SECRET=supersecretkey
PORT=3000
```

### Frontend (`frontend/.env`)

```text
VITE_API_URL=http://localhost:3000
```

---

## Features

- User sign up with validation rules
- User sign in with JWT-based authentication
- Protected API endpoints
- Responsive UI built with Vuetify
- Light and dark themes
- Local Montserrat font integration
- Dockerized deployment with a single entrypoint script

---

## Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

---

## License

MIT © 2025 Full Stack Authentication Project
