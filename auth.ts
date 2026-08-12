import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "@/lib/db"
import { getUserById } from "./modules/auth/actions"
import authConfig from "./auth.config"
//A callback is simply a function that you give to another 
// function/library, so it can call your function later 
// when something happens.
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  callbacks:{
    async signIn({ user, account}) {
      if(!user || !account) { return  false }

      const existingUser = await db.user.findUnique({
        where:{
          email:user.email!,
        }
      })
      
      //if no user then create a user
      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image: user.image,
           
            accounts: {
              // @ts-ignore
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            },
          },
        });

        if (!newUser) return false; // Return false if user creation fails
      }
      else{
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              // @ts-ignore
              session_state: account.session_state,
            },
          });
        }
      }

      return true;

  },
  async jwt({ token }) {

    if(!token.sub){
      return token // if no token.sub, return the token as is
    }

    const existingUser = await getUserById(token.sub)
    if(!existingUser) { return token } // if no existing user, return the token as is

    token.name = existingUser.name
    token.email = existingUser.email
    token.role = existingUser.role

    return token;


},
async session({token, session}) {
  if(token.sub && session.user){
    session.user.id = token.sub


}

if(token.sub && session.user){

  // it may be sib or sub
  session.user.role = token.role
}
return session
}
  },

  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})