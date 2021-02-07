import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { HiChevronLeft, HiChevronRight, HiDotsHorizontal, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { Pagination } from "./pagination";

interface PropsType extends ReactProps {
  limit: number
  page: number
  total: number
  onPageChange: Function
}
export function PaginationRound(props: PropsType) {

  const defaultButtonClass = `border-2 border-gray-400 bg-white text-gray-500 disabled:opacity-40 disabled:pointer-events-none ` + 
  `hover:text-primary hover:border-primary font-bold rounded-full min-w-10 h-10 mx-1`

  return <Pagination
    limit={props.limit}
    page={props.page}
    total={props.total}
    onPageChange={props.onPageChange}
    hasFirstLast={false}
    hasDots={true}
    visiblePageCount={5}
    prevButtonClass={`${defaultButtonClass}`}
    nextButtonClass={`${defaultButtonClass}`}
    // firstButtonClass={`${defaultButtonClass}`}
    // lastButtonClass={`${defaultButtonClass}`}
    pageButtonClass={`${defaultButtonClass}`}
    dotsButtonClass={`${defaultButtonClass}`}
    pageActiveButtonClass={`${defaultButtonClass.replace(' text-gray-500', '').replace(' hover:text-primary','')} bg-primary border-primary text-white hover:text-white`}
    prevButtonContent={<i className="text-xl"><HiChevronLeft/></i>}
    nextButtonContent={<i className="text-xl"><HiChevronRight/></i>}
    // firstButtonContent={<i className="text-lg"><HiChevronDoubleLeft/></i>}
    // lastButtonContent={<i className="text-lg"><HiChevronDoubleRight/></i>}
    dotsButtonContent={<i className="text-lg"><HiDotsHorizontal/></i>}
  />
}