import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  buildApplicationDecisionQueueJob,
  buildApplicationReceivedQueueJob,
  buildQueueDocumentPayload,
} from "../lib/notificationQueueHelpers.js";
import { APPLICATION_STATUS, NOTIFICATION_STATUS, NOTIFICATION_TYPE } from "../lib/constants.js";

const currentUser = {
  uid: "giver-123",
  displayName: "Giver Default",
};

test("application submitted flow builds application_received queue job", () => {
  const queueJob = buildApplicationReceivedQueueJob({
    applicationData: {
      taskId: "task-1",
      giverId: "giver-123",
    },
    applicationId: "app-1",
    currentUser: {
      uid: "doer-123",
    },
    applicantName: "Task Doer",
    task: {
      giverId: "giver-123",
      title: "Design landing page",
    },
    giverProfile: {
      email: "giver@sayzo.test",
      name: "Task Giver",
    },
  });

  const payload = buildQueueDocumentPayload({
    ...queueJob,
    createdAt: "timestamp-placeholder",
  });

  assert.equal(queueJob.type, NOTIFICATION_TYPE.APPLICATION_RECEIVED);
  assert.equal(payload.status, NOTIFICATION_STATUS.PENDING);
  assert.equal(payload.recipientEmail, "giver@sayzo.test");
  assert.equal(payload.senderName, "Task Doer");
  assert.equal(payload.taskId, "task-1");
  assert.equal(payload.applicationId, "app-1");
});

test("application submitted flow falls back to task email when giver profile email is missing", () => {
  const queueJob = buildApplicationReceivedQueueJob({
    applicationData: {
      taskId: "task-1b",
    },
    applicationId: "app-1b",
    currentUser: {
      uid: "doer-123",
    },
    applicantName: "Task Doer",
    task: {
      giverId: "giver-123",
      title: "Design landing page",
      email: "task-owner@sayzo.test",
      customerName: "Task Owner",
    },
    giverProfile: null,
  });

  assert.equal(queueJob.recipientEmail, "task-owner@sayzo.test");
  assert.equal(queueJob.recipientName, "Task Owner");
});

test("application accepted flow builds application_accepted queue job", () => {
  const queueJob = buildApplicationDecisionQueueJob({
    applicationId: "app-accepted",
    application: {
      applicantId: "doer-123",
      applicantEmail: "doer@sayzo.test",
      applicantName: "Task Doer",
      taskId: "task-2",
      taskTitle: "Fallback title",
    },
    currentUser,
    status: APPLICATION_STATUS.ACCEPTED,
    task: {
      title: "Build API dashboard",
    },
    giverProfile: {
      name: "Task Giver",
    },
  });

  const payload = buildQueueDocumentPayload({
    ...queueJob,
    createdAt: "timestamp-placeholder",
  });

  assert.equal(queueJob.type, NOTIFICATION_TYPE.APPLICATION_ACCEPTED);
  assert.equal(payload.status, NOTIFICATION_STATUS.PENDING);
  assert.equal(payload.recipientEmail, "doer@sayzo.test");
  assert.equal(payload.senderName, "Task Giver");
  assert.equal(payload.taskTitle, "Build API dashboard");
});

test("application rejected flow builds application_rejected queue job", () => {
  const queueJob = buildApplicationDecisionQueueJob({
    applicationId: "app-rejected",
    application: {
      applicantId: "doer-456",
      applicantEmail: "doer2@sayzo.test",
      applicantName: "Second Doer",
      taskId: "task-3",
    },
    currentUser,
    status: APPLICATION_STATUS.REJECTED,
    task: {
      taskTitle: "Write onboarding copy",
    },
    giverProfile: {
      name: "Task Giver",
    },
  });

  const payload = buildQueueDocumentPayload({
    ...queueJob,
    createdAt: "timestamp-placeholder",
  });

  assert.equal(queueJob.type, NOTIFICATION_TYPE.APPLICATION_REJECTED);
  assert.equal(payload.status, NOTIFICATION_STATUS.PENDING);
  assert.equal(payload.recipientName, "Second Doer");
  assert.equal(payload.taskTitle, "Write onboarding copy");
});

test("decision flow falls back to application.email when applicantEmail is missing", () => {
  const queueJob = buildApplicationDecisionQueueJob({
    applicationId: "app-fallback-email",
    application: {
      applicantId: "doer-999",
      applicantEmail: "",
      email: "doer-fallback@sayzo.test",
      applicantName: "Fallback Doer",
      taskId: "task-9",
    },
    currentUser,
    status: APPLICATION_STATUS.ACCEPTED,
    task: {
      title: "API integrations",
    },
    giverProfile: {
      name: "Task Giver",
    },
  });

  assert.equal(queueJob.recipientEmail, "doer-fallback@sayzo.test");
});

test("invalid recipient email is marked invalid before worker processing", () => {
  const payload = buildQueueDocumentPayload({
    type: NOTIFICATION_TYPE.APPLICATION_ACCEPTED,
    recipientId: "doer-789",
    recipientEmail: "",
    recipientName: "Broken Recipient",
    senderId: "giver-789",
    senderName: "Task Giver",
    taskId: "task-4",
    taskTitle: "Broken email test",
    applicationId: "app-invalid",
    createdAt: "timestamp-placeholder",
  });

  assert.equal(payload.status, NOTIFICATION_STATUS.INVALID);
  assert.equal(payload.lastError, "invalid recipientEmail");
});

test("required email templates exist for all supported job types", () => {
  const templates = [
    "application_received.html",
    "application_accepted.html",
    "application_rejected.html",
  ];

  templates.forEach((template) => {
    const templatePath = path.join(process.cwd(), "templates", template);
    assert.equal(fs.existsSync(templatePath), true, `${template} should exist`);
  });
});
