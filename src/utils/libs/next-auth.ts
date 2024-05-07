import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: []
}