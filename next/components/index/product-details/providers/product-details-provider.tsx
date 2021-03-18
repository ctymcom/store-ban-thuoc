import { createContext, useContext, useEffect, useState } from "react";
import { Product, ProductService } from "../../../../lib/repo/product.repo";
import { ProductComment, ProductCommentService } from "./../../../../lib/repo/product-comment.repo";

export const ProductDetailsContext = createContext<
  Partial<{
    product: Product;
    comments: ProductComment[];
    loadComments: () => Promise<any>;
    setComments: Function;
    commentTotal: number;
    postComment: ({ reviewerName, content, imark }) => Promise<any>;
  }>
>({});

interface PropsType extends ReactProps {
  productId: string;
}

export function ProductDetailsProvider(props: PropsType) {
  const [product, setProduct] = useState<Product>(null);
  const [comments, setComments] = useState<ProductComment[]>(null);
  const [commentTotal, setCommentTotal] = useState(0);

  const loadProduct = async () => {
    setProduct(null);
    let res = await ProductService.getOne({ id: props.productId });
    setProduct(res);
  };

  const loadComments = async () => {
    let res = await ProductCommentService.getAll({
      query: {
        limit: 10,
        filter: { productId: props.productId },
        offset: comments?.length || 0,
      },
    });
    setComments(comments ? [...comments, ...res.data] : [...res.data]);
    setCommentTotal(res.total);
  };

  const postComment = async ({ reviewerName, content, imark }) => {
    return await ProductCommentService.postProductComment({
      reviewerName,
      content,
      imark,
      productId: props.productId,
    });
  };

  useEffect(() => {
    setComments(null);
    loadProduct();
    loadComments();
  }, [props.productId]);

  return (
    <ProductDetailsContext.Provider
      value={{ product, comments, commentTotal, loadComments, postComment, setComments }}
    >
      {props.children}
    </ProductDetailsContext.Provider>
  );
}

export const useProductDetailsContext = () => useContext(ProductDetailsContext);
