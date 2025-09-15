# Backend

The backend provides a secure authentication API using NestJS and MongoDB. It exposes endpoints for user registration, login, and access to JWT-protected routes.

---

## Quick Start

```bash
# install dependencies
npm install

# run in development mode
npm run start:dev

# build for production
npm run build

# start production server
npm run start:prod
```

---

## Environment Variables

Create `backend/.env`:

```text
MONGO_URI=mongodb://mongo:27017/authdb
JWT_SECRET=supersecretkey
PORT=3000
```

---

## Technologies

- NestJS
- MongoDB with Mongoose
- Passport JWT
- Bcrypt for password hashing
- Class-validator for request validation

---

## Features

- Sign up endpoint with input validation
- Sign in endpoint returning JWT
- Protected endpoint (`/auth/profile`) requiring JWT
- Centralized error handling
- Logging with NestJS Logger

---

## API Endpoints

- `POST /auth/signup` → Register a new user
- `POST /auth/login` → Authenticate and return JWT
- `GET /auth/profile` → Retrieve profile (JWT required)

---

## License

MIT © 2025 Full Stack Authentication Project
