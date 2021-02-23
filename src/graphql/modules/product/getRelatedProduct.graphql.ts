import { gql } from "apollo-server-express";
import { shuffle } from "lodash";

import { Context } from "../../context";
import { RelatedProduct } from "./loaders/relatedProduct.loader";
import { IProduct } from "./product.model";

export default {
  schema: gql`
    extend type Product {
      relatedProducts: [Product]
    }
  `,
  resolver: {
    Product: {
      relatedProducts: async (root: IProduct, args: any, context: Context) => {
        if (root.categoryIds.length == 0) return [];
        return await RelatedProduct.loader.load(shuffle(root.categoryIds)[0].toString());
      },
    },
  },
};
