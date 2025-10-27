import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import connectDB from "@/lib/connect";
import Mcqdata from "@/lib/models/Mcqdata";

const AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials");
                }
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (!user || !user.password) throw new Error("No user found");
                if (!credentials.password || !user.password) throw new Error("Passwords not found");
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid Credentials");

                return { id: user._id, email: user.email, name: user.name };
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ user, account }) {
            try {
                await connectDB();
                if (account?.provider === "google") {
                    let existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        existingUser = await User.create({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: "google",
                        });
                    }
                    user.id = existingUser._id.toString(); // always set _id
                    let McqDataDoc = await Mcqdata.findOne({ user: existingUser._id });
                    if (!McqDataDoc) {
                        McqDataDoc = await Mcqdata.create({ user: existingUser._id });
                    }
                    existingUser.mcqData = McqDataDoc._id;
                    await existingUser.save();
                }
            } catch (error) {
                console.error(error);
                return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
};


export default AuthOptions;