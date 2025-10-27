import connectDB from "@/lib/connect";
import { NextResponse } from "next/server";
import Mcqsdata from "@/lib/models/Mcqdata";
import User from "@/lib/models/User";

export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const mcqid = url.searchParams.get("mcqid");
        const userid = url.searchParams.get("userid");
        const user = await User.findById(userid);
        let mcqdata = await Mcqsdata.findOne({ user: userid });
        if (!mcqdata) {
            mcqdata = await Mcqsdata.create({ user: userid, skipped: [] });
        }
        if (mcqdata.skipped.includes(mcqid)) {
            return NextResponse.json({ error: "MCQ already skipped" }, { status: 400 });
        }
        mcqdata.skipped.push(mcqid);
        await mcqdata.save();
        user.mcqData = mcqdata._id;
        await user.save();
        console.log(mcqdata);
        return NextResponse.json(mcqdata);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}