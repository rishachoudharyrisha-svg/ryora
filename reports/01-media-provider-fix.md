# Workstream 01 — Media Provider Fix

## Completed

- Removed the private Google Cloud Storage URL from the mock video provider.
- Removed the external thumbnail URL dependency.
- Added `client/public/demo/sample.mp4`, a bundled public demo video served by the Vite/Vercel frontend.
- Added `client/public/demo/sample-poster.svg`, a bundled thumbnail/poster asset.
- Replaced `LocalVideoProvider` with `MockVideoProvider`, which returns URLs based on `CLIENT_ORIGIN`.
- Extended generation/video metadata with provider and timestamps.
- Updated `GET /api/generation/:id` to return status, `videoUrl`, `thumbnailUrl`, provider, and timestamps.
- Added failure-state persistence when a provider fails.

## No private media URLs remain

The invalid GCS URL and `coverr-main` reference were removed. Generated local-development media now resolves to:

- `http://localhost:5173/demo/sample.mp4`
- `http://localhost:5173/demo/sample-poster.svg`
