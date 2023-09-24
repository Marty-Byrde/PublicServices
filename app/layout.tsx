import '@/public/globals.css'
import React from "react"
import { useColorModeValue } from "@/app/(components)/ColorModeHandler"
import NavigationBar, { NavigationBarProps } from "@/app/(components)/Navigation/NavigationBar"
import AAULogo from "@/public/AAU_Logo.png"
import AuthProvider from "@/app/(components)/Auth/AuthProvider"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"


const navigationBarProps: NavigationBarProps = {
  title: "Dashboard",
  items: [
    {
      label: 'University',
      image: AAULogo,
      children: [
        {
          label: 'Open Lectures',
          subLabel: "Lecutres of a selected semester",
          href: '/lectures'
        }
      ]
    }
  ],
  session: null
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const session = await getServerSession(options)
  const background = 'bg-stone-100/90 dark:bg-base-100'

  return (
    <html lang="en" data-theme={useColorModeValue("cmyk", "halloween")} className={`h-full ${background} ${useColorModeValue("", "dark")}`}>

      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/PWA_Icon.jpeg"></link>
        <title>Services</title>
      </head>

      <body className='h-full bg-gradient-to-r from-base-100 to-base-100'>

        <AuthProvider>
          <NavigationBar {...navigationBarProps} session={session} />

          <div className={`p-4 pb-6 mb-10 ${background}`}>
            {children}
          </div>


          <footer className="footer footer-center p-4 bg-gray-300 dark:bg-base-300 text-base-content fixed bottom-0 right-0 left-0">
            <div>
              <p className='hidden md:block'>Copyright © 2023 - All right reserved by @Marty-Byrde</p>
              <p className='block md:hidden'>Copyright © @Marty-Byrde</p>
            </div>
          </footer>

        </AuthProvider>

      </body>
    </html>
  )
}
