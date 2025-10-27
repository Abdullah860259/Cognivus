import mongoose from "mongoose";

const LoadingSnippetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ["Inter", "Matric"],
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    group: {
        type: String,
        enum: ["Bio", "Math", "Physics", "Chemistry"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.LoadingSnippet ||
    mongoose.model("LoadingSnippet", LoadingSnippetSchema);
