

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
    phone: "",
    taskName: "",
    description: "",
    category: "",
    projectType: "",
    projectLength: "",
    budgetType: "fixed",
    amount: "",
    skills: [],
    experience: "",
    location: "",
  });
  const inputClass =
    "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:ring-emerald-700 ";

  const getInputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none transition
  ${hasSubmitted && fieldErrors[field]
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300 focus:ring-green-500"
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
    const skill = skillInput.trim().toLowerCase();

    if (skill && !form.skills.includes(skill)) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));

      setSkillInput("");
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
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

    // if (!form.phone.trim())
    //   errors.phone = "Phone number is required";

    // email importing from data set to no need to validate
    // if (!email.trim())
    //   errors.email = "Email is required";

    if (!form.category)
      errors.category = "Please select a category";

    if (!form.projectType)
      errors.projectType = "Select project type";

    if (taskType === "offline" && !form.location.trim())
      errors.location = "Location is required";

    if (!form.description.trim())
      errors.description = "Description is required";

    if (!form.amount.trim())
      errors.amount = "Amount is required";
    else if (isNaN(form.amount))
      errors.amount = "Amount must be a number";

    if (!form.projectLength.trim())
      errors.projectLength = "Project length is required";

    if (form.skills.length === 0)
      errors.skills = "At least one skill is required";

    if (!form.experience)
      errors.experience = "Select experience level";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const handlePreview = () => {
    setHasSubmitted(true);

    const valid = validate();
    console.log("Preview validation:", valid, fieldErrors);

    if (!valid) return;

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
  category: form.category,
  projectType: form.projectType,
  projectLength: form.projectLength,
  budgetType: form.budgetType,
  amount: Number(form.amount),
  skills: form.skills,
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
        phone: "",
        taskName: "",
        description: "",
        category: "",
        projectType: "",
        projectLength: "",
        budgetType: "fixed",
        amount: "",
        skills: [],
        experience: "",
        location: "",
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
            <motion.div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-gray-900">
                  {formPhase === "edit" && "Create a Task"}
                  {formPhase === "preview" && "Preview Task"}
                  {formPhase === "confirm" && "Confirm Task"}
                </h2>
                <button onClick={resetAndClose}>
                  <X className="text-gray-400 hover:text-gray-900" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-y-auto px-6 py-4 scrollbar-hide">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-gray-900 text-xl font-semibold">
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
                  <div className="space-y-6">

                    {/* TASK TYPE */}
                    <div className="grid grid-cols-2 gap-3">
                      {["online", "offline"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setTaskType(type)}
                          className={`py-3 rounded-lg text-semibold font-medium transition border
        ${taskType === type
                              ? "bg-emerald-700 text-white "
                              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                            }`}
                        >
                          {type === "online" ? "Online Task" : "Offline Task"}
                        </button>
                      ))}
                    </div>

                    {/* BASIC DETAILS */}
                    <div className="space-y-4">

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Task Name
                        </label>
                        <input
                          className={getInputClass("taskName")}
                          placeholder="e.g., Website Development"
                          name="taskName"
                          value={form.taskName}
                          onChange={handleChange}
                        />
                      </div>

                    </div>

                    {/* LOCATION */}
                    {taskType === "offline" && (
                      <input
                        className={getInputClass("location")}
                        placeholder="Location *"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                      />
                    )}

                    {/* CATEGORY */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        className={getInputClass("category")}
                        value={form.category}
                        onChange={handleChange}
                      >
                        <option value="">Select category</option>

                        <option value="coaching">Coaching, Teaching & Advisory Skills</option>
                        <option value="strategy">Strategy & Consulting Skills</option>
                        <option value="data">Data & Analytics Skills</option>
                        <option value="design">Design & Creative Skills</option>
                        <option value="development">Development & Engineering Skills</option>
                        <option value="marketing">Marketing Execution Skills</option>
                        <option value="media">Video, Audio & Media Skills</option>
                        <option value="writing">Writing & Documentation Skills</option>
                        <option value="photography">Photography Skills</option>
                        <option value="operations">Operations, Execution & Management Skills</option>
                        <option value="legal">Legal, Finance & Compliance Skills</option>
                        <option value="events">Events, Architecture & Industry Skills</option>
                      </select>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        className={`${getInputClass("description")} resize-none overflow-hidden`}
                        placeholder="Describe your task..."
                        name="description"
                        value={form.description || ""}
                        onChange={handleChange}
                        onInput={(e) => {
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                      />
                    </div>

                    {/* BUDGET */}
                    <div className="grid grid-cols-2 gap-4">

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Budget Type</label>
                        <select
                          name="budgetType"
                          className={inputClass}
                          value={form.budgetType}
                          onChange={handleChange}
                        >
                          <option value="fixed">Fixed</option>
                          <option value="negotiable">Negotiable</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Amount</label>
                        <input
                          type="number"
                          className={getInputClass("amount")}
                          placeholder="500"
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                        />
                      </div>

                    </div>

                    {/* PROJECT DETAILS */}
                    <div className="grid grid-cols-2 gap-4">

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Project Type</label>
                        <select
                          name="projectType"
                          className={getInputClass("projectType")}
                          value={form.projectType}
                          onChange={handleChange}
                        >
                          <option value="">Select type</option>
                          <option value="one-time">One Time</option>
                          <option value="ongoing">Ongoing</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">
                          Project Length
                        </label>

                        <input
                          type="text"
                          name="projectLength"
                          list="project-length-options"
                          className={getInputClass("projectLength")}
                          value={form.projectLength || ""}
                          onChange={handleChange}
                          placeholder="Select or type duration"
                        />

                        <datalist id="project-length-options">
                          <option value="Less than 1 day" />
                          <option value="Less than 1 week" />
                          <option value="Less than 1 month" />
                          <option value="1–3 months" />
                        </datalist>
                      </div>

                    </div>

                    {/* SKILLS */}
                    <div className="space-y-2">

                      <label className="text-sm font-medium text-gray-700">
                        Skills Required
                      </label>

                      {/* Input + Add Button */}
                      <div className="flex gap-2">
                        <input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="React, Node.js..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>


                      </div>

                      {/* Selected Skills */}
                      {form.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {form.skills.map((skill) => (
                            <span
                              key={skill}
                              className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-emerald-700 rounded-full"
                            >
                              {skill}

                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                    </div>

                    {/* EXPERIENCE */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Experience Level
                      </label>

                      <select
                        name="experience"
                        className={getInputClass("experience")}
                        value={form.experience}
                        onChange={handleChange}
                      >
                        <option value="">Entry Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>

                    {/* BUTTON */}
                    <button
                      disabled={!isVerified}
                      onClick={handlePreview}
                      className="w-full bg-emerald-700 py-3 text-white rounded-lg font-medium transition disabled:opacity-50"
                    >
                      Preview Task
                    </button>

                  </div>
                ) : formPhase === "preview" ? (
                  <>
                    {/* Preview */}
                    <div className="space-y-6">

                      {/* Task Header */}
                      <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Task</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {form.taskName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {taskType === "online" ? "Online Task" : "Offline Task"}
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-xs text-gray-500">Your Name</p>
                          <p className="text-gray-900 font-medium">{form.customerName}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-gray-900">{email}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-gray-900">{form.phone}</p>
                        </div>

                        {taskType === "offline" && (
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-gray-900">{form.location}</p>
                          </div>
                        )}

                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Description</p>
                        <p className="whitespace-pre-wrap text-gray-900">
                          {form.description}
                        </p>
                      </div>

                      {/* Category + Project Info */}
                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-gray-900">{form.category}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Project Type</p>
                          <p className="text-gray-900">{form.projectType}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Project Length</p>
                          <p className="text-gray-900">{form.projectLength}</p>
                        </div>

                      </div>

                      {/* Budget */}
                      <div className="grid grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">

                        <div>
                          <p className="text-xs text-gray-500">Budget Type</p>
                          <p className="text-gray-900">
                            {form.budgetType === "fixed" ? "Fixed Price" : "Negotiable"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Amount</p>
                          <p className="text-lg font-semibold text-green-600">
                            ₹{form.amount}
                          </p>
                        </div>

                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Skills Required</p>

                        <div className="flex flex-wrap gap-2">
                          {form.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience */}
                      <div>
                        <p className="text-xs text-gray-500">Experience Level</p>
                        <p className="text-gray-900 capitalize">
                          {form.experience}
                        </p>
                      </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-8">

                      <button
                        onClick={() => setFormPhase("edit")}
                        className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-800 py-3 rounded-lg font-medium transition"
                      >
                        Make Changes
                      </button>

                      <button
                        onClick={() => setFormPhase("confirm")}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
                      >
                        Confirm Task
                      </button>

                    </div>
                  </>
                ) : (
                  <>
                    {/* Confirm Phase */}
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <h3 className="text-gray-900 text-xl font-semibold">Ready to post your task?</h3>
                      <p className="text-zinc-500 mt-2">Click below to submit your task for approval</p>

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
        onClose={() => setShowProfileModal(false)}
        onSuccess={handleProfileComplete}
        userEmail={email}
      />
    </>
  );
};

export default TaskModal;