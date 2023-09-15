import type { NextAuthOptions, User } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/app/api/auth/[...nextauth]/mongoDBClientPromise"

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      name: "Github-Provider"
    })
  ],
  adapter: MongoDBAdapter(clientPromise,
    {
      databaseName: process.env.MONGODB_AUTH_DB,
      collections: {
        Users: "users",
        Accounts: "accounts",
        Sessions: "sessions",
        VerificationTokens: "verification_tokens",
      }
    }
  ),
}