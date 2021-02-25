
import { useProductDetailsContext } from '../providers/product-details-provider';

export function ProductContent() {

    const { product } = useProductDetailsContext()

    return <>
        <div className="flex w-full overflow-x-auto">
        {
            product.tabs.map(tab => 
                <a href={tab.name} className="px-3 pb-1 mr-14 text-primary border-b-4 whitespace-nowrap">{tab.name}</a>
            )
        }
        </div>
        <div>
        {
            product.tabs.map(tab => 
                <p id={tab.name} dangerouslySetInnerHTML={{ __html: tab.content }}></p>
            )
        }
        </div>
    </>;
}   