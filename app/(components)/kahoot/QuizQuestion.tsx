import { QuizQuestion } from "@/typings/kahoot/kahoot"
import { Text } from "@/components/ResponsiveTags/Text"
import QuizAnswer from "@/components/kahoot/QuizAnswer"

interface QuizQuestionProps {
  question: QuizQuestion
  isPending: boolean
  index: number
}

export default function QuizQuestion({ question: { question, answers }, isPending, index }: QuizQuestionProps) {
  return (
    <div className='relative px-6 py-4 ring-2 ring-neutral-500 dark:ring-neutral-500 rounded-2xl dark:bg-neutral-700/40 flex flex-col gap-6 break-inside-avoid-column'>
      <div className='absolute top-2.5 left-2.5 px-3 py-1 pb-1.5 bg-orange-800 rounded-full text-gray-100 dark:text-gray-300 font-bold text-xl'>{index}</div>
      <Text content={question} isPending={isPending} textSize='text-lg' className='ml-8 font-bold tracking-wide' darkColor='dark:text-gray-300' color='text-gray-600'/>

      <ul className='flex flex-col gap-6'>
        {answers.map((answer, i) => (
          <QuizAnswer key={`${answer.text}-${i}`} answer={answer} index={i} isPending={isPending}/>
        ))}
      </ul>
    </div>
  )
}
