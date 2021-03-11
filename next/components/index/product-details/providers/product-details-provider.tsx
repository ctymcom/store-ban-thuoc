import { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductService } from "../../../../lib/repo/product.repo";

export const ProductDetailsContext = createContext<
  Partial<{
    product: Product;
  }>
>({});

interface PropsType extends ReactProps {
  productId: string;
}

export function ProductDetailsProvider(props: PropsType) {
  const [product, setProduct] = useState<Product>(null);

  const loadProduct = async () => {
    setProduct(null);
    let res = await ProductService.getOne({ id: props.productId });
    setProduct(res);
  };

  useEffect(() => {
    loadProduct();
  }, [props.productId]);

  return (
    <ProductDetailsContext.Provider value={{ product }}>
      {props.children}
    </ProductDetailsContext.Provider>
  );
}

export const useProductDetailsContext = () => useContext(ProductDetailsContext);
