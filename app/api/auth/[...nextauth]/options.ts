import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { cert } from "firebase-admin/app"


export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      name: "Github-Provider"
    })
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }),
  })
}