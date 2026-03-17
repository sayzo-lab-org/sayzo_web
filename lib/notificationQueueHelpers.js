import { APPLICATION_STATUS, NOTIFICATION_STATUS, NOTIFICATION_TYPE } from "./constants.js";

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || "").trim());

export const buildQueueDocumentPayload = ({
  type,
  recipientId = null,
  recipientEmail = "",
  recipientName = "",
  senderId = null,
  senderName = "",
  taskId = null,
  taskTitle = "your task",
  applicationId = null,
  createdAt,
}) => {
  const normalizedRecipientEmail = (recipientEmail || "").trim();
  const isRecipientValid = isValidEmail(normalizedRecipientEmail);

  return {
    type,
    recipientId,
    recipientEmail: normalizedRecipientEmail,
    recipientName,
    senderId,
    senderName,
    taskId,
    taskTitle,
    applicationId,
    status: isRecipientValid ? NOTIFICATION_STATUS.PENDING : NOTIFICATION_STATUS.INVALID,
    retryCount: 0,
    createdAt,
    processedAt: null,
    lastError: isRecipientValid ? null : "invalid recipientEmail",
  };
};

export const buildApplicationReceivedQueueJob = ({
  applicationData = {},
  applicationId,
  currentUser,
  applicantName,
  task = null,
  giverProfile = null,
}) => {
  const taskId = applicationData.taskId || null;
  const taskTitle = task?.title || task?.taskTitle || applicationData.taskTitle || "your task";
  const giverId = task?.giverId || applicationData.giverId || null;

  return {
    type: NOTIFICATION_TYPE.APPLICATION_RECEIVED,
    recipientId: giverId,
    recipientEmail: giverProfile?.email || applicationData.giverEmail || task?.email || "",
    recipientName:
      giverProfile?.name
      || giverProfile?.fullName
      || applicationData.giverName
      || task?.customerName
      || task?.giverName
      || "Task Giver",
    senderId: currentUser.uid,
    senderName: applicantName,
    taskId,
    taskTitle,
    applicationId,
  };
};

export const buildApplicationDecisionQueueJob = ({
  applicationId,
  application,
  currentUser,
  status,
  task = null,
  giverProfile = null,
}) => {
  const taskId = application.taskId || null;
  const taskTitle = task?.title || task?.taskTitle || application.taskTitle || "your task";

  return {
    type: status === APPLICATION_STATUS.ACCEPTED
      ? NOTIFICATION_TYPE.APPLICATION_ACCEPTED
      : NOTIFICATION_TYPE.APPLICATION_REJECTED,
    recipientId: application.applicantId || null,
    recipientEmail: application.applicantEmail || application.email || "",
    recipientName: application.applicantName || "Task Doer",
    senderId: currentUser.uid,
    senderName: giverProfile?.name || giverProfile?.fullName || currentUser.displayName || "Task Giver",
    taskId,
    taskTitle,
    applicationId,
  };
};
