
import { useProductDetailsContext } from '../providers/product-details-provider';

export function ProductContent() {

    const { product } = useProductDetailsContext()
    const scrollTo = (id) => {
        document.getElementById(id).scrollIntoView({ block: 'start', behavior: 'smooth' })
    }

    return <>
        <div className="flex w-full h-scrollbar">
        {
            product.tabs.map(tab => 
                <a key={tab.name} onClick={() => scrollTo(tab.name)}
                    className="flex-grow text-center px-4 pb-1 font-semibold text-primary hover:text-primary cursor-pointer border-b-4 whitespace-nowrap">{tab.name}
                </a>
            )
        }
        </div>
        <div>
        {
            product.tabs.map(tab => <div className="relative mt-7" key={tab.name}>
                    <div className="absolute -top-36" id={tab.name}></div>
                    <h3 className="font-bold text-lg leading-9">{tab.name}</h3>
                    <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: tab.content }}></p>
                </div>
            )
        }
        </div>
    </>;
}   