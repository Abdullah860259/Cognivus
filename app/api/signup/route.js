import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import connectDB from "@/lib/connect";
import crypto from "crypto";
import { sendEmail } from "@/utility/sendEmail";
import Mcqdata from "@/lib/models/Mcqdata";
import fs from "fs"
import path from "path"

export async function POST(req) {
  const emailTemplatePath = path.join(process.cwd(), "utility", "verificationEmail.html")
  let emailHtml = fs.readFileSync(emailTemplatePath, "utf8")

  try {
    const { email, password, name } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.provider == "google") return NextResponse.json({ error: "User is registered by Google, not by email. Try clicking on Continue by Google" }, { status: 400 });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });


    const token = crypto.randomBytes(32).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
      token,
      isVerified: false
    });
    const McqDataDoc = await Mcqdata.create({ user: newUser._id });
    newUser.mcqData = McqDataDoc._id;
    await newUser.save();







    const verifyLink = `${process.env.NEXTAUTH_URL}/api/verify?token=${token}`;
    emailHtml = emailHtml.replace('{{name}}', name)
      .replace('{{verifyLink}}', verifyLink)
    try {
      await sendEmail(email, "Verify your email", emailHtml);
    } catch (error) {
      await User.deleteOne({ _id: newUser._id })
      await Mcqdata.deleteOne({ _id: McqDataDoc._id })
      throw error
    }




    return NextResponse.json({ message: "Check Your Email To verify" }, { status: 201 });
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  }
}
