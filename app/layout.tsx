import '@/public/globals.css'
import React from "react"
import { useColorModeValue } from "@/app/(components)/root/ColorModeHandler"
import NavigationBar, { NavigationBarProps } from "@/app/(components)/root/Navigation/NavigationBar"
import AuthProvider from "@/app/(components)/root/Auth/AuthProvider"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import Pwa from "@/components/root/PWA/PWA"
import { Metadata } from "next"
import ToastBox from "@/components/Shared/Toast/ToastBox"
import KahootIcon from "@/components/Shared/Icons/KahootIcon"
import UniversityIcon from "@/components/Shared/Icons/UniversityIcon"

export const metadata: Metadata = {
  title: {
    default: "Public-Services",
    template: "%s"
  },
  description: "Work Smart not Hard - Public-Services",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://exposedcampus.duckdns.org",
  }
}
const navigationBarProps: NavigationBarProps = {
  title: "Dashboard",
  items: [
    {
      label: 'University',
      image: { src: UniversityIcon({className: 'w-5 h-5 fill-amber-700 dark:fill-amber-300'}) },
      children: [
        {
          label: 'Open Lectures',
          subLabel: "Lecutres of a selected semester",
          href: '/lectures'
        }
      ]
    },
    {
      label: "Kahoot",
      image: { src: KahootIcon() },
      href: "/kahoot"
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
        <meta name="theme-color" content="#212121"/>
        <link rel="apple-touch-icon" href="/PWA_Icon.jpeg"></link>
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

      <Pwa />
      <ToastBox />
      </body>
    </html>
  )
}
