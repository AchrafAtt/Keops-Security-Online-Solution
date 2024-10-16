import './globals.css'
import Nav from './components/Nav'
import{getServerSession} from "next-auth/next"
import {authOptions} from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate' 
import {Roboto, Lobster_Two} from 'next/font/google'


//define my font 

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-robot",
})
const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
})

export const metadata = {
  title: 'Store Project',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

//Fetch the user

  const session = await getServerSession(authOptions)
 
  return (
    <html lang="en" data-theme="light">
      <body className={`mx-4 lg:mx-48 ${roboto.variable} ${lobster.variable}`}>
        {/* ? =>usernul */}
        <Hydrate>
        <Nav  user={session?.user} expires={session?.expires as string} /> 
        {children}
        </Hydrate>
        </body>
    </html>
  )
}
