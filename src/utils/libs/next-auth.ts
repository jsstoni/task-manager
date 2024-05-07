import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

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
        const user = await prisma.users.findUnique({
          where: { email },
        });

        if (!user) throw new Error("No user found");

        const verifyPassword = await compare(password, user.password);

        if (!verifyPassword) throw new Error("Wrong password");

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ]
};
