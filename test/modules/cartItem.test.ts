import cartItemResolver from "../../src/graphql/modules/cartItem/cartItem.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { CartItemModel } from "../../src/graphql/modules/cartItem/cartItem.model";
import { getAdminContext } from "../utils/context";

let cartItem: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllCartItem", () => {
  it("shold return an array", async (done) => {
    let result = await cartItemResolver.Query.getAllCartItem({}, {}, context);

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

describe("# Test createCartItem", () => {
  it("shold return an array", async (done) => {
    let result: any = await cartItemResolver.Mutation.createCartItem(
      {},
      { data },
      context
    );
    result = result.toJSON();
    cartItem = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneCartItem", () => {
  it("shold return an object", async (done) => {
    let result: any = await cartItemResolver.Query.getOneCartItem(
      {},
      { id: cartItem._id },
      context
    );

    console.log(cartItem);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateCartItem", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await cartItemResolver.Mutation.updateCartItem(
      {},
      {
        id: cartItem._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    cartItem = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneCartItem", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await cartItemResolver.Mutation.deleteOneCartItem(
      {},
      {
        id: cartItem._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(cartItem.id);
    done();
  });
});

describe("# Test deleteManyCartItem", () => {
  it("shold return an object", async (done) => {
    let records = await CartItemModel.create([
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

    let result: any = await cartItemResolver.Mutation.deleteManyCartItem(
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
