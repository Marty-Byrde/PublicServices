import SearchInput from "@/app/lectures/SearchInput"
import { DisplayLecture } from "@/app/lectures/ClientPage"
import { v4 as uuidv4 } from 'uuid';

export default function Loading(){
  const dummys = []
  for (let i = 0; i < 30; i++) {
    dummys.push(<DisplayLecture key={uuidv4() + 'lecture-skeleton'} lecture={null} isPending={true} />)
  }

  return (
    <div>
      <div className='mb-8'>
        <SearchInput lectures={null} setLectures={null}/>
      </div>

      <div className='flex flex-wrap gap-8 items-center justify-center mt-3'>
        {dummys}
      </div>
    </div>
  )
}