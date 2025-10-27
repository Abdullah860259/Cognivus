import connectDB from "@/lib/connect";
import Mcqdata from "@/lib/models/Mcqdata";
import User from "@/lib/models/User";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const userid = url.searchParams.get("userid");
        await connectDB();
        const user = await User.findById(userid);
        if (user.mcqData) {
            return NextResponse.json(user.mcqData);
        }
        const mcqdata = await Mcqdata.create({ user: user._id });
        user.mcqData = mcqdata._id;
        await user.save();
        return NextResponse.json(mcqdata);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}