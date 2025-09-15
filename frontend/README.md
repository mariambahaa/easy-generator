# Frontend

The frontend is a Vue 3 single-page application (SPA) styled with Vuetify. It provides user registration, login, JWT handling, theme switching, and a responsive layout.

---

## Quick Start

```bash
# install dependencies
npm install

# run development server
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

---

## Environment Variables

Create `frontend/.env`:

```text
VITE_API_URL=http://localhost:3000
```

---

## Technologies

- Vue 3 with Composition API
- Vuetify 3
- Vue Router
- Pinia state management
- Vite
- TypeScript

---

## Features

- Authentication pages (sign up and sign in)
- JWT-based session management with localStorage
- Protected routes
- Responsive Vuetify layouts
- Light and dark theme switcher
- Local Montserrat font integration
- Modular project structure

---

## Project Structure

```text
src/
  ├── assets/        # fonts, logos
  ├── components/    # reusable UI components
  ├── layouts/       # layouts (AuthLayout, AppLayout)
  ├── pages/         # route-level pages
  ├── views/         # nested views
  ├── store/         # Pinia stores
  ├── composables/   # Vue composables
```

---

## License

MIT © 2025 Full Stack Authentication Project
