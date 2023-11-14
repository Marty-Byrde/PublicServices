import KahootQuizSearch from "@/components/kahoot/KahootQuizSearch"
import useSessionData from "@/hooks/useSessionData"
import Forbidden from "@/components/Shared/Session/Forbidden"

export default async function KahootRootPage() {
  const { user, data } = await useSessionData()
  if(!user || !data?.kahootStore?.access) return Forbidden()

  return (
    <div className='py-4 flex flex-col items-center gap-8'>
      <h1 className='text-primary text-center tracking-wider text-2xl'>Find your Kahoot in a matter of seconds...</h1>
      <KahootQuizSearch />
    </div>
  )
}