import NextAuth, {Session, User } from 'next-auth';
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';

import { urls } from '@/utils/urls';

const {rootPath} = urls();

type JwtCallbackArgs = {
   token: JWT;
   user: User;
};

type SessionCallbackArgs = {
   token: JWT;
   session: Session;
};

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         
         credentials: {
           email: { label: "Username", type: "text" },
           password: { label: "Password", type: "password" }
         },

         async authorize(credentials, req) {
            
            const res = await fetch(`${rootPath}/api/login`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  username: credentials?.email,
                  password: credentials?.password
               })
            });

            const user = await res.json();        

            if (user) {
               return user
            } else {
               return null
            }
         }
       }),
       GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!
       })
   ],
   callbacks: {
      async jwt({token, user}: JwtCallbackArgs) { 
         if (user) {
            token.user = user;
         }
         return token;
      },

      async session({session, token}: SessionCallbackArgs) { 
         session.user = token.user; 
         
         return session;
       }, 
   },
   pages: {
      signIn: "/auth/signin"
   }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };