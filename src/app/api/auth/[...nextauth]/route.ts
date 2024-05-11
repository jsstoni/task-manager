import NextAuth from "next-auth";
import { options } from "@/utils/libs/auth/options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
