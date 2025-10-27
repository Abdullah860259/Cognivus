import mongoose from "mongoose";

const MCQdataSchema = new mongoose.Schema({
    skipped: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "MCQ",
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true
    }
});

export default mongoose.models.McqsData || mongoose.model("McqsData", MCQdataSchema);
