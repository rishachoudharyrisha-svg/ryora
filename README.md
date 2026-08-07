# Ryora

AI text-to-animated-video platform. This repository is a TypeScript workspace with a Vite/React client and an Express API.

## Getting started

1. Copy `backend/.env.example` to `backend/.env`. A `JWT_SECRET` is required; MongoDB Atlas and Gemini are required in production. In local development, the API falls back to temporary in-memory repositories and prompt enhancement when they are absent.
2. Run `npm install` at the repository root.
3. Start both applications with `npm run dev`.

The web app runs at `http://localhost:5173`; the API health check is at `http://localhost:4000/api/health`.

## Architecture

The API has independent provider contracts for video generation, storage, queues, notifications, and payments. `IVideoProvider` is currently backed by a no-cost local provider; introduce Fal, Replicate, Runway, or Luma by implementing that contract and changing the provider composition only.

Generation records retain the original, enhanced, and final prompt. Gemini 2.5 Flash is used when `GEMINI_API_KEY` is configured, with Gemini safety settings; a local, conservative safety fallback supports offline development.

## Deploying

Deploy `client` to Vercel using the root `vercel.json`, and deploy `server` to a Node host (Render, Railway, or Vercel Functions adapter). Set `CLIENT_ORIGIN` to the deployed frontend URL and configure `JWT_SECRET`, `MONGODB_URI`, and `GEMINI_API_KEY` there. MongoDB Atlas M0 and Gemini's free tier cover the initial MVP. The provider contracts are intentionally ready for Cloudinary storage now and S3/R2, Redis/BullMQ, Stripe, WebSockets, multi-provider routing, subscriptions, and credit accounting later.
