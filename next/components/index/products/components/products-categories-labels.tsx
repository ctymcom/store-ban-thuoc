
import { useEffect, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { FilterCategory } from '../providers/products-provider';
import { useProductsContext } from './../providers/products-provider';

interface PropsType {
}
export function ProductsCategoriesLabels(props: PropsType) {

  const [filteredCategories, setFilteredCategories] = useState<FilterCategory[]>(null);
  const { categories, setCategories, ingredient, setIngredient } = useProductsContext()

  useEffect(() => {
    let filteredList = []
    categories.forEach(cat => {
      if (cat.subcategories) {
        if (cat.checked === true) filteredList.push({ ...cat, subcategories: null })
        else if (cat.checked === undefined) {
          filteredList.push({ ...cat, subcategories: cat.subcategories.filter(sub => sub.checked) })
        } 
      } else {
        if (cat.checked) filteredList.push(cat)
      }
    })
    setFilteredCategories(filteredList)
  }, [categories]);

  // useEffect(() => {
  //   setFilteredManufactures(props.manufactures.filter(man => man.checked))
  // }, [props.manufactures]);

  const removeCategories = (cat) => {
    let category = categories.find(x => x.id == cat.id)
    category.checked = false
    if (category.subcategories) {
      category.subcategories.forEach(sub => sub.checked = false)
    }
    // if (cat.categoryId) {
    //   let category = props.categories.find(x => x.id == cat.categoryId)      
    //   let count = 0
    //   category.subcategories.forEach(sub => count += sub.checked?1:0)
    //   if (count == category.subcategories.length) category.checked = true
    //   else if (count == 0) category.checked = false
    //   else category.checked = undefined
    // } else if (cat.subcategories) {
    //   cat.subcategories.forEach(sub => sub.checked = false)
    // }
    setCategories([...categories])
  }

  const labelClass = "bg-primary-light text-gray-600 text-sm font-semibold " +
  "px-3 py-1 rounded-md flex-center group hover:text-danger hover:bg-danger-light cursor-pointer"

  return <>
    {
      ingredient &&
      <div className="flex flex-wrap space-y-1 space-x-2 mb-2">
        <span className={labelClass} onClick={() => { setIngredient(null) }}>
            <span className="pr-2 mr-2 border-r border-primary group-hover:border-danger">Ho???t ch???t</span>
            <span className="pr-2 mr-2 border-r border-primary group-hover:border-danger">
              { ingredient.name }
            </span>
            <i><HiOutlineX/></i>
          </span>
      </div>
    }
    {
      !!filteredCategories?.length && (
        <div className="flex flex-wrap space-y-1 space-x-2 mb-2">
          <span className="text-gray-700 pt-1">Danh M???c: </span>
          {            
            filteredCategories.map((cat, index) => 
              <span key={cat.id} className={labelClass}
              onClick={() => {
                removeCategories(cat)
              }}>
                <span className="pr-2 mr-2 border-r border-primary group-hover:border-danger">{cat.name}</span>
                {
                  cat.subcategories && 
                  <span className="pr-2 mr-2 border-r border-primary group-hover:border-danger">
                    { cat.subcategories.length == 1 ? cat.subcategories[0].name : `${cat.subcategories.length} danh m???c` }
                  </span>
                }
                <i><HiOutlineX/></i>
              </span>
            )
          }
        </div>
      )
    }
  </>
}