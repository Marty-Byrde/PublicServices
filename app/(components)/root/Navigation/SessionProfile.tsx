import * as React from "react"
import ClickableCategory, { ClickableCategoryProps } from "@/app/(components)/Shared/Menu/ExpandableMenu"
import Link from "next/link"
import { Session } from "next-auth"


export default function SessionProfile({ session }: { session: Session }) {
  if (!session) return (
    <Link href='/api/auth/signin' className='btn btn-active btn-ghost hidden sm:flex'>
      Login
    </Link>
  )

  const config: ClickableCategoryProps = {
    config: {
      action: 'click',
      containerPosition: "bottom",
      styles: {
        popoverBackgroundDark: 'dark:bg-neutral-700',
        popoverItemHoverBackgroundDark: 'dark:hover:bg-neutral-600',
      },
    },
    items: [
      {
        label: '',
        image: {
          src: session?.user?.image,
          imageWidth: 28,
          imageHeight: 28
        },
        children: [
          {
            label: "Signout",
            href: "/api/auth/signout"
          }
        ]
      }
    ]
  }

  return (
    <div>
      <ClickableCategory {...config}/>
    </div>
  )

}