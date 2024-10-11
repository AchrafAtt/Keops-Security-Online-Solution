//specific the provider auth google  u can add github or others providers  

import NextAuth ,{NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import {prisma} from "@/util/prisma"




export const   authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    //add another provider 


  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2022-11-15",
      })
      // let s create strip customer
      
      const costumer = await stripe.customers.create({
        email: user.email || undefined,
        name: user.name  || undefined,

      })
      //also update prisma ]user with the stripeCustomerId 
      await prisma.user.update({
        where: {id: user.id},
        data: {stripeCustomerId :costumer.id },
      })
    
   },
  },
   callbacks:{
    async session({session,token,user}){
      session.user =user
      return session
    },
  },
  
  
};

export default NextAuth(authOptions)