import productContainerResolver from "../../src/graphql/modules/productContainer/productContainer.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { ProductContainerModel } from "../../src/graphql/modules/productContainer/productContainer.model";
import { getAdminContext } from "../utils/context";

let productContainer: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllProductContainer", () => {
  it("shold return an array", async (done) => {
    let result = await productContainerResolver.Query.getAllProductContainer({}, {}, context);

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

describe("# Test createProductContainer", () => {
  it("shold return an array", async (done) => {
    let result: any = await productContainerResolver.Mutation.createProductContainer(
      {},
      { data },
      context
    );
    result = result.toJSON();
    productContainer = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneProductContainer", () => {
  it("shold return an object", async (done) => {
    let result: any = await productContainerResolver.Query.getOneProductContainer(
      {},
      { id: productContainer._id },
      context
    );

    console.log(productContainer);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateProductContainer", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await productContainerResolver.Mutation.updateProductContainer(
      {},
      {
        id: productContainer._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    productContainer = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneProductContainer", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await productContainerResolver.Mutation.deleteOneProductContainer(
      {},
      {
        id: productContainer._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(productContainer.id);
    done();
  });
});

describe("# Test deleteManyProductContainer", () => {
  it("shold return an object", async (done) => {
    let records = await ProductContainerModel.create([
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

    let result: any = await productContainerResolver.Mutation.deleteManyProductContainer(
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
