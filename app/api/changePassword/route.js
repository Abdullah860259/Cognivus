import connectDB from "@/lib/connect";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import AuthOptions from "../auth/[...nextauth]/AuthOptions";


export async function POST(req) {
    try {
        const session = await getServerSession(AuthOptions);
        const data = await req.json();
        await connectDB();
        const user = await User.findById(session.user.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isValid = await bcrypt.compare(data.currentPassword, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid old password" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}