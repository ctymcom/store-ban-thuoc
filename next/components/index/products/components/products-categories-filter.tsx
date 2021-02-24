import { userProductsContext } from '../providers/products-provider';
import { Accordion } from './../../../shared/utilities/accordion/accordion';
import { ProductsFilterCheckbox } from './products-filter-checkbox';
interface PropsType extends ReactProps {
  title: string
}
export function ProductsCategoriesFilter(props: PropsType) {

  const { categories, setCategories } = userProductsContext()

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
    setCategories([...categories])
  }

  const toggleSubcategory = (cat, index, sub, subIndex) => {
    sub.checked = !sub.checked
    let count = 0
    cat.subcategories.forEach(sub => count += sub.checked?1:0)
    if (count == cat.subcategories.length) cat.checked = true
    else if (count == 0) cat.checked = false
    else cat.checked = undefined
    setCategories([...categories])
  }

  const toggleOpen = (cat) => {
    cat.open = !cat.open
    setCategories([...categories])
  }

  return <>
      <div className="text-primary-dark font-semibold text-lg">{props.title}</div>
      <div className="w-12 h-1 my-3 bg-gray-200"></div>
      <div className="flex flex-col">
        {
          categories.map((cat, index) => 
            <div key={cat.id}>
              <div>
                <ProductsFilterCheckbox id={cat.id} text={cat.name} checked={cat.checked} open={cat.open}
                  onClick={() => toggleCategory(cat, index)}
                  toggleOpen={() => toggleOpen(cat)}
                />                
              </div>
              {
                !!cat.subcategories && <Accordion open={cat.open}>
                  {                      
                    cat.subcategories?.map((sub, subIndex) => (
                      <div className="ml-6" key={sub.id}>
                        <ProductsFilterCheckbox id={sub.id} text={sub.name} checked={sub.checked} onClick={() => {
                          toggleSubcategory(cat, index, sub, subIndex)
                        }}/>
                      </div>
                    ))
                  }
                </Accordion>
              }
            </div>
          )
        }
      </div>
  </>
}