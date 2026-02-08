import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: String,
    email: { type: String, required: true, unique: true },
    // linkedIn: String,
    // location: String,
    // skills: [String],
    // occupation: [String],
    // hoursPerWeek: Number,
    // budget: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Waitlist ||
  mongoose.model("Waitlist", WaitlistSchema);
