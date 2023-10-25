import { QuizAnswer } from "@/typings/kahoot/kahoot"
import quiz from "@/public/Icons/Kahoot/quiz.png"
import Icon1 from "@/public/Icons/Kahoot/Icon1.png"
import Icon2 from "@/public/Icons/Kahoot/Icon2.png"
import Icon3 from "@/public/Icons/Kahoot/Icon3.png"
import Icon4 from "@/public/Icons/Kahoot/Icon4.png"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
import { Text } from "@/components/ResponsiveTags/Text"

interface KahootAnswerProps {
  answer: QuizAnswer
  isPending: boolean
  index: number
}

export default function QuizAnswer({ answer: { text, isCorrect }, isPending, index }: KahootAnswerProps) {
  const icon = getAnswerIcon({ index, isPending })
  const background = getAnswerBackground({ index, isPending })

  const containerClassname = twMerge(
    'px-4 py-2 rounded-2xl flex gap-4',
    background,
    isCorrect ? 'ring-4 ring-neutral-700 dark:ring-sky-300 hover:cursor-pointer' : 'hover:cursor-not-allowed opacity-40 dark:opacity-60'
  )

  return (
    <div className={containerClassname}>
      <Image src={icon} alt='questionmark' className='object-contain' height={24} width={24}/>
      <Text content={text} isPending={isPending} textSize='text-lg' darkColor='dark:text-gray-300' color='text-gray-100'/>
    </div>
  )
}


function getAnswerIcon({ isPending, index }: Omit<KahootAnswerProps, 'answer'>) {
  if (isPending) {
    return quiz
  }

  if (index === 0) return Icon1;
  if (index === 1) return Icon2;
  if (index === 2) return Icon3;
  if (index === 3) return Icon4;

  return quiz
}

function getAnswerBackground({ isPending, index }: Omit<KahootAnswerProps, 'answer'>) {
  if (isPending) {
    return 'bg-natural-600'
  }

  if (index === 0) return 'bg-[#d01937]'
  if (index === 1) return 'bg-[#1260be]'
  if (index === 2) return 'bg-[#c79200]'
  if (index === 3) return 'bg-[#237e0b]'

  return 'bg-natural-600'
}