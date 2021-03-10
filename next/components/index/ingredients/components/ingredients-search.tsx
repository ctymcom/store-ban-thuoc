import { HiOutlineSearch } from "react-icons/hi";
import { useIngredientContext } from "../providers/ingredient-provider";

interface PropsType extends ReactProps {}

export function IngredientsSearch(props: PropsType) {
  const { setSearchText, searchText } = useIngredientContext();

  return (
    <>
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center relative">
          <i className="absolute left-4 text-gray-400 text-lg">
            <HiOutlineSearch />
          </i>
          <input
            className="border border-gray-300 rounded h-10 pl-10 pr-3 w-60 sm:w-80 hover:border-primary focus:border-primary-dark"
            placeholder="Tìm kiếm hoạt chất"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
