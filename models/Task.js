import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    taskType: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    taskName: { type: String, required: true },
    location: { type: String },
    description: { type: String, required: true },
    budgetType: {
      type: String,
      enum: ["fixed", "negotiable"],
      required: true,
    },
    amount: { type: Number, required: true },
    duration: { type: String, required: true },
    skills: { type: String, required: true },
    experience: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model("Task", TaskSchema);
