
import { useEffect, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';

interface PropsType {
  categories: any[],
  manufactures: any[],
  setCategories: Function
  setManufactures: Function
}
export function ProductsCategoriesLabels(props: PropsType) {

  const [filteredCategories, setFilteredCategories] = useState(null);
  const [filteredManufactures, setFilteredManufactures] = useState(null);

  useEffect(() => {
    let filteredList = []
    props.categories.forEach(cat => {
      if (cat.subcategories) {
        if (cat.checked === true) filteredList.push(cat)
        else if (cat.checked === undefined) {
          cat.subcategories.forEach(sub => {
            if (sub.checked) {
              sub.categoryId = cat.id
              filteredList.push(sub)
            }
          })
        } 
      } else {
        if (cat.checked) filteredList.push(cat)
      }
    })
    setFilteredCategories(filteredList)
  }, [props.categories]);

  useEffect(() => {
    setFilteredManufactures(props.manufactures.filter(man => man.checked))
  }, [props.manufactures]);

  const removeCategories = (cat) => {
    cat.checked = false
    if (cat.categoryId) {
      let category = props.categories.find(x => x.id == cat.categoryId)      
      let count = 0
      category.subcategories.forEach(sub => count += sub.checked?1:0)
      if (count == category.subcategories.length) category.checked = true
      else if (count == 0) category.checked = false
      else category.checked = undefined
    } else if (cat.subcategories) {
      cat.subcategories.forEach(sub => sub.checked = false)
    }
    props.setCategories([...props.categories])
  }

  const labelClass = "bg-primary-light text-gray-600 text-sm font-semibold " +
  "px-3 py-1 rounded-md flex-center hover:text-danger hover:bg-danger-light cursor-pointer"

  return <>
    {
      !!filteredCategories?.length && (
        <div className="flex flex-wrap space-y-1 space-x-2 mb-2">
          <span className="text-gray-700 pt-1">Danh Mục: </span>
          {            
            filteredCategories.map((cat, index) => 
              <span key={cat.id} className={labelClass}
              onClick={() => {
                removeCategories(cat)
              }}>
                {cat.name}<i className="pl-1"><HiOutlineX/></i>
              </span>
            )
          }
        </div>
      )
    }
    {
      !!filteredManufactures?.length && (
        <div className="flex flex-wrap space-y-1 space-x-2 mb-2">
          <span className="text-gray-700 pt-1">Nhà sản xuất: </span>
          {            
            filteredManufactures.map((man, index) => 
              <span key={man.id} className={labelClass}
              onClick={() => {
                man.checked = false
                props.setManufactures([...props.manufactures])
              }}>
                {man.name}<i className="pl-1"><HiOutlineX/></i>
              </span>
            )
          }
        </div>
      )
    }
  </>
}