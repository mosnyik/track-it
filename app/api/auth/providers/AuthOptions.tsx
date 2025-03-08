import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/prismaClient";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return { ...token, id: user.id };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

export default authOptions;
