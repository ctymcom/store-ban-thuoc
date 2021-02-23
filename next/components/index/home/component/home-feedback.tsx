import { useState } from "react"
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im'
import useInterval from "../../../../lib/hooks/useInterval"
import { useHomeContext } from "../providers/home-provider"
import { SectionHeader } from "./section-header"
import { Feedback } from './../../../../lib/repo/feedback.repo';

const partitionArray = (array: any[], size) => array.slice().sort((a, b) => a.content > b.content ? 1 : 0).map((e,i) => (i % size === 0) ? array.slice(i, i + size) : null).filter( (e) => e )

interface PropsType extends ReactProps {
  feedbacks: Feedback[]
}
export function HomeFeedback(props: PropsType) {

  const [activeIndex, setActiveIndex] = useState(0);
  const feedbackGroups = partitionArray(props.feedbacks, 2)

  useInterval(() => {
    if (activeIndex >= feedbackGroups.length - 1) {
      setActiveIndex(0)
    } else {
      setActiveIndex(index => index + 1)
    }
  }, 5000)

  return (
    <>
      <SectionHeader text="Cảm nhận từ khách hàng"/>
      <div className="relative">
      {
        feedbackGroups.map((group, index) => 
          <div key={index} className={"grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 top-0 " + 
          (index == 0 ? "absolute " : "") + (activeIndex == index ? "animate-emerge" : "opacity-0")}>
            {
              group.map((feedback, index) => 
                <div className="flex flex-col items-center md:flex-row md:items-start p-5 border border-primary rounded" key={index}>
                  <div className="w-16 lg:w-20 flex-shrink-0">
                    <div className="image-wrapper round">
                      <img src={feedback.avatar}/>
                    </div>
                  </div>
                  <div className="pl-0 mt-2 text-center md:pl-4 lg:pl-8 md:mt-0 md:text-left">
                    <div className="text-primary text-lg font-bold">{feedback.name}</div>
                    <div className="text-gray-800 text-lg font-semibold">{feedback.title}</div>
                    <div className="text-gray-700 mt-2 relative">
                      <i className="absolute left-0 top-0 text-primary"><ImQuotesLeft/></i>
                      <p className="px-6">{feedback.content}</p>
                      <i className="absolute right-0 bottom-0 text-primary"><ImQuotesRight/></i>
                    </div>
                  </div>
              </div>  
              )
            }
          </div>
        )
      }
      </div>
    </>
  )
}