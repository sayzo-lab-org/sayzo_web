import { initializeApp, getApps } from "firebase/app";
import { logger } from "@/lib/logger";
import {
  getAuth,
  getRedirectResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  getCountFromServer,
  writeBatch,
} from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { TASK_STATUS, APPLICATION_STATUS, NOTIFICATION_STATUS, NOTIFICATION_TYPE } from "./constants";
import {
  buildApplicationDecisionQueueJob,
  buildApplicationReceivedQueueJob,
  buildQueueDocumentPayload,
} from "./notificationQueueHelpers.js";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (prevent multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Auth instance
export const auth = getAuth(app);

// Keep user logged in after refresh
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();

// Disable App Check for phone auth (helps with reCAPTCHA Enterprise issues)
auth.settings.appVerificationDisabledForTesting = false;


// Firestore instance - using default database
export const db = getFirestore(app);

// Storage instance
export const storage = getStorage(app);

// Clear existing reCAPTCHA verifier
export const clearRecaptcha = () => {
  if (typeof window !== "undefined" && window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      logger.log("reCAPTCHA clear error (ignored):", e);
    }
    window.recaptchaVerifier = null;
  }
};


// ============ PRIVATE CONTACT MASKING HELPERS ============
// These helpers are used internally to mask applicant contact details
// for non-accepted applications, so the task giver cannot see them
// until they have accepted the applicant.

/** Masks a phone number: "9822310009" → "98******09" */
const maskPhone = (number) => {
  if (!number) return 'N/A';
  const cleaned = String(number).replace('+91', '').trim();
  if (cleaned.length < 4) return '**********';
  return cleaned.slice(0, 2) + '******' + cleaned.slice(-2);
};

/** Masks an email: "user@gmail.com" → "us***@gmail.com" */
const maskEmail = (email) => {
  if (!email) return 'N/A';
  const [local, domain] = email.split('@');
  if (!domain) return '***@***.***';
  const visible = local.slice(0, 2);
  return `${visible}${'*'.repeat(Math.max(3, local.length - 2))}@${domain}`;
};



// Setup reCAPTCHA verifier for phone auth
export const setupRecaptcha = (containerId, useVisible = false) => {
  if (typeof window === "undefined") return null;

  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    logger.error(`reCAPTCHA container #${containerId} not found!`);
    return null;
  }

  // Always clear existing verifier first
  clearRecaptcha();

  logger.log("Setting up reCAPTCHA verifier...", useVisible ? "(visible)" : "(invisible)");

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: useVisible ? "normal" : "invisible",
    callback: (response) => {
      logger.log("reCAPTCHA solved:", response);
    },
    "expired-callback": () => {
      logger.log("reCAPTCHA expired");
      clearRecaptcha();
    },
  });

  return window.recaptchaVerifier;
};

// Send OTP to phone number
export const sendOTP = async (phoneNumber) => {
  try {
    logger.log("=== sendOTP Debug ===");
    logger.log("Phone:", phoneNumber);
    logger.log("Auth instance:", auth);
    logger.log("Auth app:", auth.app?.name);

    const recaptchaVerifier = setupRecaptcha("recaptcha-container");

    if (!recaptchaVerifier) {
      throw new Error("Failed to setup reCAPTCHA verifier");
    }

    const formattedPhone = phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`;
    logger.log("Formatted phone:", formattedPhone);

    // Render reCAPTCHA first
    logger.log("Rendering reCAPTCHA...");
    await recaptchaVerifier.render();
    logger.log("reCAPTCHA rendered");

    logger.log("Calling signInWithPhoneNumber...");
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    logger.log("OTP sent successfully");

    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    logger.error("=== sendOTP Error ===");
    logger.error("Error code:", error.code);
    logger.error("Error message:", error.message);
    logger.error("Full error:", error);
    // Clear reCAPTCHA on error so it can be recreated on retry
    clearRecaptcha();
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (otp) => {
  if (!window.confirmationResult) {
    throw new Error("Please send OTP first");
  }
  try {
    const result = await window.confirmationResult.confirm(otp);
    return result.user;
  } catch (error) {
    logger.error("verifyOTP Error:", error);
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error("Invalid OTP. Please check and try again.");
    }
    if (error.code === 'auth/code-expired') {
      throw new Error("OTP has expired. Please request a new one.");
    }
    throw new Error("Verification failed. Please try again.");
  }
};

// ============ EMAIL + PASSWORD AUTH ============

// Signup with email & password
export const signupWithEmail = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Login with email & password
export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Google login
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

   await saveUserProfile(user.uid, {
  name: user.displayName,
  email: user.email,
  photoURL: user.photoURL,
  provider: "google",
  profileCompleted: false,
});

    return user;
  } catch (error) {
    logger.error("Google Login Error:", error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};


// ============ USER PROFILE ============

// Get user profile from Firestore
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    logger.error("getUserProfile Error:", error);
    throw error;
  }
};

// Save or update user profile
export const saveUserProfile = async (uid, profileData) => {
  try {
    const userRef = doc(db, "users", uid);
    const existingProfile = await getDoc(userRef);

    const data = {
      uid,
      ...profileData,
      updatedAt: serverTimestamp(),
    };

    if (!existingProfile.exists()) {
      data.createdAt = serverTimestamp();
    }

    await setDoc(userRef, data, { merge: true });
    return data;
  } catch (error) {
    logger.error("saveUserProfile Error:", error);
    throw error;
  }
};

// Upload profile photo to Firebase Storage and return the download URL
export const uploadProfilePhoto = async (uid, file) => {
  try {
    const ext = file.name.split(".").pop();
    const fileRef = storageRef(storage, `profile-photos/${uid}/avatar.${ext}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    // Persist to user document immediately
    await saveUserProfile(uid, { photo: url });
    return url;
  } catch (error) {
    logger.error("uploadProfilePhoto Error:", error);
    throw error;
  }
};

// Check if user profile is complete
export const isProfileComplete = async (uid) => {
  try {
    const profile = await getUserProfile(uid);
    return profile?.profileCompleted === true;
  } catch (error) {
    logger.error("isProfileComplete Error:", error);
    return false;
  }
};

// Add task to Firestore
export const addTask = async (taskData) => {
  // Debug: Check auth state before writing
  const currentUser = auth.currentUser;
  logger.log("=== Firestore Debug ===");
  logger.log("Auth currentUser:", currentUser);
  logger.log("Auth UID:", currentUser?.uid);

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  const tasksRef = collection(db, "tasks");
  const docRef = await addDoc(tasksRef, {
    ...taskData,
    createdAt: serverTimestamp(),
    status: TASK_STATUS.PENDING_APPROVAL,
  });
  return docRef.id;
};

export const saveCreatorApplication = async (formData) => {
  const ref = collection(db, "creator-applications");
  const docRef = await addDoc(ref, {
    ...formData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// Get all tasks from Firestore
export const getTasks = async () => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getTasks Error:", error);
    throw new Error("Failed to load tasks. Please try again.");
  }
};

// Get tasks by giver (for task giver's dashboard)
export const getTasksByGiver = async (giverId) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("giverId", "==", giverId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getTasksByGiver Error:", error);
    throw new Error("Failed to load your tasks. Please try again.");
  }
};

// Get approved tasks (for browse page - visible to task doers)
export const getApprovedTasks = async () => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("status", "in", [TASK_STATUS.APPROVED, TASK_STATUS.ACTIVE, TASK_STATUS.COMPLETED]),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getApprovedTasks Error:", error);
    throw new Error("Failed to load available tasks. Please try again.");
  }
};

// Get pending tasks (for admin review)
export const getPendingTasks = async () => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("status", "==", TASK_STATUS.PENDING_APPROVAL),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getPendingTasks Error:", error);
    throw new Error("Failed to load pending tasks. Please try again.");
  }
};

// Get tasks by status (for admin filtering)
export const getTasksByStatus = async (status) => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getTasksByStatus Error:", error);
    throw new Error("Failed to load tasks. Please try again.");
  }
};

// Get single task by ID
export const getTaskById = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      return { id: taskSnap.id, ...taskSnap.data() };
    }
    return null;
  } catch (error) {
    logger.error("getTaskById Error:", error);
    throw new Error("Failed to load task details. Please try again.");
  }
};

// Update task status (for admin approve/reject)
export const updateTaskStatus = async (taskId, status, rejectionReason = null) => {
  logger.log("Updating task ID:", taskId, "| New status:", status);
  try {
    if (!taskId) throw new Error("Invalid taskId provided");

    const taskRef = doc(db, "tasks", taskId);
    logger.log("Firestore Path:", taskRef.path);

    const updateData = {
      status: status,
      updatedAt: serverTimestamp()
    };

    if (status === TASK_STATUS.APPROVED) {
      updateData.approvedAt = serverTimestamp();
    }

    if (status === TASK_STATUS.REJECTED && rejectionReason) {
      updateData.adminRejectionReason = rejectionReason;
    }

    logger.log("Payload going to Firestore:", updateData);

    // Using setDoc with merge: true to avoid NOT_FOUND errors if doc structure is wonky
    await setDoc(taskRef, updateData, { merge: true });
    logger.log("Successfully updated task status in Firestore");
  } catch (error) {
    logger.error("Full updateTaskStatus error object:", error);
    throw new Error("Failed to update task status. Please try again.");
  }
};

// Mark task as complete (for task giver - non-admin)
export const markTaskAsComplete = async (taskId, giverId) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  // Verify ownership
  if (currentUser.uid !== giverId) {
    throw new Error("You can only complete your own tasks");
  }

  try {
    const taskRef = doc(db, "tasks", taskId);

    // Double-check task ownership before updating
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      throw new Error("Task not found");
    }

    const taskData = taskSnap.data();
    if (taskData.giverId !== currentUser.uid) {
      throw new Error("You can only complete your own tasks");
    }

    await updateDoc(taskRef, {
      status: TASK_STATUS.COMPLETED,
      completedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("markTaskAsComplete Error:", error);
    throw new Error(error.message || "Failed to mark task as complete. Please try again.");
  }
};

// Update task data (admin edit)
export const updateTask = async (taskId, taskData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      ...taskData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("updateTask Error:", error);
    throw new Error("Failed to update task. Please try again.");
  }
};

// Delete task (admin only)
export const deleteTask = async (taskId) => {
  logger.log("Attempting to delete task:", taskId);
  try {
    if (!taskId) throw new Error("Invalid taskId provided");
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    logger.log("Task successfully deleted!");
  } catch (error) {
    logger.error("Full deleteTask Error object:", error);
    throw new Error("Failed to delete task. Please try again.");
  }
};

const logNotificationEvent = (level, message, meta = {}) => {
  const logFn = logger[level] ?? logger.log;
  logFn(`[notification-queue] ${message}`, meta);
};

const enqueueNotificationJob = async ({
  type,
  recipientId = null,
  recipientEmail = "",
  recipientName = "",
  senderId = null,
  senderName = "",
  taskId = null,
  taskTitle = "your task",
  applicationId = null,
}) => {
  const payload = buildQueueDocumentPayload({
    type,
    recipientId,
    recipientEmail,
    recipientName,
    senderId,
    senderName,
    taskId,
    taskTitle,
    applicationId,
    createdAt: serverTimestamp(),
  });

  try {
    const docRef = await addDoc(collection(db, "notification_queue"), payload);
    logNotificationEvent(
      payload.status === NOTIFICATION_STATUS.PENDING ? "log" : "warn",
      payload.status === NOTIFICATION_STATUS.PENDING ? "Enqueued notification job" : "Enqueued invalid notification job",
      {
        jobId: docRef.id,
        type,
        taskId,
        applicationId,
        recipientId,
        recipientEmail: payload.recipientEmail,
        status: payload.status,
      }
    );
    return { ok: true, jobId: docRef.id, status: payload.status };
  } catch (err) {
    logNotificationEvent("error", "Failed to enqueue notification", {
      type,
      taskId,
      applicationId,
      recipientId,
      recipientEmail: payload.recipientEmail,
      error: err.message,
    });
    return { ok: false, error: err };
  }
};

const buildApplicationReceivedJob = async ({ applicationData, applicationId, currentUser, applicantName }) => {
  const taskId = applicationData.taskId || null;
  let taskTitle = applicationData.taskTitle || "your task";
  let giverId = applicationData.giverId || null;
  let giverEmail = applicationData.giverEmail || "";
  let giverName = applicationData.giverName || "Task Giver";
  let taskEmail = applicationData.giverEmail || "";
  let taskGiverName = applicationData.giverName || "Task Giver";

  if (taskId) {
    try {
      const taskSnap = await getDoc(doc(db, "tasks", taskId));
      if (taskSnap.exists()) {
        const task = taskSnap.data();
        taskTitle = task.title || task.taskTitle || taskTitle;
        giverId = giverId || task.giverId || null;
        taskEmail = task.email || taskEmail;
        taskGiverName = task.customerName || task.giverName || taskGiverName;
        giverEmail = giverEmail || taskEmail;
        giverName = giverName === "Task Giver" ? taskGiverName : giverName;
      }
    } catch (error) {
      logNotificationEvent("warn", "Failed to load task while building application_received job", {
        taskId,
        applicationId,
        error: error.message,
      });
    }
  }

  if (giverId) {
    try {
      const giverProfile = await getUserProfile(giverId);
      giverEmail = giverProfile?.email || giverEmail;
      giverName = giverProfile?.name || giverName;
    } catch (error) {
      logNotificationEvent("warn", "Failed to load giver profile while building application_received job", {
        giverId,
        taskId,
        applicationId,
        error: error.message,
      });
    }
  }

  return buildApplicationReceivedQueueJob({
    applicationData,
    applicationId,
    currentUser,
    applicantName,
    task: {
      giverId,
      title: taskTitle,
      email: taskEmail,
      customerName: taskGiverName,
      giverName: taskGiverName,
    },
    giverProfile: { email: giverEmail, name: giverName, fullName: giverName },
  });
};

const buildApplicationDecisionJob = async ({ applicationId, currentUser, status }) => {
  const appSnap = await getDoc(doc(db, "applications", applicationId));
  if (!appSnap.exists()) {
    return null;
  }

  const application = appSnap.data();
  const applicantId = application.applicantId || null;
  const applicantEmail = application.applicantEmail || application.email || "";
  const applicantName = application.applicantName || "Task Doer";
  const taskId = application.taskId || null;

  let taskTitle = application.taskTitle || "your task";
  if (taskId) {
    try {
      const taskSnap = await getDoc(doc(db, "tasks", taskId));
      if (taskSnap.exists()) {
        const task = taskSnap.data();
        taskTitle = task.title || task.taskTitle || taskTitle;
      }
    } catch (error) {
      logNotificationEvent("warn", "Failed to load task while building decision job", {
        taskId,
        applicationId,
        error: error.message,
      });
    }
  }

  let giverName = currentUser.displayName || "Task Giver";
  try {
    const giverProfile = await getUserProfile(currentUser.uid);
    giverName = giverProfile?.name || giverName;
  } catch (error) {
    logNotificationEvent("warn", "Failed to load giver profile while building decision job", {
      giverId: currentUser.uid,
      taskId,
      applicationId,
      error: error.message,
    });
  }

  return buildApplicationDecisionQueueJob({
    applicationId,
    application: {
      applicantId,
      applicantEmail,
      applicantName,
      taskId,
      taskTitle,
    },
    currentUser,
    status,
    task: { title: taskTitle },
    giverProfile: { name: giverName },
  });
};

// ============ APPLICATIONS ============

// Add application (task doer applies for a task)
export const addApplication = async (applicationData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  // ── 1. Build applicant data ────────────────────────────────────────────────
  const userProfile    = await getUserProfile(currentUser.uid);
  const applicantPhone = applicationData.applicantPhone?.trim() || userProfile?.phone || "";
  const applicantEmail =
    applicationData.applicantEmail?.trim()
    || applicationData.email?.trim()
    || currentUser.email
    || userProfile?.email
    || "";
  const applicantName =
    applicationData.applicantName?.trim()
    || userProfile?.name
    || userProfile?.fullName
    || currentUser.displayName
    || "A task doer";

  // ── 2. Save the application document ──────────────────────────────────────
  let applicationId;
  try {
    const applicationsRef = collection(db, "applications");
    const docRef = await addDoc(applicationsRef, {
      ...applicationData,
      applicantId: currentUser.uid,
      applicantPhone,
      applicantEmail,
      applicantName,
      status:    APPLICATION_STATUS.PENDING,
      createdAt: serverTimestamp(),
    });
    applicationId = docRef.id;
  } catch (error) {
    logger.error("addApplication Error:", error);
    throw new Error("Failed to submit application. Please try again.");
  }

  let queueJob = null;
  try {
    queueJob = await buildApplicationReceivedJob({
      applicationData,
      applicationId,
      currentUser,
      applicantName,
    });
  } catch (contextError) {
    logNotificationEvent("warn", "addApplication: failed to build queue job", {
      applicationId,
      taskId: applicationData.taskId || null,
      giverId: applicationData.giverId || null,
      error: contextError.message,
    });
  }

  if (!queueJob) {
    queueJob = buildApplicationReceivedQueueJob({
      applicationData,
      applicationId,
      currentUser,
      applicantName,
    });
  }

  if (queueJob?.recipientId) {
    try {
      const notifRef = collection(db, "users", queueJob.recipientId, "notifications");
      await addDoc(notifRef, {
        type:          NOTIFICATION_TYPE.APPLICATION_RECEIVED,
        title:         "New Application Received",
        message:       `${applicantName} has applied for your task: "${queueJob.taskTitle}"`,
        taskId:        queueJob.taskId,
        taskTitle:     queueJob.taskTitle,
        applicationId,
        senderId:      currentUser.uid,
        senderName:    applicantName,
        read:          false,
        createdAt:     serverTimestamp(),
      });
    } catch (notifError) {
      logger.warn("addApplication: notification step failed (non-critical):", notifError.message);
    }
  }

  if (!queueJob?.recipientId && !queueJob?.recipientEmail) {
    logNotificationEvent("warn", "Skipped enqueue for application_received due to missing recipient identifiers", {
      applicationId,
      taskId: applicationData.taskId || null,
      giverId: applicationData.giverId || null,
    });
  }

  await enqueueNotificationJob(queueJob);

  return applicationId;
};

// Get applications for a specific task (for task giver)
// SECURITY: applicantPhone and applicantEmail are masked unless the application is accepted
export const getApplicationsByTask = async (taskId) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(
      applicationsRef,
      where("taskId", "==", taskId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const isAccepted = data.status === APPLICATION_STATUS.ACCEPTED;
      return {
        id: docSnap.id,
        ...data,
        // Mask contact details until accepted
        applicantPhone: isAccepted
          ? data.applicantPhone
          : maskPhone(data.applicantPhone),
        applicantEmail: isAccepted
          ? data.applicantEmail
          : maskEmail(data.applicantEmail),
        _contactRevealed: isAccepted,
      };
    });
  } catch (error) {
    logger.error("getApplicationsByTask Error:", error);
    throw new Error("Failed to load applications. Please try again.");
  }
};

// Get applications by applicant (for task doer's dashboard)
export const getApplicationsByApplicant = async (applicantId) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(
      applicationsRef,
      where("applicantId", "==", applicantId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getApplicationsByApplicant Error:", error);
    throw new Error("Failed to load your applications. Please try again.");
  }
};

// Update application status (task giver accepts/rejects)
export const updateApplicationStatus = async (applicationId, status) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  // ── 1. Update application status in Firestore ────────────────────────────
  try {
    const applicationRef = doc(db, "applications", applicationId);

    // Fetch the application document
    const applicationSnap = await getDoc(applicationRef);
    if (!applicationSnap.exists()) {
      throw new Error("Application not found");
    }
    const applicationData = applicationSnap.data();

    // Cross-reference the task document to get the authoritative giverId.
    // This works for both old docs (no giverId field) and new docs.
    const taskRef = doc(db, "tasks", applicationData.taskId);
    const taskSnap = await getDoc(taskRef);
    if (!taskSnap.exists()) {
      throw new Error("Associated task not found");
    }
    const taskData = taskSnap.data();
// for debug
    // logger.log("Current UID:", currentUser.uid);
    // logger.log("Task giverId:", taskData.giverId);

    // Verify the current user is the task owner
    if (taskData.giverId !== currentUser.uid) {
      throw new Error("You are not authorized to update this application");
    }

    // Patch giverId onto the application doc if it was missing (backfill for old docs)
    if (!applicationData.giverId) {
      await updateDoc(applicationRef, { giverId: taskData.giverId });
    }

    // Only update the status field — never touch applicantId, giverId, or taskId
    await updateDoc(applicationRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("updateApplicationStatus Error:", error);
    throw new Error(error.message || "Failed to update application status. Please try again.");
  }

  // ── 2. Notify the applicant (in-app + queue) — only for accept or reject ──
  const shouldNotify =
    status === APPLICATION_STATUS.ACCEPTED ||
    status === APPLICATION_STATUS.REJECTED;

  if (!shouldNotify) return;

  let queueJob = null;
  try {
    queueJob = await buildApplicationDecisionJob({
      applicationId,
      currentUser,
      status,
    });
  } catch (contextError) {
    logNotificationEvent("warn", "updateApplicationStatus: failed to build queue job", {
      applicationId,
      status,
      error: contextError.message,
    });
    return;
  }

  if (!queueJob) {
    logNotificationEvent("warn", "updateApplicationStatus: application not found for notification flow", {
      applicationId,
      status,
    });
    return;
  }

  const isAccepted = status === APPLICATION_STATUS.ACCEPTED;
  const notifTitle = isAccepted
    ? "Application Accepted 🎉"
    : "Application Update";

  const notifMessage = isAccepted
    ? `Your application for "${queueJob.taskTitle}" was accepted by ${queueJob.senderName}!`
    : `Your application for "${queueJob.taskTitle}" was not selected this time.`;

  try {
    if (queueJob.recipientId) {
      const notifRef = collection(db, "users", queueJob.recipientId, "notifications");
      await addDoc(notifRef, {
        type:          queueJob.type,
        title:         notifTitle,
        message:       notifMessage,
        taskId:        queueJob.taskId,
        taskTitle:     queueJob.taskTitle,
        applicationId,
        senderId:      currentUser.uid,
        senderName:    queueJob.senderName,
        read:          false,
        createdAt:     serverTimestamp(),
      });
    }
  } catch (notifError) {
    logger.warn("updateApplicationStatus: notification step failed (non-critical):", notifError.message);
  }

  if (queueJob.recipientId || queueJob.recipientEmail) {
    await enqueueNotificationJob(queueJob);
  } else {
    logNotificationEvent("warn", "Skipped enqueue for decision notification due to missing recipient identifiers", {
      applicationId,
      status,
      taskId: queueJob.taskId,
    });
  }
};

// Check if user has already applied to a task
export const hasUserApplied = async (taskId, userId) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(
      applicationsRef,
      where("taskId", "==", taskId),
      where("applicantId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    logger.error("hasUserApplied Error:", error);
    throw new Error("Failed to check application status. Please try again.");
  }
};

// ============ REAL-TIME SUBSCRIPTIONS ============

// Subscribe to tasks by giver (real-time updates)
export const subscribeToTasksByGiver = (giverId, callback, onError) => {
  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("giverId", "==", giverId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(tasks);
    },
    (error) => {
      logger.error("Tasks subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to applications by task (real-time updates)
// SECURITY: applicantPhone and applicantEmail are masked unless the application is accepted
// giverId must be passed so Firestore security rules can verify the caller owns the task
export const subscribeToApplicationsByTask = (taskId, giverId, callback, onError) => {
  const applicationsRef = collection(db, "applications");
  const q = query(
    applicationsRef,
    where("taskId", "==", taskId),
    where("giverId", "==", giverId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const applications = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const isAccepted = data.status === APPLICATION_STATUS.ACCEPTED;
        return {
          id: docSnap.id,
          ...data,
          // Mask contact details until accepted
          applicantPhone: isAccepted
            ? data.applicantPhone
            : maskPhone(data.applicantPhone),
          applicantEmail: isAccepted
            ? data.applicantEmail
            : maskEmail(data.applicantEmail),
          _contactRevealed: isAccepted,
        };
      });
      callback(applications);
    },
    (error) => {
      logger.error("Applications subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to applications by applicant (real-time updates)
export const subscribeToApplicationsByApplicant = (applicantId, callback, onError) => {
  const applicationsRef = collection(db, "applications");
  const q = query(
    applicationsRef,
    where("applicantId", "==", applicantId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const applications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(applications);
    },
    (error) => {
      logger.error("Applications subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to approved tasks (real-time updates for live-tasks page)
export const subscribeToApprovedTasks = (callback, onError) => {
  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("status", "in", [TASK_STATUS.APPROVED, TASK_STATUS.ACTIVE, TASK_STATUS.COMPLETED]),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(tasks);
    },
    (error) => {
      logger.error("Approved tasks subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to user profile in real-time
export const subscribeToUserProfile = (uid, callback, onError) => {
  const userRef = doc(db, "users", uid);
  return onSnapshot(
    userRef,
    (snap) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() });
      } else {
        callback(null);
      }
    },
    (error) => {
      logger.error("User profile subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Get conversations list for a user (for chat tab)
export const getConversationsByUser = async (uid) => {
  try {
    const convsRef = collection(db, "conversations");
    const q = query(
      convsRef,
      where("participants", "array-contains", uid),
      orderBy("updatedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    // Gracefully return empty array if collection doesn't exist yet
    logger.warn("getConversationsByUser:", error.message);
    return [];
  }
};

// ============ JOBS (CAREERS PAGE) ============

// Add job posting (starts as draft by default)
export const addJob = async (jobData) => {
  try {
    const jobsRef = collection(db, "jobs");
    const docRef = await addDoc(jobsRef, {
      ...jobData,
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    logger.error("addJob Error:", error);
    throw new Error("Failed to create job posting. Please try again.");
  }
};

// Get all jobs (for admin)
export const getJobs = async () => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getJobs Error:", error);
    throw new Error("Failed to load jobs. Please try again.");
  }
};

// Get single job by ID
export const getJobById = async (jobId) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (jobSnap.exists()) {
      return { id: jobSnap.id, ...jobSnap.data() };
    }
    return null;
  } catch (error) {
    logger.error("getJobById Error:", error);
    throw new Error("Failed to load job details. Please try again.");
  }
};

// Update job
export const updateJob = async (jobId, jobData) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, {
      ...jobData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("updateJob Error:", error);
    throw new Error("Failed to update job. Please try again.");
  }
};

// Delete job
export const deleteJob = async (jobId) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(jobRef);
  } catch (error) {
    logger.error("deleteJob Error:", error);
    throw new Error("Failed to delete job. Please try again.");
  }
};

// Subscribe to jobs (real-time updates for admin)
export const subscribeToJobs = (callback, onError) => {
  const jobsRef = collection(db, "jobs");
  const q = query(jobsRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(jobs);
    },
    (error) => {
      logger.error("Jobs subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Toggle job published status
export const toggleJobPublished = async (jobId, currentStatus) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, {
      published: !currentStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("toggleJobPublished Error:", error);
    throw new Error("Failed to update job status. Please try again.");
  }
};

// Get published jobs only (for careers page)
export const getPublishedJobs = async () => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(
      jobsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getPublishedJobs Error:", error);
    throw new Error("Failed to load jobs. Please try again.");
  }
};

// ============ BLOGS (BLOG PAGE) ============

// Helper: Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Helper: Format date for display
const formatBlogDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Add blog posting (starts as draft by default)
export const addBlog = async (blogData) => {
  try {
    const blogsRef = collection(db, "blogs");
    const slug = generateSlug(blogData.title);
    const docRef = await addDoc(blogsRef, {
      ...blogData,
      slug,
      date: formatBlogDate(),
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    logger.error("addBlog Error:", error);
    throw new Error("Failed to create blog post. Please try again.");
  }
};

// Update blog
export const updateBlog = async (blogId, blogData) => {
  try {
    const blogRef = doc(db, "blogs", blogId);
    const updateData = {
      ...blogData,
      slug: generateSlug(blogData.title),
      updatedAt: serverTimestamp(),
    };
    await updateDoc(blogRef, updateData);
  } catch (error) {
    logger.error("updateBlog Error:", error);
    throw new Error("Failed to update blog. Please try again.");
  }
};

// Delete blog
export const deleteBlog = async (blogId) => {
  try {
    const blogRef = doc(db, "blogs", blogId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(blogRef);
  } catch (error) {
    logger.error("deleteBlog Error:", error);
    throw new Error("Failed to delete blog. Please try again.");
  }
};

// Subscribe to blogs (real-time updates for admin)
export const subscribeToBlogsAdmin = (callback, onError) => {
  const blogsRef = collection(db, "blogs");
  const q = query(blogsRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(blogs);
    },
    (error) => {
      logger.error("Blogs subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Toggle blog published status
export const toggleBlogPublished = async (blogId, currentStatus) => {
  try {
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, {
      published: !currentStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("toggleBlogPublished Error:", error);
    throw new Error("Failed to update blog status. Please try again.");
  }
};

// Get published blogs only (for public blog page)
export const getPublishedBlogs = async () => {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getPublishedBlogs Error:", error);
    throw new Error("Failed to load blogs. Please try again.");
  }
};

// Get single blog by slug (for blog detail page)
export const getBlogBySlug = async (slug) => {
  try {
    const blogsRef = collection(db, "blogs");
    const q = query(
      blogsRef,
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    logger.error("getBlogBySlug Error:", error);
    return null;
  }
};

// Get single blog by document ID (for admin edit page)
export const getBlogById = async (id) => {
  try {
    const blogRef = doc(db, "blogs", id);
    const blogSnap = await getDoc(blogRef);
    if (blogSnap.exists()) {
      return { id: blogSnap.id, ...blogSnap.data() };
    }
    return null;
  } catch (error) {
    logger.error("getBlogById Error:", error);
    return null;
  }
};

// ============ JOB APPLICATIONS (CAREERS PAGE) ============

// Add job application
export const addJobApplication = async (applicationData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    // Get user profile for additional data
    const userProfile = await getUserProfile(currentUser.uid);
    const applicantEmail = currentUser.email || userProfile?.email || "";

    const jobApplicationsRef = collection(db, "jobApplications");
    const docRef = await addDoc(jobApplicationsRef, {
      ...applicationData,
      applicantId: currentUser.uid,
      applicantEmail,
      status: APPLICATION_STATUS.PENDING,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    logger.error("addJobApplication Error:", error);
    throw new Error("Failed to submit application. Please try again.");
  }
};

// Check if user has already applied to a job
export const hasUserAppliedToJob = async (jobId, userId) => {
  try {
    const jobApplicationsRef = collection(db, "jobApplications");
    const q = query(
      jobApplicationsRef,
      where("jobId", "==", jobId),
      where("applicantId", "==", userId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    logger.error("hasUserAppliedToJob Error:", error);
    throw new Error("Failed to check application status. Please try again.");
  }
};

// Get job applications by job ID (for admin)
export const getJobApplicationsByJob = async (jobId) => {
  try {
    const jobApplicationsRef = collection(db, "jobApplications");
    const q = query(
      jobApplicationsRef,
      where("jobId", "==", jobId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    logger.error("getJobApplicationsByJob Error:", error);
    throw new Error("Failed to load applications. Please try again.");
  }
};

// Subscribe to job applications by job ID (real-time for admin)
export const subscribeToJobApplicationsByJob = (jobId, callback, onError) => {
  const jobApplicationsRef = collection(db, "jobApplications");
  const q = query(
    jobApplicationsRef,
    where("jobId", "==", jobId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const applications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(applications);
    },
    (error) => {
      logger.error("Job applications subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Update job application status (admin accept/reject)
export const updateJobApplicationStatus = async (applicationId, status) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const applicationRef = doc(db, "jobApplications", applicationId);
    await updateDoc(applicationRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    logger.error("updateJobApplicationStatus Error:", error);
    throw new Error("Failed to update application status. Please try again.");
  }
};

// Get application count for a job (for badge display)
export const getJobApplicationCount = async (jobId) => {
  try {
    const jobApplicationsRef = collection(db, "jobApplications");
    const q = query(
      jobApplicationsRef,
      where("jobId", "==", jobId)
    );
    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    logger.error("getJobApplicationCount Error:", error);
    return 0;
  }
};

// Real-time subscription to user's job applications (for user-side tracking)
export const subscribeToJobApplicationsByApplicant = (userId, callback, onError) => {
  const jobApplicationsRef = collection(db, "jobApplications");
  const q = query(
    jobApplicationsRef,
    where("applicantId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const applications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(applications);
    },
    (error) => {
      logger.error("subscribeToJobApplicationsByApplicant Error:", error);
      if (onError) onError(error);
    }
  );
};

// ============ ADMIN METRICS ============

// Fetch base task details for metrics
export const getTaskMetricsBase = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);
    return taskSnap.exists() ? { id: taskSnap.id, ...taskSnap.data() } : null;
  } catch (error) {
    logger.error("getTaskMetricsBase Error:", error);
    throw new Error("Failed to load task metrics. Please try again.");
  }
};

// Get the total number of applications for a task (efficient count query)
export const getApplicationCount = async (taskId) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, where("taskId", "==", taskId));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    logger.error("getApplicationCount Error:", error);
    return 0; // Return 0 gracefully if query fails or no index exists yet
  }
};

// Fetch list of detailed applications for admin metrics
export const getTaskApplications = async (taskId) => {
  try {
    const appsRef = collection(db, "applications");
    const q = query(
      appsRef,
      where("taskId", "==", taskId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    logger.error("getTaskApplications Error:", error);
    throw new Error("Failed to load task applications for metrics.");
  }
};

// ============ IN-APP NOTIFICATIONS ============

// Subscribe to user's in-app notifications in real-time (newest first)
export const subscribeToNotifications = (uid, callback, onError) => {
  const notifRef = collection(db, "users", uid, "notifications");
  const q = query(notifRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const notifications = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      callback(notifications);
    },
    (error) => {
      logger.error("subscribeToNotifications Error:", error);
      if (onError) onError(error);
    }
  );
};

// Mark a single notification as read
export const markNotificationAsRead = async (uid, notifId) => {
  try {
    const notifRef = doc(db, "users", uid, "notifications", notifId);
    await updateDoc(notifRef, { read: true });
  } catch (error) {
    logger.error("markNotificationAsRead Error:", error);
  }
};

// Mark all unread notifications as read (batched)
export const markAllNotificationsAsRead = async (uid) => {
  try {
    const notifRef = collection(db, "users", uid, "notifications");
    const q = query(notifRef, where("read", "==", false));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return;
    const batch = writeBatch(db);
    snapshot.docs.forEach((docSnap) => {
      batch.update(docSnap.ref, { read: true });
    });
    await batch.commit();
  } catch (error) {
    logger.error("markAllNotificationsAsRead Error:", error);
  }
};
