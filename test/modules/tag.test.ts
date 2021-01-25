import tagResolver from "../../src/graphql/modules/tag/tag.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { TagModel } from "../../src/graphql/modules/tag/tag.model";
import { getAdminContext } from "../utils/context";

let tag: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllTag", () => {
  it("shold return an array", async (done) => {
    let result = await tagResolver.Query.getAllTag({}, {}, context);

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

describe("# Test createTag", () => {
  it("shold return an array", async (done) => {
    let result: any = await tagResolver.Mutation.createTag(
      {},
      { data },
      context
    );
    result = result.toJSON();
    tag = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneTag", () => {
  it("shold return an object", async (done) => {
    let result: any = await tagResolver.Query.getOneTag(
      {},
      { id: tag._id },
      context
    );

    console.log(tag);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateTag", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await tagResolver.Mutation.updateTag(
      {},
      {
        id: tag._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    tag = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneTag", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await tagResolver.Mutation.deleteOneTag(
      {},
      {
        id: tag._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(tag.id);
    done();
  });
});

describe("# Test deleteManyTag", () => {
  it("shold return an object", async (done) => {
    let records = await TagModel.create([
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

    let result: any = await tagResolver.Mutation.deleteManyTag(
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
