import '@/public/globals.css'
import React from "react"
import { useColorModeValue } from "@/app/(components)/ColorModeHandler"
import NavigationBar, { NavigationBarProps } from "@/app/(components)/Navigation/NavigationBar"
import AAULogo from "@/public/AAU_Logo.png"

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
  ]
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const background = 'bg-stone-100/90 dark:bg-base-100'


  return (
    <html lang="en" data-theme={useColorModeValue("cmyk", "halloween")} className={`h-full ${background} ${useColorModeValue("", "dark")}`}>

      <body className='h-full bg-gradient-to-r from-base-100 to-base-100'>

        <NavigationBar {...navigationBarProps} />

        <div className={`p-4 pb-6 mb-10 ${background}`}>
          {children}
        </div>


        <footer className="footer footer-center p-4 bg-gray-300 dark:bg-base-300 text-base-content fixed bottom-0 right-0 left-0">
          <div>
            <p className='hidden md:block'>Copyright © 2023 - All right reserved by @Marty-Byrde</p>
            <p className='block md:hidden'>Copyright © @Marty-Byrde</p>
          </div>
        </footer>


      </body>
    </html>
  )
}
