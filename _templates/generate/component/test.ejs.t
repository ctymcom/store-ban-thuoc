---
to: test/modules/<%= h.inflection.camelize(name, true) %>.test.ts
---
import h.inflection.camelize(name, true) %>Resolver from "../../src/graphql/modules/h.inflection.camelize(name, true) %>/h.inflection.camelize(name, true) %>.resolver";
import { expect } from "chai";
import { ROLES } from "../../src/constants/role.const";
import faker from "faker";
import { h.inflection.camelize(name) %>Model } from "../../src/graphql/modules/h.inflection.camelize(name, true) %>/h.inflection.camelize(name, true) %>.model";
import { getAdminContext } from "../utils/context";

let h.inflection.camelize(name, true) %>: any = {};
let data = {
  name: faker.name.jobTitle(),
};
let context = getAdminContext();

describe("# Test getAllh.inflection.camelize(name) %>", () => {
  it("shold return an array", async (done) => {
    let result = await h.inflection.camelize(name, true) %>Resolver.Query.getAllh.inflection.camelize(name) %>({}, {}, context);

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

describe("# Test createh.inflection.camelize(name) %>", () => {
  it("shold return an array", async (done) => {
    let result: any = await h.inflection.camelize(name, true) %>Resolver.Mutation.createh.inflection.camelize(name) %>(
      {},
      { data },
      context
    );
    result = result.toJSON();
    h.inflection.camelize(name, true) %> = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test getOneh.inflection.camelize(name) %>", () => {
  it("shold return an object", async (done) => {
    let result: any = await h.inflection.camelize(name, true) %>Resolver.Query.getOneh.inflection.camelize(name) %>(
      {},
      { id: h.inflection.camelize(name, true) %>._id },
      context
    );

    console.log(h.inflection.camelize(name, true) %>);
    console.log(result);

    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test updateh.inflection.camelize(name) %>", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await h.inflection.camelize(name, true) %>Resolver.Mutation.updateh.inflection.camelize(name) %>(
      {},
      {
        id: h.inflection.camelize(name, true) %>._id,
        data: data,
      },
      context
    );
    result = result.toJSON();
    h.inflection.camelize(name, true) %> = result;

    expect(result).to.be.an("object");
    expect(result.name).to.equal(data.name);
    done();
  });
});

describe("# Test deleteOneh.inflection.camelize(name) %>", () => {
  it("shold return an object", async (done) => {
    data.name = faker.name.title();
    let result: any = await h.inflection.camelize(name, true) %>Resolver.Mutation.deleteOneh.inflection.camelize(name) %>(
      {},
      {
        id: h.inflection.camelize(name, true) %>._id,
      },
      context
    );
    result = result.toJSON();

    expect(result).to.be.an("object");
    expect(result.id).to.equal(h.inflection.camelize(name, true) %>.id);
    done();
  });
});

describe("# Test deleteManyh.inflection.camelize(name) %>", () => {
  it("shold return an object", async (done) => {
    let records = await h.inflection.camelize(name) %>Model.create([
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

    let result: any = await h.inflection.camelize(name, true) %>Resolver.Mutation.deleteManyh.inflection.camelize(name) %>(
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
