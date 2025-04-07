import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      return user?.email?.endsWith("@gmail.com") ?? false
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      if (account?.id_token) {
        token.idToken = account.id_token // 👈 Add this line
      }
      token.loginTime = Date.now()
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken, // 👈 Add this to the session
        loginTime: token.loginTime,
      }
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/signup",
  },
})

export { handler as GET, handler as POST }
