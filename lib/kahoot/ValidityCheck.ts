const length = 37
const sectionLenghts = [8, 4, 4, 4, 12]

interface ValidQuizId {
  valid: true,
}

interface InValidQuizzId {
  valid: false,
  reason: 'Missing ID Section (-)' |
    'Section is incomplete (?)' | string
}


export default function checkValidity({ quizId }: { quizId: string }): ValidQuizId | InValidQuizzId {

  // if(quizId.length !== length) return false;
  if (quizId.split("-").length !== sectionLenghts.length) return { valid: false, reason: "Missing ID Section (-)" };
  if (quizId.split("-").filter((section: string, index: number) => sectionLenghts[index] !== section.length).length > 0) return {
    valid: false,
    reason: `Section is incomplete (${quizId.split('-').findIndex((section, index) => sectionLenghts[index] !== section.length)})`
  };


  return {
    valid: true
  };
}