import productTabResolver from "../../src/graphql/modules/productTab/productTab.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { ProductTabModel } from "../../src/graphql/modules/productTab/productTab.model";
import { getAdminContext } from "../utils/context";

let productTab: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllProductTab", () => {
  it("shold return an array", async (done) => {
    let result = await productTabResolver.Query.getAllProductTab({}, {}, context);

    expect(result).to.be.an("object");
    expect(result.data).to.be.an("array");
    expect(result.total).to.be.a("number");
    expect(result.pagination).to.be.an("object");
    expect(result.pagination.limit).to.be.a("number");
    expect(result.pagination.offset).to.be.a("number");
    expect(result.pagination.page).to.be.a("number");
    done();
  });
});

describe("# Test createProductTab", () => {
  it("shold return an array", async (done) => {
    let result: any = await productTabResolver.Mutation.createProductTab(
      {},
      { data },
      context
    );
    result = result.toJSON();
    productTab = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneProductTab", () => {
  it("shold return an object", async (done) => {
    let result: any = await productTabResolver.Query.getOneProductTab(
      {},
      { id: productTab._id },
      context
    );

    console.log(productTab);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateProductTab", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await productTabResolver.Mutation.updateProductTab(
      {},
      {
        id: productTab._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    productTab = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneProductTab", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await productTabResolver.Mutation.deleteOneProductTab(
      {},
      {
        id: productTab._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(productTab.id);
    done();
  });
});

describe("# Test deleteManyProductTab", () => {
  it("shold return an object", async (done) => {
    let records = await ProductTabModel.create([
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
      {
        name: faker.name.title(),
      },
    ]);

    let ids = records.map((r) => r.get("id"));

    let result: any = await productTabResolver.Mutation.deleteManyProductTab(
      {},
      {
        ids: ids,
      },
      context
    );

    expect(result).to.be.a("number");
    expect(result).to.equal(records.length);
    done();
  });
});
