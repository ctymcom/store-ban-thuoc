import { IngredientsAlphabet } from './components/ingredients-alphabet';
import { IngredientsColumns } from './components/ingredients-columns';
import { IngredientsSearch } from './components/ingredients-search';

export function IngredientsPage() {

    return <>
        <div className="main-container">
            <div className="pt-12">
                <IngredientsSearch/>
                <div className="py-2"></div>
                <IngredientsAlphabet/>
            </div>
            <div className="pt-1">
                <IngredientsColumns/>
            </div>
        </div>
    </>
}