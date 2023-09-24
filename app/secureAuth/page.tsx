import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function SecureAuth() {
  console.time("SecureAuth")
  const session = await getServerSession(options)
  console.timeEnd("SecureAuth")
  const { name, email } = session?.user || {}

  // if (!session) redirect("/api/auth/signin?callbackUrl=/selection")


  return (
    <div className='flex mx-auto gap-2'>
      <div className='text-black dark:text-white text-2xl'>Welcome</div>
      <div className='text-primary text-2xl'>{name ?? 'your-name'}</div>
      <div className='text-secondary text-2xl'>({email ?? 'your-email'})</div>
    </div>
  )
}