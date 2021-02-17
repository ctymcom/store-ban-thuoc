import ingredientResolver from "../../src/graphql/modules/ingredient/ingredient.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { IngredientModel } from "../../src/graphql/modules/ingredient/ingredient.model";
import { getAdminContext } from "../utils/context";

let ingredient: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllIngredient", () => {
  it("shold return an array", async (done) => {
    let result = await ingredientResolver.Query.getAllIngredient({}, {}, context);

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

describe("# Test createIngredient", () => {
  it("shold return an array", async (done) => {
    let result: any = await ingredientResolver.Mutation.createIngredient(
      {},
      { data },
      context
    );
    result = result.toJSON();
    ingredient = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneIngredient", () => {
  it("shold return an object", async (done) => {
    let result: any = await ingredientResolver.Query.getOneIngredient(
      {},
      { id: ingredient._id },
      context
    );

    console.log(ingredient);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateIngredient", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await ingredientResolver.Mutation.updateIngredient(
      {},
      {
        id: ingredient._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    ingredient = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneIngredient", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await ingredientResolver.Mutation.deleteOneIngredient(
      {},
      {
        id: ingredient._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(ingredient.id);
    done();
  });
});

describe("# Test deleteManyIngredient", () => {
  it("shold return an object", async (done) => {
    let records = await IngredientModel.create([
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

    let result: any = await ingredientResolver.Mutation.deleteManyIngredient(
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
