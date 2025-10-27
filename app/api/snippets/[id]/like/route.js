import connectDB from "@/lib/connect";
import LoadingSnippetSchema from "@/lib/models/LoadingSnippetSchema";

export async function POST(req, { params }) {
    await connectDB();
    const { userId } = await req.json();
    const { id } = await params;
    try {
        const snippet = await LoadingSnippetSchema.findByIdAndUpdate(
            id,
            { $addToSet: { likes: userId } }, // ✅ ensures no duplicates
            { new: true }
        );
        return Response.json(snippet);
    } catch (err) {
        return new Response("Failed to like snippet", { status: 500 });
    }
}
