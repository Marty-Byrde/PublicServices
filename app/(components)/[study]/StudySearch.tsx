'use client'
import { AutoCompleteHandler } from "@/components/Shared/Filtering/DialogSubcomponents/hooks/useAutoComplete"
import Search, { SearchProps } from "@/components/Shared/Filtering/Search"
import { Curricular, StudyPlan } from "@/api/studies/retrieval"

export interface StudySearchProps {
  studies: StudyPlan[],
  iconOnly?: SearchProps['iconOnly']
  customization?: SearchProps['customization'],
  semester: string,
}

export default function StudySearch({ studies, customization, iconOnly, semester }: StudySearchProps) {

  const Handler: AutoCompleteHandler = ({ query }) => ({
    getItemInputValue({ item }) {
      return item?.title
    },
    getItems() {
      const filtered = []
      for (let study of studies) {
        filtered.push(...study.curriculars.filter(curricular => curricular.name.toLowerCase().includes(query.toLowerCase()) || study.type.toLowerCase().includes(query.toLowerCase()))) //
      }


      return filtered.map((curriculum: Curricular) => ({
        title: curriculum.name,
        description: `Year: ${curriculum.details.version};  Estimation: ${curriculum.details.duration ?? '?'};  v${curriculum.details.ausgabe ? curriculum.details.ausgabe + ".0" : "?.?"}`,
        route: `.../${curriculum.id}`,
        href: `/lectures/${curriculum.id}/${semester}`
      }))
    },
    sourceId: 'study-search'
  })

  return <Search kbdKey='i' autoCompleteHandler={Handler} iconOnly={iconOnly} customization={customization}/>
}