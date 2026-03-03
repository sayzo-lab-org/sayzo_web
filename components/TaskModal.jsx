"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, Mail, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  sendMagicLink,
  addTask,
  auth,
  getUserProfile,
  isProfileComplete,
} from "@/lib/firebase";
import ProfileCompletionModal from "./ProfileCompletionModal";
import { useAuth } from "@/app/Context/AuthContext";

const TaskModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [taskType, setTaskType] = useState("online");
  const [error, setError] = useState("");
  const [formPhase, setFormPhase] = useState("edit"); // "edit" | "preview" | "confirm"

  const [fieldErrors, setFieldErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Auth states
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    taskName: "",
    phone: "",
    location: "",
    description: "",
    budgetType: "fixed",
    amount: "",
    duration: "",
    skills: [],
    experience: "",
  });

  const getInputClass = (field) =>
  `w-full bg-[#111] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border transition-all duration-200 focus:outline-none 
   ${
     hasSubmitted && fieldErrors[field]
       ? "border-red-500 focus:border-red-500"
       : "border-zinc-800 focus:border-white"
   }`;
  // Restore form draft from localStorage (saved before magic link)
  const restoreFormDraft = () => {
    const draftStr = localStorage.getItem("sayzo_task_draft");
    if (!draftStr) return false;

    try {
      const draft = JSON.parse(draftStr);

      // Check if draft is less than 24 hours old
      const isExpired = Date.now() - draft.timestamp > 24 * 60 * 60 * 1000;
      if (isExpired) {
        localStorage.removeItem("sayzo_task_draft");
        return false;
      }

      // Restore form data with backward compatibility for skills
      const restoredForm = { ...draft.form };
      // Handle old format where skills was a comma-separated string
      if (typeof restoredForm.skills === 'string') {
        restoredForm.skills = restoredForm.skills
          ? restoredForm.skills.split(',').map(s => s.trim()).filter(Boolean)
          : [];
      }
      setForm(restoredForm);
      setTaskType(draft.taskType);
      setEmail(draft.email);
      return true;
    } catch (e) {
      localStorage.removeItem("sayzo_task_draft");
      return false;
    }
  };

  // Helper function to check profile and set up form
  const checkUserProfileAndSetup = async (user) => {
    if (!user) return;

    try {
      const complete = await isProfileComplete(user.uid);
      if (complete) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        setIsVerified(true);
        setEmail(user.email || "");

        // Pre-fill form from profile
        setForm((prev) => ({
          ...prev,
          phone: profile?.phone || "",
          customerName:
            profile?.fullName ||
            localStorage.getItem("sayzo_user_name") ||
            "",
        }));
      } else {
        // Profile not complete - show profile modal
        setEmail(user.email || "");
        setShowProfileModal(true);
      }
    } catch (error) {
      console.error("Error checking profile:", error);
    }
  };

  // Use centralized auth context for initial state
  const { user: contextUser, userProfile: contextProfile, isLoading: authContextLoading } = useAuth();

  // Check if user is already authenticated when modal opens
  // Watches AuthContext for user changes (including magic link sign-in)
  // No separate onAuthStateChanged listener needed - AuthContext handles this
  useEffect(() => {
    if (!isOpen || authContextLoading) return;

    // Use auth context user if available
    if (contextUser) {
      checkUserProfileAndSetup(contextUser);

      // Restore draft if exists (e.g., after returning from magic link)
      restoreFormDraft();
    }
  }, [isOpen, contextUser, authContextLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budgetType") {
      setForm((p) => ({ ...p, budgetType: value, amount: "" }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Skill handlers
  const suggestedSkills = ['Web Development', 'Graphic Design', 'Writing', 'Data Entry', 'Video Editing', 'Photography'];

  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSendMagicLink = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setAuthLoading(true);

    try {
      // Store return URL for after auth
      localStorage.setItem("sayzo_auth_return", window.location.pathname);

      // Save form draft so it can be restored after magic link auth
      const draft = {
        form,
        taskType,
        email,
        timestamp: Date.now()
      };
      localStorage.setItem("sayzo_task_draft", JSON.stringify(draft));
      localStorage.setItem("sayzo_pending_task", "true");

      await sendMagicLink(email);
      setEmailSent(true);
    } catch (err) {
      console.error("Magic Link Error:", err);
      if (err.code === "auth/too-many-requests") {
        setError("Too many requests. Please try again later.");
      } else {
        setError(err.message || "Failed to send email. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleProfileComplete = async (profileData) => {
    setShowProfileModal(false);
    setUserProfile(profileData);
    setIsVerified(true);

    // Update form with profile data
    setForm((prev) => ({
      ...prev,
      phone: profileData.phone || "",
      customerName: profileData.fullName || "",
    }));
  };

const validate = () => {
  const errors = {};

  if (!isVerified) errors.auth = "Please sign in to continue";

  if (!form.customerName.trim())
    errors.customerName = "Your name is required";

  if (!form.taskName.trim())
    errors.taskName = "Task name is required";

  if (!form.phone.trim())
    errors.phone = "Phone number is required";

  if (!email.trim())
    errors.email = "Email is required";

  if (taskType === "offline" && !form.location.trim())
    errors.location = "Location is required";

  if (!form.description.trim())
    errors.description = "Description is required";

  if (!form.amount.trim())
    errors.amount = "Amount is required";
  else if (isNaN(form.amount))
    errors.amount = "Amount must be a number";

  if (!form.duration.trim())
    errors.duration = "Duration is required";

  if (form.skills.length === 0)
    errors.skills = "At least one skill is required";

  if (!form.experience)
    errors.experience = "Select experience level";

  setFieldErrors(errors);
  return Object.keys(errors).length === 0;
};

  

  const handlePreview = () => {
  setHasSubmitted(true);
  if (!validate()) return;
  setFormPhase("preview");
};

const submitTask = async () => {
  setHasSubmitted(true);
  if (!validate()) return;

    setError("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("Authentication lost. Please sign in again.");
      }

      const taskData = {
        taskType,
        taskName: form.taskName,
        customerName: form.customerName,
        phone: form.phone,
        email: currentUser.email,
        giverId: currentUser.uid,
        userId: currentUser.uid,
        location: taskType === "offline" ? form.location : "Online",
        description: form.description,
        budgetType: form.budgetType,
        amount: form.amount,
        duration: form.duration,
        skills: form.skills.join(", "),
        experience: form.experience,
      };

      // Save name to localStorage for future pre-fill
      localStorage.setItem("sayzo_user_name", form.customerName);

      await addTask(taskData);

      // Clear draft from localStorage after successful submission
      localStorage.removeItem("sayzo_task_draft");
      localStorage.removeItem("sayzo_pending_task");

      setSuccess(true);
    } catch (err) {
      console.error("Submit Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setError("");
    setEmailSent(false);
    setFormPhase("edit");

    // Don't reset auth state if user is still logged in
    const currentUser = auth.currentUser;

    // Reset form but keep name/phone if logged in
    if (currentUser && userProfile) {
      setForm({
        customerName: userProfile.fullName || "",
        phone: userProfile.phone || "",
        taskName: "",
        location: "",
        description: "",
        budgetType: "fixed",
        amount: "",
        duration: "",
        skills: [],
        experience: "",
      });
    } else {
      setIsVerified(false);
      setUserProfile(null);
      setEmail("");
      setForm({
        customerName: "",
        taskName: "",
        phone: "",
        location: "",
        description: "",
        budgetType: "fixed",
        amount: "",
        duration: "",
        skills: [],
        experience: "",
      });
    }
    setSkillInput("");

    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center p-4">
            <motion.div className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl">
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h2 className="text-xl text-white font-semibold">
                  {formPhase === "edit" && "Create a Task"}
                  {formPhase === "preview" && "Preview Task"}
                  {formPhase === "confirm" && "Confirm Task"}
                </h2>
                <button onClick={resetAndClose}>
                  <X className="text-zinc-400 hover:text-white" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-4 scrollbar-hide">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-white text-xl font-semibold">
                      Task Submitted for Approval
                    </h3>
                    <p className="text-zinc-400 mt-2">
                      Your task will be reviewed and approved shortly
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold"
                    >
                      Close
                    </button>
                  </div>
                ) : formPhase === "edit" ? (
                  <>
                    {/* Task Type Toggle */}
                    <div className="flex gap-2 mb-4">
                      {["online", "offline"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setTaskType(type)}
                          className={`flex-1 py-3 rounded-xl font-semibold ${
                            taskType === type
                              ? "bg-white text-black"
                              : "bg-zinc-900 text-white"
                          }`}
                        >
                          {type === "online" ? "Online Task" : "Offline Task"}
                        </button>
                      ))}
                    </div>

                    {/* Form Fields */}
                    <input
                      className={input}
                      placeholder="Your Name *"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                    />
                    <input
                      className={input}
                      placeholder="Task Name *"
                      name="taskName"
                      value={form.taskName}
                      onChange={handleChange}
                    />

                    {/* Email Auth Section */}
                    {!isVerified ? (
                      <>
                        {emailSent ? (
                          <div className="bg-zinc-900 rounded-xl p-4 my-2">
                            <div className="flex items-center gap-3 mb-2">
                              <Mail className="w-5 h-5 text-green-500" />
                              <span className="text-white font-medium">
                                Check Your Email
                              </span>
                            </div>
                            <p className="text-zinc-400 text-sm">
                              We sent a sign-in link to{" "}
                              <span className="text-white">{email}</span>
                            </p>
                            <button
                              onClick={() => setEmailSent(false)}
                              className="text-zinc-400 hover:text-white text-sm underline mt-2"
                            >
                              Use a different email
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                            <input
                              type="email"
                              className={`${input} pl-12 pr-28`}
                              placeholder="Your Email *"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleSendMagicLink()
                              }
                            />
                            <button
                              onClick={handleSendMagicLink}
                              disabled={!email || authLoading}
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-700 text-white text-sm px-3 py-2 rounded-lg disabled:opacity-50"
                            >
                              {authLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Sign In"
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* Verified - Show email and phone from profile */}
                        <div className="bg-zinc-900/50 rounded-xl px-4 py-3 my-2 flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-white text-sm">{email}</p>
                            <p className="text-zinc-500 text-xs">
                              Signed in
                            </p>
                          </div>
                        </div>

                        {/* Phone from profile (editable) */}
                        <input
                          className={input}
                          placeholder="Phone Number *"
                          name="phone"
                          inputMode="numeric"
                          value={form.phone}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (v.length <= 10) {
                              setForm((p) => ({ ...p, phone: v }));
                            }
                          }}
                        />
                      </>
                    )}

                    {taskType === "offline" && (
                      <input
                        className={input}
                        placeholder="Location *"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                      />
                    )}

                    <textarea
                      className={`${input} h-32`}
                      placeholder="Description *"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <select
                        name="budgetType"
                        className={input}
                        value={form.budgetType}
                        onChange={handleChange}
                      >
                        <option value="fixed">Fixed Price</option>
                        <option value="negotiable">Negotiable</option>
                      </select>
                      <input
                        type="number"
                        min="1"
                        className={input}
                        placeholder="Amount *"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <input
                      className={input}
                      placeholder="Duration (3 hours, 5 days, 1 month) *"
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                    />
                    {/* Skills Input */}
                    <div className="my-2">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="Add a skill *"
                          className="flex-1 bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Suggested Skills */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {suggestedSkills
                          .filter((skill) => !form.skills.includes(skill))
                          .map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, skills: [...prev.skills, skill] }))}
                              className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition"
                            >
                              + {skill}
                            </button>
                          ))}
                      </div>

                      {/* Selected Skills */}
                      {form.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.skills.map((skill) => (
                            <span
                              key={skill}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 text-green-500 text-sm"
                            >
                              {skill}
                              <button type="button" onClick={() => handleRemoveSkill(skill)}>
                                <X className="w-3.5 h-3.5 hover:text-white" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <select
                      name="experience"
                      className={input}
                      value={form.experience}
                      onChange={handleChange}
                    >
                      <option value="">Select Experience *</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>

                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}

                    <button
                      disabled={!isVerified}
                      onClick={handlePreview}
                      className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      Preview
                    </button>
                  </>
                ) : formPhase === "preview" ? (
                  <>
                    {/* Preview Phase - Read-only task details */}
                    <div className="space-y-3">
                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Task Type</p>
                        <p className="text-white">{taskType === "online" ? "Online Task" : "Offline Task"}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Task Name</p>
                        <p className="text-white">{form.taskName}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Your Name</p>
                        <p className="text-white">{form.customerName}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Email</p>
                        <p className="text-white">{email}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Phone Number</p>
                        <p className="text-white">{form.phone}</p>
                      </div>

                      {taskType === "offline" && (
                        <div className="bg-zinc-900 rounded-xl p-4">
                          <p className="text-zinc-400 text-sm">Location</p>
                          <p className="text-white">{form.location}</p>
                        </div>
                      )}

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Description</p>
                        <p className="text-white whitespace-pre-wrap">{form.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-zinc-900 rounded-xl p-4">
                          <p className="text-zinc-400 text-sm">Budget Type</p>
                          <p className="text-white">{form.budgetType === "fixed" ? "Fixed Price" : "Negotiable"}</p>
                        </div>
                        <div className="bg-zinc-900 rounded-xl p-4">
                          <p className="text-zinc-400 text-sm">Amount</p>
                          <p className="text-white">{form.amount}</p>
                        </div>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Duration</p>
                        <p className="text-white">{form.duration}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Skills Required</p>
                        <p className="text-white">{form.skills.join(", ")}</p>
                      </div>

                      <div className="bg-zinc-900 rounded-xl p-4">
                        <p className="text-zinc-400 text-sm">Experience Level</p>
                        <p className="text-white capitalize">{form.experience}</p>
                      </div>
                    </div>

                    {/* Preview Phase Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => setFormPhase("edit")}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-full font-semibold transition"
                      >
                        Make Changes
                      </button>
                      <button
                        onClick={() => setFormPhase("confirm")}
                        className="flex-1 bg-white text-black py-4 rounded-full font-semibold"
                      >
                        Are you sure?
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Confirm Phase */}
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <h3 className="text-white text-xl font-semibold">Ready to post your task?</h3>
                      <p className="text-zinc-400 mt-2">Click below to submit your task for approval</p>

                      {error && (
                        <p className="text-red-400 text-sm mt-4">{error}</p>
                      )}

                      <button
                        onClick={submitTask}
                        disabled={loading}
                        className="mt-6 w-full bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          "Post Task"
                        )}
                      </button>

                      <button
                        onClick={() => setFormPhase("preview")}
                        disabled={loading}
                        className="text-zinc-400 hover:text-white text-sm mt-4 underline disabled:opacity-50"
                      >
                        Go back
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => {}}
        onSuccess={handleProfileComplete}
        userEmail={email}
      />
    </>
  );
};

export default TaskModal;
