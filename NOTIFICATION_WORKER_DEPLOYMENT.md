# Sayzo Notification Worker Production Guide

## Current Architecture

- Frontend and API: Vercel
- Database/Auth: Firebase / Firestore
- Email provider: Resend
- Queue: `notification_queue` Firestore collection
- Worker: `workers/notificationWorker.js`
- Queue processor endpoint: `POST /api/process-notification-queue`

## Audit Summary

### Worker

- API URL resolution is production-safe:
  - Uses `WORKER_API_URL` first.
  - Falls back to `NEXT_PUBLIC_APP_URL` or `APP_URL`.
  - Normalizes trailing slashes before appending `/api/process-notification-queue`.
- Authorization header is correct:
  - Sends `Authorization: Bearer ${WORKER_SECRET}` when `WORKER_SECRET` is set.
- Polling is safe for production:
  - Default interval remains `30000` ms.
  - Prevents overlapping polls if an earlier request is still running.
- Error handling is improved:
  - Rejects on non-2xx responses.
  - Rejects on non-JSON responses.
  - Times out slow requests with `WORKER_REQUEST_TIMEOUT_MS`.
- Logging is production-friendly:
  - Logs startup configuration.
  - Logs processed jobs and failures.
  - Warns if `WORKER_SECRET` is missing.
- Graceful shutdown is handled:
  - Responds to `SIGTERM` and `SIGINT`.
  - Waits for the active poll to finish before exit.

### API Route

- Uses Firebase Admin SDK for Firestore server access.
- Protects the endpoint with `WORKER_SECRET` when configured.
- Queries `notification_queue` safely.
- Updates queue jobs correctly to `sent`, `retry`, or `failed`.
- Uses retry counting with `MAX_RETRIES = 3`.
- Adds a `processing` claim step to reduce duplicate sends.
- Recovers stale `processing` jobs after a lease timeout.

## Required Environment Variables

### Worker Service

- `WORKER_SECRET`
- `WORKER_API_URL=https://www.sayzo.net/api/process-notification-queue`
- `WORKER_INTERVAL_MS=30000`
- `WORKER_REQUEST_TIMEOUT_MS=15000`
- `WORKER_NAME=sayzo-prod-worker`
- `NODE_ENV=production`

### Vercel API Environment

- `WORKER_SECRET`
- `NEXT_PUBLIC_APP_URL=https://www.sayzo.net`
- `RESEND_API_KEY`
- `FIREBASE_ADMIN_PROJECT_ID`
- `FIREBASE_ADMIN_CLIENT_EMAIL`
- `FIREBASE_ADMIN_PRIVATE_KEY`

Note: `RESEND_API_KEY` and Firebase Admin credentials are required by the API route on Vercel, not by the standalone worker process.

## Production Command

```bash
node workers/notificationWorker.js
```

Or:

```bash
npm run worker
```

## Recommended Platform

### Best Fit: Render Background Worker

Why:

- Matches the exact worker model: always-on process with no inbound traffic.
- Lets you set a custom start command like `npm run worker`.
- Handles logs and deployments in one place.
- Fits a polling worker better than cron-based platforms.

### Good Alternatives

- Railway service:
  - Good if you already use Railway.
  - Better as a persistent service than a cron job for 30-second polling.
- Fly.io:
  - Flexible and powerful.
  - Better when you want Docker-first control and multi-process deployments.
- VPS with PM2:
  - Lowest platform abstraction.
  - Best if you want full control and are comfortable with server maintenance.

## Step-by-Step Deployment

### Step 1 — Preparing the worker repo

1. Ensure the worker file exists at `workers/notificationWorker.js`.
2. Ensure `package.json` includes `npm run worker`.
3. Commit the worker, API route, templates, and any queue-related files.
4. Confirm Vercel production env vars are already set for the API route.

### Step 2 — Deploying a background worker

Render:

1. Create a new Background Worker service.
2. Connect the GitHub repo.
3. Set the root directory to the project root.
4. Build command: `npm ci`
5. Start command: `npm run worker`
6. Select a paid plan that supports background workers.

### Step 3 — Setting environment variables

Set these on the worker service:

```env
NODE_ENV=production
WORKER_NAME=sayzo-prod-worker
WORKER_SECRET=your_shared_secret
WORKER_API_URL=https://www.sayzo.net/api/process-notification-queue
WORKER_INTERVAL_MS=30000
WORKER_REQUEST_TIMEOUT_MS=15000
```

Set these on Vercel for the API route:

```env
WORKER_SECRET=your_shared_secret
NEXT_PUBLIC_APP_URL=https://www.sayzo.net
RESEND_API_KEY=your_resend_key
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Step 4 — Connecting worker to production API

1. Point `WORKER_API_URL` to `https://www.sayzo.net/api/process-notification-queue`.
2. Use the same `WORKER_SECRET` value on both Render and Vercel.
3. Redeploy the worker after saving variables.
4. Redeploy Vercel if you changed `WORKER_SECRET` or Firebase/Resend secrets.

### Step 5 — Monitoring worker logs

Watch for these log lines:

- Startup banner with the correct API endpoint
- `polling queue...`
- `Queue empty — no jobs to process.`
- `Processed X job(s)`
- `Worker unauthorized`
- `Request timed out`

Investigate immediately if you see:

- repeated `401 Unauthorized`
- repeated `500` responses
- repeated timeout errors
- many jobs stuck in `retry` or `processing`

### Step 6 — Testing production queue processing

1. Trigger a real user action that creates a queue job.
2. Confirm a new Firestore doc appears in `notification_queue` with `status: "pending"`.
3. Check worker logs for the next polling cycle.
4. Confirm the API route returns processed results instead of `401` or `500`.
5. Confirm the queue document becomes `sent`.
6. Confirm the email arrives in the inbox.

## Production Test Checklist

1. Create a test job in Firestore through the app flow.
2. Confirm worker logs show polling activity.
3. Confirm worker logs show the job id being processed.
4. Confirm Vercel function logs show the API route was hit.
5. Confirm Firestore status changes from `pending` to `sent`.
6. Confirm `processedAt` is written.
7. Confirm no duplicate email is sent.
8. Confirm retry behavior works by forcing one send failure.
9. Confirm failed jobs stop after `MAX_RETRIES`.
10. Confirm the worker shuts down cleanly during redeploy.

## Operational Notes

- Keep the worker as a separate service from Vercel. Vercel is not the right place for a continuously running poller.
- `30s` polling is reasonable for low to moderate queue volume.
- If traffic stays low and cost matters more than latency, you can move to `60s`.
- If you later need higher throughput, consider moving from polling to a true push/queue worker model.
- Make sure Firestore has the needed composite indexes for queue queries in production.
