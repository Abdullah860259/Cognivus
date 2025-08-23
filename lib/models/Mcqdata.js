import mongoose from "mongoose";

const McqSchema = new mongoose.Schema({
    attempts:{type:Number},
    
});

export default mongoose.models.McqSchema || mongoose.model("Mcqs", McqSchema);
