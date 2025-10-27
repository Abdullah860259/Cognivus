import connectDB from "@/lib/connect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";


export async function GET(req) {
    const url = new URL(req.url)
    const id = url.searchParams.get("userid")
    await connectDB();
    const user = await User.findById(id)
    return NextResponse.json(user);
}

export async function PATCH(req) {
    try {
        const data = await req.json();
        await connectDB();
        console.log(data);
        const user = await User.findByIdAndUpdate(data._id, { $set: data }, { new: true, runValidators: true });
        console.log(user);
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}