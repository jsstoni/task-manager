import { compare } from "bcrypt";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "../prisma";

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
  ],
};

export async function getSession() {
  const session = await getServerSession(options);

  if (!session || !session.hasOwnProperty("user") || !session.user) {
    throw new Error("session does not exist");
  }

  return session;
}
