# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend

This project now includes a MongoDB-backed backend in [backend](backend).

1. Copy [backend/.env.example](backend/.env.example) to `backend/.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install backend dependencies inside `backend` with `npm install`.
3. Start the API from `backend` with `npm run dev`, or from the repo root with `npm run api`.
4. Start the frontend from the repo root with `npm run dev`.

After login, the app redirects to a personalized dashboard at `/dashboard` that shows the logged-in user's name, startup, sector, and location.
