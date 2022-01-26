import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
})