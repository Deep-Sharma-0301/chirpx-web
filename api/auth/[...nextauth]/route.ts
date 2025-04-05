import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow emails ending with "@gmail.com"
      if (user?.email?.endsWith("@gmail.com")) {
        return true
      }
      return false
    },
  },
  pages: {
    signIn: "/signup", // optional: custom signup page
    error: "/auth/error", // optional: custom error page
  },
})

export { handler as GET, handler as POST }
