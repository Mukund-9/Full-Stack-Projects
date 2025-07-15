import NextAuth from 'next-auth'
import mongoose from 'mongoose';
import User from '@/modals/User';
import connectDb from '@/db/connectDb';
import GitHubProvider from 'next-auth/providers/github'
export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks:{

        async signIn({ user, account, profile }) {
            if (account.provider === "github") {
                await connectDb();
                
                const existingUser = await User.findOne({ email: user.email });
                
                if (!existingUser) {
                    await User.create({
                        email: user.email,
                        username: profile.login, // safer than user.username
                    });
                    
                    console.log("GitHub profile:", profile);
                    console.log("User email:", user.email);
                }
            }
            return true;
        },
        
        async session({ session }) {
            await connectDb();
            
            if (session?.user?.email) {
                const dbUser = await User.findOne({ email: session.user.email });
                if (dbUser) {
                    session.user.name = dbUser.username;
                }
            }
            
            return session;
        },
    }
})

export { authoptions as GET, authoptions as POST }