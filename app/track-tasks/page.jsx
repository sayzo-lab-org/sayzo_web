'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronDown, ChevronLeft, Loader2, Clock, CheckCircle, XCircle, Eye, X, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskGiverAuthModal from '@/components/TaskGiverAuthModal'
import { subscribeToTasksByGiver, subscribeToApplicationsByTask, subscribeToApplicationsByApplicant, updateApplicationStatus, getTaskById, markTaskAsComplete } from '@/lib/firebase'
import { TASK_STATUS, APPLICATION_STATUS } from '@/lib/constants'
import { useAuth } from '@/app/Context/AuthContext'

export default function TrackTasksPage() {
  const router = useRouter()

  // Use centralized auth context
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  // Local state
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeTab, setActiveTab] = useState('offline')
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [expandedApplicant, setExpandedApplicant] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [applications, setApplications] = useState({})
  const [actionLoading, setActionLoading] = useState(null)
  const [error, setError] = useState("")
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false)
  const [showCompleteConfirmModal, setShowCompleteConfirmModal] = useState(false)
  const [completeLoading, setCompleteLoading] = useState(false)

  // Doer view state
  const [viewMode, setViewMode] = useState('giver')  // 'giver' or 'doer'
  const [doerApplications, setDoerApplications] = useState([])
  const [doerTasks, setDoerTasks] = useState({})  // Cache task details by taskId
  const [selectedApplicationId, setSelectedApplicationId] = useState(null)
  const [doerLoading, setDoerLoading] = useState(false)
  const [showBetaInfo, setShowBetaInfo] = useState(false)
  const [showDoerInfo, setShowDoerInfo] = useState(false)

  const unsubscribeTasksRef = useRef(null)

  // Show auth modal when not authenticated (and not loading)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true)
    } else if (isAuthenticated) {
      setShowAuthModal(false)
    }
  }, [authLoading, isAuthenticated])

  // Subscribe to tasks when user is authenticated
  useEffect(() => {
    if (!user) {
      // Cleanup on logout
      if (unsubscribeTasksRef.current) {
        unsubscribeTasksRef.current()
        unsubscribeTasksRef.current = null
      }
      setTasks([])
      setApplications({})
      setSelectedTaskId(null)
      setExpandedApplicant(null)
      setViewMode('giver')
      setDoerApplications([])
      setDoerTasks({})
      setSelectedApplicationId(null)
      return
    }

    setLoading(true)
    setError("")

    // Subscribe to real-time task updates
    unsubscribeTasksRef.current = subscribeToTasksByGiver(
      user.uid,
      (tasks) => {
        setTasks(tasks)
        setLoading(false)
      },
      (err) => {
        console.error('Error in tasks subscription:', err)
        setError("Failed to load your tasks. Please try again.")
        setLoading(false)
      }
    )

    return () => {
      if (unsubscribeTasksRef.current) {
        unsubscribeTasksRef.current()
        unsubscribeTasksRef.current = null
      }
    }
  }, [user])

  // Subscribe to applications when a task is selected (real-time)
  useEffect(() => {
    if (!selectedTaskId) return

    const unsubscribe = subscribeToApplicationsByTask(
      selectedTaskId,
      (apps) => {
        setApplications(prev => ({
          ...prev,
          [selectedTaskId]: apps
        }))
      },
      (err) => {
        console.error('Error in applications subscription:', err)
        setError("Failed to load applications. Please try again.")
      }
    )

    return () => unsubscribe()
  }, [selectedTaskId])

  // Use ref to track cached doer tasks to avoid stale closures
  const doerTasksRef = useRef(doerTasks)
  useEffect(() => {
    doerTasksRef.current = doerTasks
  }, [doerTasks])

  // Subscribe to doer applications when switching to doer view (real-time)
  useEffect(() => {
    if (viewMode !== 'doer' || !user) return

    let isMounted = true
    setDoerLoading(true)
    setError("")

    const unsubscribe = subscribeToApplicationsByApplicant(
      user.uid,
      async (applications) => {
        if (!isMounted) return
        setDoerApplications(applications)

        // Fetch task details for each unique taskId
        const taskIds = [...new Set(applications.map(app => app.taskId))]
        const cachedTasks = doerTasksRef.current

        try {
          const taskPromises = taskIds.map(async (taskId) => {
            // Skip if already cached
            if (cachedTasks[taskId]) return { taskId, task: cachedTasks[taskId] }
            try {
              const task = await getTaskById(taskId)
              return { taskId, task }
            } catch (err) {
              console.error(`Failed to fetch task ${taskId}:`, err)
              return { taskId, task: null }
            }
          })
          const taskResults = await Promise.all(taskPromises)

          if (!isMounted) return

          // Use functional update to avoid stale state
          setDoerTasks(prevTasks => {
            const newTasksMap = { ...prevTasks }
            taskResults.forEach(({ taskId, task }) => {
              if (task) newTasksMap[taskId] = task
            })
            return newTasksMap
          })
        } catch (err) {
          console.error('Error fetching task details:', err)
          if (isMounted) {
            setError("Failed to load some task details. Please try again.")
          }
        } finally {
          if (isMounted) {
            setDoerLoading(false)
          }
        }
      },
      (err) => {
        console.error('Error in doer applications subscription:', err)
        if (isMounted) {
          setError("Failed to load your applications. Please try again.")
          setDoerLoading(false)
        }
      }
    )

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [viewMode, user])

  // Handle successful authentication (auth context will update automatically)
  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    // Auth context will update user state, which triggers subscriptions
  }

  // Filter tasks by type (offline/online)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.taskType === activeTab)
  }, [activeTab, tasks])

  // Filter doer applications by task type (offline/online)
  const filteredDoerApplications = useMemo(() => {
    return doerApplications.filter((app) => {
      const task = doerTasks[app.taskId]
      return task?.taskType === activeTab
    })
  }, [activeTab, doerApplications, doerTasks])

  // Get applicants for selected task
  const selectedTask = tasks.find((task) => task.id === selectedTaskId)
  const applicants = applications[selectedTaskId] || []

  // Handle task selection
  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId)
    setExpandedApplicant(null)
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedTaskId(null)
    setSelectedApplicationId(null)
    setExpandedApplicant(null)
  }

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode)
    setSelectedTaskId(null)
    setSelectedApplicationId(null)
    setExpandedApplicant(null)
  }

  // Handle accept/reject applicant
  const handleApplicationAction = useCallback(async (applicationId, status) => {
    setActionLoading(applicationId)
    setError("")
    try {
      await updateApplicationStatus(applicationId, status)
      // Status updated - subscription will auto-update the UI
    } catch (err) {
      console.error('Error updating application:', err)
      setError(err.message || "Failed to update application. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }, [])

  // Handle marking task as complete
  const handleMarkComplete = useCallback(async () => {
    if (!selectedTask) return

    setCompleteLoading(true)
    setError("")

    try {
      await markTaskAsComplete(selectedTask.id, selectedTask.giverId)
      setShowCompleteConfirmModal(false)
      // The subscription will auto-update the task status
    } catch (err) {
      console.error('Error completing task:', err)
      setError(err.message || "Failed to mark task as complete. Please try again.")
    } finally {
      setCompleteLoading(false)
    }
  }, [selectedTask])

  // Get status badge for tasks
  const getStatusBadge = (status) => {
    switch (status) {
      case TASK_STATUS.PENDING_APPROVAL:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case TASK_STATUS.APPROVED:
      case TASK_STATUS.ACTIVE:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        )
      case TASK_STATUS.REJECTED:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        )
      case TASK_STATUS.COMPLETED:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        )
      default:
        return null
    }
  }

  // Get application status badge for doer view
  const getApplicationStatusBadge = (status) => {
    switch (status) {
      case APPLICATION_STATUS.PENDING:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
      case APPLICATION_STATUS.ACCEPTED:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Accepted
          </span>
        )
      case APPLICATION_STATUS.REJECTED:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        )
      default:
        return null
    }
  }

  // Get selected application and its task for doer view
  const selectedApplication = doerApplications.find(app => app.id === selectedApplicationId)
  const selectedApplicationTask = selectedApplication ? doerTasks[selectedApplication.taskId] : null

  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      {/* Auth Modal */}
      <TaskGiverAuthModal
        isOpen={showAuthModal}
        onClose={() => router.push('/')}
        onSuccess={handleAuthSuccess}
      />

      {isAuthenticated && (
      <div className="max-w-350 mx-auto px-4">
        {/* Banner */}
        <div className="relative text-white px-4 py-6 md:px-8 md:py-8 rounded-2xl" style={{ background: 'linear-gradient(to right, #22E200, #02D04D)' }}>
          {/* Info button with hover (desktop) and click (mobile) tooltip */}
          <div className="absolute top-3 right-3 group">
            <button
              onClick={() => setShowBetaInfo(!showBetaInfo)}
              className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <Info className="w-4 h-4 text-white" />
            </button>
            {/* Tooltip - visible on hover (desktop) or click (mobile) */}
            <div className={`absolute right-0 top-10 w-72 md:w-80 bg-white rounded-lg shadow-xl z-50 transition-all duration-200 overflow-hidden
              ${showBetaInfo ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'}`}
            >
              {/* Arrow pointer */}
              <div className="absolute -top-2 right-3 w-4 h-4 bg-white rotate-45 shadow-sm"></div>
              {/* Header */}
              <div className="relative flex items-center justify-between p-3 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-gray-800" />
                  <span className="font-semibold text-gray-800">Disclaimer</span>
                </div>
                {/* Close button - visible on mobile */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowBetaInfo(false); }}
                  className="lg:hidden w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Content */}
              <p className="p-3 text-gray-600 text-sm leading-relaxed">
                You're in our Beta phase. No algorithms yet, just real execution. Even in this early version, 100+ TaskGivers have been served. We've transitioned from a WhatsApp community model to a proper web platform. Beta 2.0 launches soon, bringing the true 10-minute matching magic.
              </p>
            </div>
          </div>
          <h1 className="font-semibold text-center text-pretty text-xl md:text-2xl lg:text-[34px] lg:leading-tight">
            Beta Access: Find verified skills (online & offline) in 10<br className="hidden md:block" />
            minutes. Zero platform fee for Beta users.
          </h1>
        </div>

        {/* Main Content - Full Width (30/70 split) */}
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6 py-6">
          {/* My Tasks Section */}
          <div className={`bg-white rounded-lg p-4 md:p-6 ${
            viewMode === 'giver'
              ? (selectedTaskId ? 'hidden lg:block' : 'block')
              : (selectedApplicationId ? 'hidden lg:block' : 'block')
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl md:text-2xl">My Tasks</h2>
              <button
                onClick={() => handleViewModeChange(viewMode === 'giver' ? 'doer' : 'giver')}
                className={`relative w-24 h-8 rounded-full transition-colors duration-200 border ${
                  viewMode === 'giver' ? 'bg-white border-gray-300' : 'bg-black border-black'
                }`}
              >
                <div className={`absolute top-0.5 bottom-0.5 px-3 rounded-full shadow-md transition-all duration-200 flex items-center justify-center text-sm font-semibold ${
                  viewMode === 'giver' ? 'left-0.5 bg-[#10A37F] text-white' : 'right-0.5 bg-white text-black'
                }`}>
                  {viewMode === 'giver' ? 'Giver' : 'Doer'}
                </div>
              </button>
            </div>

          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg">
            <button
              onClick={() => handleTabChange('offline')}
              className={`flex-1 py-4 font-semibold text-center transition-colors ${
                activeTab === 'offline'
                  ? 'bg-black text-white rounded-lg'
                  : 'text-gray-500'
              }`}
            >
              Offline
            </button>
            <button
              onClick={() => handleTabChange('online')}
              className={`flex-1 py-4 font-semibold text-center transition-colors ${
                activeTab === 'online'
                  ? 'bg-black text-white rounded-lg'
                  : 'text-gray-500'
              }`}
            >
              Online
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={() => {
                  setError("")
                  // Force page reload to re-establish subscriptions
                  window.location.reload()
                }}
                className="text-red-600 text-sm underline mt-1"
              >
                Try again
              </button>
            </div>
          )}

          {/* Task/Application List */}
          <div className="space-y-3">
            {viewMode === 'giver' ? (
              // Task Giver View - List of Posted Tasks
              <>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    You haven't posted any {activeTab} task yet
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleTaskClick(task.id)}
                      className={`flex items-center justify-between p-5 rounded-lg cursor-pointer transition-colors ${
                        selectedTaskId === task.id
                          ? 'bg-black text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="truncate block">{task.taskName}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {selectedTaskId !== task.id && (
                          <>
                            {task.status === TASK_STATUS.PENDING_APPROVAL && (
                              <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                Pending
                              </span>
                            )}
                            {(task.status === TASK_STATUS.APPROVED || task.status === TASK_STATUS.ACTIVE) && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Approved
                              </span>
                            )}
                            {task.status === TASK_STATUS.REJECTED && (
                              <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                                Rejected
                              </span>
                            )}
                            {applications[task.id]?.length > 0 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                {applications[task.id].length} applicant{applications[task.id].length > 1 ? 's' : ''}
                              </span>
                            )}
                          </>
                        )}
                        <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                          selectedTaskId === task.id ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              // Task Doer View - List of Applications
              <>
                {doerLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  </div>
                ) : filteredDoerApplications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No {activeTab} applications found</p>
                    <a
                      href="/live-tasks"
                      className="inline-block mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Browse Live Tasks
                    </a>
                  </div>
                ) : (
                  filteredDoerApplications.map((application) => {
                    const task = doerTasks[application.taskId]
                    return (
                      <div
                        key={application.id}
                        onClick={() => setSelectedApplicationId(application.id)}
                        className={`flex items-center justify-between p-5 rounded-lg cursor-pointer transition-colors ${
                          selectedApplicationId === application.id
                            ? 'bg-black text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <span className="truncate block font-medium">
                            {task?.taskName || 'Loading...'}
                          </span>
                          <span className={`text-xs ${
                            selectedApplicationId === application.id ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            Applied {application.createdAt?.toDate?.().toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }) || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          {selectedApplicationId !== application.id && getApplicationStatusBadge(application.status)}
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                            selectedApplicationId === application.id ? 'text-white' : 'text-gray-400'
                          }`} />
                        </div>
                      </div>
                    )
                  })
                )}
              </>
            )}
          </div>
        </div>

          {/* Right Panel - Applicants (Giver) or Application Details (Doer) */}
          <div className={`relative bg-white rounded-lg p-4 md:p-6 ${
            viewMode === 'giver'
              ? (!selectedTaskId ? 'hidden lg:block' : 'block')
              : (!selectedApplicationId ? 'hidden lg:block' : 'block')
          }`}>
            {/* Mobile Back Button */}
            <button
              onClick={() => viewMode === 'giver' ? setSelectedTaskId(null) : setSelectedApplicationId(null)}
              className="lg:hidden flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to {viewMode === 'giver' ? 'tasks' : 'applications'}
            </button>

            {/* Doer Info Button - only visible in doer view */}
            {viewMode === 'doer' && (
              <div className="absolute top-4 right-4 group z-10">
                <button
                  onClick={() => setShowDoerInfo(!showDoerInfo)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Info className="w-4 h-4 text-gray-800" />
                </button>
                {/* Tooltip - visible on hover (desktop) or click (mobile) */}
                <div className={`absolute right-0 top-10 w-72 md:w-80 bg-white rounded-lg shadow-xl z-50 transition-all duration-200 overflow-hidden
                  ${showDoerInfo ? 'opacity-100 visible' : 'opacity-0 invisible lg:group-hover:opacity-100 lg:group-hover:visible'}`}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-2 right-3 w-4 h-4 bg-white rotate-45 shadow-sm"></div>
                  {/* Header */}
                  <div className="relative flex items-center justify-between p-3 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-800" />
                      <span className="font-semibold text-gray-800">Disclaimer</span>
                    </div>
                    {/* Close button - visible on mobile */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setShowDoerInfo(false); }}
                      className="lg:hidden w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {/* Content - two paragraphs */}
                  <div className="p-3 text-gray-600 text-sm leading-relaxed space-y-3">
                    <p>When you accept a task as a TaskDoer, your application is sent to the TaskGiver. They review all applicants and select the best fit based on their requirements. If selected, you'll be able to view the TaskGiver's contact details and connect directly to begin the work. You can track your application status anytime within the platform.</p>
                    <p>For now, Sayzo operates solely as a connecting platform. With the full app launch, we'll evolve into a stronger infrastructure, helping you receive consistent tasks, greater opportunities, and additional support as a facilitator. Beta 2.0 is launching soon.</p>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'giver' ? (
              // Task Giver View - Applicants Panel
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl md:text-2xl">
                    Applicants
                    {selectedTask && (
                      <span className="hidden md:inline text-sm font-normal text-gray-500 ml-2">
                        for: {selectedTask.taskName?.substring(0, 30)}...
                      </span>
                    )}
                  </h2>
                  {selectedTask && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setShowTaskDetailsModal(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View Task</span>
                      </button>
                      {(selectedTask.status === TASK_STATUS.APPROVED || selectedTask.status === TASK_STATUS.ACTIVE) && (
                        <button
                          onClick={() => setShowCompleteConfirmModal(true)}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Mark Complete</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Show rejection reason if task is rejected */}
                {selectedTask?.status === TASK_STATUS.REJECTED && selectedTask?.adminRejectionReason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-700 text-sm">
                      <strong>Task Rejected:</strong> {selectedTask.adminRejectionReason}
                    </p>
                  </div>
                )}

                {/* Show pending notice */}
                {selectedTask?.status === TASK_STATUS.PENDING_APPROVAL && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-700 text-sm">
                      <strong>Pending Approval:</strong> Your task is being reviewed by admin. Once approved, it will be visible to task doers.
                    </p>
                  </div>
                )}

                {/* Show approved notice when no applicants yet */}
                {selectedTask?.status === TASK_STATUS.APPROVED && applicants.length === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-700 text-sm">
                      <strong>Approved:</strong> The task you posted has been verified and is now live on sayzo.in. Keep checking — you'll get interested applicants soon!
                    </p>
                  </div>
                )}

                {/* Show completed notice */}
                {selectedTask?.status === TASK_STATUS.COMPLETED && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
                      <CheckCircle className="w-5 h-5" />
                      Task Completed
                    </div>
                    <p className="text-sm text-blue-600">
                      This task has been marked as complete. It is no longer visible to new applicants on the browse page.
                    </p>
                  </div>
                )}

                {/* Applicants List */}
                <div className="space-y-3">
                  {!selectedTaskId ? (
                    <div className="text-center py-8 text-gray-400">
                      Select a task to view applicants
                    </div>
                  ) : applicants.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      No applicants yet for this task
                    </div>
                  ) : (
                    applicants.map((applicant) => {
                      const isExpanded = expandedApplicant === applicant.id
                      return (
                        <div
                          key={applicant.id}
                          className={`bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 ${
                            isExpanded ? '' : 'hover:bg-gray-100'
                          }`}
                        >
                          {/* Header - always visible */}
                          <div
                            onClick={() =>
                              setExpandedApplicant(isExpanded ? null : applicant.id)
                            }
                            className="flex items-center justify-between p-5 cursor-pointer"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-gray-900 truncate">
                                {applicant.applicantName} <span className="text-sm text-gray-500 font-normal">• {applicant.applicantRole}</span>
                              </p>
                              {applicant.status !== APPLICATION_STATUS.PENDING && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  applicant.status === APPLICATION_STATUS.ACCEPTED
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {applicant.status === APPLICATION_STATUS.ACCEPTED ? 'Accepted' : 'Rejected'}
                                </span>
                              )}
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <ChevronDown
                                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                                  isExpanded ? 'rotate-180' : 'rotate-0'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Expanded Details - grows within the same card */}
                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-4">
                              {/* Description with rounded border */}
                              <div className="border border-gray-200 rounded-lg p-3">
                                <p className="text-sm text-gray-600 leading-relaxed break-words">
                                  {applicant.description}
                                </p>
                              </div>

                              {/* Details - responsive layout */}
                              <div className="space-y-2 text-sm">
                                {/* Line 1: Experience & Can finish */}
                                <div className="flex flex-col md:flex-row md:gap-4">
                                  <p>
                                    <span className="text-gray-900">Experience: </span>
                                    <span className="text-gray-500 capitalize">{applicant.experience}</span>
                                  </p>
                                  <p>
                                    <span className="text-gray-900">Can finish on time? </span>
                                    <span className="text-gray-500 capitalize">{applicant.canFinishOnTime}</span>
                                  </p>
                                </div>
                                {/* Line 2: Mobile, Email, City - stack on mobile */}
                                <div className="flex flex-col md:flex-row md:gap-4">
                                  <p>
                                    <span className="text-gray-900">Mobile: </span>
                                    <span className="text-gray-500">{applicant.applicantPhone?.replace('+91', '') || 'N/A'}</span>
                                  </p>
                                  <p>
                                    <span className="text-gray-900">Email: </span>
                                    <span className="text-gray-500">{applicant.email}</span>
                                  </p>
                                  <p>
                                    <span className="text-gray-900">City: </span>
                                    <span className="text-gray-500">{applicant.city}</span>
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons - only show if application is pending */}
                              {applicant.status === APPLICATION_STATUS.PENDING && (
                                <div className="flex gap-3 pt-2">
                                  <button
                                    onClick={() => handleApplicationAction(applicant.id, APPLICATION_STATUS.ACCEPTED)}
                                    disabled={actionLoading === applicant.id}
                                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                  >
                                    {actionLoading === applicant.id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      'Accept'
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleApplicationAction(applicant.id, APPLICATION_STATUS.REJECTED)}
                                    disabled={actionLoading === applicant.id}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </>
            ) : (
              // Task Doer View - Application Details Panel
              <>
                {!selectedApplication ? (
                  <div className="text-center py-8 text-gray-400">
                    Select an application to view details
                  </div>
                ) : (
                  <>
                    {/* Application Status Banner */}
                    {selectedApplication.status === APPLICATION_STATUS.PENDING && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-yellow-700 font-medium mb-1">
                          <Clock className="w-5 h-5" />
                          Application Pending
                        </div>
                        <p className="text-sm text-yellow-600">
                          The task giver is reviewing your application. You will be notified once they make a decision.
                        </p>
                      </div>
                    )}
                    {selectedApplication.status === APPLICATION_STATUS.ACCEPTED && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                          <CheckCircle className="w-5 h-5" />
                          Congratulations! You're Accepted
                        </div>
                        <p className="text-sm text-green-600">
                          The task giver has accepted your application. Contact them to discuss the next steps.
                        </p>
                      </div>
                    )}
                    {selectedApplication.status === APPLICATION_STATUS.REJECTED && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-700 font-medium mb-1">
                          <XCircle className="w-5 h-5" />
                          Application Not Selected
                        </div>
                        <p className="text-sm text-red-600">
                          The task giver has chosen another applicant. Keep applying to other tasks!
                        </p>
                      </div>
                    )}

                    {/* Task Details Section */}
                    <div className="mb-6">
                      <h2 className="font-bold text-xl md:text-2xl mb-4">Task Details</h2>

                      {selectedApplicationTask ? (
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Task Name</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedApplicationTask.taskName}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Description</p>
                            <p className="text-gray-700 leading-relaxed">{selectedApplicationTask.description}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="text-xl font-bold text-gray-900">₹{selectedApplicationTask.amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Budget Type</p>
                              <p className="font-medium text-gray-700 capitalize">{selectedApplicationTask.budgetType}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium text-gray-700">{selectedApplicationTask.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Task Type</p>
                              <p className="font-medium text-gray-700 capitalize">{selectedApplicationTask.taskType}</p>
                            </div>
                          </div>

                          {selectedApplicationTask.taskType === 'offline' && selectedApplicationTask.location && (
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-700">{selectedApplicationTask.location}</p>
                            </div>
                          )}

                          {selectedApplicationTask.skills && (
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Skills Required</p>
                              <div className="flex flex-wrap gap-2">
                                {selectedApplicationTask.skills.split(',').map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                  >
                                    {skill.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Task Giver Contact - Only show if accepted */}
                          {selectedApplication.status === APPLICATION_STATUS.ACCEPTED && (
                            <div className="pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-500 mb-2">Task Giver Contact</p>
                              <p className="font-medium text-gray-900">{selectedApplicationTask.customerName}</p>
                              <p className="text-gray-600">{selectedApplicationTask.phone}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Your Application Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-bold text-lg mb-4">Your Application</h3>

                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Role Applied As</p>
                          <p className="font-medium text-gray-700">{selectedApplication.applicantRole}</p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Your Description</p>
                          <p className="text-gray-700 text-sm leading-relaxed">{selectedApplication.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Experience</p>
                            <p className="font-medium text-gray-700 capitalize">{selectedApplication.experience}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Can Finish On Time?</p>
                            <p className="font-medium text-gray-700 capitalize">{selectedApplication.canFinishOnTime}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Applied On</p>
                          <p className="text-gray-700 text-sm">
                            {selectedApplication.createdAt?.toDate?.().toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            }) || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
        </div>
      </div>

      {/* Task Details Modal */}
      <AnimatePresence>
        {showTaskDetailsModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setShowTaskDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h3 className="text-xl font-semibold text-white">Task Details</h3>
                <button onClick={() => setShowTaskDetailsModal(false)}>
                  <X className="w-5 h-5 text-zinc-400 hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4 overflow-y-auto max-h-[calc(80vh-80px)] scrollbar-hide">
                {/* Task Name */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Task Name</p>
                  <p className="text-white">{selectedTask.taskName}</p>
                </div>

                {/* Status */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Status</p>
                  <div className="w-fit">{getStatusBadge(selectedTask.status)}</div>
                </div>

                {/* Task Type */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Task Type</p>
                  <p className="text-white capitalize">{selectedTask.taskType}</p>
                </div>

                {/* Description */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800 min-h-[80px]">
                  <p className="text-zinc-500 text-xs mb-1">Description</p>
                  <p className="text-white text-sm leading-relaxed">{selectedTask.description}</p>
                </div>

                {/* Budget & Budget Type - 2 cols */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-1">Budget</p>
                    <p className="text-white">₹{selectedTask.amount}</p>
                  </div>
                  <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-1">Budget Type</p>
                    <p className="text-white capitalize">{selectedTask.budgetType}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Duration</p>
                  <p className="text-white">{selectedTask.duration}</p>
                </div>

                {/* Location (if offline) */}
                {selectedTask.taskType === 'offline' && selectedTask.location && (
                  <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-1">Location</p>
                    <p className="text-white">{selectedTask.location}</p>
                  </div>
                )}

                {/* Skills */}
                {selectedTask.skills && (
                  <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-1">Skills Required</p>
                    <p className="text-white">{selectedTask.skills}</p>
                  </div>
                )}

                {/* Experience */}
                {selectedTask.experience && (
                  <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                    <p className="text-zinc-500 text-xs mb-1">Experience Level</p>
                    <p className="text-white capitalize">{selectedTask.experience}</p>
                  </div>
                )}

                {/* Posted By */}
                <div className="w-full bg-[#18181B] px-4 py-4 my-2 rounded-xl border border-zinc-800">
                  <p className="text-zinc-500 text-xs mb-1">Posted By</p>
                  <p className="text-white">{selectedTask.customerName}</p>
                  <p className="text-zinc-400 text-sm">{selectedTask.phone}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mark Complete Confirmation Modal */}
      <AnimatePresence>
        {showCompleteConfirmModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center p-4"
            onClick={() => setShowCompleteConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Mark Task as Complete?
              </h3>

              {/* Task Name */}
              <p className="text-center text-gray-500 mb-4">
                <span className="font-medium text-gray-700">{selectedTask.taskName}</span>
              </p>

              {/* Warning */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Once marked as complete, this task will be hidden from the browse page and no new applications will be accepted. Existing applicants will still be visible.
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCompleteConfirmModal(false)
                    setError("")
                  }}
                  disabled={completeLoading}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMarkComplete}
                  disabled={completeLoading}
                  className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {completeLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Yes, Complete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      )}
    </div>
  )
}
