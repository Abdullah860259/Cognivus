import connectDB from "@/lib/connect";
import LoadingSnippetSchema from "@/lib/models/LoadingSnippetSchema";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AuthOptions from "../auth/[...nextauth]/AuthOptions";
import User from "@/lib/models/User";
import { Group } from "lucide-react";

export async function GET(req) {
    try {
        const session = await getServerSession(AuthOptions);
        console.log(session.user.id);
        const user = await User.findById(session.user.id);
        const ClassName = () => {
            if (user.class == 9 || user.class == 10) {
                return "Matric";
            } else {
                return "Inter"
            }
        }
        console.log(ClassName());
        await connectDB();
        const snippets = await LoadingSnippetSchema.find({ category: ClassName() });
        const newSnippets = snippets.filter((snippet) => {
            if (user.group == "Medical") {
                if (snippet.group !== "Math") {
                    return true
                } else {
                    return false
                }
            } else if (user.group == "Engineering") {
                if (snippet.group !== "Bio") {
                    return true
                } else {
                    return false
                }
            } else if (user.group == "Others") {
                if (snippet.group !== "Math") {
                    return true
                } else {
                    return false
                }
            }
        });
        return NextResponse.json(newSnippets);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
