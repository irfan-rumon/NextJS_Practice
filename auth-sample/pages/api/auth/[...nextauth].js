import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, useSession, signOut } from "next-auth/react";
import NextAuth from "next-auth";

export const authOptions = { 
 providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const res = await fetch("http://localhost:4444/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();

        console.log({ user });

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
 ],

 callbacks: {
    async jwt({ token, user }) {
      // Merge the user object directly into the token
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      // Merge the token (which now includes the user object) into the session
      return { ...session, ...token };
    },
 },

 pages: {
    signIn: "/auth/login",
    signOut: '/auth/logout',
 },
};

export default NextAuth(authOptions);
