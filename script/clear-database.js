const { BankAccountModel } = require('../dist/graphql/modules/bankAccount/bankAccount.model');
const { CartModel } = require('../dist/graphql/modules/cart/cart.model');
const { CategoryModel} = require('../dist/graphql/modules/category/category.model');
const { DeliveryMethodModel} = require('../dist/graphql/modules/deliveryMethod/deliveryMethod.model');
const { IngredientModel} = require('../dist/graphql/modules/ingredient/ingredient.model');
const { OrderModel } = require('../dist/graphql/modules/order/order.model');
const { OrderStatusModel } = require('../dist/graphql/modules/orderStatus/orderStatus.model');
const { PaymentMethodModel } = require('../dist/graphql/modules/paymentMethod/paymentMethod.model');
const { ProductModel } = require('../dist/graphql/modules/product/product.model');
const { ProductCommentModel } = require('../dist/graphql/modules/productComment/productComment.model');
const { ProductContainerModel } = require('../dist/graphql/modules/productContainer/productContainer.model');
const { ProductCountryModel } = require('../dist/graphql/modules/productCountry/productCountry.model');
const { ProductTabModel } = require('../dist/graphql/modules/productTab/productTab.model');
const { ProductTagModel } = require('../dist/graphql/modules/productTag/productTag.model');
const { PromotionModel } = require('../dist/graphql/modules/promotion/promotion.model');
const { UserAddressModel } = require('../dist/graphql/modules/userAddress/userAddress.model');
const { UserPointLogModel } = require('../dist/graphql/modules/userPointLog/userPointLog.model');


BankAccountModel.remove({}).then(() => console.log('Xoá ngân hàng'));
CartModel.remove({}).then(() => console.log('Xoá giỏ hàng'));
CategoryModel.remove({}).then(() => console.log('Xoá danh mục'));
DeliveryMethodModel.remove({}).then(() => console.log('Xoá phương thức vận chuyển'));
IngredientModel.remove({}).then(() => console.log('Xoá hoạt chất '));
OrderModel.remove({}).then(() => console.log('Xoá đơn hàng'));
OrderStatusModel.remove({}).then(() => console.log('Xoá trạng thái đơn hàng'));
PaymentMethodModel.remove({}).then(() => console.log('Xoá phương thưc thanh toán '));
ProductModel.remove({}).then(() => console.log('Xoá sản phẩm'));
ProductCommentModel.remove({}).then(() => console.log('Xoá bình luận sản phẩm '));
ProductContainerModel.remove({}).then(() => console.log('Xoá nhóm sản phẩm'));
ProductCountryModel.remove({}).then(() => console.log('Xoá nhà sản xuất'));
ProductTabModel.remove({}).then(() => console.log('Xoá tab'));
ProductTagModel.remove({}).then(() => console.log('Xoá tag sản phẩm'));
PromotionModel.remove({}).then(() => console.log('Xoá khuyến mãi'));
UserAddressModel.remove({}).then(() => console.log('Xoá địa chỉ người dùng'));
UserPointLogModel.remove({}).then(() => console.log('Xoá điẻm người dùng'));

console.log('done');