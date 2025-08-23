import NextAuth from "next-auth";
import AuthOptions from "@/app/api/auth/[...nextauth]/AuthOptions";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST }