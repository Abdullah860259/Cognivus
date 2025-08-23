import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import connectDB from "@/lib/connect";
import crypto from "crypto";
import { sendEmail } from "@/utility/sendEmail";

export async function POST(req) {
  try {
    const { email, password,name } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });


    if (existingUser && existingUser.provider == "google") return NextResponse.json({ error: "User is registered by Google, not by email. Try clicking on Continue by Google" }, { status: 400 });

    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const newUser = new User({ email,name , password: hashedPassword, token });
    await newUser.save();

    const verifyLink = `${process.env.NEXTAUTH_URL}/api/verify?token=${token}`;
    await sendEmail(email, "Verify your email", `Click here: <a href="${verifyLink}">Verify Email</a>`);

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
