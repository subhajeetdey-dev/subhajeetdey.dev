import { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,            
        }),
    ],

    session: {
        strategy: 'database',
    },

    pages: {
        signIn: '/admin/login',
    },

    callbacks:{
        async session({ session, user }){
            if(session.user){
                session.user.id = user.id
            }
            return session
        },
    },

    secret: process.env.NEXTAUTH_SECRET
}
