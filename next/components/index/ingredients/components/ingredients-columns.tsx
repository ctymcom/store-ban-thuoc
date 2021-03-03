import Link from 'next/link';
import { Spinner } from '../../../shared/utilities/spinner';
import { useIngredientContext } from '../providers/ingredient-provider';


interface PropsType extends ReactProps {
  
}

export function IngredientsColumns(props: PropsType) {
  

  const { loadDone, ingredients, debouncedSearchText, initial } = useIngredientContext()

    return <>
      {
      !loadDone ? <Spinner/> :
      <>
        <div className="text-gray-600 text-sm">
          Hiển thị <span className="text-primary text-base font-semibold">{ingredients.length || 0}</span> kết quả
          { debouncedSearchText?.length > 1 && 
            <span> cho từ khoá <span className="text-primary text-base font-semibold">"{debouncedSearchText}"</span></span> }
        </div>
        <div className="w-12 h-1 mt-3 mb-5 bg-gray-200"></div>
        <div className="flex">
          <div className="flex flex-col max-w-4xs">
            <div className="font-bold text-9xl text-primary transform -translate-y-6">
              {initial}
            </div>
          </div>
          <div className="self-start pl-8 sm:pl-10 md:pl-12 flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3 text-gray-700">
              {
                ingredients.map((ingredient, index) =>
                  <Link key={index} href={{
                    pathname: '/products',
                    query: { ingredientName: ingredient.name, ingredientId: ingredient.id },
                  }}>
                    <a className="break-words cursor-pointer hover:text-primary hover:underline leading-tight">{ingredient.name}</a>
                  </Link>
                )
              }
          </div>
        </div>
      </>
      }
    </>
}