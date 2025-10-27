import connectDB from "@/lib/connect";
import MCQ from "@/lib/models/MCQ";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);

    const params = {
        referenceName: searchParams.get("referenceName"),
        conductor: searchParams.get("conductor"),
        year: Number(searchParams.get("year")),
        time: Number(searchParams.get("time")),
        pastPaper: searchParams.get("pastPaper") === "true",
    };
    console.log(params);
    try {
        await connectDB();
        const mcqs = await MCQ.find({
            "reference.referenceName": params.referenceName,
            "reference.conductor": params.conductor,
            "reference.year": params.year,
            "reference.time": params.time,
            "reference.pastPaper": params.pastPaper,
        });

        console.log(mcqs);
        return NextResponse.json(mcqs);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}