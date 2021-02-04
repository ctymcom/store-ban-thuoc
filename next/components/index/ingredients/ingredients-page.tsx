import { useEffect, useState } from 'react';
import { IngredientsAlphabet } from './components/ingredients-alphabet';
import { IngredientsColumns } from './components/ingredients-columns';
import { IngredientsSearch } from './components/ingredients-search';
import data from './data/ingredients-data'
export function IngredientsPage() {

    const [initial, setInitial] = useState('A');
    const [searchText, setSearchText] = useState('');
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        setIngredients(data.filter(x => x.startsWith(initial)))
    }, [initial]);

    useEffect(() => {
        if (searchText) {
            setInitial(searchText[0].toUpperCase())
        }
    }, [searchText]);
    
    return <>
        <div className="main-container">
            <div className="pt-12">
                <IngredientsSearch searchText={searchText} setSearchText={setSearchText}/>
                <div className="py-2"></div>
                <IngredientsAlphabet initial={initial} handleSetInitial={(char) => {
                    setSearchText('')
                    setInitial(char)
                }}/>
            </div>
            <div className="pt-8">
                <IngredientsColumns initial={initial} searchText={searchText} ingredients={ingredients}/>
            </div>
        </div>
    </>
}