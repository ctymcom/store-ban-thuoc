import { gql } from "apollo-server-express";
import { keyBy } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { ProductModel } from "../product/product.model";

export default {
  schema: gql`
    extend type Mutation {
      generateDraftOrder(
        promotionCode: String
        paymentMethod: Int
        items: [OrderItemInput]
      ): DraftOrder
    }
    input OrderItemInput {
      productId: ID
      qty: Int
    }
    type DraftOrder {
      subtotal: Float
      discount: Float
      amount: Float
      items: [OrderItem]
    }
    type OrderItem {
      productCode: String
      unit: String
      storeCode: String
      qty: Int
      factor: Float
      price: Float
      amount: Float
      discountRate: Float
      discount: Float
      vatRate: Float
      vat: Float
      position: Int
    }
  `,
  resolver: {
    Mutation: {
      generateDraftOrder: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { promotionCode, paymentMethod, items } = args;
        const products = await ProductModel.find({
          _id: items.map((i) => i.productId),
        }).then((res) => keyBy(res, "_id"));
        const orderItems: any[] = [];
        items.forEach((i) => {
          const product = products[i.productId];
          if (!product) return;
          let price = product.salePrice;
          if (context.user.group && context.user.group != "") {
            const groupPrice = product.priceGroups.find(
              (p) => p.customerGroup == context.user.group
            );
            if (groupPrice) {
              price = groupPrice.salePrice;
            }
          }
          orderItems.push({
            productId: product._id,
            productCode: product.code,
            unit: product.unitCode,
            qty: i.qty,
            price: price,
            amount: price * i.qty,
          });
        });
        const draftOrder = await AritoHelper.viewDraftOrder({
          promotionCode: promotionCode,
          paymentMethod: paymentMethod,
          items: orderItems.map((i) => ({
            productCode: i.productCode,
            unit: i.unit,
            qty: i.qty,
            price: i.price,
            amount: i.amount,
          })),
        });
        return draftOrder;
      },
    },
  },
};
