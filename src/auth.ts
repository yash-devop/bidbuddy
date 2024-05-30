import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import { env } from "./env"
 import {database} from '@/db/database'
import { accounts, sessions, users, verificationTokens } from "./db/schema"
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:DrizzleAdapter(database,{
     accountsTable: accounts,
     usersTable: users,
     sessionsTable: sessions,
     verificationTokensTable: verificationTokens
  }),
  providers: [Google],
})  