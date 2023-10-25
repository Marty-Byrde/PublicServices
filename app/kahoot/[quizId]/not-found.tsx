export default function notFound() {
  return (
    <div className='absolute top-1/2 left-0 right-0 text-center flex flex-col md:flex-row gap-4 items-center justify-center'>
      <span className='dark:text-white font-semibold text-3xl'>503</span>
      <div className='w-0.5 bg-white h-8 hidden md:block'/>
      <span className='dark:text-white text-xl'>Requested Quiz Not Found...</span>
    </div>
  )
}