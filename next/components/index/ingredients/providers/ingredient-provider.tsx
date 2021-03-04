import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from './../../../../lib/hooks/useDebounce';
import { Ingredient, IngredientService } from './../../../../lib/repo/ingredient.repo';

export const IngredientContext = createContext<Partial<{
  ingredients: Ingredient[],
  searchText: string
  debouncedSearchText: string
  setSearchText: Function
  initial: string
  setInitial: Function
  loadDone: boolean
}>>({});

export function IngredientProvider(props) {
  const [searchText, setSearchText] = useState('');
  const [initial, setInitial] = useState('A');
  const [loadDone, setLoadDone] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const debouncedSearchText = useDebounce(searchText, 300)

  const loadIngredients = () => {
    setLoadDone(false)
    IngredientService.getAll({
      query: {
        limit: 0,
        search: debouncedSearchText,
        filter: { name: { __regex: `^(${initial})` } }
      }
    }).then(res => {
      setIngredients(res.data)
      setLoadDone(true)
    })
  }

  useEffect(() => {
    loadIngredients();
  }, [initial]);

  useEffect(() => {
    if (searchText && searchText[0].toUpperCase() != initial) {
      setInitial(searchText[0].toUpperCase())
    } else {
      loadIngredients();
    }
  }, [debouncedSearchText]);

  return <IngredientContext.Provider value={{ loadDone, ingredients, debouncedSearchText, searchText, setSearchText, initial, setInitial }}>
    {props.children}
  </IngredientContext.Provider>;
}

export const useIngredientContext = () => useContext(IngredientContext);