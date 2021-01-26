import { ProductDetailData } from './product-detail-data';
import { ProductImage } from './product-image';
import { ProductInfo } from './product-info';

export function ProductMain() {

    return <>
                {
                    ProductDetailData.map((item, index) => {
                        return  <div className="Product grid grid-cols-2 gap-x-7 mt-16" >  
                                    <ProductImage product={item}/>

                                    <div className="product__info  ml-0">
                                        <ProductInfo product={item}/>
                                    </div>
                                </div>
                    })
                }
    </>
}