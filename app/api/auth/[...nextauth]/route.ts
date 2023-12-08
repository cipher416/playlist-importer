import prisma from "@/app/utils/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import jwt from "jsonwebtoken"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user!.id = user.id;    
      return Promise.resolve(session);
    }
  },
} satisfies AuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }