# Kyora — MVP Project Report

**Status:** Completed MVP (free-first, modular architecture)  
**Stack:** React 19, Vite, TypeScript, Tailwind CSS, Express, MongoDB/Mongoose, JWT, Zod, Gemini

## What is included

### Client application

- Premium dark, glass-inspired responsive UI
- Landing, Login, Register, Dashboard, History, Favorites, Profile, Settings, and 404 pages
- Protected routes backed by a stored JWT
- Prompt input, style, duration, and aspect-ratio controls
- Generation history, favorites, video download links, and video deletion
- TanStack Query caching and Framer Motion-ready UI foundation

### API application

- Register, login, logout, profile, generation, history, and video management endpoints
- JWT authentication, bcrypt password hashing, Helmet, CORS, JSON-size limits, error handling, and simple in-memory rate limiting
- Zod validation for authentication, profiles, prompt generation, and video updates
- Mongoose `User`, `Video`, and `Generation` models
- Pagination for generation history

### AI and provider architecture

- Gemini 2.5 Flash integration for prompt enhancement and Gemini safety settings
- Conservative offline safety and cinematic prompt fallback for local development without a Gemini key
- `IVideoProvider` contract with the current free `LocalVideoProvider`
- Future-facing contracts for payment, storage, queue, and notification providers
- Original prompt, enhanced prompt, and final prompt are retained with each generation

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Sign out |
| POST | `/api/generate` | Moderate, enhance, and generate |
| GET | `/api/generation/:id` | Generation details |
| GET | `/api/history` | Paginated history |
| GET/PATCH | `/api/profile` | Profile |
| GET | `/api/videos` | User videos; `?favorite=true` filters favorites |
| PATCH/DELETE | `/api/video/:id` | Update or delete a video |
| GET | `/api/health` | Health check |

## Running locally

1. Copy `server/.env.example` to `server/.env`.
2. Set `JWT_SECRET` to a value of 32+ characters.
3. Run `npm install` from the repository root.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

The API runs at `http://localhost:4000/api/health`.

For a production-like configuration, also set `MONGODB_URI` (MongoDB Atlas) and `GEMINI_API_KEY`. Local development works without both: data is temporary and held in memory, while prompt enhancement uses a deterministic fallback.

## Verification performed

- `npm run typecheck` passed
- `npm run build` passed for client and server
- Live API registration and authenticated generation flow passed using the local fallback provider

## Deployment

- Deploy the Vite client to Vercel using `vercel.json`.
- Deploy the Express server to a Node-capable host, then set `VITE_API_URL` in the client deployment and `CLIENT_ORIGIN` in the API deployment.
- Use MongoDB Atlas M0 and Gemini’s free tier for the hosted MVP.

## Honest MVP boundaries and next upgrades

The current `LocalVideoProvider` deliberately returns a free placeholder video so that the full product workflow is testable without paid video-generation infrastructure. To use real generated videos, add a provider for Fal, Replicate, Runway, or Luma that implements `IVideoProvider`; no controller changes are needed.

Cloudinary uploads, persistent job queues, payments, subscriptions, credits, WebSockets, S3/R2, Redis, and BullMQ are intentionally not implemented because the product brief defines them as post-MVP upgrades. Their provider contracts are already present to keep that migration contained.

## Git push checklist

```bash
git init
git add .
git commit -m "feat: complete Kyora free-first MVP"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

Never commit `server/.env`; it is already excluded by `.gitignore`.
