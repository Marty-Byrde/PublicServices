import { LectureDescription} from "campus-scraper"
import { Text } from "@/app/(components)/ResponsiveTags/Text"

/**
 * Displays a given Array of LectureDescription fields and their content.
 * @param description The description elements to display
 * @param isPending Whether the description is pending
 * @constructor
 */
export default function LectureDescription({ description, isPending }: { description: LectureDescription[], isPending?: boolean }) {
  return (
    <div className='flex flex-col gap-4'>
      {description?.map(desc => (
        <div key={Math.random().toString() + "description-field" + isPending} className='flex flex-col gap-2 md:flex-row md:gap-4 items-center bg-stone-300/60 dark:bg-neutral-700/30 rounded-2xl p-2 text-gray-700 dark:text-gray-200 break-inside-avoid-column overflow-auto'>
          <Text content={desc.field} className='md:w-[160px] md:break-words text-center font-semibold tracking-wider' skHeight='h-6' skeletonClassName='my-2' isPending={isPending}/>
          <Text content={desc.content} textSize='text-md' className='md:flex-1 whitespace-pre-wrap break-all' skLines={6} skWidth='w-full' skeletonClassName='my-2' isPending={isPending} containerFullWidth/>
        </div>
      ))}
    </div>
  )
}