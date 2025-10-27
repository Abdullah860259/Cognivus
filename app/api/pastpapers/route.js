import connectDB from "@/lib/connect";
import MCQ from "@/lib/models/MCQ";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectDB();
        const mcqs = await MCQ.find({});
        const Papers = [];
        for (const mcq of mcqs) {
            if (mcq.reference.pastPaper !== true) continue;
            if (!Papers.some(p =>
                p.referenceName === mcq.reference.referenceName &&
                p.conductor === mcq.reference.conductor &&
                p.year === mcq.reference.year
            )) {
                Papers.push(mcq.reference);
            }
        }
        return NextResponse.json(Papers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}