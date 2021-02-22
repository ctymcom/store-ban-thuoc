import { Job } from "agenda";
import moment from "moment-timezone";
import { Agenda } from "../agenda";
import chalk from "chalk";
import {
  CategoryModel,
  CategoryType,
  ICategory,
} from "../../graphql/modules/category/category.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { flatten, get, keyBy, uniq } from "lodash";
import { IngredientModel } from "../../graphql/modules/ingredient/ingredient.model";
import { ProductModel } from "../../graphql/modules/product/product.model";

export class SyncProductJob {
  static jobName = "SyncProduct";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncProductJob.jobName, moment().format());
    await AritoHelper.setImageToken();
    console.log(chalk.cyan("==> Động bộ danh mục sản phẩm..."));
    await syncCategory();
    console.log(chalk.cyan("==> Động bộ hoạt chất..."));
    await syncIngredient();
    console.log(chalk.cyan("==> Động bộ sản phẩm..."));
    await syncProduct();
    console.log(chalk.cyan("==> Động bộ nhóm sản phẩm hiển thị..."));
    await syncProductContainer();
    console.log(chalk.green("==> Đồng bộ xong"));
  }
}
async function syncProductContainer() {
  const productContainers = await AritoHelper.getItemContainer();
  const productBulk = ProductModel.collection.initializeUnorderedBulkOp();
  for (const container of productContainers) {
    console.log(
      chalk.yellow(`====> Nhóm ${container.name} có ${container.products.length} sản phẩm`)
    );
    productBulk
      .find({ code: { $in: container.products } })
      .update({ $addToSet: { containers: container.name } });
    productBulk
      .find({ code: { $nin: container.products }, containers: { $in: [container.name] } })
      .update({ $pullAll: { containers: [container.name] } });
  }
  if (productBulk.length > 0) {
    await productBulk.execute();
  }
}
async function syncProduct() {
  const productUpdatedAt = await ProductModel.findOne()
    .sort({ updatedAt: -1 })
    .exec()
    .then((res) => {
      return res ? res.updatedAt : null;
    });
  // const productUpdatedAt =null;
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
    getProductResult.data.forEach((d) => {
      productBulk
        .find({ code: d.code })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: new Date() },
          $set: {
            ...d,
            updatedAt: new Date(),
            categoryIds: d.categoryIds.map((code: string) => get(categoryData, code)._id),
            ingredientIds: d.ingredientIds.map((code: string) => get(ingredientData, code)._id),
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
  const ingredientUpdatedAt = await CategoryModel.findOne()
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

export default SyncProductJob;
