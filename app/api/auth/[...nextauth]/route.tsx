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
      return user?.email?.endsWith("@gmail.com") ?? false
    },
    async jwt({ token, account }) {
        // Only assign once on sign in
        if (account?.access_token) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token }) {
  return {
    ...session,
    accessToken: token.accessToken,
  }
}
  },
  pages: {
    error: "/auth/error",
    signIn: "/signup", // optional: custom signup page
  },
})

export { handler as GET, handler as POST }
