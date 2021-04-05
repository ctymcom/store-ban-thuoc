import { Job } from "agenda";
import chalk from "chalk";
import { compact, flatten, get, keyBy, uniq } from "lodash";
import moment from "moment-timezone";

import {
  CategoryModel,
  CategoryType,
  ICategory,
} from "../../graphql/modules/category/category.model";
import { IngredientModel } from "../../graphql/modules/ingredient/ingredient.model";
import { ProductModel } from "../../graphql/modules/product/product.model";
import { ProductTagDetail } from "../../graphql/modules/product/types/productTagDetail.type";
import { ProductCommentModel } from "../../graphql/modules/productComment/productComment.model";
import { ProductContainerModel } from "../../graphql/modules/productContainer/productContainer.model";
import { ProductTabModel } from "../../graphql/modules/productTab/productTab.model";
import { ProductTagModel } from "../../graphql/modules/productTag/productTag.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";

export class SyncProductJob {
  static jobName = "SyncProduct";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    try {
      console.log("Execute Job " + SyncProductJob.jobName, moment().format());
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==>Đồng bộ sản phẩm đã xóa ..."));
      await syncDeletedProduct();
      console.log(chalk.cyan("==> Động bộ danh mục sản phẩm..."));
      await syncCategory();
      console.log(chalk.cyan("==> Động bộ hoạt chất..."));
      await syncIngredient();
      console.log(chalk.cyan("==> Động bộ sản phẩm..."));
      await syncProduct();
      console.log(chalk.cyan("==> Động bộ nhóm sản phẩm hiển thị..."));
      await syncProductContainer();
      console.log(chalk.cyan("==> Động bộ đánh giá..."));
      await syncProductComment();
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ lỗi", err.message));
    }
  }
}
async function syncDeletedProduct() {
  const updatedAt = await ProductModel.findOne()
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  let deletedProduct = await AritoHelper.getAllDeletedProducts(1, updatedAt);
  const bulk = ProductModel.collection.initializeUnorderedBulkOp();

  do {
    deletedProduct.code.forEach((d) => {
      bulk.find({ code: d.code }).remove();
    });
    if (deletedProduct.paging.page == deletedProduct.paging.pageCount) break;
    deletedProduct = await AritoHelper.getAllDeletedProducts(
      deletedProduct.paging.page + 1,
      updatedAt
    );
  } while (deletedProduct.paging.page <= deletedProduct.paging.pageCount);
  if (bulk.length > 0) {
    console.log(chalk.yellow(`====> Xóa ${bulk.length} sản phẩm...`));
    await bulk.execute();
  }
}

async function syncProductContainer() {
  const productContainers = await AritoHelper.getItemContainer();
  const productContainerBulk = ProductContainerModel.collection.initializeUnorderedBulkOp();
  const productBulk = ProductModel.collection.initializeUnorderedBulkOp();
  for (const { products, ...container } of productContainers) {
    console.log(chalk.yellow(`====> Nhóm ${container.name} có ${products.length} sản phẩm`));
    productContainerBulk
      .find({ code: container.id })
      .upsert()
      .updateOne({
        $setOnInsert: { createdAt: new Date() },
        $set: {
          updatedAt: new Date(),
          ...container,
          productIds: await ProductModel.find({ code: { $in: products } }).then((res) =>
            res.map((p) => p._id)
          ),
        },
      });
    productBulk
      .find({ code: { $in: products } })
      .update({ $addToSet: { containers: container.name } });
    productBulk
      .find({ code: { $nin: products }, containers: { $in: [container.name] } })
      .update({ $pullAll: { containers: [container.name] } });
  }
  if (productBulk.length > 0) {
    await productBulk.execute();
  }
  if (productContainerBulk.length > 0) {
    await productContainerBulk.execute();
  }
}
async function syncProductTag() {
  const tagUpdatedAt = await ProductTagModel.findOne()
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  let tagData = await AritoHelper.getAllTag(1, tagUpdatedAt);
  const tagBulk = ProductTagModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", tagData.paging.page));
    tagData.data.forEach((d) => {
      tagBulk
        .find({ code: d.code })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: new Date() },
          $set: { ...d, updatedAt: new Date() },
        });
    });
    if (tagData.paging.page == tagData.paging.pageCount) break;
    tagData = await AritoHelper.getAllTag(tagData.paging.page + 1, tagUpdatedAt);
  } while (tagData.paging.page <= tagData.paging.pageCount);
  if (tagBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${tagBulk.length} tag...`));
    await tagBulk.execute();
  }
}
async function syncProductTabs() {
  const productTabUpdatedAt = await ProductTabModel.findOne()
    .sort({ updatedAt: -1 })
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  const tabInfo = await AritoHelper.getTabInfo(1, productTabUpdatedAt);
  const productTabBulk = ProductTabModel.collection.initializeUnorderedBulkOp();
  console.log(chalk.yellow(`====> Có ${tabInfo.data.length} tab`));
  for (const tab of tabInfo.data) {
    productTabBulk
      .find({ code: tab.code })
      .upsert()
      .updateOne({
        $setOnInsert: { createdAt: new Date() },
        $set: {
          ...tab,
          updatedAt: new Date(),
        },
      });
  }
  if (productTabBulk.length > 0) {
    await productTabBulk.execute();
  }
}
async function syncProduct() {
  console.log(chalk.yellow("====> Đồng bộ Product Tab"));
  await syncProductTabs();
  console.log(chalk.yellow("====> Đồng bộ Product Tag"));
  await syncProductTag();
  const productTabs = await ProductTabModel.find().sort({ code: 1 });
  const productTags = await ProductTagModel.find().then((res) => keyBy(res, "code"));
  const productUpdatedAt = await ProductModel.findOne()
    .sort({ syncAt: -1 })
    .exec()
    .then((res) => (res ? res.syncAt : null));
  // const productUpdatedAt = null;
  let getProductResult = await AritoHelper.getAllProduct(1, productUpdatedAt);
  const productBulk = ProductModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", getProductResult.paging.page));
    const categoryData = await CategoryModel.find({
      code: { $in: uniq(flatten(getProductResult.data.map((d) => d.categoryIds))) },
    }).then((res) => keyBy(res, "code"));
    const ingredientData = await IngredientModel.find({
      code: { $in: uniq(flatten(getProductResult.data.map((d) => d.ingredientIds))) },
    }).then((res) => keyBy(res, "code"));
    getProductResult.data.forEach(({ __data, ...d }: any) => {
      const rawData = __data;
      const tabs = productTabs
        .filter((t) => rawData[t.productField] && rawData[t.productField] != "")
        .map((t) => ({
          name: t.name,
          name2: t.name2,
          content: rawData[t.productField],
        }));
      const tagDetails: ProductTagDetail[] = d.tags
        .filter((t) => productTags[t])
        .map((t) => ({
          ...productTags[t].toJSON(),
          outOfDate: productTags[t].code == "DATEOFF" ? d.outOfDate : null,
        }));

      productBulk
        .find({ code: d.code })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: new Date() },
          $set: {
            ...d,
            tabs,
            tagDetails,
            updatedAt: new Date(),
            categoryIds: compact(
              d.categoryIds.map((code: string) => get(categoryData, "code._id", null))
            ),
            ingredientIds: compact(
              d.ingredientIds.map((code: string) => get(ingredientData, "code._id", null))
            ),
            ingredientNames: compact(
              d.ingredientIds.map((code: string) => get(ingredientData, "code.name"))
            ),
            syncAt: new Date(),
          },
        });
    });
    if (getProductResult.paging.page == getProductResult.paging.pageCount) break;
    getProductResult = await AritoHelper.getAllProduct(
      getProductResult.paging.page + 1,
      productUpdatedAt
    );
  } while (getProductResult.paging.page <= getProductResult.paging.pageCount);
  if (productBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${productBulk.length} sản phẩm...`));
    await productBulk.execute();
  }
}

async function syncCategory() {
  const categoryUpdatedAt = await CategoryModel.findOne()
    .sort({ updatedAt: -1 })
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  for (const type of Object.values(CategoryType)) {
    console.log(chalk.yellow("====> Đồng bộ danh mục loại", type));
    let getCategoryResult = await AritoHelper.getAllCategory(type, 1, categoryUpdatedAt);
    const categoryBulk = CategoryModel.collection.initializeUnorderedBulkOp();
    do {
      console.log(chalk.yellow("======> Đồng bộ trang ", getCategoryResult.paging.page));
      let parentCategories: { [x: string]: ICategory } = {};
      if (getCategoryResult.data.length > 0 && getCategoryResult.data[0].type != CategoryType.VT1) {
        const parentCategoryCodes = getCategoryResult.data.map((d) =>
          d.code.substr(0, d.code.length - 2)
        );
        parentCategories = await CategoryModel.find({
          code: { $in: parentCategoryCodes },
        }).then((res) => keyBy(res, "code"));
      }
      getCategoryResult.data.forEach((d) => {
        const parentCategory = get(parentCategories, `${d.code.substr(0, d.code.length - 2)}`);
        categoryBulk
          .find({ code: d.code })
          .upsert()
          .updateOne({
            $setOnInsert: { createdAt: new Date() },
            $set: {
              ...d,
              parentIds: parentCategory ? [parentCategory._id, ...parentCategory.parentIds] : [],
              updatedAt: new Date(),
            },
          });
      });
      if (getCategoryResult.paging.page == getCategoryResult.paging.pageCount) break;
      getCategoryResult = await AritoHelper.getAllCategory(
        type,
        getCategoryResult.paging.page + 1,
        categoryUpdatedAt
      );
    } while (getCategoryResult.paging.page <= getCategoryResult.paging.pageCount);
    if (categoryBulk.length > 0) {
      console.log(chalk.yellow(`======> Đồng bộ ${categoryBulk.length} danh mục...`));
      await categoryBulk.execute();
    }
  }
}
async function syncIngredient() {
  const ingredientUpdatedAt = await IngredientModel.findOne()
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  let getIngredientResult = await AritoHelper.getAllIngredient(1, ingredientUpdatedAt);
  const ingredientBulk = IngredientModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", getIngredientResult.paging.page));
    getIngredientResult.data.forEach((d) => {
      ingredientBulk
        .find({ code: d.code })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: new Date() },
          $set: { ...d, updatedAt: new Date() },
        });
    });
    if (getIngredientResult.paging.page == getIngredientResult.paging.pageCount) break;
    getIngredientResult = await AritoHelper.getAllIngredient(
      getIngredientResult.paging.page + 1,
      ingredientUpdatedAt
    );
  } while (getIngredientResult.paging.page <= getIngredientResult.paging.pageCount);
  if (ingredientBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${ingredientBulk.length} hoạt chất...`));
    await ingredientBulk.execute();
  }
}
async function syncProductComment() {
  const updatedAt = await ProductCommentModel.findOne()
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  let data = await AritoHelper.getAllComment(1, updatedAt);
  const bulk = ProductCommentModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", data.paging.page));
    const productComments = data.data.filter((d) => d.type == "PRODUCT");
    if (productComments.length > 0) {
      const products = await ProductModel.find({
        code: { $in: productComments.map((c) => c.ref) },
      }).then((res) => keyBy(res, "code"));
      data.data
        .filter((d) => d.type == "PRODUCT")
        .forEach((d) => {
          bulk
            .find({ code: d.code })
            .upsert()
            .updateOne({
              $setOnInsert: { createdAt: new Date() },
              $set: {
                updatedAt: new Date(),
                productId: products[d.ref]._id,
                productCode: d.ref,
                imark: d.imark,
                content: d.content,
                reviewer: d.reviewer,
              },
            });
        });
    }

    if (data.paging.page == data.paging.pageCount) break;
    data = await AritoHelper.getAllComment(data.paging.page + 1, updatedAt);
  } while (data.paging.page <= data.paging.pageCount);
  if (bulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} đánh giá...`));
    await bulk.execute();
  }
}

export default SyncProductJob;
