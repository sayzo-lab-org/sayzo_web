# Sayzo Notification System Audit

## 1. Architecture

```text
User Action
  -> Firestore application/status write
  -> notification_queue job write
  -> background worker polls /api/process-notification-queue
  -> API claims pending jobs from notification_queue
  -> API renders template + sends email with Resend
  -> job marked sent / retry / failed
```

## 2. Scope Audited

- `lib/firebase.js`
- `firestore.rules`
- `workers/notificationWorker.js`
- `app/api/process-notification-queue/route.js`
- `templates/application_received.html`
- `templates/application_accepted.html`
- `templates/application_rejected.html`

## 3. Summary

- Queue creation exists for all three required email events.
- Worker and API processing logic exist and are wired correctly.
- Email templates exist for all three job types.
- The system is close to production ready but has reliability and observability gaps.

## 4. Findings

### High Severity

1. Queue creation can still be skipped if notification context loading fails.
   - `addApplication()` only enqueues after loading task and giver profile.
   - If `getDoc(tasks/{taskId})` or `getUserProfile(giverId)` fails, the catch logs a warning and returns without creating a queue job.
   - `updateApplicationStatus()` only enqueues after loading application, task, and giver profile.
   - If any of those reads fail, queue creation is skipped.

2. Missing recipient email becomes a hard delivery failure, not a prevented enqueue.
   - Jobs are created even when `recipientEmail` is empty.
   - The worker then marks them `failed` with `no recipientEmail`.
   - This means the email system depends on profile/application data quality that is not enforced at write time.

### Medium Severity

3. Firestore indexes are not checked into the repo.
   - No `firestore.indexes.json` or `firebase.json` was found.
   - Queue processing queries and several task/application queries rely on compound indexes in production.

4. Several failures are intentionally swallowed.
   - Queue enqueue failures are logged but never surfaced.
   - Context-load failures in notification flows are logged but do not fail the main action.
   - This protects UX, but hurts observability.

5. Security rules are permissive for authenticated queue writes.
   - Any authenticated user can create any `notification_queue` document.
   - This works functionally, but there is no schema validation or ownership restriction at the rule layer.

### Low Severity

6. The queue processor claims jobs safely, but result details are minimal.
   - Good enough for logs, but not ideal for debugging large production incidents.

7. The worker polls by HTTP, not by direct Firestore watch or scheduler-triggered push.
   - Fine at current scale, but polling limits responsiveness and wastes idle cycles.

## 5. Functional Verification

### Queue Creation

- `enqueueNotificationJob()` writes:
  - `type`
  - `recipientId`
  - `recipientEmail`
  - `recipientName`
  - `senderId`
  - `senderName`
  - `taskId`
  - `taskTitle`
  - `applicationId`
  - `status`
  - `retryCount`
  - `createdAt`
  - `processedAt`

- `addApplication()` enqueues `application_received`.
- `updateApplicationStatus()` enqueues `application_accepted` and `application_rejected`.

### Firestore Rules

- `notification_queue`: authenticated create allowed; client read/update denied.
- `applications`: authenticated create/update allowed.
- `tasks`: read allowed publicly; create/update/delete require auth.
- `users`: profile reads require auth; self-writes only.
- Worker processing is not blocked by rules because API uses Firebase Admin SDK.

### Worker / API

- Worker polls every 30 seconds by default.
- Worker hits `POST /api/process-notification-queue`.
- API protects the endpoint with `WORKER_SECRET` when configured.
- API claims `pending` and `retry` jobs, and can recover stale `processing` jobs.
- API marks jobs `sent`, `retry`, or `failed`.
- Retry count increases until `MAX_RETRIES = 3`.

### Email System

- Templates exist for:
  - `application_received`
  - `application_accepted`
  - `application_rejected`
- Subjects are mapped correctly by job type.
- Variables passed into templates match template placeholders.

## 6. Root Cause Analysis

The most likely reason emails are not sent is not the worker itself. The worker and API path are present and coherent.

The most likely real breakpoints are:

1. Queue job never gets created because notification context loading fails before enqueue.
2. Queue job is created with blank `recipientEmail`, so the processor marks it failed.
3. Production Firestore indexes for queue queries are missing.
4. Worker/Vercel env configuration is incomplete (`WORKER_SECRET`, Firebase Admin, or Resend).

## 7. Production Readiness Score

- Security: 7/10
- Reliability: 7/10
- Scalability: 6/10
- Error handling: 6/10
- Observability: 5/10

## 8. Final Verdict

Not fully production ready yet.

The pipeline is implemented and mostly correct, but it still has hidden failure paths where queue creation can be skipped and missing recipient data can turn into silent delivery loss unless logs are actively monitored.

## 9. Recommended Fixes

1. Enqueue from the minimum required data path.
   - For `addApplication()`, if `giverId` is known, enqueue even if profile lookup fails.
   - For `updateApplicationStatus()`, enqueue from application data first, then enrich if extra reads succeed.

2. Validate recipient data earlier.
   - Refuse to enqueue email jobs with missing `recipientEmail`, or store them with a dedicated `invalid` status and alerting.

3. Add Firestore index configuration to the repo.

4. Add stronger queue logging.
   - Log enqueue success with job id.
   - Log context-load failures with IDs.

5. Add integration tests.
   - Create application
   - Confirm queue document
   - Hit queue API
   - Confirm status transition

