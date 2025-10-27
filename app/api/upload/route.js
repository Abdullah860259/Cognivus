import { v2 as cloudinary } from "cloudinary";
import User from "@/lib/models/User";
import connectDB from "@/lib/connect";
import { getServerSession } from "next-auth";
import AuthOptions from "../auth/[...nextauth]/AuthOptions";
// 🔹 Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
    try {
        const session = await getServerSession(AuthOptions);
        const userId = session.user.id;
        console.log(userId, "userId");
        await connectDB();
        const formData = await req.formData();
        const file = formData.get("file");

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "profile_pics" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        // Save URL to MongoDB
        console.log(uploadResult.secure_url, "uploadResult", "😢😢😢😢");
        const user = await User.findByIdAndUpdate(
            userId,
            { image: uploadResult.secure_url },
            { new: true }
        );

        console.log(user);
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), {
                status: 404,
            });
        }
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
