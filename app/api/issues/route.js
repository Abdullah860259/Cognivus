import connectDB from "@/lib/connect";
import Issue from "@/lib/models/Issues";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userid");
    connectDB();
    const issues = await Issue.find({ createdBy: userId }).sort({createdAt:-1});
    return NextResponse.json(issues);
}

export async function POST(req) {
    connectDB();
    const { title, description, status, createdBy } = await req.json();
    try {
        const user = await User.findById(createdBy);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const newIssue = await Issue.create({ title, description, status, createdBy });
        user.issueRaised.push(newIssue._id);
        await user.save();
        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating issue:", error);
        return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
    }
}

export async function DELETE(req) {
    connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        }
        issue.status = "dissolved";
        await issue.save();
        return NextResponse.json({ message: "Issue dissolved successfully" });
    } catch (error) {
        console.error("Error dissolving issue:", error);
        return NextResponse.json({ error: "Failed to dissolve issue" }, { status: 500 });
    }
}

export const PATCH = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const { status } = await request.json();
        if (!id || !status) {
            return new Response(JSON.stringify({ error: "Missing id or status" }), { status: 400 });
        }
        await connectDB();
        const issue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
        if (!issue) {
            return new Response(JSON.stringify({ error: "Issue not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(issue), { status: 200 });
    } catch (error) {
        console.error("Error updating issue:", error);
        return new Response(JSON.stringify({ error: "Failed to update issue" }), { status: 500 });
    }
}