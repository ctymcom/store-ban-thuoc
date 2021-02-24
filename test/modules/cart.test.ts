import cartResolver from "../../src/graphql/modules/cart/cart.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { CartModel } from "../../src/graphql/modules/cart/cart.model";
import { getAdminContext } from "../utils/context";

let cart: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllCart", () => {
  it("shold return an array", async (done) => {
    let result = await cartResolver.Query.getAllCart({}, {}, context);

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

describe("# Test createCart", () => {
  it("shold return an array", async (done) => {
    let result: any = await cartResolver.Mutation.createCart(
      {},
      { data },
      context
    );
    result = result.toJSON();
    cart = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneCart", () => {
  it("shold return an object", async (done) => {
    let result: any = await cartResolver.Query.getOneCart(
      {},
      { id: cart._id },
      context
    );

    console.log(cart);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateCart", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await cartResolver.Mutation.updateCart(
      {},
      {
        id: cart._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    cart = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneCart", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await cartResolver.Mutation.deleteOneCart(
      {},
      {
        id: cart._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(cart.id);
    done();
  });
});

describe("# Test deleteManyCart", () => {
  it("shold return an object", async (done) => {
    let records = await CartModel.create([
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

    let result: any = await cartResolver.Mutation.deleteManyCart(
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
