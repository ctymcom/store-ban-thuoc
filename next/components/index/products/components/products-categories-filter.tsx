
import { ProductsFilterCheckbox } from './products-filter-checkbox';
interface PropsType {
  [key: string]: any
  title: string
  categories: {
    id: string
    name: string
    checked?: boolean
    subcategories?: {
      id: string
      name: string
      checked?: boolean
    }[]
  }[]
  setCategories: Function
}
export function ProductsCategoriesFilter(props: PropsType) {

  const toggleCategory = (cat, index) => {
    if (cat.checked === undefined) {
      cat.checked = false
    } else {
      cat.checked = !cat.checked
    }
    if (cat.subcategories?.length) {
      cat.subcategories.forEach(sub => {
        sub.checked = cat.checked
      })
    }
    props.setCategories([...props.categories])
  }

  const toggleSubcategory = (cat, index, sub, subIndex) => {
    sub.checked = !sub.checked
    let count = 0
    cat.subcategories.forEach(sub => count += sub.checked?1:0)
    if (count == cat.subcategories.length) cat.checked = true
    else if (count == 0) cat.checked = false
    else cat.checked = undefined
    props.setCategories([...props.categories])
  }

  return <>
      <div className="text-primary-dark font-semibold text-lg">{props.title}</div>
      <div className="w-12 h-1 my-3 bg-gray-200"></div>
      <div className="flex flex-col">
          {
            props.categories.map((cat, index) => <>
              <div className="" key={cat.id}>
                <ProductsFilterCheckbox id={cat.id} text={cat.name} checked={cat.checked} onClick={() => {
                  toggleCategory(cat, index)
                }}/>                
              </div>
                {
                  cat.subcategories?.map((sub, subIndex) => (
                    <div className="ml-6" key={sub.id}>
                      <ProductsFilterCheckbox id={sub.id} text={sub.name} checked={sub.checked} onClick={() => {
                        toggleSubcategory(cat, index, sub, subIndex)
                      }}/>
                    </div>
                  ))
                }
            </>)
          }
      </div>
  </>
}