# Workstream 01 — Media Provider Fix

## Completed

- Removed the private Google Cloud Storage URL from the mock video provider.
- Removed the external thumbnail URL dependency.
- Added `client/public/demo/sample.mp4`, a bundled public demo video served by the Vite/Vercel frontend.
- Added `client/public/demo/sample-poster.svg`, a bundled thumbnail/poster asset.
- Added `LocalVideoProvider`, which returns public URLs based on `CLIENT_ORIGIN`.
- Extended generation/video metadata with provider and timestamps.
- Updated `GET /api/generation/:id` to return status, `videoUrl`, `thumbnailUrl`, provider, and timestamps.
- Added failure-state persistence when a provider fails.

## No private media URLs remain

Generated media is served as public assets from the configured frontend origin. Deployment configuration must set `CLIENT_ORIGIN` to that public frontend URL.
