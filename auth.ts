import NextAuth from "next-auth"
import {PrismadbAdapter} from "@next-auth/prisma-adapter"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})