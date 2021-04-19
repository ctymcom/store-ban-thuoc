import axios from "axios";
import { keyBy, set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CartModel } from "../cart/cart.model";
import { ProductLoader, ProductModel } from "../product/product.model";
import { UserAddressModel } from "../userAddress/userAddress.model";
import { orderService } from "./order.service";

const Query = {
  getAllOrder: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    set(args, "q.filter.userId", context.user.id.toString());
    set(args, "q.filter.status", { $gt: 0 });
    return orderService.fetch(args.q);
  },
  getOneOrder: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await orderService.findOne({ _id: id });
  },
};

const Mutation = {
  createOrder: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const {
      promotionCode,
      paymentMethod,
      deliveryMethod,
      items,
      addressId,
      usePoint = false,
      note = "",
    } = args.data;
    const address = await UserAddressModel.findById(addressId);
    if (!address) throw Error("Chưa có đia điểm nhận hàng.");
    const products = await ProductModel.find({
      _id: items.map((i) => i.productId),
    }).then((res) => keyBy(res, "_id"));
    const orderItems: any[] = [];
    items.forEach((i) => {
      const product = products[i.productId];
      if (!product) return;
      product
        .updateOne({ $inc: { saleCount: i.qty } }, { upsert: true })
        .exec()
        .catch((err) => {});
      let price = product.salePrice;
      if (context.user.group && context.user.group != "") {
        const groupPrice = product.priceGroups.find((p) => p.customerGroup == context.user.group);
        if (groupPrice) {
          price = groupPrice.salePrice;
        }
      }
      orderItems.push({
        productId: product._id,
        productCode: product.code,
        productName: product.name,
        unit: product.unitCode,
        qty: i.qty,
        price: price,
        amount: price * i.qty,
      });
    });
    const order = await AritoHelper.createOrder(
      {
        promotionCode: promotionCode,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        addressId: address.addressId,
        fullAddress: address.fullAddress,
        point: usePoint,
        note: note,
        items: orderItems.map((i) => ({
          productId: i.productId,
          productName: i.productName,
          productCode: i.productCode,
          unit: i.unit,
          qty: i.qty,
          price: i.price,
          amount: i.amount,
        })),
      },
      context.user.permission == 1,
      context.tokenData.ref
    );

    return await orderService
      .create({
        userId: context.user.id.toString(),
        ...order,
        addressId: address.addressId,
        fullAddress: address.fullAddress,
        contactName: address.contactName,
        address: address.address,
        provinceId: address.provinceId,
        districtId: address.districtId,
        wardId: address.wardId,
        phone: address.phone,
        location: address.location,
        paymentMethod: paymentMethod,
        deliveryMethod: deliveryMethod,
        note: note,
        usePoint: usePoint,
      })
      .then((res) => {
        CartModel.updateOne({ userId: context.user.id.toString() }, { $set: { items: [] } })
          .exec()
          .catch((err) => {});
        return res;
      });
  },
};

const Order = {};

const OrderItem = {
  product: GraphQLHelper.loadById(ProductLoader, "productId"),
};

export default {
  Query,
  Mutation,
  Order,
  OrderItem,
};
