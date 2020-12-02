import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { ProductLoader } from "../product/product.model";

const OrderItem = {
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
};

export default {
  OrderItem,
};
