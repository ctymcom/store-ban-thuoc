import { gql } from "apollo-server-express";

import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { BankAccountModel } from "../bankAccount/bankAccount.model";
import { CategoryModel } from "../category/category.model";
import { DeliveryMethodModel } from "../deliveryMethod/deliveryMethod.model";
import { IngredientModel } from "../ingredient/ingredient.model";
import { NotificationModel } from "../notification/notification.model";
import { OrderModel } from "../order/order.model";
import { OrderStatusModel } from "../orderStatus/orderStatus.model";
import { PaymentMethodModel } from "../paymentMethod/paymentMethod.model";
import { ProductModel } from "../product/product.model";
import { ProductCommentModel } from "../productComment/productComment.model";
import { ProductContainerModel } from "../productContainer/productContainer.model";
import { ProductCountryModel } from "../productCountry/productCountry.model";
import { ProductTabModel } from "../productTab/productTab.model";
import { ProductTagModel } from "../productTag/productTag.model";
import { PromotionModel } from "../promotion/promotion.model";
import { UserAddressModel } from "../userAddress/userAddress.model";
import { UserPointLogModel } from "../userPointLog/userPointLog.model";

export default {
  schema: gql`
    extend type Query {
      getSyncReport: [SyncCollection]
    }
    type SyncCollection {
      name: String
      syncAt: DateTime
    }
  `,
  resolver: {
    Query: {
      getSyncReport: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR);
        const collections: any[] = [
          { name: "Tài khoản ngân hàng", model: BankAccountModel, syncAt: true },
          { name: "Danh mục sản phẩm", model: CategoryModel, syncAt: true },
          { name: "Phương thức vận chuyển", model: DeliveryMethodModel },
          { name: "Hoạt chất", model: IngredientModel, syncAt: true },
          { name: "Thông báo", model: NotificationModel, syncAt: true },
          { name: "Đơn hàng", model: OrderModel, syncAt: true },
          { name: "Trạng thái đơn hàng", model: OrderStatusModel },
          { name: "Phương thức thanh toán", model: PaymentMethodModel },
          { name: "Sản phẩm", model: ProductModel, syncAt: true },
          { name: "Đánh giá sản phẩm", model: ProductCommentModel, syncAt: true },
          { name: "Nhóm sản phẩm", model: ProductContainerModel },
          { name: "Nhà sản xuất", model: ProductCountryModel },
          { name: "Tab sản phẩm", model: ProductTabModel },
          { name: "Tag sản phẩm", model: ProductTagModel },
          { name: "Khuyến mãi", model: PromotionModel, syncAt: true },
          { name: "Địa chỉ giao hàng", model: UserAddressModel },
          { name: "Điểm thưởng", model: UserPointLogModel, syncAt: true },
        ];
        return await Promise.all(collections.map((c) => getCollectionSyncAt(c)));
      },
    },
  },
};

async function getCollectionSyncAt({ name, model, syncAt }) {
  return await model
    .findOne()
    .sort({ [syncAt ? "syncAt" : "updatedAt"]: -1 })
    .exec()
    .then((res) => {
      return res ? res[syncAt ? "syncAt" : "updatedAt"] : null;
    })
    .then((syncAt) => ({
      name: name,
      syncAt: syncAt,
    }));
}
