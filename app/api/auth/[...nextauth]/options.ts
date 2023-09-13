import type { NextAuthOptions, User } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      name: "Github-Provider"
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "Username" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {
    //     return new Promise((resolve, reject) => resolve({ id:"", username: "", password: ""} as User))
    //   }
    // })

  ],
}