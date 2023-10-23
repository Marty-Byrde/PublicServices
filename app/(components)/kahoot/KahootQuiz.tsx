import { Quiz } from "@/typings/kahoot/kahoot"
import QuizQuestion from "@/components/kahoot/QuizQuestion"
import { Text } from "@/components/ResponsiveTags/Text"

interface KahootAnswersProps {
  quiz: Quiz
  isPending: boolean
}

export default async function KahootQuiz({ quiz: { questions, quizzId }, isPending }: KahootAnswersProps) {
  return (
    <div className='px-4 pb-8'>
      <div className='flex gap-4 justify-center my-4 mb-8'>
        <Text content='Answers for: ' isPending={isPending} textSize='text-2xl' darkColor='text-gray-200'/>
        <Text content={quizzId.toString()} isPending={isPending} textSize='text-2xl' darkColor='text-secondary-content'/>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  gap-10 '>
        {questions.map((question, i) => (
          <QuizQuestion key={`question-${i}-${question.question}`} question={question} isPending={isPending} index={(i + 1)}/>
        ))}
      </div>
    </div>
  )
}




