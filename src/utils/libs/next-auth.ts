import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) {
          session.user.user_id = +token.sub;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;
        return {
          id: "1",
          email,
        };
      },
    }),
  ]
};