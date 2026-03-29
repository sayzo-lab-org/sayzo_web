'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  CalendarDays,
  ArrowRight,
  Tag,
} from 'lucide-react';

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function experienceLabel(exp) {
  return { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' }[exp] ?? exp;
}

// ── Backdrop ──────────────────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// ── Modal panel ───────────────────────────────────────────────────────────────

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Detail pill ───────────────────────────────────────────────────────────────

function DetailPill({ icon: Icon, label, value, color = 'text-gray-500' }) {
  return (
    <div className="flex flex-col gap-1.5 bg-gray-50 rounded-xl px-4 py-3">
      <div className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </div>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TaskDetailsModal({ task, isOpen, onClose, onApply }) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // ESC to close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!task) return null;

  const skills = typeof task.skills === 'string'
    ? task.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : (task.skills ?? []);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">

          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={task.taskName}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >

            {/* ── Header ── */}
            <div className="px-6 pt-6 pb-5 border-b border-gray-100 shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Type + Date */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      task.taskType === 'online'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-orange-50 text-orange-600'
                    }`}>
                      {task.taskType === 'online'
                        ? <Globe className="w-3 h-3" />
                        : <MapPin className="w-3 h-3" />}
                      {task.taskType === 'online' ? 'Online' : 'Offline'}
                    </span>

                    {task.category && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <Tag className="w-3 h-3" />
                        {task.category}
                      </span>
                    )}

                    {task.createdAt && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(task.createdAt)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">
                    {task.taskName}
                  </h2>

                  {/* Posted by */}
                  {task.customerName && (
                    <p className="mt-1.5 text-sm text-gray-500">
                      Posted by <span className="font-medium text-gray-700">{task.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>

              {/* Scope of Work */}
              {task.scopeOfWork && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    Scope of Work
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {task.scopeOfWork}
                  </p>
                </div>
              )}

              {/* Detail pills grid */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <DetailPill
                    icon={DollarSign}
                    label="Budget"
                    value={`₹${Number(task.amount).toLocaleString('en-IN')}`}
                    color="text-emerald-600"
                  />
                  <DetailPill
                    icon={Clock}
                    label="Duration"
                    value={task.duration || task.projectLength || '—'}
                    color="text-blue-500"
                  />
                  <DetailPill
                    icon={Briefcase}
                    label="Experience"
                    value={experienceLabel(task.experience)}
                    color="text-violet-500"
                  />
                  {task.taskType === 'offline' && task.location && (
                    <DetailPill
                      icon={MapPin}
                      label="Location"
                      value={task.location}
                      color="text-orange-500"
                    />
                  )}
                  {task.budgetType && (
                    <DetailPill
                      icon={Tag}
                      label="Budget type"
                      value={task.budgetType === 'negotiable' ? 'Negotiable' : 'Fixed'}
                      color="text-gray-500"
                    />
                  )}
                  {task.projectType && (
                    <DetailPill
                      icon={CalendarDays}
                      label="Project type"
                      value={task.projectType === 'one-time' ? 'One-time' : 'Ongoing'}
                      color="text-gray-500"
                    />
                  )}
                </div>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer / CTA ── */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
              <button
                onClick={onApply}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-150"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modal, document.body);
}
