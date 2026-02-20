import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";
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
  onSnapshot
} from "firebase/firestore";
import { TASK_STATUS, APPLICATION_STATUS } from "./constants";

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

// Set explicit persistence to LOCAL to ensure auth state persists across page navigations
// This fixes the logout bug where users get logged out when switching pages
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Disable App Check for phone auth (helps with reCAPTCHA Enterprise issues)
auth.settings.appVerificationDisabledForTesting = false;

// Firestore instance - connect to "users" database (not default)
export const db = getFirestore(app, "users");

// Clear existing reCAPTCHA verifier
export const clearRecaptcha = () => {
  if (typeof window !== "undefined" && window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (e) {
      console.log("reCAPTCHA clear error (ignored):", e);
    }
    window.recaptchaVerifier = null;
  }
};

// Setup reCAPTCHA verifier for phone auth
export const setupRecaptcha = (containerId, useVisible = false) => {
  if (typeof window === "undefined") return null;

  // Check if container exists
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`reCAPTCHA container #${containerId} not found!`);
    return null;
  }

  // Always clear existing verifier first
  clearRecaptcha();

  console.log("Setting up reCAPTCHA verifier...", useVisible ? "(visible)" : "(invisible)");

  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: useVisible ? "normal" : "invisible",
    callback: (response) => {
      console.log("reCAPTCHA solved:", response);
    },
    "expired-callback": () => {
      console.log("reCAPTCHA expired");
      clearRecaptcha();
    },
  });

  return window.recaptchaVerifier;
};

// Send OTP to phone number
export const sendOTP = async (phoneNumber) => {
  try {
    console.log("=== sendOTP Debug ===");
    console.log("Phone:", phoneNumber);
    console.log("Auth instance:", auth);
    console.log("Auth app:", auth.app?.name);

    const recaptchaVerifier = setupRecaptcha("recaptcha-container");

    if (!recaptchaVerifier) {
      throw new Error("Failed to setup reCAPTCHA verifier");
    }

    const formattedPhone = phoneNumber.startsWith("+91") ? phoneNumber : `+91${phoneNumber}`;
    console.log("Formatted phone:", formattedPhone);

    // Render reCAPTCHA first
    console.log("Rendering reCAPTCHA...");
    await recaptchaVerifier.render();
    console.log("reCAPTCHA rendered");

    console.log("Calling signInWithPhoneNumber...");
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    console.log("OTP sent successfully");

    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("=== sendOTP Error ===");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Full error:", error);
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
    console.error("verifyOTP Error:", error);
    if (error.code === 'auth/invalid-verification-code') {
      throw new Error("Invalid OTP. Please check and try again.");
    }
    if (error.code === 'auth/code-expired') {
      throw new Error("OTP has expired. Please request a new one.");
    }
    throw new Error("Verification failed. Please try again.");
  }
};

// ============ MAGIC LINK AUTHENTICATION ============

// Action code settings for magic link
const getActionCodeSettings = () => ({
  url: typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback`
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000") + "/auth/callback",
  handleCodeInApp: true,
});

// Send magic link to email
export const sendMagicLink = async (email) => {
  try {
    const actionCodeSettings = getActionCodeSettings();
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Store email in localStorage for completing sign-in
    if (typeof window !== "undefined") {
      window.localStorage.setItem("emailForSignIn", email);
    }
    return { success: true };
  } catch (error) {
    console.error("sendMagicLink Error:", error);
    throw error;
  }
};

// Check if current URL is a sign-in link
export const isEmailSignInLink = (url = null) => {
  const checkUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  return isSignInWithEmailLink(auth, checkUrl);
};

// Complete magic link sign-in
export const completeMagicLinkSignIn = async (url = null) => {
  const signInUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  if (!isSignInWithEmailLink(auth, signInUrl)) {
    return null;
  }

  // Get email from localStorage
  let email =
    typeof window !== "undefined"
      ? window.localStorage.getItem("emailForSignIn")
      : null;

  if (!email) {
    throw new Error("EMAIL_NOT_FOUND");
  }

  try {
    const result = await signInWithEmailLink(auth, email, signInUrl);
    // Clear email from storage
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("emailForSignIn");
    }
    return result.user;
  } catch (error) {
    console.error("completeMagicLinkSignIn Error:", error);
    throw error;
  }
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
    console.error("getUserProfile Error:", error);
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
    console.error("saveUserProfile Error:", error);
    throw error;
  }
};

// Check if user profile is complete
export const isProfileComplete = async (uid) => {
  try {
    const profile = await getUserProfile(uid);
    return profile?.profileCompleted === true;
  } catch (error) {
    console.error("isProfileComplete Error:", error);
    return false;
  }
};

// Add task to Firestore
export const addTask = async (taskData) => {
  // Debug: Check auth state before writing
  const currentUser = auth.currentUser;
  console.log("=== Firestore Debug ===");
  console.log("Auth currentUser:", currentUser);
  console.log("Auth UID:", currentUser?.uid);

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
    console.error("getTasks Error:", error);
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
    console.error("getTasksByGiver Error:", error);
    throw new Error("Failed to load your tasks. Please try again.");
  }
};

// Get approved tasks (for browse page - visible to task doers)
export const getApprovedTasks = async () => {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("status", "in", [TASK_STATUS.APPROVED, TASK_STATUS.ACTIVE]),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("getApprovedTasks Error:", error);
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
    console.error("getPendingTasks Error:", error);
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
    console.error("getTasksByStatus Error:", error);
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
    console.error("getTaskById Error:", error);
    throw new Error("Failed to load task details. Please try again.");
  }
};

// Update task status (for admin approve/reject)
export const updateTaskStatus = async (taskId, status, rejectionReason = null) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const updateData = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (status === TASK_STATUS.APPROVED) {
      updateData.approvedAt = serverTimestamp();
    }

    if (status === TASK_STATUS.REJECTED && rejectionReason) {
      updateData.adminRejectionReason = rejectionReason;
    }

    await updateDoc(taskRef, updateData);
  } catch (error) {
    console.error("updateTaskStatus Error:", error);
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
    console.error("markTaskAsComplete Error:", error);
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
    console.error("updateTask Error:", error);
    throw new Error("Failed to update task. Please try again.");
  }
};

// Delete task (admin only)
export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const { deleteDoc } = await import("firebase/firestore");
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("deleteTask Error:", error);
    throw new Error("Failed to delete task. Please try again.");
  }
};

// ============ APPLICATIONS ============

// Add application (task doer applies for a task)
export const addApplication = async (applicationData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    // Get phone from user profile (since we use email auth now)
    const userProfile = await getUserProfile(currentUser.uid);
    const applicantPhone = userProfile?.phone || "";
    const applicantEmail = currentUser.email || userProfile?.email || "";

    const applicationsRef = collection(db, "applications");
    const docRef = await addDoc(applicationsRef, {
      ...applicationData,
      applicantId: currentUser.uid,
      applicantPhone,
      applicantEmail,
      status: APPLICATION_STATUS.PENDING,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("addApplication Error:", error);
    throw new Error("Failed to submit application. Please try again.");
  }
};

// Get applications for a specific task (for task giver)
export const getApplicationsByTask = async (taskId) => {
  try {
    const applicationsRef = collection(db, "applications");
    const q = query(
      applicationsRef,
      where("taskId", "==", taskId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("getApplicationsByTask Error:", error);
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
    console.error("getApplicationsByApplicant Error:", error);
    throw new Error("Failed to load your applications. Please try again.");
  }
};

// Update application status (task giver accepts/rejects)
export const updateApplicationStatus = async (applicationId, status) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("No authenticated user found");
  }

  try {
    const applicationRef = doc(db, "applications", applicationId);
    await updateDoc(applicationRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("updateApplicationStatus Error:", error);
    throw new Error("Failed to update application status. Please try again.");
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
    console.error("hasUserApplied Error:", error);
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
      console.error("Tasks subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to applications by task (real-time updates)
export const subscribeToApplicationsByTask = (taskId, callback, onError) => {
  const applicationsRef = collection(db, "applications");
  const q = query(
    applicationsRef,
    where("taskId", "==", taskId),
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
      console.error("Applications subscription error:", error);
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
      console.error("Applications subscription error:", error);
      if (onError) onError(error);
    }
  );
};

// Subscribe to approved tasks (real-time updates for live-tasks page)
export const subscribeToApprovedTasks = (callback, onError) => {
  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("status", "in", [TASK_STATUS.APPROVED, TASK_STATUS.ACTIVE]),
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
      console.error("Approved tasks subscription error:", error);
      if (onError) onError(error);
    }
  );
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
    console.error("addJob Error:", error);
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
    console.error("getJobs Error:", error);
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
    console.error("getJobById Error:", error);
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
    console.error("updateJob Error:", error);
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
    console.error("deleteJob Error:", error);
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
      console.error("Jobs subscription error:", error);
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
    console.error("toggleJobPublished Error:", error);
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
    console.error("getPublishedJobs Error:", error);
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
    console.error("addBlog Error:", error);
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
    console.error("updateBlog Error:", error);
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
    console.error("deleteBlog Error:", error);
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
      console.error("Blogs subscription error:", error);
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
    console.error("toggleBlogPublished Error:", error);
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
    console.error("getPublishedBlogs Error:", error);
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
    console.error("getBlogBySlug Error:", error);
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
    console.error("addJobApplication Error:", error);
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
    console.error("hasUserAppliedToJob Error:", error);
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
    console.error("getJobApplicationsByJob Error:", error);
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
      console.error("Job applications subscription error:", error);
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
    console.error("updateJobApplicationStatus Error:", error);
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
    console.error("getJobApplicationCount Error:", error);
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
      console.error("subscribeToJobApplicationsByApplicant Error:", error);
      if (onError) onError(error);
    }
  );
};
