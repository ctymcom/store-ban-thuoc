import { useEffect, useState } from "react";

interface PropsType extends ReactProps {
  limit: number
  page: number
  total: number
  firstButtonClass?: string
  lastButtonClass?: string
  prevButtonClass?: string
  nextButtonClass?: string
  pageButtonClass?: string
  pageActiveButtonClass?: string
  dotsButtonClass?: string
  firstButtonContent?: string | JSX.Element
  lastButtonContent?: string | JSX.Element
  prevButtonContent?: string | JSX.Element
  nextButtonContent?: string | JSX.Element
  dotsButtonContent?: string | JSX.Element
  visiblePageCount?: number
  hasDots?: boolean
  hasFirstLast?: boolean
  onPageChange: Function
}
const defaultButtonClass = `min-w-10 h-10 font-semibold border border-gray-400 text-gray-600 hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:opacity-50`
export function Pagination({
  firstButtonClass = `${defaultButtonClass}`,
  lastButtonClass = `${defaultButtonClass}`,
  prevButtonClass = `${defaultButtonClass}`,
  nextButtonClass = `${defaultButtonClass}`,
  pageButtonClass = `${defaultButtonClass}`,
  dotsButtonClass = `${defaultButtonClass}`,
  pageActiveButtonClass = `min-w-10 h-10 font-semibold border border-primary bg-primary text-white`,
  firstButtonContent = `«`,
  lastButtonContent = `»`,
  prevButtonContent = `<`,
  nextButtonContent = `>`,
  dotsButtonContent = '...',
  visiblePageCount = 5,
  limit, page = 1, total,
  ...props}: PropsType) {
  const buttonClass = `flex-center cursor-pointer p-2 focus:outline-none`

  const [pageCount, setPageCount] = useState(0);
  const [pages, setPages] = useState([{ index: 1 }]);
  
  useEffect(() => {
    let pageCount = Math.floor(total / limit) + (total % limit > 0 ? 1 : 0)
    setPageCount(pageCount)
    if (page < 1 || !pageCount) props.onPageChange(1)
    else if (page > pageCount) props.onPageChange(pageCount)
  }, [total, limit]);

  useEffect(() => {
    if (pageCount && page >= 1 && page <= pageCount) {
      let prevPageCount = Math.floor(visiblePageCount / 2)
      let minPage = page - prevPageCount
      if (minPage <= 0) minPage = 1
  
      while (minPage + visiblePageCount > pageCount + 1 && minPage > 1) minPage--
      let visiblePages = Array.from(Array(visiblePageCount > pageCount ? pageCount : visiblePageCount).keys()).map(x => ({ index: x + minPage}))
      
      if (props.hasDots) {
        let hiddenPageCount = visiblePages[0].index - prevPageCount - 1
        if (hiddenPageCount >= 0) {
          visiblePages.splice(0, 0, { index: hiddenPageCount == 0 ? 2 :-2 })
          visiblePages.splice(0, 0, { index: 1 })
        } else {
          while (visiblePages[0].index > 1) {
            for (let i = 0; i <= visiblePages.length - 1; i++) {
              if (visiblePages[i].index < 0) break
              visiblePages[i].index = visiblePages[i].index - 1
            }
          }
        }
        
        let nextPageCount = visiblePageCount - prevPageCount - 1
        hiddenPageCount = (pageCount - nextPageCount) - visiblePages[visiblePages.length - 1].index
        if (hiddenPageCount >= 0) {
          visiblePages.splice(visiblePages.length, 0, { index: hiddenPageCount == 0 ? pageCount - 1 : -1 })
          visiblePages.splice(visiblePages.length, 0, { index: pageCount })
        } else {
          while (visiblePages[visiblePages.length - 1].index < pageCount) {
            for (let i = visiblePages.length - 1; i >=0; i--) {
              if (visiblePages[i].index < 0) break
              visiblePages[i].index = visiblePages[i].index + 1
            }
          }
        }
      }

      setPages(visiblePages)
    }
  }, [visiblePageCount, pageCount, page])

  const handlePageChange = (pageIndex) => {
    if (pageIndex < 1 || pageIndex > pageCount) return
    if (pageIndex != page) props.onPageChange(pageIndex)
  }

  return <>
    {
      !!pages?.length && <div className="flex">
        {
          props.hasFirstLast && 
          <button 
            className={`${buttonClass} ${firstButtonClass}`}
            onClick={() => handlePageChange(1)}
            disabled={page <= 1}
          >{firstButtonContent}</button>
        }
        <button 
          className={`${buttonClass} ${prevButtonClass}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >{prevButtonContent}</button>
        {
          pages.map((currentPage) => 
            <button
              key={currentPage.index}
              className={`${buttonClass} ${currentPage.index > 0 ? 
                (page == currentPage.index?pageActiveButtonClass:pageButtonClass) : (dotsButtonClass)}`}
              disabled={currentPage.index < 0}
              onClick={() => handlePageChange(currentPage.index)}
            >
              {currentPage.index > 0 ? currentPage.index : dotsButtonContent}
            </button>
          )
        }
        <button 
          className={`${buttonClass} ${nextButtonClass}`}          
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= pageCount}
        >{nextButtonContent}</button>
        {
          props.hasFirstLast && 
          <button 
            className={`${buttonClass} ${lastButtonClass}`}          
            onClick={() => handlePageChange(pageCount)}
            disabled={page >= pageCount}
          >{lastButtonContent}</button>
        }
      </div>
    }
  </>
}