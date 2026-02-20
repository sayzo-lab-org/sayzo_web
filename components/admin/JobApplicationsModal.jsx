'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, ChevronDown, ChevronUp, Check, XCircle, Mail, Phone, User, Calendar } from 'lucide-react';
import { subscribeToJobApplicationsByJob, updateJobApplicationStatus } from '@/lib/firebase';

const JobApplicationsModal = ({ isOpen, onClose, job }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Subscribe to applications when modal opens
  useEffect(() => {
    if (!isOpen || !job?.id) {
      setApplications([]);
      setLoading(true);
      return;
    }

    const unsubscribe = subscribeToJobApplicationsByJob(
      job.id,
      (apps) => {
        setApplications(apps);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, job?.id]);

  const handleStatusChange = async (applicationId, newStatus) => {
    setActionLoading(applicationId);
    try {
      await updateJobApplicationStatus(applicationId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
            Pending
          </span>
        );
      case 'accepted':
        return (
          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
            Accepted
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[999]">
      <div className="w-full max-w-3xl bg-black border border-zinc-800 rounded-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div>
            <h2 className="text-xl text-white font-semibold">Applications</h2>
            <p className="text-zinc-400 text-sm mt-0.5">{job?.title}</p>
          </div>
          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-zinc-400 mb-4" />
              <p className="text-zinc-400">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="w-12 h-12 text-zinc-600 mb-4" />
              <h3 className="text-white text-lg font-medium">No Applications Yet</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Applications will appear here once candidates apply.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden"
                >
                  {/* Application Header - Always visible */}
                  <div
                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-zinc-800/50 transition"
                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-medium">
                        {app.fullName?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <div>
                        <p className="text-white font-medium">{app.fullName}</p>
                        <p className="text-zinc-400 text-sm">{app.roleApplyingFor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      {expandedId === app.id ? (
                        <ChevronUp className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === app.id && (
                    <div className="px-4 pb-4 pt-2 border-t border-zinc-800">
                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${app.email}`} className="hover:text-white transition">
                            {app.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${app.phoneNumber}`} className="hover:text-white transition">
                            {app.phoneNumber}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(app.createdAt)}
                        </div>
                      </div>

                      {/* Form Responses */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">
                            Measurable Results
                          </p>
                          <p className="text-zinc-200 text-sm whitespace-pre-wrap">
                            {app.measurableResults}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">
                            Ownership Situation
                          </p>
                          <p className="text-zinc-200 text-sm whitespace-pre-wrap">
                            {app.ownershipSituation}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">
                            Hours Commitment
                          </p>
                          <p className="text-zinc-200 text-sm">{app.hoursCommitment}</p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">
                            Failure Consequence
                          </p>
                          <p className="text-zinc-200 text-sm">{app.failureConsequence}</p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-xs uppercase tracking-wide mb-1">
                            Why Choose You
                          </p>
                          <p className="text-zinc-200 text-sm whitespace-pre-wrap">
                            {app.whyChooseYou}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {app.status === 'pending' && (
                        <div className="flex gap-2 mt-5 pt-4 border-t border-zinc-800">
                          <button
                            onClick={() => handleStatusChange(app.id, 'accepted')}
                            disabled={actionLoading === app.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                          >
                            {actionLoading === app.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(app.id, 'rejected')}
                            disabled={actionLoading === app.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                          >
                            {actionLoading === app.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                            Reject
                          </button>
                        </div>
                      )}

                      {/* Status Change Buttons for non-pending */}
                      {app.status !== 'pending' && (
                        <div className="flex gap-2 mt-5 pt-4 border-t border-zinc-800">
                          <button
                            onClick={() => handleStatusChange(app.id, 'pending')}
                            disabled={actionLoading === app.id}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-medium transition disabled:opacity-50"
                          >
                            {actionLoading === app.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              'Reset to Pending'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-800 flex-shrink-0">
          <p className="text-zinc-500 text-sm text-center">
            {applications.length} application{applications.length !== 1 ? 's' : ''} total
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsModal;
