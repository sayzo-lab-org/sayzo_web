"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Bell, CheckCircle, XCircle, CheckCheck } from "lucide-react";
import {
  auth,
  subscribeToNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/lib/firebase";
import { NOTIFICATION_TYPE } from "@/lib/constants";

function timeAgo(timestamp) {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const TYPE_CONFIG = {
  [NOTIFICATION_TYPE.APPLICATION_RECEIVED]: {
    Icon: Bell,
    iconClass: "text-blue-500",
    bgClass: "bg-blue-50",
  },
  [NOTIFICATION_TYPE.APPLICATION_ACCEPTED]: {
    Icon: CheckCircle,
    iconClass: "text-emerald-500",
    bgClass: "bg-emerald-50",
  },
  [NOTIFICATION_TYPE.APPLICATION_REJECTED]: {
    Icon: XCircle,
    iconClass: "text-red-400",
    bgClass: "bg-red-50",
  },
};

function NotificationItem({ notif, onRead }) {
  const cfg = TYPE_CONFIG[notif.type] ?? TYPE_CONFIG[NOTIFICATION_TYPE.APPLICATION_RECEIVED];
  const { Icon } = cfg;

  return (
    <button
      onClick={() => !notif.read && onRead(notif.id)}
      className={`w-full text-left flex items-start gap-3 px-4 py-4 rounded-xl border transition-colors ${
        notif.read
          ? "bg-white border-gray-100 hover:bg-gray-50"
          : "bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50"
      }`}
    >
      <div className={`shrink-0 w-9 h-9 rounded-full ${cfg.bgClass} flex items-center justify-center mt-0.5`}>
        <Icon className={`w-4.5 h-4.5 ${cfg.iconClass}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm leading-snug ${notif.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>
            {notif.message}
          </p>
          {!notif.read && (
            <span className="shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.createdAt)}</p>
      </div>
    </button>
  );
}

export default function NotificationsPage() {
  const [uid, setUid] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUid(u?.uid ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const unsub = subscribeToNotifications(
      uid,
      (notifs) => {
        setNotifications(notifs);
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, [uid]);

  const handleMarkRead = (notifId) => {
    if (uid) markNotificationAsRead(uid, notifId);
  };

  const handleMarkAllRead = () => {
    if (uid) markAllNotificationsAsRead(uid);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-0.5">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification list or empty state */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-900 font-medium">No notifications yet</p>
          <p className="text-sm text-gray-500 mt-1">
            When you receive updates, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <NotificationItem key={notif.id} notif={notif} onRead={handleMarkRead} />
          ))}
        </div>
      )}
    </div>
  );
}
