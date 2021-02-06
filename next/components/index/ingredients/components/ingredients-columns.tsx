import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IngredientsColumnsProps {
  [key: string]: any
  initial: string
  searchText: string
  ingredients: string[]
}

export function IngredientsColumns(props: IngredientsColumnsProps) {

  const [filterIngredients, setFilterIngredients] = useState(props.ingredients);
  
  useEffect(() => {
    if (props.searchText) {
      let searchText = props.searchText[0].toUpperCase() + props.searchText.slice(1)
      setFilterIngredients(props.ingredients.filter(x => x.startsWith(searchText)))
    } else {
      setFilterIngredients(props.ingredients)
    }
  }, [props.ingredients, props.searchText]);

    return <>
      <div className="text-gray-600 text-sm">
        Hiển thị <span className="text-primary text-base font-semibold">{filterIngredients.length}</span> kết quả
        { props.searchText?.length > 1 && 
          <span> cho từ khoá <span className="text-primary text-base font-semibold">"{props.searchText}"</span></span> }
      </div>
      <div className="w-12 h-1 mt-3 mb-5 bg-gray-200"></div>
      <div className="flex">
        <div className="flex flex-col max-w-4xs">
          <div className="font-bold text-9xl text-primary transform -translate-y-6">
            {props.initial}
          </div>
        </div>
        <div className="pl-8 sm:pl-10 md:pl-12 flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3 text-gray-700">
            {
              filterIngredients.map((ingredient, index) => (
                <Link key={index} href={{
                  pathname: '/products',
                  query: { ingredient },
                }}>
                  <a key={index} className="break-words cursor-pointer hover:text-primary hover:underline leading-tight">{ingredient}</a>
                </Link>
              ))
            }
        </div>
      </div>
    </>
}