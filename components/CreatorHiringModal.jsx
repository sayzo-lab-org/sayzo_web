'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveCreatorApplication } from '@/lib/firebase';

const baseInput = (hasError) =>
  `w-full bg-white border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400
   focus:outline-none focus:ring-2 transition
   ${hasError ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-emerald-500'}`;

const INITIAL = {
  fullName: '',
  instagram: '',
  contactNumber: '',
  availableForContent: '',
  currentCity: '',
  cameraDevice: '',
};

const CreatorHiringModal = ({ isOpen, onClose }) => {
  const [form, setForm]             = useState(INITIAL);
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())      e.fullName            = 'Full name is required';
    if (!form.contactNumber.trim()) e.contactNumber       = 'Contact number is required';
    if (!form.availableForContent)  e.availableForContent = 'Please select an option';
    if (!form.currentCity.trim())   e.currentCity         = 'Current city is required';
    if (!form.cameraDevice.trim())  e.cameraDevice        = 'Please tell us your camera / device';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await saveCreatorApplication(form);
    } catch (_) {}
    finally {
      setSubmitting(false);
      setSuccess(true);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm(INITIAL); setErrors({}); setSuccess(false); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[95dvh] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-base font-semibold text-gray-900">Sayzo Creator Hiring Form</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-3 px-5">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
                <h3 className="text-gray-900 text-xl font-semibold">Application received!</h3>
                <p className="text-gray-500 text-sm">Thanks for applying. We&apos;ll review your details and reach out soon.</p>
                <button
                  onClick={handleClose}
                  className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-5 py-5 space-y-5 scrollbar-hide">

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  Thank you for your interest in collaborating with Sayzo! If you&apos;ve reached here after watching our Instagram video, we&apos;re excited to learn more about you.
                </p>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Full Name <span className="text-red-400">*</span></label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" className={baseInput(errors.fullName)} />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>

                {/* Instagram */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Instagram Account <span className="text-gray-400 font-normal normal-case">(Optional)</span></label>
                  <input name="instagram" value={form.instagram} onChange={handleChange} placeholder="@yourhandle" className={baseInput(false)} />
                </div>

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Contact Number <span className="text-red-400">*</span></label>
                  <input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="+91 00000 00000" className={baseInput(errors.contactNumber)} />
                  {errors.contactNumber && <p className="text-xs text-red-500">{errors.contactNumber}</p>}
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Available to create 4 pieces/week for 3 months? <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Yes', 'No'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setForm((p) => ({ ...p, availableForContent: opt })); if (errors.availableForContent) setErrors((p) => ({ ...p, availableForContent: '' })); }}
                        className={`py-2.5 rounded-lg text-sm font-medium transition border
                          ${form.availableForContent === opt
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.availableForContent && <p className="text-xs text-red-500">{errors.availableForContent}</p>}
                </div>

                {/* Current City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Current City <span className="text-red-400">*</span></label>
                  <input name="currentCity" value={form.currentCity} onChange={handleChange} placeholder="e.g. Mumbai" className={baseInput(errors.currentCity)} />
                  {errors.currentCity && <p className="text-xs text-red-500">{errors.currentCity}</p>}
                </div>

                {/* Camera / Device */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">Camera / Device for Content <span className="text-red-400">*</span></label>
                  <input name="cameraDevice" value={form.cameraDevice} onChange={handleChange} placeholder="e.g. iPhone 15, Samsung S24, DSLR…" className={baseInput(errors.cameraDevice)} />
                  {errors.cameraDevice && <p className="text-xs text-red-500">{errors.cameraDevice}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 py-3 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 size={15} className="animate-spin" />}
                  {submitting ? 'Submitting…' : 'Submit Application'}
                </button>

              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatorHiringModal;
