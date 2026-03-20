"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, documentId, onSnapshot, query, where, getDocs } from "firebase/firestore";
import { auth, db, subscribeToUserProfile } from "@/lib/firebase";

function normalizeStatus(status) {
  return String(status || "").toLowerCase();
}

function toMillis(value) {
  if (value?.toDate) return value.toDate().getTime();
  if (!value) return 0;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function resolveTaskGiverName(task) {
  return task?.giverName || task?.createdByName || task?.createdByDisplayName || "Task Giver";
}

export default function useDashboardData(options = {}) {
  const {
    includeProfile = false,
    includeAppliedTaskDetails = false,
  } = options;
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [postedTasks, setPostedTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appliedTaskItems, setAppliedTaskItems] = useState([]);

  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [postedLoading, setPostedLoading] = useState(false);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [appliedTasksLoading, setAppliedTasksLoading] = useState(false);

  const [error, setError] = useState("");

  const mergeById = (items = []) => {
    const uniqueItems = new Map();
    items.forEach((item) => {
      if (item?.id) uniqueItems.set(item.id, item);
    });
    return Array.from(uniqueItems.values());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (!currentUser) {
        setProfile(null);
        setPostedTasks([]);
        setApplications([]);
        setAppliedTaskItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!includeProfile) return;
    if (!user?.uid) return;

    setProfileLoading(true);

    const unsubscribe = subscribeToUserProfile(
      user.uid,
      (profileData) => {
        setProfile(profileData);
        setProfileLoading(false);
      },
      () => {
        setError("Failed to load your profile.");
        setProfileLoading(false);
      }
    );

    return () => unsubscribe();
  }, [includeProfile, user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;

    setPostedLoading(true);

    const tasksRef = collection(db, "tasks");
    let createdByTasks = [];
    let giverTasks = [];

    const syncPostedTasks = () => {
      const nextTasks = mergeById([...createdByTasks, ...giverTasks]).sort(
        (a, b) => toMillis(b.createdAt) - toMillis(a.createdAt)
      );

      setPostedTasks(nextTasks);
      setPostedLoading(false);
    };

    const unsubscribeCreatedBy = onSnapshot(
      query(tasksRef, where("createdBy", "==", user.uid)),
      (snapshot) => {
        createdByTasks = snapshot.docs.map((taskDoc) => ({ id: taskDoc.id, ...taskDoc.data() }));
        syncPostedTasks();
      },
      () => {
        setError("Failed to load posted tasks.");
        setPostedLoading(false);
      }
    );

    const unsubscribeGiverId = onSnapshot(
      query(tasksRef, where("giverId", "==", user.uid)),
      (snapshot) => {
        giverTasks = snapshot.docs.map((taskDoc) => ({ id: taskDoc.id, ...taskDoc.data() }));
        syncPostedTasks();
      },
      () => {
        setError("Failed to load posted tasks.");
        setPostedLoading(false);
      }
    );

    return () => {
      unsubscribeCreatedBy();
      unsubscribeGiverId();
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid) return;

    setApplicationsLoading(true);

    const applicationsRef = collection(db, "applications");
    let userIdApplications = [];
    let applicantIdApplications = [];

    const syncApplications = () => {
      const nextApplications = mergeById([
        ...userIdApplications,
        ...applicantIdApplications,
      ]).sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));

      setApplications(nextApplications);
      setApplicationsLoading(false);
    };

    const unsubscribeUserId = onSnapshot(
      query(applicationsRef, where("userId", "==", user.uid)),
      (snapshot) => {
        userIdApplications = snapshot.docs.map((appDoc) => ({ id: appDoc.id, ...appDoc.data() }));
        syncApplications();
      },
      () => {
        setError("Failed to load applications.");
        setApplicationsLoading(false);
      }
    );

    const unsubscribeApplicantId = onSnapshot(
      query(applicationsRef, where("applicantId", "==", user.uid)),
      (snapshot) => {
        applicantIdApplications = snapshot.docs.map((appDoc) => ({ id: appDoc.id, ...appDoc.data() }));
        syncApplications();
      },
      () => {
        setError("Failed to load applications.");
        setApplicationsLoading(false);
      }
    );

    return () => {
      unsubscribeUserId();
      unsubscribeApplicantId();
    };
  }, [user?.uid]);

  useEffect(() => {
    if (!includeAppliedTaskDetails) {
      setAppliedTaskItems([]);
      setAppliedTasksLoading(false);
      return;
    }
    if (!user?.uid) return;

    let isCancelled = false;

    const loadAppliedTasks = async () => {
      if (applications.length === 0) {
        setAppliedTaskItems([]);
        setAppliedTasksLoading(false);
        return;
      }

      setAppliedTasksLoading(true);

      try {
        const uniqueTaskIds = Array.from(new Set(applications.map((app) => app.taskId).filter(Boolean)));

        if (uniqueTaskIds.length === 0) {
          setAppliedTaskItems(
            applications.map((application) => ({
              application,
              task: null,
              taskGiverName: application.giverName || "Task Giver",
            }))
          );
          setAppliedTasksLoading(false);
          return;
        }

        const tasksRef = collection(db, "tasks");
        const taskChunks = chunkArray(uniqueTaskIds, 30);
        const snapshots = await Promise.all(
          taskChunks.map((idsChunk) => getDocs(query(tasksRef, where(documentId(), "in", idsChunk))))
        );

        const taskById = new Map();
        snapshots.forEach((snapshot) => {
          snapshot.docs.forEach((taskDoc) => {
            taskById.set(taskDoc.id, { id: taskDoc.id, ...taskDoc.data() });
          });
        });

        if (isCancelled) return;

        setAppliedTaskItems(
          applications.map((application) => {
            const relatedTask = application.taskId ? taskById.get(application.taskId) || null : null;
            return {
              application,
              task: relatedTask,
              taskGiverName:
                application.giverName ||
                resolveTaskGiverName(relatedTask) ||
                "Task Giver",
            };
          })
        );
      } catch {
        if (isCancelled) return;
        setError("Failed to load applied task details.");
      } finally {
        if (!isCancelled) setAppliedTasksLoading(false);
      }
    };

    loadAppliedTasks();

    return () => {
      isCancelled = true;
    };
  }, [applications, includeAppliedTaskDetails, user?.uid]);

  const metrics = useMemo(() => {
    const activeTasks = postedTasks.filter((task) => normalizeStatus(task.status) === "active").length;
    const completedTasks = postedTasks.filter((task) => normalizeStatus(task.status) === "completed").length;

    return {
      totalTasksPosted: postedTasks.length,
      activeTasks,
      completedTasks,
      appliedTasks: applications.length,
    };
  }, [postedTasks, applications]);

  const loading =
    authLoading ||
    postedLoading ||
    applicationsLoading ||
    (includeProfile && profileLoading) ||
    (includeAppliedTaskDetails && appliedTasksLoading);

  return {
    user,
    profile,
    postedTasks,
    applications,
    appliedTaskItems,
    metrics,
    loading,
    postedLoading,
    applicationsLoading,
    appliedTasksLoading,
    error,
  };
}
