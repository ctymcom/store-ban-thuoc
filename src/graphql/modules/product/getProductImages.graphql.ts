import { gql } from "apollo-server-express";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { IProduct } from "./product.model";

export default {
  schema: gql`
    extend type Product {
      images: [ProductImage]
    }
    type ProductImage {
      imageId: String
      image: String
      imageS: String
      imageM: String
      imageL: String
    }
  `,
  resolver: {
    Product: {
      images: async (root: IProduct, args: any, context: Context) => {
        return root.imageIds.map((id) => ({ imageId: id }));
      },
    },
    ProductImage: {
      image: async (root: any, args: any, context: Context) => {
        return AritoHelper.getImageLink(root.imageId);
      },
      imageS: async (root: any, args: any, context: Context) => {
        return AritoHelper.getImageLink(root.imageId, 200);
      },
      imageM: async (root: any, args: any, context: Context) => {
        return AritoHelper.getImageLink(root.imageId, 576);
      },
      imageL: async (root: any, args: any, context: Context) => {
        return AritoHelper.getImageLink(root.imageId, 1024);
      },
    },
  },
};
