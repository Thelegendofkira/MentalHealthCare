import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['trainee', 'mentor'], required: true },
    // Trainee fields
    currentScore: { type: Number, default: null },
    activeIssues: { type: [String], default: [] },
    chatHistory: { type: Array, default: [] }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);