import mongoose from "mongoose";

const MentorLogSchema = new mongoose.Schema({
    studentAlias: { type: String, required: true },
    category: { type: String, enum: ["Private/Parent", "Self", "Community", "Environment"], required: true },
    observation: { type: String, required: true },
    isUrgent: { type: Boolean, default: false },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.models.MentorLog || mongoose.model("MentorLog", MentorLogSchema);