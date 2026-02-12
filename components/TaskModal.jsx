"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TASK_SHEET_URL =
  "https://script.google.com/macros/s/AKfycby70OpETCyZBI-lZt5LGzL9o1uPp5EHbJrx91uCeO9YdOgJT-kFe_zaaXW_xH4XwIbK6A/exec";

const TaskModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [taskType, setTaskType] = useState("online");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    taskName: "",
    phone: "",
    location: "",
    description: "",
    budgetType: "fixed",
    amount: "",
    duration: "",
    skills: "",
    experience: "",
  });

  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none";

  const amountPlaceholder =
    form.budgetType === "fixed" ? "300, 400" : "300 - 400";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "budgetType") {
      setForm((p) => ({ ...p, budgetType: value, amount: "" }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    if (!form.taskName.trim()) return "Task name is required";
    if (form.phone.length !== 10) return "Enter valid 10 digit phone";
    if (taskType === "offline" && !form.location.trim())
      return "Location is required for offline tasks";
    if (!form.description.trim()) return "Description is required";
    if (!form.amount.trim()) return "Amount is required";
    if (!form.duration.trim()) return "Duration is required";
    if (!form.skills.trim()) return "Skills are required";
    if (!form.experience) return "Select experience level";

    return "";
  };

  const submitTask = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await fetch(TASK_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType,
          taskName: form.taskName,
          phone: form.phone,
          location: taskType === "offline" ? form.location : "",
          description: form.description,
          budgetType: form.budgetType,
          amount: form.amount,
          duration: form.duration,
          skills: form.skills,
          experience: form.experience,
        }),
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setSuccess(false);
    setError("");
    setForm({
      taskName: "",
      phone: "",
      location: "",
      description: "",
      budgetType: "fixed",
      amount: "",
      duration: "",
      skills: "",
      experience: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-black border border-zinc-800 rounded-2xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
              <h2 className="text-xl text-white font-semibold">
                Create a Task
              </h2>
              <button onClick={resetAndClose}>
                <X className="text-zinc-400 hover:text-white" />
              </button>
            </div>

            {/* BODY */}
            <div className="max-h-[75vh] overflow-y-auto px-6 py-4 scrollbar-hide">
              {success ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="text-white text-xl font-semibold">
                    Task Posted Successfully 🎉
                  </h3>
                  <p className="text-zinc-400 mt-2">
                    We'll get back to you shortly.
                  </p>

                  <button
                    onClick={resetAndClose}
                    className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {/* Task type */}
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
                        {type === "online"
                          ? "Online Task"
                          : "Offline Task"}
                      </button>
                    ))}
                  </div>

                  <input
                    className={input}
                    placeholder="Task Name *"
                    name="taskName"
                    value={form.taskName}
                    onChange={handleChange}
                  />

                  <input
                    className={input}
                    placeholder="Phone Number *"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      if (v.length <= 10) {
                        setForm((p) => ({ ...p, phone: v }));
                      }
                    }}
                  />

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
                      <option value="negotiable">
                        Open to Negotiate
                      </option>
                    </select>

                    <input
                      className={input}
                      placeholder={amountPlaceholder + " *"}
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                    />
                  </div>

                  <input
                    className={input}
                    placeholder="Duration *"
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                  />

                  <input
                    className={input}
                    placeholder="Skills *"
                    name="skills"
                    value={form.skills}
                    onChange={handleChange}
                  />

                  <select
                    name="experience"
                    className={input}
                    value={form.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select Experience *</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">
                      Intermediate
                    </option>
                    <option value="expert">Expert</option>
                  </select>

                  {/* ERROR */}
                  {error && (
                    <p className="text-red-400 text-sm mt-2">{error}</p>
                  )}

                  <button
                    disabled={loading}
                    onClick={submitTask}
                    className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold disabled:opacity-50"
                  >
                    {loading ? "Posting..." : "Post Task"}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
