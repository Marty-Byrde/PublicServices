import Link from "next/link"
import LockIcon from "@/components/Shared/Icons/LockIcon"

export default function NotAllowed() {
  return (
    <div className='h-[80vh] flex flex-col gap-8 items-center justify-center'>
      <LockIcon />
      <div className='text-center flex flex-col md:flex-row gap-4 items-center justify-center'>
        <span className='dark:text-white text-black font-semibold text-3xl'>403</span>
        <div className='w-0.5 bg-black dark:bg-white h-8 hidden md:block'/>
        <span className='dark:text-white text-black text-xl'>Not Allowed</span>
      </div>
      <Link href='/api/auth/signin'>
        <button className='btn btn-active dark:bg-neutral-800 ring-2 hover:ring-[3px] ring-neutral-700 hover:scale-105 hover:dark:bg-neutral-700/40'>Sign in</button>
      </Link>
    </div>
  )
}