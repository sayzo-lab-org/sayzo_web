"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  MapPin,
  Globe,
  Clock,
  DollarSign,
  Briefcase,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getApprovedTasks } from "@/lib/firebase";
import TaskDoerAuthModal from "@/components/TaskDoerAuthModal";
import ApplicationModal from "@/components/ApplicationModal";
import { useAuth } from "@/app/Context/AuthContext";
import { Button } from "@/components/ui/button";


export default function BrowseTasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const routerServerGlobal = useRouter();


  // Use centralized auth context
  const { isAuthenticated, user } = useAuth();

  // Application state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState("");

  // Clear selection when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedTask(null);
      setShowApplicationModal(false);
    }
  }, [isAuthenticated]);

  // Fetch approved tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks when tab or search changes
  useEffect(() => {
    let filtered = tasks;

    // Filter by type
    if (activeTab !== "all") {
      filtered = filtered.filter((task) => task.taskType === activeTab);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.taskName?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.skills?.toLowerCase().includes(query)
      );
    }

    setFilteredTasks(filtered);
  }, [tasks, activeTab, searchQuery]);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const approvedTasks = await getApprovedTasks();
      setTasks(approvedTasks);
      setFilteredTasks(approvedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (task) => {
    setSelectedTask(task);
    if (isAuthenticated) {
      setShowApplicationModal(true);
    } else {
      routerServerGlobal.push("/login");
      
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // Auth context will update automatically, open application modal
    setShowApplicationModal(true);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Auth Modal */}
      <TaskDoerAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSuccess={() => {
          setShowApplicationModal(false);
          setSelectedTask(null);
        }}
        currentUser={user}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Browse Available Tasks
          </h1>
          <p className="text-gray-500">
            Find tasks that match your skills and start earning
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by name, description, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: "all", label: "All" },
                { id: "online", label: "Online", icon: Globe },
                { id: "offline", label: "Offline", icon: MapPin },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.icon && <tab.icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-6xl mx-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={fetchTasks}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No tasks available</p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        task.taskType === "online"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {task.taskType === "online" ? (
                        <Globe className="w-3 h-3" />
                      ) : (
                        <MapPin className="w-3 h-3" />
                      )}
                      {task.taskType}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(task.createdAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                    {task.taskName}
                  </h3>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {task.description}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>{task.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{task.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 col-span-2">
                      <Briefcase className="w-4 h-4 text-purple-500" />
                      <span className="capitalize">{task.experience} level</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {task.skills?.split(",").slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Location for offline */}
                  {task.taskType === "offline" && task.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {task.location}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                  <Button

                   onClick={() => {
                 
                    if (!isAuthenticated) {
                      router.push("/login");
                    } else {
                      handleApplyClick(task);
                    }
                
                  }}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
