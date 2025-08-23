// /lib/connectDB.js
import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
    if (cached.conn) {
        console.log("Connection Already Exists ✅✅✅");
        return cached.conn
    };
    if (!cached.promise) {
        const uri = process.env.MONGODB_URI;
        cached.promise = mongoose.connect(uri, { dbName: "CognivusMCQAPP" });
    }
    cached.conn = await cached.promise;
    console.log("New Connection Created ✅✅✅");
    return cached.conn;
}
