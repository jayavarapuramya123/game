# GameZone

GameZone is a full-stack gaming platform with a React + Vite client and modular Express/Mongoose API. The API is the source of truth for users, game results, XP, points, achievements, leaderboards, and admin operations. New games are added through database metadata and a client-side game registry.

## Project structure

```text
gamezone/
├── frontend/src/{components,context,games,pages,services,utils}/
│   ├── App.jsx
│   └── main.jsx
├── frontend/{index.html,package.json,vite.config.js}
├── backend/{config,controllers,middleware,models,routes,services,utils}/
│   ├── app.js
│   └── server.js
├── backend/.env.example
└── README.md
```

## Setup

Requires Node.js 20+ and MongoDB Community Server or Atlas. Copy `backend/.env.example` to `backend/.env`, set `MONGODB_URI` and a long random `JWT_SECRET`, start MongoDB, then run `npm install && npm run dev` in both `backend` and `frontend` terminals. Open Vite's printed URL and register. To grant admin, set that user's `role` to `admin` in MongoDB.

Production: `cd frontend && npm run build`; `cd backend && npm start`.

## API

Routes are under `/api`; responses use `{ success, message, data }`, with errors `{ success: false, message, errors: [] }`.

| Method | Path | Access | Purpose |
|---|---|---|---|
| POST | `/auth/register`, `/auth/login` | Public | Register / login |
| GET | `/auth/me`, `/auth/logout` | Signed in | Current user / logout |
| GET, PUT | `/users/profile` | Signed in | Read / update profile |
| GET | `/users/:id` | Signed in | Public profile |
| GET, POST | `/games` | Public / admin | Browse / create |
| GET, PUT, DELETE | `/games/:id` | Public / admin | Read / edit / remove |
| POST | `/results` | Signed in | Submit result; server calculates rewards |
| GET | `/results/my-results`, `/results/game/:gameId` | Signed in | Result history |
| GET | `/leaderboard`, `/leaderboard/:gameId` | Public | Global / game leaderboard (`period`, `page`, `limit`) |
| GET | `/achievements` | Public | Achievement definitions |
| GET | `/achievements/my-achievements` | Signed in | Unlocked achievements |
| GET | `/admin/users`, `/admin/statistics` | Admin | User management / totals |
| PATCH, DELETE | `/admin/users/:id` | Admin | Set role / delete account |

`POST /api/results` accepts `{ gameId, score, duration, result }`; client supplied XP and points are ignored. Passwords use bcrypt. Helmet, rate limiting, role checks, Mongoose schemas, and centralized error handling are enabled. The demo keeps JWT in local storage; public deployments should use HTTPS and consider secure httpOnly cookies.
