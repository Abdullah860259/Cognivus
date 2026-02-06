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
            // this authorize fucntion will always run when user at page /login enthers its email and password to login , in other sense it is actually login function ensuring that the user is valid or not
            // Things which are being retured in this function will go in jwt function
            // this function will only run if the user logs in with credential
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials");
                }
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                console.log(user);
                // here we are using throw new error to immediately stop the execution when something wrong happens 
                if (!user) throw new Error("No user found ");
                if (!user.password) throw new Error("This email is registered as google service provider")
                if (!credentials.password || !user.password) throw new Error("Passwords not found");
                if (!user.isVerified) throw new Error("You first have to verify your email in inbox")
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) throw new Error("Invalid Credentials");
                return { id: user._id, email: user.email, name: user.name };
                // all the things which are being returned here will go to the jwt , as input of user, mean in jwt i will recieve 2 inputs 1 is token, and the other is user, so in jwt token i can access user.id, which i have sent from this authorize function
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        error: '/auth/error', // NextAuth will redirect here on errors
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        // this function will run everytime when user logs in  wether with creadetials or with google
        // the arguements in signIn function are the credential function return (eg in case of authorize it returns "user", which will be saved in user, and for google it will also obviously return some data)
        // here the argument account is provided by next auth it self 
        async signIn({ user, account }) {
            try {
                await connectDB();
                if (account?.provider === "google") {
                    let existingUser = await User.findOne({ email: user.email });
                    if (existingUser?.provider === "credentials") {
                        // user will redirect to this page
                        return `/auth/error?message=${encodeURIComponent("This gmail is registered through another method So, try to login using other mehtod , credential method Or change your chrome profile. switch to that profile which you want to login")}`
                    }
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
        // here user is what returned from the authorize function, i can access user._id which is being returned from authorize function, this jwt token can be acessed at backend we can access via getToken({ req }) from next-auth/jwt.
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        // now the things which are retuned from jwt will be accessed here in session , this session could be accessed at the frontend with the function, useSession() and getsession
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
        // anything returned from this will be available at frontend
    },
};


export default AuthOptions;