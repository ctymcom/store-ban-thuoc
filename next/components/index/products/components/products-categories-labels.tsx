
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
    }
    props.setCategories([...props.categories])
  }

  return <>
    {
      !!filteredCategories?.length && (
        <div className="flex space-x-2 my-2">
          <span className="text-gray-700">Danh Mục: </span>
          {            
            filteredCategories.map((cat, index) => 
              <span key={cat.id} className="bg-primary-light text-gray-600 text-sm font-semibold px-3 py-1 rounded-md flex-center hover:text-danger cursor-pointer"
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
        <div className="flex space-x-2 my-2">
          <span className="text-gray-700">Nhà sản xuất: </span>
          {            
            filteredManufactures.map((man, index) => 
              <span key={man.id} className="bg-primary-light text-gray-600 text-sm font-semibold px-3 py-1 rounded-md flex-center hover:text-danger cursor-pointer"onClick={() => {
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