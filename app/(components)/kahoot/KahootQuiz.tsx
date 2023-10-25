import { Quiz } from "@/typings/kahoot/kahoot"
import QuizQuestion from "@/components/kahoot/QuizQuestion"
import { Text } from "@/components/ResponsiveTags/Text"

interface KahootAnswersProps {
  quiz: Quiz
  isPending: boolean
}

export default function KahootQuiz({ quiz: { questions, quizzId }, isPending }: KahootAnswersProps) {
  return (
    <div className='px-4 pb-8'>
      <div className='flex gap-4 justify-center my-4 mb-8 flex-col md:flex-row items-center'>
        <Text content='Answers for: ' isPending={isPending} textSize='text-2xl' darkColor='dark:text-gray-200' color='text-gray-700'/>
        <Text content={quizzId.toString()} isPending={isPending} textSize='text-2xl' darkColor='dark:text-secondary-content' color='text-primary' className='text-center'/>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  gap-10 '>
        {questions.map((question, i) => (
          <QuizQuestion key={`question-${i}-${question.question}`} question={question} isPending={isPending} index={(i + 1)}/>
        ))}
      </div>
    </div>
  )
}




