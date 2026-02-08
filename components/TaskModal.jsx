"use client";


import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const TASK_SHEET_URL = "https://script.google.com/macros/s/AKfycbwH9_Cr7-Nxof5IMI50-CBmHuTEVNsj9DuqD_P-4SStHXKn_RAE8GRIPp3rLYh7l9ry/exec";

const TaskModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [taskType, setTaskType] = useState("online");

  const [form, setForm] = useState({
    taskName: "",
    location: "",
    description: "",
    budgetType: "fixed",
    amount: "",
    duration: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === "budgetType") {
      setForm((p) => ({ ...p, budgetType: value, amount: "" }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  const submitTask = async () => {
    setLoading(true);
  
    try {
      // ===============================
      // ❌ SUPABASE (KEEP COMMENTED)
      // ===============================
      /*
      await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, taskType }),
      });
      */
  
      // ===============================
      // ✅ GOOGLE SHEET (TASKS)
      // ===============================
      await fetch(TASK_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // 🔥 REQUIRED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskType,
          taskName: form.taskName,
          location: taskType === "offline" ? form.location : "",
          description: form.description,
          budgetType: form.budgetType,
          amount: form.amount,
          duration: form.duration,
          skills: form.skills,
          experience: form.experience,
        }),
      });
  
      // ⚠️ no response reading here
      alert("Task Posted Successfully. We'll get back to you in 24hrs");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };
  


  const input =
    "w-full bg-[#18181B] text-white placeholder:text-zinc-500 px-4 py-4 my-2 rounded-xl border border-zinc-800 focus:outline-none";

  const amountPlaceholder =
    form.budgetType === "fixed" ? "300, 400" : "300 - 400";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-999 bg-black/80 backdrop-blur flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="
              w-full max-w-md bg-black border border-zinc-800 rounded-2xl p-6
              max-h-[90vh] overflow-y-auto scrollbar-hide
            "
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
        
            <div className="flex justify-end mb-4">
              <button onClick={onClose}>
                <X className="text-zinc-500 hover:text-white" />
              </button>
            </div>

            <h2 className="text-2xl text-white mb-5">Create a Task</h2>

           
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

            <input
              className={input}
              placeholder="Task Name"
              name="taskName"
              onChange={handleChange}
            />

            {taskType === "offline" && (
              <input
                className={input}
                placeholder="Location / Address"
                name="location"
                onChange={handleChange}
              />
            )}

            <textarea
              className={`${input} h-32`}
              placeholder="Description"
              name="description"
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
                <option value="negotiable">Open to Negotiate</option>
              </select>

              <input
                className={input}
                placeholder={amountPlaceholder}
                name="amount"
                onChange={handleChange}
              />
            </div>

            <input
              className={input}
              placeholder="Duration (eg. Less than 1 week)"
              name="duration"
              onChange={handleChange}
            />

            <input
              className={input}
              placeholder="Skills (eg. React, Node)"
              name="skills"
              onChange={handleChange}
            />

            <select
              name="experience"
              className={input}
              onChange={handleChange}
            >
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>

            <button
              disabled={loading}
              onClick={submitTask}
              className="w-full mt-4 bg-white text-black py-4 rounded-full font-semibold"
            >
              {loading ? "Posting..." : "Post Task"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
