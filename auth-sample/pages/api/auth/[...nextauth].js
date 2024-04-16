import CredentialsProvider from "next-auth/providers/credentials";
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
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
 },

 pages: {
    signIn: "/auth/login",
 },
};

export default NextAuth(authOptions);
