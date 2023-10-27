import KahootQuizSearch from "@/components/kahoot/KahootQuizSearch"

export default async function KahootRootPage() {
  return (
    <div className='py-4 flex flex-col items-center gap-8'>
      <h1 className='text-primary text-center tracking-wider text-2xl'>Get your Answers in a matter of seconds...</h1>
      <KahootQuizSearch />
    </div>
  )
}