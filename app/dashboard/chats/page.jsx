"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getConversationsByUser } from "@/lib/firebase";
import { MessageSquare, Search, Clock } from "lucide-react";

function ConversationCard({ conv, currentUid }) {
  const otherParticipant =
    conv.participantNames?.find((p) => p.uid !== currentUid)?.name ||
    conv.participantNames?.find((p) => p !== currentUid) ||
    "User";

  const lastTime = conv.updatedAt?.toDate
    ? conv.updatedAt.toDate().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group">
      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm shrink-0 uppercase">
        {String(otherParticipant).charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
          {otherParticipant}
        </p>
        <p className="text-sm text-gray-400 truncate">{conv.lastMessage || "No messages yet"}</p>
      </div>
      {lastTime && (
        <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
          <Clock className="w-3 h-3" />
          {lastTime}
        </div>
      )}
    </div>
  );
}

export default function ChatsPage() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setUser(currentUser);
      try {
        const convs = await getConversationsByUser(currentUser.uid);
        setConversations(convs);
      } catch (err) {
        console.warn("Could not load conversations:", err.message);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const filtered = conversations.filter((c) => {
    if (!searchQuery) return true;
    const other =
      c.participantNames?.find((p) => p.uid !== user?.uid)?.name ||
      "";
    return other.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Chats</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your conversations with task givers and doers.
        </p>
      </div>

      {/* Search */}
      {conversations.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 outline-none"
          />
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-white rounded-xl border border-gray-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((conv) => (
            <ConversationCard key={conv.id} conv={conv} currentUid={user?.uid} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-white rounded-xl border border-gray-200 border-dashed">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No conversations yet</h3>
          <p className="text-gray-500 mt-1 text-sm text-center max-w-xs">
            When you connect with task givers or doers, conversations will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
