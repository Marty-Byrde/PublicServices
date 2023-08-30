import SearchInput from "@/app/lectures/SearchInput"
import { Lecture } from "@/app/lectures/ClientPage"
import { v4 as uuidv4 } from 'uuid';

export default function Loading(){
  return (
    <div>
      <div className='mb-8'>
        <SearchInput lectures={null} setLectures={null}/>
      </div>

      <div className='flex flex-wrap gap-8 items-center justify-center mt-3'>
        {Array(30).fill(<Lecture key={uuidv4()} lecture={null} isPending={true} />)}
      </div>
    </div>
  )
}